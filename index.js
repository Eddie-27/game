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
const timedStart = document.querySelector(".timed-start");
const time = document.querySelector(".time");
const timedHighscore = document.querySelector(".timed-high-score");
const finalScore = document.querySelector(".final-score");
const quit = document.querySelector(".quit");
const impossibleButton = document.querySelector(".impossible-start");
const yourImpossibleHighScore = document.querySelector(".impossible-high-score");
const comicSans = document.querySelector(".comic-sans");
const buttons = document.querySelectorAll(".buttons");
const color123 = document.querySelectorAll(".colors");
let colorCorrect = "";
let colorGroup = "";
let score = 0;
let highscore = 0;
let timedModeHighscore = 0;
let totalCorrect = 0;
let totalGoes = 0;
let count = false;
let interval = 0;
let timedMode = false;
let impossibleMode = false;
let impossibleHighScore = 0;
yourScore.innerText = "Your score is: " + score;
yourHighscore.innerText = "Your highscore is: " + highscore;
yourPercentage.innerText = "Your correct percentage is: 0%";
yourFraction.innerText = totalCorrect + "/" + totalGoes;
colorOne.addEventListener("click", answer);
colorTwo.addEventListener("click", answer);
colorThree.addEventListener("click", answer);
startButton.addEventListener("click", randomiseColor);
timedStart.addEventListener("click", randomiseColor);
comicSans.addEventListener("click", sansify);
quit.addEventListener("click", quitToMainMenu);
impossibleButton.addEventListener("click", randomiseColor);
body.style.backgroundColor = "black";


function randomiseColor(){
    if (event.target.innerText === "play timed mode" || event.target.innerText === "retry" || timedMode === true) {
        if (count === false) timer();
        instructions.innerText = "Get as many correct as you can in 30 seconds";
        timedMode = true;
    } else if (event.target.innerText === "play impossible mode" || event.target.innerText === "next impossible level" || impossibleMode === true) {      
        timedMode = false;
        impossibleMode = true;
    }
    let x = Math.floor(Math.random() * 3) + 1;
    if (x === 1) startGame(colorOne,colorTwo,colorThree);
    else if (x === 2) startGame(colorTwo,colorOne,colorThree);
    else startGame(colorThree,colorTwo,colorOne);
}

function timer(){
    count = 30;
    interval = setInterval(() => {
        count -= 0.1; 
        time.innerText = count.toFixed(1);
        if (count.toFixed(1) == 0.0) {
            clearInterval(interval);
            timeup();
        }
    }, 100);
}

function startGame(colorN,colorN2,colorN3){
    if (timedMode === true) {
        removeHidden([timedHighscore,time]);
    } else if (impossibleMode === true) {
        removeHidden([yourImpossibleHighScore]);
    } else {
        removeHidden([yourHighscore]);
    }
    removeHidden([quit,yourPercentage,yourScore,yourFraction,colorOne,colorTwo,colorThree,colorBlock,instructions]);
    addHidden([timedStart,finalScore,youLost,youWon,startButton,impossibleButton,lostAnswer,yourAnswer,comicSans]);
    startButton.innerText = "next";
    setColors(colorN,colorN2,colorN3);
    applyColorToElement(colorGroup,colorCorrect);
    backgroundChange();
}

function setColors(colorN,colorN2,colorN3) {
    if (impossibleMode === true) {
        colorGroup = colors.length-1;
    } else {
        colorGroup = Math.floor(Math.random() * (colors.length-1));
    }
    colorCorrect = Math.floor(Math.random() * (colors[colorGroup].length));
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
}

function backgroundChange(){
    if (lightColors.includes(colors[colorGroup]) || lightGreys.includes(colors[colorGroup][colorCorrect])) {
        body.style.backgroundColor = "black";
        colorOne.style.backgroundColor = "black";
        colorTwo.style.backgroundColor = "black";
        colorThree.style.backgroundColor = "black";
    } else {
        body.style.backgroundColor = "white";
        colorOne.style.backgroundColor = "white";
        colorTwo.style.backgroundColor = "white";
        colorThree.style.backgroundColor = "white";
    }
}

