"use strict";

// constructor for products

//----------------------------global variables----------------------//

const leftImgElem = document.getElementById("left_product_img");
const leftH2Elem = document.getElementById("left_producth2");
const centerImgElem = document.getElementById("center_product_img");
const centerH2Elem = document.getElementById("center_producth2");
const rightImgElem = document.getElementById("right_product_img");
const rightH2Elem = document.getElementById("right_producth2");
const voteContainerElem = document.getElementById("all-products");
const resultsUlElem = document.getElementById("product-click");

Product.allProducts = [];
Product.seen = [];
Product.totalClicks = 0;

let productVotes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let productShown = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let productNames = [];
let maxVote = 10;

var productTable = document.createElement("table");
var sectionElement = document.getElementById("products-for-vote");
var sectionElement2 = document.getElementById("table");

let currentLeft = null;
let currentRight = null;
let currentCenter = null;

//--------------------------constructor function --------------------//

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
  productNames.push(this.name);
}

var product1Elem = document.getElementById("left_product_img");
var product2Elem = document.getElementById("center_product_img");
var product3Elem = document.getElementById("right_product_img");

//----------------------------prototype methods----------------------//

Product.prototype.renderProduct = function (img, h2) {
  var imgs = document.createElement("img");
  imgs.setAttribute("src", img);
  img.src = this.imgPath;
  img.alt = this.name;
  h2 = document.createElement("h2");
};

// renders a signle image/name

//----------------------------global functions----------------------//

function pickThreeProducts() {
  const doNotUse = [currentRight, currentLeft, currentCenter];
  let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
  let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
  let centerIndex = Math.floor(Math.random() * Product.allProducts.length);

  while (
    leftIndex === rightIndex ||
    leftIndex === centerIndex ||
    rightIndex === centerIndex ||
    Product.seen.includes(leftIndex) ||
    Product.seen.includes(rightIndex) ||
    Product.seen.includes(centerIndex)
  ) {
    rightIndex = Math.floor(Math.random() * Product.allProducts.length);
    leftIndex = Math.floor(Math.random() * Product.allProducts.length);
    centerIndex = Math.floor(Math.random() * Product.allProducts.length);
  }

  Product.allProducts[leftIndex].views++;
  Product.allProducts[rightIndex].views++;
  Product.allProducts[centerIndex].views++;

  Product.seen[0] = leftIndex;
  Product.seen[1] = rightIndex;
  Product.seen[2] = centerIndex;

  product1Elem.src = Product.allProducts[leftIndex].imgPath;
  product1Elem.alt = Product.allProducts[leftIndex].name;

  product2Elem.src = Product.allProducts[rightIndex].imgPath;
  product2Elem.alt = Product.allProducts[rightIndex].name;

  product3Elem.src = Product.allProducts[centerIndex].imgPath;
  product3Elem.alt = Product.allProducts[centerIndex].name;
}

function handleClick(e) {
  for (var i in Product.allProducts) {
    // increment times clicked for an product image object if it was clicked on the page
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;

      //total click votes tracking for the page is incremented while still clicking/voting on the page
      Product.totalClicks++;
    }
  }
  //when the user has clicked/voted the maximum number of times, show results, store both votes and times show per product in an array in local storage
  if (Product.totalClicks > maxVote) {
    sectionElement.removeEventListener("click", handleClick);
    alert("Thanks for voting. Your results are below.");
    updateVotes();
    renderChart();
    renderStats();
    renderTable();

    //add all productVote array values to local storage after vote is complete
    localStorage.setItem("totalProductVotes", JSON.stringify(productVotes));
    localStorage.setItem("totalProductShowns", JSON.stringify(productShown));
  } else {
    //when the votes are still needed, generate new product image set of 3
    pickThreeProducts();
  }
}

function updateVotes() {
  for (let i in Product.allProducts) {
    productVotes[i] += Product.allProducts[i].clicks;
    productShown[i] += Product.allProducts[i].views;
  }
}

