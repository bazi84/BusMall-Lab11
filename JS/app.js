'use strict'

// constructor for products


//----------------------------global variables----------------------//

const leftImgElem = document.getElementById('left_product_img')
const leftH2Elem = document.getElementById('left_producth2')
const centerImgElem = document.getElementById('center_product_img')
const centerH2Elem = document.getElementById('center_producth2')
const rightImgElem = document.getElementById('right_product_img')
const rightH2Elem = document.getElementById('right_producth2')
const voteContainerElem = document.getElementById('all-products')
const resultsUlElem = document.getElementById('product-click')
var stats = document.getElementById('stats');
var productContainer = document.getElementById('all_products');
// const ctx = document.getElementById('chart').getContext('2d');
Product.allProducts = []
console.log(Product.allProducts.length)
Product.seen = [];
Product.totalClicks = 0;
// let sectionElement = document.getElementById('products-for-vote');
let productTable = document.createElement('table')
let sectionElement2 = document.getElementById('table')
var chartContainer = document.getElementById('chartContainer');
let productVotes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let productShown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let productNames = []
let maxVotes = 10;
var allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allProductSrc = ['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg', './img/pet-sweep.jpg', './img/scissors.jpg', './img/shark.jpg', './img/sweep.png', './img/tauntaun.jpg', './img/unicorn.jpg', './img/usb.gif', './img/water-can.jpg', './img/wine-glass.jpg']



let currentLeft = null;
let currentRight = null;
let currentCenter = null;


//--------------------------constructor function --------------------//

function Product (name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.clicks = 0;
  this.views = 0;
  console.log
  Product.allProducts.push(this)
  console.log(Product.allProducts.length)
  // productNames.push(this.imgPath)
}
let product1Elem = document.getElementById('left_product_img')
let product2Elem = document.getElementById('right_product_img')
let product3Elem = document.getElementById('center_product_img')

//----------------------------prototype methods----------------------//

Product.prototype.renderProduct = function(img, h2){
  var imgs = document.createElement('img')
  imgs.setAttribute("src", img)
  img.src = this.imgPath;
  img.alt = this.name;
  h2 = document.createElement("h2")
}



// renders a signle image/name

//----------------------------global functions----------------------//

function pickThreeProducts() {
const doNotUse = [currentRight, currentLeft, currentCenter];
let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
let centerIndex = Math.floor(Math.random() * Product.allProducts.length);

while (leftIndex === rightIndex
  || leftIndex === centerIndex
  || rightIndex === centerIndex
  || Product.seen.includes(leftIndex)
  || Product.seen.includes(rightIndex)
  || Product.seen.includes(centerIndex)) {

    rightIndex = Math.floor(Math.random() * Product.allProducts.length);
    leftIndex = Math.floor(Math.random() * Product.allProducts.length);
    centerIndex = Math.floor(Math.random() * Product.allProducts.length);

  }

  Product.allProducts[leftIndex].views ++;
  Product.allProducts[rightIndex].views ++;
  Product.allProducts[centerIndex].views ++;

  Product.seen[0] = leftIndex
  Product.seen[1] = rightIndex
  Product.seen[2] = centerIndex

  product1Elem.src = Product.allProducts[leftIndex].imgPath
  product1Elem.alt = Product.allProducts[leftIndex].name

  product2Elem.src = Product.allProducts[rightIndex].imgPath
  product2Elem.alt = Product.allProducts[rightIndex].name

  product3Elem.src = Product.allProducts[centerIndex].imgPath
  product3Elem.alt = Product.allProducts[centerIndex].name

}



function handleClick(e) {
  for(var i in Product.allProducts){

    if(e.target.alt == Product.allProducts[i].name){
      Product.allProducts[i].clicks ++
      Product.totalClicks ++
    }
  }

  if(Product.totalClicks > maxVotes) {
    console.log(Product.totalClicks, maxVotes)
    productContainer.removeEventListener('click', handleClick)
    updateVotes()
    renderChart()
    renderStats()
    // renderTable()

    // localStorage.setItem('totalProductVotes',JSON.stringify(productVotes))
    // localStorage.setItem('totalProductShown',JSON.stringify(productShown))
  } else {

    pickThreeProducts()
  }
}

