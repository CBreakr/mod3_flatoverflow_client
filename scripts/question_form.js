console.log('question_form.js loaded')

const questionForm = document.querySelector('#question-form')
const titleInput = document.querySelector('#title-input')
const contentInput = document.querySelector('#content-input')
const questionView = document.querySelector('#question-view')

const tagInput = document.getElementById("tags-input");
const tagDataList = document.getElementById("taglist");
const tagDisplay = document.getElementById("tag_list_display");
const tag_input_container = document.getElementById("tag_input_container");

const questionEndpoint = `${baseEndpoint}/questions`
const tagsEndpoint = `${baseEndpoint}/tags`
const questionTagsEndpoint = `${baseEndpoint}/question_tags`

const TAG_LIMIT = 4;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

let createdQuestion;
let createdTags = []

questionForm.addEventListener('submit', event => {
  event.preventDefault()

  if (currentUser) {
    const question = {
      user_id: currentUser.id,
      title: escapeHtml(titleInput.value),
      text: escapeHtml(contentInput.value)
    }

    // postTags(parseTags(tagsInput.value))
    addTagsToQuestion(question);
    postQuestion(question);
    clearAllQuestionFormInputs();
  } 
  else {
    alert('You need to be logged in to ask a question')
    questionForm.reset()
  }
})

questionForm.addEventListener("click", event => {
  const classes = event.target.className;
  if(typeof classes !== "string"){
    let parent = event.target.parentNode;
    if(parent.tagName === "svg"){
      parent = parent.parentNode;
    }

    if(parent.className.indexOf("delete-tag") > -1){
      console.log("delete tag");
      parent.parentNode.remove();
      setTagDisplayVisibility();
    }
  }
  else if(event.target.id === "add_tag"){
    console.log("ADD TAG!");
    moveTagToDisplay();
    return;
  }
})

//
// make sure we don't accidentally submit the form
//
tagInput.addEventListener("keypress", event => {
  if(event.key === "Enter"){
    event.preventDefault();
    moveTagToDisplay();
  }
});

function postQuestion(question) {
  cleanQuestion(question);
  fetch(questionEndpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(question)
  })
  .then(resp => resp.json())
  .then(questionObj => {
    createdQuestion = questionObj
    // renderQuestion(questionObj)
    viewQuestion(createdQuestion.id);
    getPopularTags();
  })
  questionForm.reset()
}

function renderQuestion(questionObj) {
  cleanQuestion(createdQuestion);

  const h1 = document.createElement('h1')
  h1.innerText = questionObj.title

  const p = document.createElement('p')
  p.innerText = questionObj.text

  const button = document.createElement('button')
  button.dataset.id = questionObj.id
  button.innerText = 'Add note'

  questionView.innerHTML = ''
  questionView.append(h1, p, button)
}

/*
function parseTags(tags) {
  let strings = tags.split(/\W/)
  
  let filteredTags = strings.filter(string => {
    return Boolean(string) === true
  })

  let tagObjects = filteredTags.map(tag => {
    return {text: `${'#'.concat(tag)}`}
  })

  return tagObjects
}

function postTags(tags) {
  tags.forEach(tag => {
    fetch(tagsEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(tag)
    })
    .then(resp => resp.json())
    .then(tag => {
      createdTags.push(tag)
    })
  })
}

function postQuestionTags() {
  createdTags.forEach(tagObj => {
    fetch(questionTagsEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        tag_id: tagObj.id,
        question_id: createdQuestion.id
      })
    })
  })
}
*/

//
//
function moveTagToDisplay(){
  const tagVal = escapeHtml(tagInput.value);
  if(tagVal){
    const id = findIdOfTag(tagVal);

    if(!tagInDisplay(tagVal)){
      const tagSpan = document.createElement("span");
      tagSpan.className = "tag";
      tagSpan.dataset.id = id;
      tagSpan.dataset.text = tagVal;
  
      const valueSpan = document.createElement("span");
      valueSpan.innerText = tagVal;
  
      const deleteSpan = document.createElement("span");
      deleteSpan.innerHTML = `<i class="far fa-times-circle"></i>`;
      deleteSpan.className = "delete-tag";
  
      tagSpan.append(valueSpan);
      tagSpan.append(deleteSpan);
  
      tagDisplay.append(tagSpan);
    }

    tagInput.value = "";

    setTagDisplayVisibility();
  }
}

//
//
function setTagDisplayVisibility(){
  if(tagDisplay.children.length >= TAG_LIMIT){
    tag_input_container.style.display = "none";
  }
  else{
    tag_input_container.style.display = "block";
  }
}

//
//
function findIdOfTag(tag){
  for(let i = 0; i < tagDataList.children.length; i++){
    const option = tagDataList.children[i];
    if(option.value === tag){
      return option.dataset.id;
    }
  }

  return null;
}

//
//
function tagInDisplay(tag){
  for(let i = 0; i < tagDisplay.children.length; i++){
    const span = tagDisplay.children[i];
    if(span.dataset.text === tag){
      return true;
    }
  }

  return false;
}

//
//
function addTagsToQuestion(question){
  // grab them from the tag display list
  const tags = [];
  for(let i = 0; i < tagDisplay.children.length; i++){
    const tagElement = tagDisplay.children[i];
    tags.push({
      id: tagElement.dataset.id,
      text: tagElement.dataset.text
    });
  }

  console.log(tags);

  if(tags.length){
    question.tags = tags;
  }

  tagDataList.innerHTML = "";
}

function fillTagsDataList(){
  console.log("get all tags");
  fetch(tagsEndpoint)
  .then(res => res.json())
  .then(data => {
    fillAllTags(data);
  })
  .catch(err => console.log("error", err));
}

function fillAllTags(tags){
  tagDataList.innerHTML = "";

  tags.forEach(tag => {
    appendIndividualTag(tag);
  });
}

function appendIndividualTag(tag){
  const option = document.createElement("option");
  option.value = tag.text;
  option.dataset.id = tag.id;
  tagDataList.append(option);
}

function clearAllQuestionFormInputs(){
  tagDisplay.innerHTML = "";
  questionForm.reset();
}