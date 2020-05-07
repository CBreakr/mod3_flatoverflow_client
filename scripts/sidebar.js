console.log('sidebar.js loaded')

const trendingTagsEndpoint = 'http://localhost:3000/tags/trending'
const questionFilterEndpoint = 'http://localhost:3000/questions/filter'

let trendingList = document.getElementById('trending_tags_list')

function getPopularTags() {
  fetch(trendingTagsEndpoint)
  .then(resp => resp.json())
  .then(renderTrendingTags)
}

function renderTrendingTags(tags) {
  tags.forEach(tag => {
    let li = document.createElement('li')
    li.className = "question_tag tag_link"
    li.dataset.id = tag.id
    li.innerText = tag.text
    trendingList.append(li)
  })
}

getPopularTags()

trendingList.addEventListener('click', event => {
  let tag = event.target.innerText.slice(1)
  tag = encodeURIComponent(tag)
  
  fetch(`${questionFilterEndpoint}/${tag}`)
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    renderAllQuestions(data)
  })
})

// function renderQuestion(questions) {
//   questions.forEach(question => {
//     let div = document.createElement('div')
//     div.innerHTML = `
//       <h1>${question.title}</h1>
//       <p>Content: ${question.text}</p>
//       <p>Update Note: ${question.update_note}</p>
//     `
//     let questionDiv = document.getElementById('testing-questions')
//     questionDiv.append(div)
//   })
// }