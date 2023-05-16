'use strict';

let votingRounds = 15;
let productArr = [];
let productsShown = [];

function productConstructor(name, altText) {
  this.name = name;
  this.image = 'img/' + name + '.jpg';
  this.altText = altText;
  this.votes = 0;
  this.views = 0;
}

function genRndmProducts() {
  let randomNumbers = [];
  while(randomNumbers.length < 3){
    let num = Math.floor(Math.random() * productArr.length);
    if(randomNumbers.indexOf(num) === -1) randomNumbers.push(num);
  }
  return randomNumbers;
}

function renderProducts() {
  let randomIndexes = genRndmProducts();

  let img1 = productArr[randomIndexes[0]];
  let img2 = productArr[randomIndexes[1]];
  let img3 = productArr[randomIndexes[2]];

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

  let resultsSidebar = document.querySelector('#resultsList');

  productArr.forEach(product => {
    let listItem = document.createElement('li');
    listItem.textContent = `${product.name}: ${product.votes} votes`;
    resultsSidebar.appendChild(listItem);

    let footer = document.querySelector('.footer');
    let newParagraph = document.createElement('p');
    newParagraph.textContent = 'Thank-you for voting subject #[USER ALPHANUMERIC], the system rejoices in your compliance. You\'ve always been one of our favorites, so please come back anytime and remember, we\'re never more than a click away.';
    footer.appendChild(newParagraph);
  });
}


let bag = new productConstructor('bag', 'an r2-d2 shaped luggage');
let banana = new productConstructor('banana' , 'a sliced up banana, ouch!');
let bathroom = new productConstructor('bathroom' , 'iPad and toilet paper holder');
let boots = new productConstructor('boots', 'open toe rainboots');
let breakfast = new productConstructor('breakfast', 'an all-in-one breakfast maker');
let bubblegum = new productConstructor('bubblegum', 'meat flavored chewing gum');
let chair = new productConstructor('chair', 'a chair with a big hump in the middle for convex shaped ass');
let cthulhu = new productConstructor('cthulhu', 'a cthulu action figure holding an army man');
let dogduck = new productConstructor('dogduck', 'dog in a duck costume');
let dragon = new productConstructor('dragon' ,'dragon meat in a can');
let pen = new productConstructor('pen', 'a set of kitchen utensils that double as a bic pen');
let petsweep = new productConstructor('petsweep', 'dust booties for your dog');
let scissors = new productConstructor('scissors', 'pizza scissors');
let shark = new productConstructor('shark', 'shark sized and shaped sleeping bag');
let sweep = new productConstructor('sweep', 'a baby onesy that doubles as a sweeper');
let tauntaun = new productConstructor('tauntaun', 'a tauntaun sized and shaped sleeping bag');
let unicorn = new productConstructor('unicorn', 'unicorn meat in a spam can, radiantly delicious!');
let watercan = new productConstructor('watercan','a water can for sprinkling plant but it feeds back into itself so you never run out of water');
let wineglass = new productConstructor('wineglass', 'a wine glass with a hole in the side of the glass');

productArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);

renderProducts();
