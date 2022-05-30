"use strict";

const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const start = document.getElementById("start");
const cease = document.getElementById("cease");
const reset = document.getElementById("reset");
const stats = document.getElementById("action");
const progress = document.getElementById("progress");

let passSeconds = 60; //60
let remainMinutes = 24;
let timeoutId;
let numCompleted = 0;
let condition;

const pomodoro = () => {
  passSeconds--;
  if (passSeconds < 0) {
    remainMinutes--;
    passSeconds = 59; //59
  }

  if (remainMinutes < 0) {
    numCompleted++;
    if (numCompleted % 6 == 0) {
      remainMinutes = 29; //29
      stats.innerText = "30分休憩";
      console.log(stats.innerText);
      endSound.play();
    } else if (numCompleted % 2 != 0) {
      remainMinutes = 4; //4
      stats.innerText = "5分休憩";
      console.log(stats.innerText);

      endSound.play();
    } else {
      remainMinutes = 24; //24
      stats.innerText = "作業中";
      console.log(stats.innerText);
      startSound.play();
      const newDiv = document.createElement("div");
      newDiv.classList.add("numCompleted");
      progress.appendChild(newDiv);
    }
  }
  minutes.textContent = String(remainMinutes).padStart(2, 0);
  seconds.textContent = String(passSeconds).padStart(2, 0);

  timeoutId = setTimeout(() => {
    pomodoro();
  }, 1000);
};

function setButtonStateInitial() {
  start.classList.remove("inactive");
  cease.classList.add("inactive");
  reset.classList.add("inactive");
}

function setButtonStateRunning() {
  start.classList.add("inactive");
  cease.classList.remove("inactive");
  reset.classList.add("inactive");
}

function setButtonStateStopped() {
  start.classList.remove("inactive");
  cease.classList.add("inactive");
  reset.classList.remove("inactive");
}

const startSound = new Audio("../assets/start-sound.mp3");
const endSound = new Audio("../assets/end-sound.mp3");

setButtonStateInitial();

start.addEventListener("click", () => {
  if (start.classList.contains("inactive") === true) {
    return;
  }
  stats.innerText = "作業中";
  setButtonStateRunning();
  pomodoro();
});

cease.addEventListener("click", () => {
  if (cease.classList.contains("inactive") === true) {
    return;
  }
  setButtonStateStopped();
  stats.textContent = "中断";
  clearTimeout(timeoutId);
});

reset.addEventListener("click", () => {
  if (reset.classList.contains("inactive") === true) {
    return;
  }
  setButtonStateInitial();
  minutes.textContent = "25";
  seconds.textContent = "00";
  numCompleted = 0;
});
