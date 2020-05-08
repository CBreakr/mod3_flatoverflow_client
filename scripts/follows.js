console.log('follows.js loaded')

const followeesList = document.getElementById('followees-list');

const myFilterQuestionEndpoint = 'http://localhost:3000/questions/myfilter/'

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
    followeesList.append(li)
  })
}

followeesList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    console.log('li pressed')
    fetch(`${myFilterQuestionEndpoint}/${event.target.dataset.user_id}`)
    .then(resp => resp.json())
    .then(renderAllQuestions)
  }
})

//append followed users to sidebar
function addUserToSidebar(followObj) {
  let li = document.createElement('li')
  li.dataset.user_id = followObj.followee.id
  li.innerText = followObj.followee.name
  followeesList.append(li)
}