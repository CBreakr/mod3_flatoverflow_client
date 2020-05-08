console.log('login.js loaded')

const loginInput = document.querySelector('#username-login-input')
const loginBtn = document.querySelector('#login-btn')

const logoutButton = document.getElementById("logout_button");

let currentUser = null

const loginForm = document.getElementById("login_form");

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  currentUser = null

  fetch(userEndpoint)
  .then(resp => resp.json())
  .then(users => {
    let match //= users.filter(validateUser)

    console.log("users");
    
    users.forEach(user => {
      if (loginInput.value === user.name){
        match = user
      }
    })

    if (match) {
      currentUser = match

      //used to keep track of user for upvote clicks
      userTracker.user = match

      //will fetch scores for comments marked as the answer, upvoted, and questions upvoted
      let questionsScore = getTotalQuestionUpvotes(currentUser.id)
      console.log(questionsScore, 'be sure about this', questionsScore)
      let commentsScore = getTotalCommentUpvotes(currentUser.id)
      console.log(commentsScore, 'tell me about it')

      // console.log(questionsScore, 'did it return something???')

      getQuestions()
      console.log(currentUser)
      //will fetch current followees for user upon logging in
      getFollowees(currentUser.id)
      getNotifications();

      setUserDisplay();
    } else { 
      alert('you don\'t have an account')
    }

    // loginInput.value = ''
    loginForm.reset();
  })
})

function validateUser(userObj) {
  return loginInput.value === userObj.name
}

function setUserDisplay(){
  const user_panel = document.getElementById("user_panel");
  user_panel.style.display = "inline";

  const username = document.getElementById("username");
  username.innerText = currentUser.name;
}

logoutButton.addEventListener("click", logOut);

function logOut(){
  currentUser = null;
  const user_panel = document.getElementById("user_panel");
  user_panel.style.display = "none";
  showInitialView();
}