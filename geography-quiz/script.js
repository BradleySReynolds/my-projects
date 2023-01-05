`use strict`;

const startBtn = document.querySelector(".start-button");
const nextBtn = document.querySelector(".next-btn");
const submitBtn = document.querySelector(".submit-btn");

const infoContainer = document.querySelector(".info-container");
const picContainer = document.querySelector(".pic-container");

const allOptionsIpt = document.querySelectorAll(".option-input");
const option1 = document.getElementById("option1");

const scoreEle = document.querySelector(".score");
const counterEle = document.querySelector(".counter");
const correctOrWrong = document.querySelector(".correct-or-incorrect");

const i = "images/";

let score = 0,
  counter = 10,
  myAnswer,
  correct;

const countries = [
  { name: "United States", image: `${i}us.png`, flag: `${i}us-flag.png` },
  { name: "Canada", image: `${i}can.png`, flag: `${i}can-flag.png` },
  { name: "Mexico", image: `${i}mex.png`, flag: `${i}mex-flag.png` },
  { name: "Cuba", image: `${i}cuba.png`, flag: `${i}cuba-flag.png` },
  { name: "Haiti", image: `${i}haiti.png`, flag: `${i}haiti-flag.png` },
  {
    name: "United Kingdom",
    image: `${i}uk.png`,
    flag: `${i}uk-flag.png`,
  },
  { name: "Germany", image: `${i}germ.png`, flag: `${i}germ-flag.png` },
  { name: "Brazil", image: `${i}braz.png`, flag: `${i}braz-flag.png` },
  { name: "France", image: `${i}frac.png`, flag: `${i}frac-flag.png` },
  { name: "Russia", image: `${i}rus.png`, flag: `${i}rus-flag.png` },
  { name: "Nigeria", image: `${i}nige.png`, flag: `${i}nige-flag.png` },
  { name: "South Africa", image: `${i}sa.png`, flag: `${i}sa-flag.png` },
  { name: "Austrailia", image: `${i}aust.png`, flag: `${i}aust-flag.png` },
  { name: "Japan", image: `${i}jap.png`, flag: `${i}jap-flag.png` },
  { name: "China", image: `${i}cn.png`, flag: `${i}cn-flag.png` },
  { name: "South Korea", image: `${i}sk.png`, flag: `${i}sk-flag.png` },
  { name: "India", image: `${i}ind.png`, flag: `${i}ind-flag.png` },
  { name: "New Zealand", image: `${i}nz.png`, flag: `${i}nz-flag.png` },
];

startBtn.addEventListener("click", function () {
  infoContainer.style.visibility = "visible";
  startBtn.remove();
  question();
});

const generateQuestion = function (array) {
  option1.checked = "true";
  counterEle.textContent = `${counter} Remaining`;
  nextBtn.style.visibility = "hidden";
  submitBtn.style.visibility = "visible";

  let [cr, ca] = createCorrect(shuffle(array));
  console.log(cr, ca);

  let options = createOptions(array, cr);
  console.log(options);

  picContainer.innerHTML = `<div style="display: flex; justify-content:center">
                              <img src='${array[cr].image}' style="width:750px; height:500px">
                              <img src='${array[cr].flag}' style="width:150px; height:75px">
                            </div>`;

  let allOptionsLabel = document.querySelectorAll(".option");

  allOptionsLabel.forEach((ele, i) => {
    allOptionsIpt[i].value = options[i].name;
    ele.innerHTML = `${options[i].name}`;
  });

  myAnswer = options[0].name;
  correct = ca;
};

const shuffle = function (array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const createOptions = function (array, ind) {
  let options = [];
  let i = 0;
  options.push(array[ind]);
  while (i < 3) {
    if (i != array.indexOf(array[ind])) {
      options.push(array[i]);
    } else {
      options.push(array[4]);
    }
    i++;
  }

  return shuffle(options);
};

const createCorrect = function (array) {
  let correctRandom = Math.floor(Math.random() * array.length);
  let correctAnswer = array[correctRandom].name;
  return [correctRandom, correctAnswer];
};

const question = function () {
  submitBtn.style.visibility = "visible";

  generateQuestion(countries);

  allOptionsIpt.forEach((ele) => {
    ele.addEventListener("click", function () {
      myAnswer = String(ele.value);
    });
  });

  submitBtn.addEventListener("click", function () {
    if (myAnswer === correct) {
      score++;
      scoreEle.textContent = `Score: ${score}/10`;
      correctOrWrong.textContent = "Correct!";
      correctOrWrong.style.color = "green";
    } else if (myAnswer !== correct) {
      correctOrWrong.textContent = "Wrong!";
      correctOrWrong.style.color = "red";
    }
    submitBtn.style.visibility = "hidden";
    nextBtn.style.visibility = "visible";
    counter--;
  });
};

nextBtn.addEventListener("click", function () {
  nextBtn.style.visibility = "hidden";
  correctOrWrong.textContent = "Guess The Country!";
  if (counter > 0) generateQuestion(countries);
  else {
    console.log("game over");
    scoreEle.remove();
    correctOrWrong.remove();
    counterEle.textContent = `Game Over! You Scored ${score} out of 10.`;
  }
});
