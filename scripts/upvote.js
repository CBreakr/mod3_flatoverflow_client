let upvoteClickTracker;
let userTracker = {questions: []}
const questionUpvotesEndpoint = `${baseEndpoint}/question_upvotes`
const commentUpvotesEndpoint = `${baseEndpoint}/comment_upvotes`

questionView.addEventListener('click', event => {

  const upvoteCounter = questionView.querySelector('.upvote-counter');

  console.log("upvoteCounter", upvoteCounter);

  const classes = event.target.className;

  if(typeof classes !== "string"){
    let parent = event.target.parentNode;
    if(parent.tagName === "svg"){
      parent = parent.parentNode; 
    }

    console.log("parent", parent);

    if(parent.className.indexOf("question-upvote") > -1){
      patchUpvoteCount(currentQuestion.id, upvoteCounter)

      // if (!userTracker.questions.includes(currentQuestion.id)){
      //   // let count = parseInt(upvoteCounter.innerText.split(' ')[1])
      //   // upvoteCounter.innerText = `upvote: ${++count}`
  
      //   userTracker.questions.push(currentQuestion.id)
      //   // upvoteClickTracker = 1
      //   // console.log(userTracker)
      
      //   // console.log(upvoteClickTracker)
        
      // }
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
});

questionUL.addEventListener("click", event => {
  const classes = event.target.className;

  if(typeof classes !== "string"){
    let parent = event.target.parentNode;
    if(parent.tagName === "svg"){
      parent = parent.parentNode; 
    }

    const upvoteCounter = parent.parentNode.querySelector(".upvote-counter");

    if(parent.className.indexOf("question-upvote") > -1){
      patchUpvoteCount(upvoteCounter.dataset.id, upvoteCounter);
    }
  }
});

commentList.addEventListener("click", event => {
  const classes = event.target.className;

  if(typeof classes !== "string"){
    let parent = event.target.parentNode;
    if(parent.tagName === "svg"){
      parent = parent.parentNode; 
    }

    const upvoteCounter = parent.parentNode.querySelector(".upvote-counter");

    if(parent.className.indexOf("comment-upvote") > -1){
      patchUpvoteCount(upvoteCounter.dataset.id, upvoteCounter, false);
    }
  }
});

function patchUpvoteCount(id, upvoteCounter, is_Question = true) {
  let obj = {user_id: currentUser.id};
  let endpoint = null;
  
  if(is_Question) {
    obj.question_id = id;
    endpoint = questionUpvotesEndpoint;
  }
  else {
    obj.comment_id = id;
    endpoint = commentUpvotesEndpoint;
  }

  console.log(endpoint, obj);
  
  fetch(`${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(obj)
  })
  .then(resp => resp.json())
  .then(data => {
    console.log("UC", upvoteCounter);
    upvoteCounter.innerHTML = parseInt(upvoteCounter.innerHTML) + 1;
    let upvoteElement = upvoteCounter.parentNode.querySelector(".question-upvote");
    if(!upvoteElement){
      upvoteElement = upvoteCounter.parentNode.querySelector(".comment-upvote")
    }
    upvoteElement.className = "already-upvoted";
  })
  .catch(err => console.log("err", err));
}

//
// check if the current user has upvoted this item already
//
function getUpvoteClass(upvoteList, defaultClass){
  if (upvoteList === "already" || (currentUser && upvoteList && upvoteList.some(upvote => {
    console.log(upvote.user_id, currentUser.id, upvote.user_id === currentUser.id);
    return upvote.user_id === currentUser.id;
  }))
  ){
    return "already-upvoted";
  }
  return defaultClass;
}

const leaderboardTable = document.getElementById('leaderboard-table')

// function populateLeaderboardTable() {
//   fetch('http://localhost:3000/users')
//   .then(resp => resp.json())
//   .then(user => {
//     let tr = document.createElement('tr')
//     let td1 = document.createElement('td')
//     let td1 = document.createElement('td')
//   })
// }
