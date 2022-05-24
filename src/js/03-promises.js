import Notiflix from 'notiflix';

const formRef = document.querySelector(`form`)

formRef.addEventListener("submit", onSubmit)

function onSubmit(event) {
  event.preventDefault()

  const firstDelay = Number(event.currentTarget.elements.delay.value);
  const delayStep = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  const delaysArray = createDelaysArray(firstDelay, delayStep, amount)

  runAllPromises(delaysArray)
}

function createDelaysArray(firstDelay, delayStep, amount) {
  const delaysArray = [];
  for (let i = 0; i < amount; i += 1) {
    let delay = firstDelay + delayStep * i
    delaysArray.push(delay)
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