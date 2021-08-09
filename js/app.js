// Global variables
const choiceContainer = document.querySelector("#choices");
const aside = document.querySelector("aside");
// const finalTally = document.querySelector("#final-tally");
const resultsButton = document.createElement("button");
resultsButton.textContent = "View Results";
const maxClicks = 10;
let totalClicks = 0;
let leftShoppingItem = null;
let middleShoppingItem = null;
let rightShoppingItem = null;

// Helper functions
const randomize = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const determinePlural = (num, string) => {
  if (num === 1) return `${num} ${string.slice(0, -1)}`;
  return `${num} ${string}`;
};

const listResults = () => {
  const header = document.createElement("h3");
  header.textContent = "Final Results";
  const list = document.createElement("ol");
  for (const item of shoppingItems) {
    let score = document.createElement("li");
    // score.textContent = `${item.name} had ${item.clicks} votes, and was seen ${item.timesShown} times.`;
    score.textContent = `${item.name} had ${determinePlural(
      item.clicks,
      "votes"
    )} , and was seen ${determinePlural(item.timesShown, "times")}.`;
    list.append(score);
  }
  aside.append(header);
  aside.append(list);
  resultsButton.removeEventListener("click", listResults);
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
const shoppingItems = [
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

// function that sets items for three main divs
const selectPreferredItem = () => {
  const leftItemImg = document.querySelector("#left-img");
  const middleItemImg = document.querySelector("#middle-img");
  const rightItemImg = document.querySelector("#right-img");
  const leftItemName = document.querySelector("#left-name");
  const middleItemName = document.querySelector("#middle-name");
  const rightItemName = document.querySelector("#right-name");
  // let [leftIndex, middleIndex, rightIndex] = [
  //   randomize(shoppingItems),
  //   randomize(shoppingItems),
  //   randomize(shoppingItems),
  // ];
  let leftIndex = randomize(shoppingItems);
  let middleIndex = randomize(shoppingItems);
  let rightIndex = randomize(shoppingItems);

  console.log(leftIndex);
  console.log(middleIndex);
  console.log(rightIndex);

  while (
    leftIndex === middleIndex ||
    leftIndex === rightIndex ||
    middleIndex === rightIndex
  ) {
    // [leftIndex, middleIndex, rightIndex] = [
    //   randomize(shoppingItems),
    //   randomize(shoppingItems),
    //   randomize(shoppingItems),
    // ];
    leftIndex = randomize(shoppingItems);
    middleIndex = randomize(shoppingItems);
    rightIndex = randomize(shoppingItems);
  }

  leftShoppingItem = shoppingItems[leftIndex];
  middleShoppingItem = shoppingItems[middleIndex];
  rightShoppingItem = shoppingItems[rightIndex];

  leftItemName.textContent = leftShoppingItem.name;
  middleItemName.textContent = middleShoppingItem.name;
  rightItemName.textContent = rightShoppingItem.name;

  leftItemImg.src = leftShoppingItem.imgSrc;
  middleItemImg.src = middleShoppingItem.imgSrc;
  rightItemImg.src = rightShoppingItem.imgSrc;
  // console.log(leftIndex);
  // console.log(middleIndex);
  // console.log(rightIndex);
};

// function that handles clicks on item images
const handlePreferredClicks = (e) => {
  console.log(`You clicked this target element id ${e.target.id}`);

  if (totalClicks < maxClicks) {
    const itemId = e.target.id;

    leftShoppingItem.timesShown++;
    middleShoppingItem.timesShown++;
    rightShoppingItem.timesShown++;

    console.log(
      `Left item ${leftShoppingItem.name} has been shown ${leftShoppingItem.timesShown} times.\nMiddle item ${middleShoppingItem.name} has been shown ${middleShoppingItem.timesShown} times.\nRight item ${rightShoppingItem.name} has been shown ${rightShoppingItem.timesShown} times.`
    );

    const idOptions = ["left-img", "middle-img", "right-img"];

    if (idOptions.includes(itemId)) {
      if (idOptions.indexOf(itemId) === 0) {
        leftShoppingItem.clicks++;
        console.log(
          `Left item ${leftShoppingItem.name} has ${leftShoppingItem.clicks} clicks so far`
        );
      } else if (idOptions.indexOf(itemId) === 1) {
        middleShoppingItem.clicks++;
        console.log(
          `Middle item ${middleShoppingItem.name} has ${middleShoppingItem.clicks} clicks so far`
        );
      } else {
        rightShoppingItem.clicks++;
        console.log(
          `Right item ${rightShoppingItem.name} has ${rightShoppingItem.clicks} clicks so far`
        );
      }
      selectPreferredItem();
    }
  }

  totalClicks++;
  if (totalClicks === maxClicks) {
    choiceContainer.removeEventListener("click", handlePreferredClicks);
    console.log(`You picked ${maxClicks} items, thanks!`);
    alert(`You picked ${maxClicks} items, thanks!`);

    // const resultsButton = document.createElement("button");
    // resultsButton.textContent = "View Results";
    aside.append(resultsButton);

    resultsButton.addEventListener("click", listResults);

    // resultsButton.addEventListener("click", (e) => {
    //   for (const item of shoppingItems) {
    //     let score = document.createElement("li");
    //     // score.textContent = `${item.name} had ${item.clicks} votes, and was seen ${item.timesShown} times.`;
    //     score.textContent = `${item.name} had ${determinePlural(
    //       item.clicks,
    //       "votes"
    //     )} , and was seen ${determinePlural(item.timesShown, "times")}.`;
    //     finalTally.append(score);
    //   }
    // });
    // for (const item of shoppingItems) {
    //   let score = document.createElement("li");
    //   // score.textContent = `${item.name} had ${item.clicks} votes, and was seen ${item.timesShown} times.`;
    //   score.textContent = `${item.name} had ${determinePlural(
    //     item.clicks,
    //     "votes"
    //   )} , and was seen ${determinePlural(item.timesShown, "times")}.`;
    //   finalTally.append(score);
    // }
  }
};

choiceContainer.addEventListener("click", handlePreferredClicks);
selectPreferredItem();
