console.log('edit_answer_question.js loaded')

const questionDiv = document.getElementById("question-details");

function viewQuestion(event){
  const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}

function displayQuestionDetails(questionDetail){
  cleanQuestion(questionDetail);

  if(questionDetail.is_answered){
    questionDiv.className = questionDiv.className.replace("bright", " answer");
  }

  questionDiv.innerHTML = `
    <div>
    ${createUpvoteCounter(questionDetail)} &nbsp;&nbsp; <span class="title is-4">${questionDetail.title}</span>&nbsp;-&nbsp;<span class="author">${questionDetail.user.name}</span></div>
    <p id="question-content-text" class="boxed text">${questionDetail.text}</p>
    <br>
    <div id="question-comments">
    </div>
  `
  let contentPTag = questionDiv.children[2]

  if (questionDetail.update_note) {
    let updateNotePTag = document.createElement('p')
    updateNotePTag.id = 'update-note-text'
    updateNotePTag.innerText = `Update Note: ${questionDetail.update_note}`
    questionDiv.insertBefore(updateNotePTag, contentPTag)
  }

  let addNoteBtn = document.createElement('button')
  addNoteBtn.id = 'add-update-note-btn'

  let br = document.createElement('br')
  
  // let upvoteBtn = document.createElement('button')
  // upvoteBtn.id = 'upvote-btn'

  // let upvoteCounterPTag = document.createElement('p')
  // upvoteCounterPTag.id = 'upvote-counter'
  // upvoteCounterPTag.innerHTML = `
  // <span class="upvote-boxed">${questionDetail.question_upvotes.length} <span class="question-upvote"><i class="fas fa-chevron-up"></i></span></span>
  // `;
  
  addNoteBtn.innerText = 'Add Update Note'
  questionDiv.append(addNoteBtn, /*upvoteCounterPTag, upvoteBtn*/)

  showQuestionDetailView()
  renderAllComments(questionDetail.reverse_comments);
}

function createUpvoteCounter(questionDetail){
  return `<span class="upvote-boxed"><span class="upvote-counter" data-id=${questionDetail.id}>${questionDetail.question_upvotes.length}</span> <span class="question-upvote"><i class="fas fa-chevron-up"></i></span></span>`;
}

function answerQuestion(event) {
  const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}

questionDiv.addEventListener('click', event => {
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
