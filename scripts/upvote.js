let upvoteClickTracker;
let userTracker = {questions: []}
const questionUpvotesEndpoint = 'http://localhost:3000/question_upvotes'

let upvoteCounter = null;

questionView.addEventListener('click', event => {

  upvoteCounter = questionView.querySelector('.upvote-counter');

  console.log("upvoteCounter", upvoteCounter);

  const classes = event.target.className;

  if(typeof classes !== "string"){
    let parent = event.target.parentNode;
    if(parent.tagName === "svg"){
      parent = parent.parentNode; 
    }

    console.log("parent", parent);

    if(parent.className.indexOf("question-upvote") > -1){
      if (!userTracker.questions.includes(currentQuestion.id)){
        // let count = parseInt(upvoteCounter.innerText.split(' ')[1])
        // upvoteCounter.innerText = `upvote: ${++count}`
  
        userTracker.questions.push(currentQuestion.id)
        // upvoteClickTracker = 1
        // console.log(userTracker)
      
        // console.log(upvoteClickTracker)
        patchUpvoteCount()
      }
    }
  }

  /*
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
  */
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
  .then(data => {
    console.log("UC", upvoteCounter);
    upvoteCounter.innerHTML = currentQuestion.question_upvotes.length + 1;
  })
  .catch(err => console.log("err", err));
}
