'use strict';

let votingRounds = 25;
// let productArr = [];
let productArr = loadStoredProductArr() || [];
let productsShown = [];
let ctx = document.getElementById('myChart');

function loadStoredProductArr() {
  let tempProductArr = [];
  if (localStorage.getItem('storedProductArr') !== null) {
    let retrievedProductArr = localStorage.getItem('storedProductArr');
    tempProductArr = JSON.parse(retrievedProductArr);
  } else {
    tempProductArr = null;
  }
  return tempProductArr;
}


function ProductConstructor(name, altText) {
  this.name = name;
  this.image = `img/${name}.jpg`;
  this.altText = altText;
  this.votes = 0;
  this.views = 0;
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let currentIndex = 0;

function genRndmProducts() {
  if (currentIndex + 2 >= productArr.length) {
    shuffleArray(productArr);
    currentIndex = 0;
  }

  let randomProductArr = [productArr[currentIndex], productArr[currentIndex + 1], productArr[currentIndex + 2]];
  currentIndex += 3;

  return randomProductArr;
}

function renderProducts() {
  let randomProducts = genRndmProducts();

  let img1 = randomProducts[0];
  let img2 = randomProducts[1];
  let img3 = randomProducts[2];

  img1.views++;
  img2.views++;
  img3.views++;

  productsShown = [img1, img2, img3];

  document.getElementById('img1').src = img1.image;
  document.getElementById('img2').src = img2.image;
  document.getElementById('img3').src = img3.image;

  document.getElementById('img1').title = img1.name;
  document.getElementById('img2').title = img2.name;
  document.getElementById('img3').title = img3.name;
}

document.getElementById('img1').addEventListener('click', handleVote);
document.getElementById('img2').addEventListener('click', handleVote);
document.getElementById('img3').addEventListener('click', handleVote);

function handleVote() {
  let clickedProduct = event.target.title;

  for (let i = 0; i< productsShown.length; i++) {
    if (clickedProduct === productsShown[i].name) {
      productsShown[i].votes++;
      break;
    }
  }
  votingRounds--;
  // saveToLocalStorage
  let stringifiedProductArr = JSON.stringify(productArr);
  localStorage.setItem('storedProductArr', stringifiedProductArr);
  if (votingRounds === 0) {
    document.getElementById('img1').removeEventListener('click', handleVote);
    document.getElementById('img2').removeEventListener('click', handleVote);
    document.getElementById('img3').removeEventListener('click', handleVote);
    displayResults();

  } else {
    renderProducts();
  }
}

function displayResults() {

  productArr.sort((a, b) => b.votes - a.votes);

  let resultsList = document.querySelector('#resultsList');
  
  let showResultsButton = document.createElement('button');
  showResultsButton.textContent = 'Show Results';
  resultsList.appendChild(showResultsButton);
  
  showResultsButton.addEventListener('click', function() {
    productArr.forEach(product => {
      let listItem = document.createElement('li');
      listItem.textContent = `${product.name}: ${product.votes} votes seen ${product.views} times` + '\n';
      resultsList.appendChild(listItem);
    });
  
    let footer = document.querySelector('.footer');
    let newParagraph = document.createElement('p');
    newParagraph.textContent = 'Thank-you for voting subject #[USER ALPHANUMERIC], the system rejoices in your compliance. You\'ve always been one of our favorites, so please come back anytime and remember, we\'re never more than a click away.';
    footer.appendChild(newParagraph);
  
    resultsList.removeChild(showResultsButton);
  
  

    let productNames = productArr.map(product => product.name);
    let productViews = productArr.map(product => product.views);
    let productVotes = productArr.map(product => product.votes);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: 'Views',
          data: productViews,
          borderWidth: 5,
          backgroundColor: 'orange',
          borderColor: 'orange'
        },
        {
          label: 'Votes',
          data: productVotes,
          borderWidth: 5,
          backgroundColor: 'black',
          borderColor: 'black',
        }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  });
}

if (productArr.length === 0) {
  let bag = new ProductConstructor('bag', 'an r2-d2 shaped luggage');
  let banana = new ProductConstructor('banana' , 'a sliced up banana, ouch!');
  let bathroom = new ProductConstructor('bathroom' , 'iPad and toilet paper holder');
  let boots = new ProductConstructor('boots', 'open toe rainboots');
  let breakfast = new ProductConstructor('breakfast', 'an all-in-one breakfast maker');
  let bubblegum = new ProductConstructor('bubblegum', 'meat flavored chewing gum');
  let chair = new ProductConstructor('chair', 'a chair with a big hump in the middle for convex shaped ass');
  let cthulhu = new ProductConstructor('cthulhu', 'a cthulu action figure holding an army man');
  let dogduck = new ProductConstructor('dogduck', 'dog in a duck costume');
  let dragon = new ProductConstructor('dragon' ,'dragon meat in a can');
  let pen = new ProductConstructor('pen', 'a set of kitchen utensils that double as a bic pen');
  let petsweep = new ProductConstructor('petsweep', 'dust booties for your dog');
  let scissors = new ProductConstructor('scissors', 'pizza scissors');
  let shark = new ProductConstructor('shark', 'shark sized and shaped sleeping bag');
  let sweep = new ProductConstructor('sweep', 'a baby onesy that doubles as a sweeper');
  let tauntaun = new ProductConstructor('tauntaun', 'a tauntaun sized and shaped sleeping bag');
  let unicorn = new ProductConstructor('unicorn', 'unicorn meat in a spam can, radiantly delicious!');
  let watercan = new ProductConstructor('watercan','a water can for sprinkling plant but it feeds back into itself so you never run out of water');
  let wineglass = new ProductConstructor('wineglass', 'a wine glass with a hole in the side of the glass');

  productArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);
}

shuffleArray(productArr);
renderProducts();
