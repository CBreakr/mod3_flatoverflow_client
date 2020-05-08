console.log('follows.js loaded')

const followeesList = document.getElementById('followees-list');

// const myFilterQuestionEndpoint = 'http://localhost:3000/questions/myfilter/'
const mainQuestionViewDiv = document.querySelector('div[class="bottom inner')
const questionDetailViewDiv = document.getElementById('question-details')

console.log(questionDetailViewDiv, 'inside follow.js logging this element!')

const myFilterQuestionEndpoint = `${baseEndpoint}/questions/myfilter/`;

function getFollowees(id) {
  fetch(`${baseEndpoint}/follows/filter/${id}`)
  .then(resp => resp.json())
  .then(followeesObj => {
    console.log(followeesObj)
    renderFollowees(followeesObj)
  })
}

function renderFollowees(followees) {
  followeesList.innerHTML = "";
  followees.forEach(followeeObj => {
    addUserToSidebar(followeeObj);
  })
}


followeesList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    fetch(`${myFilterQuestionEndpoint}/${event.target.dataset.user_id}`)
    .then(resp => resp.json())
    .then(renderAllQuestions)
  } 
  else {
    const classes = event.target.className;
    if(typeof classes !== "string"){
      let parent = event.target.parentNode;
      if(parent.tagName === "svg"){
        parent = parent.parentNode;
      }

      if(parent.className.indexOf("delete-tag") > -1){
        console.log("delete follow");
        let followObj = {
          id: parseInt(event.target.dataset.follow_id),
          follower_id: currentUser.id,
          followee_id: event.target.parentNode.dataset.user_id
        }
    
        fetch(`${baseEndpoint}/follows/${event.target.dataset.follow_id}`, {
          method: 'DELETE',
          headers,
          body: JSON.stringify(followObj)
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          getFollowees(currentUser.id)
        })
      }
    }
  }
})

mainQuestionViewDiv.addEventListener('click', event => {
  if (event.target.className === 'author') {
    let ul = document.getElementById('followees-list')
    let isPresent = false

    Array.from(ul.children).forEach(li => {
      let text = li.innerText.replace('Unfollow', '')
      if (event.target.innerText === text) {
          isPresent = true
      }
    }) 

    let followeeID = event.target.dataset.userid || event.target.id

    if(currentUser.id !== parseInt(followeeID)){
        if (!isPresent) {
          followUser(followeeID)
        } else {
            alert('you already follow this person!')
        }
    } else {
      alert('you cannot follow yourself!')
    }
  }
})

//append followed users to sidebar
function addUserToSidebar(followeeObj) {

  let li = document.createElement('li')
  li.className = "follow-item"
  li.dataset.user_id = followeeObj.followee.id
  const span = document.createElement("span");
  span.innerText = followeeObj.followee.name

  li.append(span);
  
  // let deleteBtn = document.createElement("button");
  // deleteBtn.innerText = 'Unfollow'
  // deleteBtn.dataset.follow_id = followeeObj.id

  const deleteSpan = document.createElement("span");
  deleteSpan.innerHTML = `<i class="far fa-times-circle"></i>`;
  deleteSpan.dataset.follow_id = followeeObj.id
  deleteSpan.className = "delete-tag";

  li.append(deleteSpan)

  followeesList.append(li)
}
