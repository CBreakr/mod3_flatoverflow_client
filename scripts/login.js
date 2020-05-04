console.log('hello log in world')

const loginInput = document.querySelector('#username-login-input')
const loginBtn = document.querySelector('#login-btn')
let hasAccount;

loginBtn.addEventListener('click', event => {
  fetch(testingEndpoint)
  .then(resp => resp.json())
  .then(users => {
    users.forEach(validateUser)

    hasAccount ? alert(`Welcome back ${loginInput.value}`) : alert('you don\'t have an account')
  })
})

function validateUser(userObj) {
  if (loginInput.value === userObj.name) {
    hasAccount = true
  }
}
