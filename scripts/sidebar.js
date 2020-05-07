console.log('sidebar.js loaded')

const trendingTagsEndpoint = 'http://localhost:3000/tags/trending'

let sidebarDiv = document.getElementById('sidebar')

let div = document.createElement('div')
div.id = 'trending-tags'
div.innerHTML = `
    <ul>
    </ul>
`
sidebarDiv.replaceChild(div, sidebarDiv.children[0])

function getPopularTags() {
  fetch(trendingTagsEndpoint)
  .then(resp => resp.json())
  .then(renderTrendingTags)
}

function renderTrendingTags(tags) {
  tags.forEach(tag => {
    let div = document.getElementById('trending-tags')
    let li = document.createElement('li')
    li.dataset.id = tag.id
    li.innerText = tag.text
    div.append(li)
  })
}

getPopularTags()