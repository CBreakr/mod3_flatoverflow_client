console.log('edit_answer_question.js loaded')

const questionDiv = document.getElementById("question-details");

function viewQuestion(id){
  // const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}

function displayQuestionDetails(questionDetail){
  // cleanQuestion(questionDetail);

  console.log(questionDetail)

  if(questionDetail.is_answered){
    questionDiv.className = questionDiv.className.replace("bright", " answer");
  }

  questionDiv.innerHTML = `
    <div>
    ${createUpvoteCounter(questionDetail)} &nbsp;&nbsp; <span class="title is-4">${questionDetail.title}</span>&nbsp;-&nbsp;<span id="${questionDetail.user_id}"class="author">${questionDetail.user.name}</span></div>
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

  // let addNoteBtn = document.createElement('button')
  // addNoteBtn.id = 'add-update-note-btn'

  // let br = document.createElement('br')
  
  // let upvoteBtn = document.createElement('button')
  // upvoteBtn.id = 'upvote-btn'

  // let upvoteCounterPTag = document.createElement('p')
  // upvoteCounterPTag.id = 'upvote-counter'
  // upvoteCounterPTag.innerHTML = `
  // <span class="upvote-boxed">${questionDetail.question_upvotes.length} <span class="question-upvote"><i class="fas fa-chevron-up"></i></span></span>
  // `;
  
  // addNoteBtn.innerText = 'Add Update Note'
  // questionDiv.append(addNoteBtn, /*upvoteCounterPTag, upvoteBtn*/)

  //only author of the question in view can add an update note
  if (currentQuestion.user_id === currentUser.id) {
    let addNoteBtn = document.createElement('button')
    addNoteBtn.id = 'add-update-note-btn'
    addNoteBtn.innerText = 'Add Update Note'
    questionDiv.append(/*br,*/ addNoteBtn /*, upvoteCounterPTag, upvoteBtn*/)
  }

  showQuestionDetailView()
  renderAllComments(questionDetail.ordered_comments);

  // create the websocket connection
  createCommentWebsocketConnection(currentQuestion.id);
}

function createUpvoteCounter(questionDetail){
  const upvoteClass = getUpvoteClass(questionDetail.question_upvotes, "question-upvote");
  return `<span class="upvote-boxed"><span class="upvote-counter" data-id=${questionDetail.id}>${questionDetail.question_upvotes.length}</span> <span class="${upvoteClass}"><i class="fas fa-chevron-up"></i></span></span>`;
}

function answerQuestion(event) {
  const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}

//listens for submission of update note for question
questionDiv.addEventListener('click', event => {
  if (event.target.innerText === 'Add Update Note') {
    console.log('add update note btn clicked')
    let addNoteBtn = document.getElementById('add-update-note-btn')
    addNoteBtn.insertAdjacentElement("beforebegin", createUpdateNoteTextArea())
    addNoteBtn.style.display = 'none'
  } 
  
  if (event.target.innerText === 'Update Note') {
    console.log('update note btn clicked')
    let updateNoteSection = document.getElementById('update-note-text')
    let textarea = document.getElementById('update-note-textarea')
    let updateNoteValue = textarea.value

    patchUpdateNote(currentQuestion, updateNoteValue)
    
    // textarea.value = ''
  
    renderUpdateNote(updateNoteValue)

    //toggles update note form display to off upon submission of note
    //toggles the add update note button to on upon submission of note
    questionDiv.removeChild(document.getElementById('update-note-form'))
    let addNoteBtn = document.getElementById('add-update-note-btn')
    addNoteBtn.style.display = 'block'
  }

  if (event.target.innerText === 'Cancel') {
    console.log('cancel btn clicked')
    let addNoteBtn = document.getElementById('add-update-note-btn')
    questionDiv.removeChild(document.getElementById('update-note-form'))
    addNoteBtn.style.display = 'block'
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

  //auto-populates the text area for adding an update note, if a note exists
  if (currentQuestion.update_note) {
    textarea.value = currentQuestion.update_note
  } else {
    textarea.placeholder = 'Add your note'
  }

  let submitBtn = document.createElement('button')
  submitBtn.innerText = 'Update Note'

  let cancelBtn = document.createElement('button')
  cancelBtn.innerText = 'Cancel'

  div.append(h3, br, textarea, br2, submitBtn, cancelBtn)

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
