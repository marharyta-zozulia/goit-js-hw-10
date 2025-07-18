
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const spans = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let timer = null;
startBtn.disabled = true;


flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([date]) {
      if (date <= new Date()) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
          });
          startBtn.disabled = true;
      } else {
        selectedDate = date;
        startBtn.disabled = false;
      }
    },
  });
  
  startBtn.addEventListener('click', () => {
    if (!selectedDate) return;
    startBtn.disabled = true;
    input.disabled = true;
  
    timer = setInterval(() => {
      const ms = selectedDate - new Date();
      if (ms <= 0) {
        clearInterval(timer);
        update({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        input.disabled = false;
        return;
      }
      update(convertMs(ms));
    }, 1000);
  });
  
  function update({ days, hours, minutes, seconds }) {
    spans.days.textContent = addLeadingZero(days);
    spans.hours.textContent = addLeadingZero(hours);
    spans.minutes.textContent = addLeadingZero(minutes);
    spans.seconds.textContent = addLeadingZero(seconds);
  }


  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }



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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  


