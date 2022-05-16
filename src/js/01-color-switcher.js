const startButton = document.querySelector(`button[data-start]`)
const stopButton = document.querySelector(`button[data-stop]`)
let timerId = null;

startButton.addEventListener("click", startFn)
stopButton.addEventListener("click", stopFn)

function startFn() {
    timerId = setInterval(chengeBgColor, 1000);
    startButton.disabled = true
}

function stopFn() {
    clearInterval(timerId);
    startButton.disabled = false

}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function chengeBgColor() {
    document.body.style.backgroundColor = getRandomHexColor()
}