function renderChart() {
  var sectionElement = document.getElementById("chart");
  var titleElement = document.createElement("h2");
  titleElement.textContent = "Number of votes and displays per product";
  sectionElement.appendChild(titleElement);

  var canvasElement = document.createElement("canvas");
  canvasElement.id = "product-vote-chart";
  canvasElement.height = "300";
  canvasElement.width = "600";
  sectionElement.appendChild(canvasElement);

  var context = document.getElementById("product-vote-chart").getContext("2d");

  var voteChartData = {
    label: "Votes per Product (cumulative)",
    data: productVotes,
    backgroundColor: "#404040",
  };

  var shownChartData = {
    label: "Times shown per product (cumulative)",
    data: productShown,
    backgroundColor: "#0040ff",
  };

  var productInfo = {
    labels: productNames,
    datasets: [voteChartData, shownChartData],
  };

  var chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  var productResultsChart = new Chart(context, {
    type: "bar",
    data: productInfo,
    options: chartOptions,
  });
}

function renderTable() {
  var tableRowElement, tableDataElement;
  var votes = productVotes;
  var shown = productShown;

  for (var i = 0; i < productNames.length; i++) {
    tableRowElement = document.createElement("tr");

    tableDataElement = document.createElement("td");
    tableDataElement.textContent = productNames[i];
    tableRowElement.appendChild(tableDataElement);

    tableDataElement = document.createElement("td");
    tableDataElement.textContent = votes[i];
    tableRowElement.appendChild(tableDataElement);

    tableDataElement = document.createElement("td");
    tableDataElement.textContent = shown[i];
    tableRowElement.appendChild(tableDataElement);

    productTable.appendChild(tableRowElement);
  }
  sectionElement2.appendChild(productTable);
}

function renderStats() {
  var sectionElement = document.getElementById("table");
  var titleElement = document.createElement("h2");
  titleElement.textContent = "Stats";
  sectionElement.appendChild(titleElement);

  var productName = document.createElement("td");
  var tableRowElement = document.createElement("tr");

  productName.textContent = "Product";
  tableRowElement.appendChild(productName);

  productTable.appendChild(tableRowElement);

  var timesVoted = document.createElement("td");
  timesVoted.textContent = "Number of Votes";
  tableRowElement.appendChild(timesVoted);

  productTable.appendChild(tableRowElement);

  var timesShown = document.createElement("td");
  timesShown.textContent = "Number of Times Shown";
  tableRowElement.appendChild(timesShown);

  productTable.appendChild(tableRowElement);
}

//----------------------------call functions----------------------//

Product.allProducts.push(new Product("Bag", "./busMallimages/bag.jpg"));
Product.allProducts.push(new Product("banana", "./busMallimages/banana.jpg"));
Product.allProducts.push(
  new Product("bathroom", "./busMallimages/bathroom.jpg")
);
Product.allProducts.push(new Product("boots", "./busMallimages/boots.jpg"));
Product.allProducts.push(
  new Product("breakfast", "./busMallimages/breakfast.jpg")
);
Product.allProducts.push(
  new Product("bubblegum", "./busMallimages/bubblegum.jpg")
);
Product.allProducts.push(new Product("chair", "./busMallimages/chair.jpg"));
Product.allProducts.push(new Product("cthulhu", "./busMallimages/cthulhu.jpg"));
Product.allProducts.push(
  new Product("dog-Duck", "./busMallimages/dog-duck.jpg")
);
Product.allProducts.push(new Product("dragon", "./busMallimages/dragon.jpg"));
Product.allProducts.push(new Product("pen", "./busMallimages/pen.jpg"));
Product.allProducts.push(
  new Product("pet-Sweep", "./busMallimages/pet-sweep.jpg")
);
Product.allProducts.push(
  new Product("scissors", "./busMallimages/scissors.jpg")
);
Product.allProducts.push(new Product("shark", "./busMallimages/shark.jpg"));
Product.allProducts.push(new Product("sweep", "./busMallimages/sweep.png"));
Product.allProducts.push(
  new Product("tauntaun", "./busMallimages/tauntaun.jpg")
);
Product.allProducts.push(new Product("unicorn", "./busMallimages/unicorn.jpg"));
Product.allProducts.push(
  new Product("water-Can", "./busMallimages/water-can.jpg")
);
Product.allProducts.push(
  new Product("wine-Glass", "./busMallimages/wine-glass.jpg")
);

if (localStorage.totalProductShown) {
  productVotes = JSON.parse(localStorage.getItem("totalProductVotes"));
  productShown = JSON.parse(localStorage.getItem("totalProductShown"));
}

sectionElement.addEventListener("click", handleClick);

pickThreeProducts();