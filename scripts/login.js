console.log('hello log in world')

const loginInput = document.querySelector('#username-login-input')
const loginBtn = document.querySelector('#login-btn')
let currentUser = null

loginBtn.addEventListener('click', event => {
  currentUser = null

  fetch(testingEndpoint)
  .then(resp => resp.json())
  .then(users => {
    const match = users.filter(validateUser)

    if (match.length > 0) {
      alert(`Welcome back ${loginInput.value}`)
      currentUser = match[0]
      console.log(currentUser)
     } else { 
       alert('you don\'t have an account')
     }

    loginInput.value = ''
  })
})

function validateUser(userObj) {
  return loginInput.value === userObj.name
}
