"use strict";
const startButton = document.querySelector(".start-button");
const colorOne = document.querySelector(".color1");
const colorTwo = document.querySelector(".color2");
const colorThree = document.querySelector(".color3");
const youWon = document.querySelector(".you-won");
const youLost = document.querySelector(".you-lost");
const instructions = document.querySelector(".instructions");
const colorBlock = document.querySelector(".color-block");
const lostAnswer = document.querySelector(".answer");
const yourAnswer = document.querySelector(".your-answer");
const body = document.querySelector("body");
const yourScore = document.querySelector(".score");
const yourHighscore = document.querySelector(".high-score");
const yourPercentage = document.querySelector(".percentage");
const yourFraction = document.querySelector(".fraction");
let colorCorrect = "";
let colorGroup = "";
let score = 0;
let highscore = 0;
let totalCorrect = 0;
let totalGoes = 0;
yourScore.innerText = "Your score is: " + score;
yourHighscore.innerText = "Your highscore is: " + highscore;
yourPercentage.innerText = "Your correct percentage is: 0%";
yourFraction.innerText = totalCorrect + "/" + totalGoes;


colorOne.addEventListener("click", answer);
colorTwo.addEventListener("click", answer);
colorThree.addEventListener("click", answer);
startButton.addEventListener("click", randomiseColor);
function randomiseColor(){
    let x = Math.floor(Math.random() * 3) + 1;
    if (x === 1) startGame(colorOne,colorTwo,colorThree);
    else if (x === 2) startGame(colorTwo,colorOne,colorThree);
    else startGame(colorThree,colorTwo,colorOne);
}

function startGame(colorN,colorN2,colorN3){
    colorOne.classList.remove("hidden");
    colorTwo.classList.remove("hidden");
    colorThree.classList.remove("hidden");
    youLost.classList.add("hidden");
    youWon.classList.add("hidden");
    startButton.classList.add("hidden");
    instructions.classList.remove("hidden");
    lostAnswer.classList.add("hidden");
    yourAnswer.classList.add("hidden");
    startButton.innerText = "next";
    colorGroup = Math.floor(Math.random() * (colors.length));
    colorCorrect = Math.floor(Math.random() * (colors[colorGroup].length));
    colorBlock.classList.remove("hidden");
    colorN.innerText = colors[colorGroup][colorCorrect];
    let colorIncorrect = colorCorrect;
    while (colorIncorrect === colorCorrect) {
        colorIncorrect = Math.floor(Math.random() * (colors[colorGroup].length));
    }
    colorN2.innerText = colors[colorGroup][colorIncorrect];
    let colorIncorrect2 = colorIncorrect;
    while (colorIncorrect2 === colorIncorrect || colorIncorrect === colorCorrect) {
        colorIncorrect = Math.floor(Math.random() * (colors[colorGroup].length));
    }
    colorN3.innerText = colors[colorGroup][colorIncorrect];
    applyColorToElement(colorGroup,colorCorrect);
    colorBlock.style.backgroundColor = colors[colorGroup][colorCorrect];

     if (lightColors.includes(colors[colorGroup])) {
        body.style.backgroundColor = "black";
        youWon.classList.add("white-text");
        youLost.classList.add("white-text");
        instructions.classList.add("white-text");
        youWon.classList.remove("black-text");
        youLost.classList.remove("black-text");
        instructions.classList.remove("black-text");
        colorOne.style.backgroundColor = "black";
        colorTwo.style.backgroundColor = "black";
        colorThree.style.backgroundColor = "black";
    } else {
        body.style.backgroundColor = "white";
        youWon.classList.add("black-text");
        youLost.classList.add("black-text");
        instructions.classList.add("black-text");
        youWon.classList.remove("white-text");
        youLost.classList.remove("white-text");
        instructions.classList.remove("white-text");
        colorOne.style.backgroundColor = "white";
        colorTwo.style.backgroundColor = "white";
        colorThree.style.backgroundColor = "white";
    }
    colorOne.classList.remove("hidden");
    colorTwo.classList.remove("hidden");
    colorThree.classList.remove("hidden");
}

function answer(){
    let correctAnswer = colors[colorGroup][colorCorrect];
    colorOne.classList.add("hidden");
    colorTwo.classList.add("hidden");
    colorThree.classList.add("hidden");
    colorBlock.classList.add("hidden");
    startButton.classList.remove("hidden");
    instructions.classList.add("hidden");
    if (event.target.innerText === correctAnswer) {
        youWon.classList.remove("hidden");
        score += 1;
        totalCorrect += 1;
        totalGoes += 1;
        yourScore.innerText = "Your score is: " + score;
        if (score > highscore) highscore = score;
        yourHighscore.innerText = "Your highscore is: " + highscore;
        yourFraction.innerText = totalCorrect + "/" + totalGoes;
        yourPercentage.innerText = "Your correct percentage is: " + ((totalCorrect / totalGoes) * 100).toFixed(2) + "%";
    } else {
        youLost.classList.remove("hidden");
        yourAnswer.innerText = "You put: " + event.target.innerText;
        lostAnswer.innerText = "The answer was: " + correctAnswer;
        lostAnswer.style.color = correctAnswer;
        yourAnswer.style.color = event.target.innerText
        lostAnswer.classList.remove("hidden");
        yourAnswer.classList.remove("hidden");
        score = 0;
        totalGoes += 1;
        yourScore.innerText = "Your score is: " + score;
        yourFraction.innerText = totalCorrect + "/" + totalGoes;
        yourPercentage.innerText = "Your correct percentage is: " + ((totalCorrect / totalGoes) * 100).toFixed(2) + "%";
    }
}

function applyColorToElement(colorGroup,colorCorrect){
    const paragraphs = [colorOne, colorTwo, colorThree, instructions, yourScore, yourHighscore, yourFraction, yourPercentage, youLost, youWon];
    paragraphs.forEach(el => el.style.color = colors[colorGroup][colorCorrect]);
}