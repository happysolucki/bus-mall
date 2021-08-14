// setup variables
const choiceContainer = document.querySelector("#choices");
const aside = document.querySelector("aside");
const resultsButton = document.createElement("button");
resultsButton.textContent = "View Results";
const wipeButton = document.createElement("button");
wipeButton.textContent = "Wipe Previous Data";
const ctx = document.querySelector("#round-results").getContext("2d");
const maxClicks = 10;
let totalClicks = 0;
let leftShoppingItem = null;
let middleShoppingItem = null;
let rightShoppingItem = null;

// template for bar chart
const barData = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "# of votes",
        data: [],
        backgroundColor: "#F2293A",
        borderColor: "#48a4d1",
        color: "#f2f2f2",
      },
      {
        label: "times shown",
        data: [],
        backgroundColor: "#F29F05",
        borderColor: "rgba(72,174,209,0.4)",
        color: "#f2f2f2",
      },
    ],
  },
  options: {
    responsive: false,
    scales: {
      y: {
        ticks: {
          color: "#f2f2f2",
        },
        // suggestedMin: 0,
        // suggestedMax: maxClicks,
      },
      x: {
        ticks: {
          color: "#f2f2f2",
        },
        // suggestedMin: 0,
        // suggestedMax: maxClicks,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#f2f2f2",
          font: {
            family: "ABeeZee",
          },
        },
      },
    },
  },
};

// Helper functions

// returns random number based on length of array given as an argument
const randomize = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

// takes number and plural word as arguments. if number is 1, return string literal with number and word with last character cut off (basically cuts off 's' from word if number is 1). else, return string literal with number and word
const determinePlural = (num, string) => {
  if (num === 1) return `${num} ${string.slice(0, -1)}`;
  return `${num} ${string}`;
};

// lists results in a bar chart
const listResults = () => {
  //
  updateLocalStorage();
  const header = document.createElement("h3");
  header.textContent = "Final Results";
  for (const item of shoppingItems) {
    barData.data.labels.push(item.name);
    barData.data.datasets[0].data.push(item.clicks);
    barData.data.datasets[1].data.push(item.timesShown);
  }
  aside.append(header);
  resultsButton.removeEventListener("click", listResults);
  const roundChart = new Chart(ctx, barData);
  document.body.append(wipeButton);
  wipeButton.addEventListener("click", (e) => {
    localStorage.clear();
    window.location.reload();
  });
  // const totalsChart = new Chart(ctx2, barData);
};

// Main class
class ShoppingItem {
  timesShown = 0;
  clicks = 0;
  constructor(name, imgSrc) {
    this.name = name;
    this.imgSrc = imgSrc;
  }
}

// Main array
let shoppingItems = [
  new ShoppingItem("bag", "./assets/imgs/bag.jpg"),
  new ShoppingItem("banana", "./assets/imgs/banana.jpg"),
  new ShoppingItem("bathroom", "./assets/imgs/bathroom.jpg"),
  new ShoppingItem("boots", "./assets/imgs/boots.jpg"),
  new ShoppingItem("breakfast", "./assets/imgs/breakfast.jpg"),
  new ShoppingItem("bubblegum", "./assets/imgs/bubblegum.jpg"),
  new ShoppingItem("chair", "./assets/imgs/chair.jpg"),
  new ShoppingItem("cthulhu", "./assets/imgs/cthulhu.jpg"),
  new ShoppingItem("dog-duck", "./assets/imgs/dog-duck.jpg"),
  new ShoppingItem("dragon", "./assets/imgs/dragon.jpg"),
  new ShoppingItem("pen", "./assets/imgs/pen.jpg"),
  new ShoppingItem("pet-sweep", "./assets/imgs/pet-sweep.jpg"),
];

// variables that'll be used to make sure immediate previous indicies aren't repeated
let previousLeft = 0;
let previousMiddle = 0;
let previousRight = 0;

