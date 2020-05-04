console.log('hello form world')

const questionForm = document.querySelector('#question-form')
const titleInput = document.querySelector('#title-input')
const contentInput = document.querySelector('#content-input')
const questionView = document.querySelector('#question-view')

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
  .then(renderQuestion)

  questionForm.reset()
}

function renderQuestion(questionObj) {
  const h1 = document.createElement('h1')
  h1.innerText = questionObj.title

  const p = document.createElement('p')
  p.innerText = questionObj.text

  const button = document.createElement('button')
  button.dataset.id = questionObj.id
  button.innerText = 'Add note'

  questionView.append(h1, p, button)
}
