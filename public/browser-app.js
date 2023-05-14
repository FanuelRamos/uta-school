const formDOM = document.querySelector('.task-form')
const taskInputNameDOM = document.querySelector('.task-input-name')
const taskInputPhoneDOM = document.querySelector('.task-input-phone')
const taskInputEmailDOM = document.querySelector('.task-input-email')
const formAlertDOM = document.querySelector('.form-alert')

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputNameDOM.value
  const email = taskInputEmailDOM.value
  const phone = taskInputPhoneDOM.value

  try {
    await axios.post('/api/student', { name, phone, email })
    taskInputNameDOM.value = ''
    taskInputEmailDOM.value = ''
    taskInputPhoneDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'Parabens ' + name + ', Sua Inscrição foi feita com Sucesso! Verifique a caixa de entrada do seu E-mail.'
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = 'Houve um erro inesperado, Por Favor tente novamente!'
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 7000)
})