// function that sets items for three main divs
const selectPreferredItem = () => {
  // select dom elements
  const leftItemImg = document.querySelector("#left-img");
  const middleItemImg = document.querySelector("#middle-img");
  const rightItemImg = document.querySelector("#right-img");
  const leftItemName = document.querySelector("#left-name");
  const middleItemName = document.querySelector("#middle-name");
  const rightItemName = document.querySelector("#right-name");

  let previousRound = [previousLeft, previousMiddle, previousRight];

  // get random number that'll be used to get random ShoppingItem
  let leftIndex = randomize(shoppingItems);
  let middleIndex = randomize(shoppingItems);
  let rightIndex = randomize(shoppingItems);

  // check for duplicate indicies
  let leftMiddle = leftIndex === middleIndex;
  let rightLeft = rightIndex === leftIndex;
  let middleRight = middleIndex === rightIndex;

  // for first round, only prevent duplicates of current indicies
  if (totalClicks < 1) {
    while (leftMiddle || rightLeft || middleRight) {
      if (leftMiddle) {
        leftIndex = randomize(shoppingItems);
      } else if (rightLeft) {
        rightIndex = randomize(shoppingItems);
      } else if (middleRight) {
        middleIndex = randomize(shoppingItems);
      }
      leftMiddle = leftIndex === middleIndex;
      rightLeft = rightIndex === leftIndex;
      middleRight = middleIndex === rightIndex;
    }
    // for subsequent rounds, prevent duplicates of current indicies and previous round's indicies
  } else {
    while (
      leftMiddle ||
      rightLeft ||
      middleRight ||
      previousRound.indexOf(leftIndex) > -1 ||
      previousRound.indexOf(middleIndex) > -1 ||
      previousRound.indexOf(rightIndex) > -1
    ) {
      if (leftMiddle || previousRound.indexOf(leftIndex) > -1)
        leftIndex = randomize(shoppingItems);
      else if (rightLeft || previousRound.indexOf(rightIndex) > -1)
        rightIndex = randomize(shoppingItems);
      else if (middleRight || previousRound.indexOf(middleIndex) > -1)
        middleIndex = randomize(shoppingItems);

      leftMiddle = leftIndex === middleIndex;
      rightLeft = rightIndex === leftIndex;
      middleRight = middleIndex === rightIndex;
    }
  }

  // reassign previous indicies for next round
  previousLeft = leftIndex;
  previousMiddle = middleIndex;
  previousRight = rightIndex;

  // use random indicies to get random shopping item
  leftShoppingItem = shoppingItems[leftIndex];
  middleShoppingItem = shoppingItems[middleIndex];
  rightShoppingItem = shoppingItems[rightIndex];

  // setting names in dom
  leftItemName.textContent = leftShoppingItem.name;
  middleItemName.textContent = middleShoppingItem.name;
  rightItemName.textContent = rightShoppingItem.name;

  // setting src of imgs in dom
  leftItemImg.src = leftShoppingItem.imgSrc;
  middleItemImg.src = middleShoppingItem.imgSrc;
  rightItemImg.src = rightShoppingItem.imgSrc;
};

// function that handles clicks on item images
const handlePreferredClicks = (e) => {
  console.log(`You clicked this target element id ${e.target.id}`);

  if (totalClicks < maxClicks) {
    const itemId = e.target.id;

    const idOptions = ["left-img", "middle-img", "right-img"];

    // if shopping item image is clicked
    if (idOptions.includes(itemId)) {
      // increment times shown for shopping items
      leftShoppingItem.timesShown++;
      middleShoppingItem.timesShown++;
      rightShoppingItem.timesShown++;
      // if left item was clicked
      if (idOptions.indexOf(itemId) === 0) {
        leftShoppingItem.clicks++;
        console.log(
          `Left item ${leftShoppingItem.name} has ${determinePlural(
            leftShoppingItem.clicks,
            "clicks"
          )} so far`
        );
        // if middle item was clicked
      } else if (idOptions.indexOf(itemId) === 1) {
        middleShoppingItem.clicks++;
        console.log(
          `Middle item ${middleShoppingItem.name} has ${determinePlural(
            middleShoppingItem.clicks,
            "clicks"
          )} so far`
        );
        // if right item was clicked
      } else {
        rightShoppingItem.clicks++;
        console.log(
          `Right item ${rightShoppingItem.name} has ${determinePlural(
            rightShoppingItem.clicks,
            "clicks"
          )} so far`
        );
      }
      // increment total clicks
      totalClicks++;
      console.log(
        `Left item ${leftShoppingItem.name} has been shown ${determinePlural(
          leftShoppingItem.timesShown,
          "times"
        )}.\nMiddle item ${
          middleShoppingItem.name
        } has been shown ${determinePlural(
          middleShoppingItem.timesShown,
          "times"
        )} times.\nRight item ${
          rightShoppingItem.name
        } has been shown ${determinePlural(
          rightShoppingItem.timesShown,
          "times"
        )} times.`
      );
      if (totalClicks !== maxClicks) selectPreferredItem();
    }
  }

  if (totalClicks === maxClicks) {
    choiceContainer.removeEventListener("click", handlePreferredClicks);
    console.log(`You picked ${maxClicks} items, thanks!`);
    alert(`You picked ${maxClicks} items, thanks!`);

    aside.append(resultsButton);

    resultsButton.addEventListener("click", listResults);
  }
};

const updateLocalStorage = () => {
  console.log("updating local storage");
  const itemArr = JSON.stringify(shoppingItems);
  localStorage.setItem("storedData", itemArr);
};

const getLocalStorage = () => {
  console.log("get data from local storage");
  const oldData = localStorage.getItem("storedData");
  const oldItemData = JSON.parse(oldData);
  if (oldItemData !== null) {
    shoppingItems = oldItemData;
  }
  // listResults();
};

getLocalStorage();
choiceContainer.addEventListener("click", handlePreferredClicks);
selectPreferredItem();
