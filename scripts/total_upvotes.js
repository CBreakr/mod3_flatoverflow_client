function getTotalQuestionUpvotes(id) {
  fetch(`http://localhost:3000/questions/upvotes/${id}`)
  .then(resp => resp.json())
  .then(console.log)
}

function getTotalCommentUpvotes(id) {
  fetch(`http://localhost:3000/comments/upvotes/${id}`)
  .then(resp => resp.json())
  .then(console.log)
}
