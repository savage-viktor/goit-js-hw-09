import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';


Notiflix.Notify.init({
    width: '280px',
    position: 'center-center', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
});


const daysField = document.querySelector(".value[data-days]")
const hoursField = document.querySelector(".value[data-hours]")
const minutesField = document.querySelector(".value[data-minutes]")
const secondsField = document.querySelector(".value[data-seconds]")
const startButton = document.querySelector("button[data-start]")


let targetDate;
let startDate;
let oddsDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        targetDate = new Date(selectedDates[0]).getTime()
    },
};

function startFn() {
    startDate = new Date().getTime()

    if (targetDate - startDate <= 0) {
        Notiflix.Notify.failure('Please choose a date in the future');
        return
    }


    const tamerId = setInterval(() => {

        startDate = new Date().getTime()
        oddsDate = targetDate - startDate

        if (oddsDate < 0) {
            Notiflix.Notify.success('Time expired');
            clearInterval(tamerId)
            return
        }

        const { days, hours, minutes, seconds } = convertMs(oddsDate)

        daysField.textContent = days;
        hoursField.textContent = hours;
        minutesField.textContent = minutes;
        secondsField.textContent = seconds;
    }, 1000)
}

startButton.addEventListener("click", startFn)

flatpickr("#datetime-picker", options)

options.onClose

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}