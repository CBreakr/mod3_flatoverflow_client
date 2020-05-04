console.log('hello form world')

const questionForm = document.querySelector('#question-form')
const titleInput = document.querySelector('#title-input')
const contentInput = document.querySelector('#content-input')

const questionEndpoint = 'http://localhost:3000/questions'
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

questionForm.addEventListener('submit', event => {
  event.preventDefault()

  if (currentUser) {
    const question = {
      user_id: currentUser.id,
      title: titleInput.value,
      text: contentInput.value
    }

    postQuestion(question)
  } else {
    alert('need to be logged in to ask a question')
    questionForm.reset()
  }


})

function postQuestion(question) {
  fetch(questionEndpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(question)
  })
  .then(resp => resp.json())
  .then(console.log)
  questionForm.reset()
}