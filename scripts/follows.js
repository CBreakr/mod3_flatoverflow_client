console.log('follows.js loaded')

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
  followees.forEach(followeeObj => {
    let li = document.createElement('li')
    li.dataset.user_id = followeeObj.followee.id
    li.innerText = followeeObj.followee.name
    followeesDiv.append(li)
  })
}

followeesDiv.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    fetch(`${myFilterQuestionEndpoint}/${event.target.dataset.user_id}`)
    .then(resp => resp.json())
    .then(renderAllQuestions)
  }
})
