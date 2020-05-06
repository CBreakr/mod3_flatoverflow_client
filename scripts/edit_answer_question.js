console.log('edit_answer_question.js loaded')

function viewQuestion(event){
  const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}

function displayQuestionDetails(questionDetail){
  cleanQuestion(questionDetail);
  
  let questionDiv = document.querySelector('#question-details')

  questionDiv.innerHTML = `
    <h1>Title: ${questionDetail.title}</h1>
    <br>
    <p>Content: ${questionDetail.text}</p>
    <br>
    <div id="question-comments">
    </div>
  `
  let contentPTag = questionDiv.children[2]

  if (questionDetail.update_note) {
    let updateNotePTag = document.createElement('p')
    updateNotePTag.innerText = questionDetail.update_note
    questionDiv.insertBefore(updateNotePTag, contentPTag)
  }

  // questionDetail.reverse_comments.forEach(comment => {
  //   let commentPTag = document.createElement('p')
  //   commentPTag.innerText = `Comment created at ${comment.created_at}: ${comment.text}`
  //   questionDiv.append(commentPTag)
  // })

  let addNoteBtn = document.createElement('button')
  let br = document.createElement('br')
  let upvoteBtn = document.createElement('button')
  let upvoteCounterPTag = document.createElement('p')

  upvoteCounterPTag.innerText = `upvote: ${questionDetail.question_upvotes.length}`
  upvoteBtn.innerText = '^'
  addNoteBtn.innerText = 'Add Update Note'
  questionDiv.append(br, addNoteBtn, upvoteCounterPTag, upvoteBtn)

  showQuestionDetailView()
  renderAllComments(questionDetail.reverse_comments);
}

function answerQuestion(event) {
  const id = event.target.dataset.id;
  getSingleQuestionWithCallback(id, displayQuestionDetails);
}
