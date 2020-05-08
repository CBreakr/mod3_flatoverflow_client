function getTotalQuestionUpvotes(id) {
  fetch(`http://localhost:3000/questions/upvotes/${id}`)
  .then(resp => resp.json())
  .then(score => {
    console.log(score)
    return score
  })
}

function getTotalCommentUpvotes(id) {
  fetch(`http://localhost:3000/comments/upvotes/${id}`)
  .then(resp => resp.json())
  .then(console.log)
}

function renderLeaderBoardUsers() {
  fetch('http://localhost:3000/users').then(resp => resp.json()).then(data => { let totalUsers = data.length

  let leaderboardDiv = document.getElementById('tbody')

  let user;
  let scoreOrder = []
 
  data.forEach((user) => {
    

    let questionScore = getTotalQuestionUpvotes(user.id)
    let commentScore = getTotalCommentUpvotes(user.id)
    // console.log(questionScore, commentScore)
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

renderLeaderBoardUsers()
 