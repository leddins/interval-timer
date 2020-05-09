let sessionLength = new Date(25 * 60 * 1000);
let breakLength = new Date(5 * 60 * 1000);

let countProgress = sessionLength;
let counting;
let state = "session"

//select and fill the main display
const display = document.querySelector("#display");
display.textContent = displayTime(countProgress, 3, 8);

//select and listen to reset button
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", reset);

//select and listen to the timer circle
const circle = document.querySelector("#timer");
circle.addEventListener("click", toggleCount);
circle.classList.add(state);

//get the interval displays
const sessionDisplay = document.querySelector("#session").firstElementChild;
const breakDisplay = document.querySelector("#break").firstElementChild;

//Listeners for the up and down buttons
const sessionIncrement = document.querySelector("#session > .increment");
sessionIncrement.firstElementChild.addEventListener("click", sessionUp);
sessionIncrement.lastElementChild.addEventListener("click", sessionDown);

const breakIncrement = document.querySelector("#break > .increment");
breakIncrement.firstElementChild.addEventListener("click", breakUp);
breakIncrement.lastElementChild.addEventListener("click", breakDown);

const breakAlert = document.querySelector("#break-alert");
const sessionAlert = document.querySelector("#session-alert");

//Returns a specified part of a time string.
function displayTime(myDate, startIndex, endIndex){
  return myDate.toTimeString().slice(startIndex, endIndex);
}

//Starts and pauses the countdown
function toggleCount(){
  if (!counting){
    console.log(counting);
    circle.style.opacity = "1";
    timeset.style.opacity = ".5";
    resetButton.style.visibility = "hidden";
    startCount();
  } else {
    console.log(counting);
    circle.style.opacity = ".5";
    timeset.style.opacity = "1";
    resetButton.style.visibility = "visible";
    clearInterval(counting);
    counting = undefined;
  }
}

//Innitiate the countdown function on a 1000ms interval
function startCount(){
  console.log("starting " + state);
  circle.classList.add(state);
  counting = setInterval(countdown, 1000);
}

//This is the function to be run every second while "counting" is active.
function countdown(){
  countProgress = new Date(countProgress - 1000);
  display.textContent = displayTime(countProgress, 3, 8);
  if (display.textContent == "00:00"){
    circle.classList.remove(state);
    if (state == "session"){
      breakAlert.play();
      state = "break";
      countProgress = breakLength;
    } else if (state == "break"){
      sessionAlert.play();
      state = "session";
      countProgress = sessionLength;
    }
    clearInterval(counting);
    startCount();
  }
}

//Resets the clock to the current "sessionLength" and "breakLength".
function reset(){
  clearInterval(counting);
  countProgress = new Date(sessionLength);
  display.textContent = displayTime(countProgress, 3, 8);
  state = "session";
  counting = 1;
  circle.classList.remove("break");
  circle.classList.add("session");
  toggleCount();
}

//Increment the sessionLength.
function sessionUp(){
  sessionLength = new Date(+sessionLength + 60000);
  sessionDisplay.textContent = displayTime(sessionLength, 3, 5);
  if (state == "session"){
    countProgress = new Date(+countProgress + 60000);
    display.textContent = displayTime(countProgress, 3, 8);
  }
}
//Decrement the sessionLength.
function sessionDown(){
  sessionLength = new Date(sessionLength - 60000);
  sessionDisplay.textContent = displayTime(sessionLength, 3, 5);
  if (state == "session"){
    countProgress = new Date(countProgress - 60000);
    display.textContent = displayTime(countProgress, 3, 8);
  }
}
//Increment the breakLength.
function breakUp(){
  breakLength = new Date(+breakLength + 60000);
  breakDisplay.textContent = displayTime(breakLength, 3, 5);
  if (state == "break"){
    countProgress = new Date(+countProgress + 60000);
    display.textContent = displayTime(countProgress, 3, 8);
  }
}
//Decrement the breakLength.
function breakDown(){
  breakLength = new Date(breakLength - 60000);
  breakDisplay.textContent = displayTime(breakLength, 3, 5);
  if (state == "break"){
    countProgress = new Date(countProgress - 60000);
    display.textContent = displayTime(countProgress, 3, 8);
  }
}