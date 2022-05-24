import Notiflix from 'notiflix';

const formRef = document.querySelector(`form`)

formRef.addEventListener("submit", onSubmit)

function onSubmit(event) {
  event.preventDefault()

  const firstDelay = Number(event.currentTarget.elements.delay.value);
  const delayStep = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  const startDelay = firstDelay - delayStep;
  const delaysArray = createDelaysArray(amount, startDelay, delayStep)

  runAllPromises(delaysArray)
}

function createDelaysArray(amount, startDelay, delayStep) {
  const delaysArray = [];
  for (let i = 1; i <= amount; i += 1) {
    startDelay += delayStep
    delaysArray.push(startDelay)
  }
  return delaysArray
}

function runAllPromises(delaysArray) {
  delaysArray.map((delay, index) => {
    createPromise(index + 1, delay)
      .then(res => { Notiflix.Notify.success(res); console.log(res) })
      .catch(err => { Notiflix.Notify.failure(err); console.log(err) })
  })
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
      }
      else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)
  })
}