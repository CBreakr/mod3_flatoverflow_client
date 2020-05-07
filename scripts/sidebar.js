console.log('sidebar.js loaded')

const trendingTagsEndpoint = 'http://localhost:3000/tags/trending'

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