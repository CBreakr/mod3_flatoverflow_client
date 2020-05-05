console.log('question_form file')

const questionForm = document.querySelector('#question-form')
const titleInput = document.querySelector('#title-input')
const contentInput = document.querySelector('#content-input')
const questionView = document.querySelector('#question-view')
const tagsInput = document.querySelector('#tags-input')


const questionEndpoint = 'http://localhost:3000/questions'
const tagsEndpoint = 'http://localhost:3000/tags'
const questionTagsEndpoint = 'http://localhost:3000/question_tags'
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

let createdQuestion;
let createdTags = []

questionForm.addEventListener('submit', event => {
  event.preventDefault()

  if (currentUser) {
    const question = {
      user_id: currentUser.id,
      title: titleInput.value,
      text: contentInput.value
    }

    postTags(parseTags(tagsInput.value))
    postQuestion(question)
    setTimeout(postQuestionTags, 250)

  } else {
    alert('You need to be logged in to ask a question')
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
  .then(questionObj => {
    createdQuestion = questionObj
    renderQuestion(questionObj)
  })
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

  questionView.innerHTML = ''
  questionView.append(h1, p, button)
}

function parseTags(tags) {
  let strings = tags.split(/\W/)
  
  let filteredTags = strings.filter(string => {
    return Boolean(string) === true
  })

  let tagObjects = filteredTags.map(tag => {
    return {text: `${'#'.concat(tag)}`}
  })

  return tagObjects
}

function postTags(tags) {
  tags.forEach(tag => {
    fetch(tagsEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(tag)
    })
    .then(resp => resp.json())
    .then(tag => {
      createdTags.push(tag)
    })
  })
}

function postQuestionTags() {
  createdTags.forEach(tagObj => {
    fetch(questionTagsEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        tag_id: tagObj.id,
        question_id: createdQuestion.id
      })
    })
  })
}
