console.log('registration_form.js loaded')

const usersEndpoint = 'https://flatoverflow-api.herokuapp.com/users'
const form = document.querySelector('#user-registration-form')
const usernameInput = document.querySelector('#username-input')
const dropdown = document.querySelector('#is_coach-dropdown')

const testingEndpoint = 'http://localhost:3000/users' 


form.addEventListener('submit', event => {
  event.preventDefault()

  const username = usernameInput.value
  const isCoach = dropdown.value

  const user = {
    name: username,
    is_coach: parseBool(isCoach)
  }

  postUser(user)
  
})

function parseBool(string) {
  return string === "true" ? true : false
}

function postUser(userObj) {
  fetch(testingEndpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(userObj)
  })
  .then(resp => resp.json())
  .then(console.log)
}