console.log('follows.js loaded')

const followeesList = document.getElementById('followees-list');
const myFilterQuestionEndpoint = 'http://localhost:3000/questions/myfilter/'
const mainQuestionViewDiv = document.querySelector('div[class="bottom inner')

function getFollowees(id) {
  fetch(`http://localhost:3000/follows/filter/${id}`)
  .then(resp => resp.json())
  .then(followeesObj => {
    console.log(followeesObj)
    renderFollowees(followeesObj)
  })
}

function renderFollowees(followees) {
  followeesList.innerHTML = "";
  followees.forEach(followeeObj => {
    let li = document.createElement('li')
    li.dataset.user_id = followeeObj.followee.id
    li.innerText = followeeObj.followee.name
    
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = 'Unfollow'
    deleteBtn.dataset.follow_id = followeeObj.id

    li.append(deleteBtn)

    followeesList.append(li)
  })
}

followeesList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    fetch(`${myFilterQuestionEndpoint}/${event.target.dataset.user_id}`)
    .then(resp => resp.json())
    .then(renderAllQuestions)
  } else if (event.target.tagName === 'BUTTON') {

    let followObj = {
      id: parseInt(event.target.dataset.follow_id),
      follower_id: currentUser.id,
      followee_id: event.target.parentNode.dataset.user_id
    }

    fetch(`http://localhost:3000/follows/${event.target.dataset.follow_id}`, {
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

    let followeeID = event.target.dataset.userid

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
function addUserToSidebar(followObj) {
  let li = document.createElement('li')
  li.dataset.user_id = followObj.followee.id
  li.innerText = followObj.followee.name

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = 'Unfollow'
  deleteBtn.dataset.follow_id = followObj.id
  li.append(deleteBtn)

  followeesList.append(li)
}