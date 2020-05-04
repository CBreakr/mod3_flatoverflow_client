console.log('hello log in world')

const loginInput = document.querySelector('#username-login-input')
const loginBtn = document.querySelector('#login-btn')
let hasAccount = false

loginBtn.addEventListener('click', event => {
  hasAccount = false

  fetch(testingEndpoint)
  .then(resp => resp.json())
  .then(users => {
    users.forEach(validateUser)

    hasAccount ? alert(`Welcome back ${loginInput.value}`) : alert('you don\'t have an account')

    loginInput.value = ''
  })
})

function validateUser(userObj) {
  if (loginInput.value === userObj.name) {
    hasAccount = true
  } 
}
