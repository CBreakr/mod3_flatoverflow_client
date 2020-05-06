console.log('edit_answer_question.js loaded')

function viewQuestion(event){
  const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}

function displayQuestionDetails(questionDetail){
  questionView.innerHTML = `
    <h1>Title: ${questionDetail.title}</h1>
    <p id="question-content-text">Content: ${questionDetail.text}</p>
    <br>
    <div id="question-comments">
    </div>
  `
  let contentPTag = questionView.children[2]

  if (questionDetail.update_note) {
    let updateNotePTag = document.createElement('p')
    updateNotePTag.id = 'update-note-text'
    updateNotePTag.innerText = `Update Note: ${questionDetail.update_note}`
    questionView.insertBefore(updateNotePTag, contentPTag)
  }

  questionDetail.reverse_comments.forEach(comment => {
    let commentPTag = document.createElement('p')
    commentPTag.innerText = `Comment created at ${comment.created_at}: ${comment.text}`
    questionView.append(commentPTag)
  })

  let addNoteBtn = document.createElement('button')
  addNoteBtn.id = 'add-update-note-btn'
  let br = document.createElement('br')
  let upvoteBtn = document.createElement('button')
  upvoteBtn.id = 'upvote-btn'

  let upvoteCounterPTag = document.createElement('p')
  upvoteCounterPTag.id = 'upvote-counter'
  upvoteCounterPTag.innerText = `upvote: ${questionDetail.question_upvotes.length}`
  upvoteBtn.innerText = '^'

  addNoteBtn.innerText = 'Add Update Note'
  questionView.append(br, addNoteBtn, upvoteCounterPTag, upvoteBtn)

  showQuestionDetailView()
}

function answerQuestion(event) {
  const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}

questionView.addEventListener('click', event => {
  if (event.target.innerText === 'Add Update Note') {
    let addNoteBtn = document.getElementById('add-update-note-btn')
    addNoteBtn.insertAdjacentElement("beforebegin", createUpdateNoteTextArea())
    addNoteBtn.style.display = 'none'
  } 
  
  if (event.target.innerText === 'Update Note') {
    let updateNoteSection = document.getElementById('update-note-text')
    let textarea = document.getElementById('update-note-textarea')
    let updateNoteValue = textarea.value

    patchUpdateNote(currentQuestion, updateNoteValue)
    
    textarea.value = ''
  
    renderUpdateNote(updateNoteValue)
  }
})

function createUpdateNoteTextArea() {
  let div = document.createElement('div')
  div.id = 'update-note-form'

  let h3 = document.createElement('h3')
  h3.innerText = 'Update your question'

  let br = document.createElement('br')
  let br2 = document.createElement('br')

  let textarea = document.createElement('textarea')
  textarea.id = 'update-note-textarea'
  textarea.name = 'text'
  textarea.rows = '4'
  textarea.cols = '50'
  textarea.placeholder = 'Add your note'

  let submitBtn = document.createElement('button')
  submitBtn.innerText = 'Update Note'

  div.append(h3, br, textarea, br2, submitBtn)

  return div
}

function patchUpdateNote(question, updateNote) {
  question.update_note = updateNote
  fetch(`${questionEndpoint}/${question.id}`, {
    method: 'PATCH', 
    headers, 
    body: JSON.stringify(question)
  })
  .then(resp => resp.json())
  .then(console.log)
}

function renderUpdateNote(text) {
  let updateNotePTag = document.getElementById('update-note-text')

  if (updateNotePTag) {
    updateNotePTag.innerText = `Update Note: ${text}`
  } else {
    let questionContent = document.getElementById('question-content-text')
    let updateNotePTag = document.createElement('p')
    updateNotePTag.id = 'update-note-text'
    updateNotePTag.innerText = `Update Note: ${text}`
    questionContent.insertAdjacentElement("afterend", updateNotePTag)
  }
}
