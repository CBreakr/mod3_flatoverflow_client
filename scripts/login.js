console.log('login.js loaded')

const loginInput = document.querySelector('#username-login-input')
const loginBtn = document.querySelector('#login-btn')
let currentUser = null

loginBtn.addEventListener('click', event => {
  currentUser = null

  fetch(testingEndpoint)
  .then(resp => resp.json())
  .then(users => {
    let match //= users.filter(validateUser)
    
    users.forEach(user => {
      if (loginInput.value === user.name){
        match = user
      }
    })

    if (match) {
      currentUser = match
      showMainQuestionView()
      getQuestions()
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
