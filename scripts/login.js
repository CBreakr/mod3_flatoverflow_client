console.log('login.js loaded')

const loginInput = document.querySelector('#username-login-input')
const loginBtn = document.querySelector('#login-btn')
let currentUser = null

const loginForm = document.getElementById("login_form");

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  currentUser = null

  fetch(userEndpoint)
  .then(resp => resp.json())
  .then(users => {
    let match //= users.filter(validateUser)

    console.log("users");
    
    users.forEach(user => {
      if (loginInput.value === user.name){
        match = user
      }
    })

    if (match) {
      currentUser = match

      //used to keep track of user for upvote clicks
      userTracker.user = match

      getQuestions()
      console.log(currentUser)
    } else { 
      alert('you don\'t have an account')
    }

    // loginInput.value = ''
    loginForm.reset();
  })
})

function validateUser(userObj) {
  return loginInput.value === userObj.name
}