function answer(){
    let correctAnswer = colors[colorGroup][colorCorrect];
    addHidden([colorOne,colorTwo,colorThree,colorBlock,instructions]);
    removeHidden([startButton]);
    if (event.target.innerText === correctAnswer) {
        correct(correctAnswer);
    } else {
       incorrect(correctAnswer);
    }
}

function correct(){
    removeHidden([youWon]);
        score += 1;
        totalCorrect += 1;
        totalGoes += 1;
        yourScore.innerText = "Your score is: " + score;
        if (timedMode === false ) {
            if (impossibleMode === false) {
                if (score > highscore) highscore = score;
                yourHighscore.innerText = "Your highscore is: " + highscore;
            } else {
                if (score > impossibleHighScore) impossibleHighScore = score;
                yourImpossibleHighScore.innerText = "Your impossible highscore is: " + impossibleHighScore;
            }
        }
        yourFraction.innerText = totalCorrect + "/" + totalGoes;
        yourPercentage.innerText = "Your correct percentage is: " + ((totalCorrect / totalGoes) * 100).toFixed(2) + "%";
}

function incorrect(correctAnswer){
    yourAnswer.innerText = "You put: " + event.target.innerText;
        lostAnswer.innerText = "The answer was: " + correctAnswer;
        lostAnswer.style.color = correctAnswer;
        yourAnswer.style.color = event.target.innerText;
        removeHidden([youLost,lostAnswer,yourAnswer]);
        if (timedMode === false) score = 0;
        totalGoes += 1;
        yourScore.innerText = "Your score is: " + score;
        yourFraction.innerText = totalCorrect + "/" + totalGoes;
        yourPercentage.innerText = "Your correct percentage is: " + ((totalCorrect / totalGoes) * 100).toFixed(2) + "%";
}

function quitToMainMenu(){
    addHidden([quit,colorOne,colorTwo,colorThree,colorBlock,instructions,yourFraction,yourPercentage,yourScore,yourHighscore,timedHighscore,yourImpossibleHighScore,time,finalScore,youWon,youLost,yourAnswer,lostAnswer]);
    removeHidden([startButton,timedStart,impossibleButton]);
    body.style.backgroundColor = "black";
    score = 0;
    yourScore.innerText = "Your score is: 0";
    totalCorrect = 0;
    totalGoes = 0;
    yourFraction.innerText = "0/0";
    yourPercentage.innerText = "Your correct percentage is: 0%";
    timedMode = false;
    impossibleMode = false;
    clearInterval(interval);
    count = false;
    startButton.innerText = "play regular mode";
    timedStart.innerText = "play timed mode";
}

function timeup(){
    addHidden([colorOne,colorTwo,colorThree,colorBlock,youLost,youWon,time,yourAnswer,lostAnswer,startButton,instructions]);
    removeHidden([finalScore]);
    timedStart.innerText = "retry";
    finalScore.innerText = "You scored: " + score;
    if (score > timedModeHighscore) timedModeHighscore = score;
    timedHighscore.innerText = "Your highscore in timed mode is: " + timedModeHighscore;
    setTimeout(() => {
        removeHidden([timedStart]);
    }, 500);
    count = false;
}

function applyColorToElement(colorGroup,colorCorrect){
    const paragraphs = [colorOne, colorTwo, colorThree, instructions, yourScore, yourHighscore, yourFraction, yourPercentage, youLost, youWon, time, timedHighscore, finalScore, yourImpossibleHighScore];
    paragraphs.forEach(el => el.style.color = colors[colorGroup][colorCorrect]);
    colorBlock.style.backgroundColor = colors[colorGroup][colorCorrect];
}

function addHidden(list) {
    list.forEach(item => item.classList.add("hidden"));
}

function removeHidden (list) {
    list.forEach(item => item.classList.remove("hidden"));
}

function sansify() {
    body.classList.remove("arial");
    body.classList.add("comic-sans-ms");
    colorOne.classList.add("comic-sans-ms");
    colorTwo.classList.add("comic-sans-ms");
    colorThree.classList.add("comic-sans-ms");
    quit.classList.add("comic-sans-ms");
    startButton.classList.add("comic-sans-ms");
    timedStart.classList.add("comic-sans-ms");
    impossibleButton.classList.add("comic-sans-ms");
    comicSans.classList.add("hidden");
}