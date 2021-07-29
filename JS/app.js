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
const ctx = document.getElementById('chart').getContext('2d');
let productSeen = [];


let currentLeft = null;
let currentRight = null;
let currentCenter = null;


//--------------------------constructor function --------------------//

function Product (name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.clicks = 0;
  this.views = 0;
}

Product.allProducts = [];

//----------------------------prototype methods----------------------//

Product.prototype.renderProduct = function(img, h2){
  var imgs = document.createElement('img')
  imgs.setAttribute("src", img)
  img.src = this.imgPath;
  img.alt = this.name;
  h2 = document.createElement("h2")
  console.log(img, h2)
}


// renders a signle image/name

//----------------------------global functions----------------------//

function pickThreeProducts() {
const doNotUse = [currentRight, currentLeft, currentCenter];
while(doNotUse.includes(currentLeft)){
  let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
  console.log(leftIndex)
  currentLeft = Product.allProducts[leftIndex];
  Product.allProducts[leftIndex].views++
  console.log(currentLeft)
  productSeen.push({key: currentLeft, value: Product.allProducts[leftIndex].views})
}
doNotUse.push(currentLeft);

while(doNotUse.includes(currentRight)){
  let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
  currentRight = Product.allProducts[rightIndex];
  Product.allProducts[rightIndex].views++
  productSeen.push({key: currentRight, value: Product.allProducts[rightIndex].views})

}
doNotUse.push(currentRight);


while(doNotUse.includes(currentCenter)){
  let centerIndex = Math.floor(Math.random() * Product.allProducts.length);
  currentCenter = Product.allProducts[centerIndex];
  Product.allProducts[centerIndex].views++
  productSeen.push({key: currentCenter, value: Product.allProducts[centerIndex].views})

}
}

// picks three unique images no repeats



// render three images


function renderThreeProducts() {
  currentCenter.renderProduct(centerImgElem, centerH2Elem);
  currentLeft.renderProduct(leftImgElem, leftH2Elem);
  currentRight.renderProduct(rightImgElem, rightH2Elem);
}

// render results

// click hander

function handleClick(e) {
  const target = e.target.id;
  if (target ==='left_product_img' || target === 'right_product_img' || target === 'center_product_img') {
    rounds--;
  }
  if (target ==='left_product_img') {
    currentLeft.clicks++;
  }
  if (target ==='right_product_img') {
    currentRight.clicks++;
  }
  if (target ==='center_product_img') {
    currentCenter.clicks++;
  }
  pickThreeProducts();
  renderThreeProducts();
  if (rounds === 0){
    voteContainerElem.removeEventListener('click', handleClick);
  } else {
    voteContainerElem.addEventListener('click', handleClick);
  }
}



//----------------------------Listener----------------------//
// voteContainerElem.addEventListener('click', handleClick);

// Listener on the container for pictures


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

let productNames = []
for(var i = 0; i < Product.allProducts.length; i++){
  var alt = Product.allProducts[i].name
  productNames.push(alt)
}

pickThreeProducts();
renderThreeProducts();

function makeChart(){
  const ctx = document.createElement('canvas');
  ctx.id = 'resultsChart';
  ctx.getContext('2d');
  selectionGraphic.appendChild(ctx);
  // let productNames = [];
  // let productSeen = [];
  let productchosen = [];
  let preview = [];
  Product.allProduct(product => {
    productNames.push(product.name);
    productSeen.push(product.seen);
    productchosen.push(product.chosen);
    preview.push((product.seen) / (product.chosen));
  });


}

//  const productNames = [1, 2, 3, 4, 5, 6];
const labelColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productNames,
        datasets: [{
            label: 'seen',
            data: productSeen,
            backgroundColor: labelColors,
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
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
console.log(myChart.data)