function updateVotes() {
  for(let i in Product.allProducts){
    console.log(Product.allProducts.length)
    productVotes[i] += Product.allProducts[i].clicks
    console.log(productVotes)
    console.log(i, Product.allProducts[i])
    productShown[i] += Product.allProducts[i].views
  }
}

 
var buttonLinks = document.getElementById('buttonLinks');
function renderChart() {
  let canvasEl = document.createElement('canvas');
  canvasEl.setAttribute = ('id', 'productChart');
  chartContainer.style.width = '500px';
  chartContainer.style.height = '500px';
  chartContainer.appendChild(canvasEl);

  let buttonEl = document.createElement('a');
  buttonEl.textContent = 'Chart';
  buttonEl.setAttribute('class', 'btn');
  buttonEl.href = '#chartContainer';
  buttonLinks.appendChild(buttonEl);

  let ctx = canvasEl.getContext('2d');
  let votes = [];
  let names = [];
  for(let i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts.length)
    votes[i] = Product.allProducts[i].clicks;
    names[i] = Product.allProducts[i].name;
    console.log(names)
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        data: votes,
        label: 'Votes',
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Votes Per Product',
        fontSize: 50
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
}


// function renderTable(){

//   let tableRowElement, tableDataElement;
//   let votes = productVotes
//   let seen = productShown

//   for(let i = 0; i < productNames.length; i++){
//     tableRowElement = document.createElement('tr');

//     tableDataElement = document.createElement('td')
//     tableDataElement.textContent = votes[i]
//     tableRowElement.appendChild(tableDataElement)

//     tableDataElement = document.createElement('td')
//     tableDataElement.textContent = seen[i]
//     tableRowElement.appendChild(tableDataElement)

//     if(productShown[i] > 0){
//       let voteRate = Math.round(100 * (votes[i] / seen[i]))
//       tableDataElement = document.createElement('td');
//       tableDataElement.textContent = voteRate + '%'
//       tableRowElement.appendChild(tableDataElement)
//     } else {
//       tableDataElement = document.createElement('td');
//       tableDataElement.textContent = 'N/A'
//       tableRowElement.appendChild(tableDataElement)
//     }
//     productTable.appendChild(tableRowElement)
//   }
//   sectionElement2.appendChild(productTable)
// }

function renderStats() {
  var h1El = document.createElement('h1');
  h1El.textContent = 'Stats';
  stats.appendChild(h1El);

  var buttonEl = document.createElement('a');
  buttonEl.textContent = 'Stats';
  buttonEl.setAttribute('class', 'btn');
  buttonEl.href = '#statsContainer';
  buttonLinks.appendChild(buttonEl);

  for (var i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts.length)
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].clicks + ' votes for ' + Product.allProducts[i].name;
    stats.appendChild(liEl);
  }
}


//----------------------------call functions----------------------//

Product.allProducts.push(new Product('Bag', './busMallimages/bag.jpg'));
Product.allProducts.push(new Product('banana', './busMallimages/banana.jpg'));
Product.allProducts.push(new Product('bathroom', './busMallimages/bathroom.jpg'));
Product.allProducts.push(new Product('boots', './busMallimages/boots.jpg'));
Product.allProducts.push(new Product('breakfast', './busMallimages/breakfast.jpg'));
Product.allProducts.push(new Product('bubblegum', './busMallimages/bubblegum.jpg'));
Product.allProducts.push(new Product('chair', './busMallimages/chair.jpg'));
Product.allProducts.push(new Product('cthulhu', './busMallimages/cthulhu.jpg'));
Product.allProducts.push(new Product('dog-Duck', './busMallimages/dog-duck.jpg'));
Product.allProducts.push(new Product('dragon', './busMallimages/dragon.jpg'));
Product.allProducts.push(new Product('pen', './busMallimages/pen.jpg'));
Product.allProducts.push(new Product('pet-Sweep', './busMallimages/pet-sweep.jpg'));
Product.allProducts.push(new Product('scissors', './busMallimages/scissors.jpg'));
Product.allProducts.push(new Product('shark', './busMallimages/shark.jpg'));
Product.allProducts.push(new Product('sweep', './busMallimages/sweep.png'));
Product.allProducts.push(new Product('tauntaun', './busMallimages/tauntaun.jpg'));
Product.allProducts.push(new Product('unicorn', './busMallimages/unicorn.jpg'));
Product.allProducts.push(new Product('water-Can', './busMallimages/water-can.jpg'));
Product.allProducts.push(new Product('wine-Glass', './busMallimages/wine-glass.jpg'));

// if(localStorage.totalProductShown){
//   productVotes = JSON.parse(localStorage.getItem('totalProductVotes'))
//   productShown = JSON.parse(localStorage.getItem('totalProductShown'))
// }

productContainer.addEventListener('click', handleClick);

pickThreeProducts()

//  const productNames = [1, 2, 3, 4, 5, 6];
// const labelColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: productNames,
//         datasets: [{
//             label: 'seen',
//             data: productSeen,
//             backgroundColor: labelColors,
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
        
//     }
// });
// console.log(myChart.data)