'use strict';
//declaring globals that the app will use
let votingRounds = 25;
// checks for local storage and sets the storage to the value of productArr after parsing, if not sets to an empty array
let productArr = loadStoredProductArr() || [];
let productsShown = [];
let ctx = document.getElementById('myChart');

// checking lcal storage function for productArr
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

// constructor for product objects
function ProductConstructor(name, altText) {
  this.name = name;
  this.image = `img/${name}.jpg`;
  this.altText = altText;
  this.votes = 0;
  this.views = 0;
}

// Fisher-Yates shuffle algorithm for the productArr.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// checks array length, if not long enough then shuffles the array and resets the currentIndex
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

// displays the images to the page
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

// function that increments the votes global variable and decrements the votingRounds
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

// displays the results obviously, and creates the graph at the same time.
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
// all the product objects
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
// shuffles the array on initial load of the page so you always start with a unique array
shuffleArray(productArr);
renderProducts();
