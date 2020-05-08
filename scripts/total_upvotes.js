function getTotalQuestionUpvotes(id) {
  let score = []
  fetch(`http://localhost:3000/questions/upvotes/${id}`)
  .then(resp => resp.json())
  .then(data => {
    console.log(data, 'questionupvotes')
    score.push(data)
  })
  console.log(score, 'logged the score')
  return score
}

function getTotalCommentUpvotes(id) {
  let score = []
  fetch(`http://localhost:3000/comments/upvotes/${id}`)
  .then(resp => resp.json())
  .then(data => {
    console.log(data, 'commentupvotes')
    score.push(data)
  })
  console.log(score, 'by adding the sucker')
  return score
}

function renderLeaderBoardUsers() {
  fetch('http://localhost:3000/users').then(resp => resp.json()).then(data => { let totalUsers = data.length

  let leaderboardDiv = document.getElementById('tbody')

  let user;
  let scoreOrder = []
 
  data.forEach((user) => {
    
  
    let questionScore = getTotalQuestionUpvotes(user.id)
    let commentScore = getTotalCommentUpvotes(user.id)
  
    let total = setTimeout((questionScore + commentScore), 1000)

    user = {
      username: user.name, 
      score: total
    }
    scoreOrder.push(user)
    
    })

    console.log(scoreOrder, 'in here right now')
    console.log(scoreOrder.sort(function(a, b){return a.score-b.score}))

    // console.log(sortedUsers)

    scoreOrder.forEach(user => {
      let tr = document.createElement('tr')
      let td1 = document.createElement('td')
      let td2 = document.createElement('td')

      td1.innerText = `${user.username}`
      td2.innerText = `${user.score}`
      tr.append(td1, td2)
      leaderboardDiv.append(tr)


    })



  })
}
