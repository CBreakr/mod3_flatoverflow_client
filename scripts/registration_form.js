console.log('registration_form.js loaded')

// const usersEndpoint = 'https://flatoverflow-api.herokuapp.com/users'
const registrationForm = document.querySelector('#user-registration-form')
// const usersEndpoint = 'https://flatoverflow-api.herokuapp.com/users'
const form = document.querySelector('#user-registration-form')

const usernameInput = document.querySelector('#username-input')
const dropdown = document.querySelector('#is_coach-dropdown')

const userEndpoint = `${baseEndpoint}/users` 
console.log("userEndpoint", userEndpoint);


registrationForm.addEventListener('submit', event => {
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
  fetch(userEndpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(userObj)
  })
  .then(resp => resp.json())
  .then(data => {
    registrationForm.reset();
    login(data);
  })
  .catch(err => console.log("err", err));
}