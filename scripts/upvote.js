let upvoteClickTracker;
let userTracker = {questions: []}
const questionUpvotesEndpoint = 'http://localhost:3000/question_upvotes'

questionView.addEventListener('click', event => {
  let upvoteCounter = document.getElementById('upvote-counter')

  if (event.target.innerText === '^')
    if (upvoteClickTracker === 0 && !userTracker.questions.includes(currentQuestion.id)) {
    let count = parseInt(upvoteCounter.innerText.split(' ')[1])
    upvoteCounter.innerText = `upvote: ${++count}`

    userTracker.questions.push(currentQuestion.id)
    upvoteClickTracker = 1
    console.log(userTracker)
   
    console.log(upvoteClickTracker)
    patchUpvoteCount()
  }
})

function patchUpvoteCount() {
  let questionUpvote = {
    question_id: currentQuestion.id,
    user_id: currentUser.id
  }
  
  fetch(`${questionUpvotesEndpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(questionUpvote)
  })
  .then(resp => resp.json())
  .then(console.log)
}
