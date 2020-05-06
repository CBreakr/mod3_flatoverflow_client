console.log('main_question_display.js loaded')

let questionUL = null;

let currentPreview = null;

let currentQuestion = null;

//used to display question in detailed view
//set within getSingleQuestionWithCallback 

const questionURL = "http://localhost:3000/questions";

document.addEventListener("DOMContentLoaded", event => {
    const addButton = document.getElementById("add_question_button");
    const back_to_questions = document.getElementById("back_to_questions");

    questionUL = document.getElementById("question_list");

    questionUL.addEventListener("click", questionEventHandler);

    addButton.addEventListener("click", showQuestionFormView);

    back_to_questions.addEventListener("click", getQuestions);
});

//
//
function getQuestions(callback){
    currentQuestion = null;

    fetch(questionURL)
    .then(res => res.json())
    .then(data => {
        renderAllQuestions(data)
        showMainQuestionView();
    })
    .catch(err => console.log("error", err));
}

//
//
function getSingleQuestionWithCallback(id, callback){
    fetch(`${questionURL}/${id}`)
    .then(res => res.json())
    .then(data => {
        console.log("can we see the data", data);
        callback(data);
    })
    .catch(err => console.log("error", err));
}

//
//
function renderAllQuestions(data){
    console.log("render");
    questionUL.innerHTML = "";
    data.forEach(question => {
        appendQuestion(question);
    });
}

//
//
function prependQuestion(question){
    const li = document.createElement("li");
    li.className = "new-element";
    const questionElement = createBasicQuestionElement(question);
    li.append(questionElement);
    questionUL.prepend(li);
}

//
//
function appendQuestion(question){
    const li = document.createElement("li");
    const questionElement = createBasicQuestionElement(question);
    li.append(questionElement);
    questionUL.append(li);
}

//
//
function createBasicQuestionElement(question){
    cleanQuestion(question);

    const div = document.createElement("div");
    div.className = "question basic";
    if(question.is_answered){
        div.className += " answer";
    }

    div.dataset.id = question.id;
    const upvotes = question.upvotes || question.question_upvotes.length;
    const username = question.username || question.user.name;
    div.innerHTML = `
        <span class="upvote-boxed">${upvotes} <span class="question-upvote"><i class="fas fa-chevron-up"></i></span></span> &nbsp; &nbsp;
        ${question.title} &nbsp; - &nbsp; ${username} &nbsp; &nbsp
        ${showTagDisplay(question.tags)}
    `;

    return div;
}

//
//
function createPreviewQuestionElement(question){
    cleanQuestion(question);

    const replace = document.createElement("div");
    replace.className = "preview";
    if(question.is_answered){
        replace.className += " answer";
    }

    replace.dataset.id = question.id;
    replace.dataset.title = question.title;
    replace.dataset.tags = JSON.stringify(question.tags);
    replace.dataset.upvotes = question.question_upvotes.length;   
    replace.dataset.username = question.user.name; 
    replace.innerHTML = `
        <span class="title is-4">${question.title}</span>
        &nbsp;-&nbsp;
        <span class="title is-5">${question.user.name}</span>
        ${viewQuestionButton(question)}
        <br />
        <p class="title is-6">${question.text}</p>
        <p>${showTagDisplay(question.tags)}</p>
        <p><span class="upvote-boxed">${question.question_upvotes.length} <span class="question-upvote"><i class="fas fa-chevron-up"></i></span></span> &nbsp; &nbsp; ${question.reverse_comments.length} comments</p>
    `;

    currentPreview = replace;
    return replace;
}

//
//
function viewQuestionButton(question) {
    currentQuestion = question;

    if (currentUser && question.user_id === currentUser.id) {
        return `<button class="view" data-id="${question.id}">Edit Question</button>`
    }
    else{
        return `<button class="view" data-id="${question.id}">Answer Question</button>`
    }
    return ''
}

function currentUserAnswerButton(question) {
    if (currentUser && question.user_id !== currentUser.id) {
        return `<button class="answer">Answer Question</button>`
    }
    return ''
}

function showTagDisplay(tags){
    let str = "";
    tags.forEach(tag => {
        cleanTag(tag);
        str += `<span class="question_tag">#${tag.text}</span>`
    });
    return str;
}

//
//
function questionEventHandler(event){
    if(event.target.className.indexOf("view") > -1){
        viewQuestion(event);
    }
    else if (event.target.className.indexOf("basic") > -1){
        showPreview(event);
    }
}

function showPreview(event){
    if(event.target.className.indexOf("basic") > -1){
        const id = event.target.dataset.id;
        getSingleQuestionWithCallback(id, (question) => {
            if(currentPreview && currentPreview.parentNode){
                replaceExistingPreview();
            }
            currentPreview = null;
            const questionPreview = createPreviewQuestionElement(question);    
            event.target.after(questionPreview);
            event.target.remove();
        });
    }
    else{
        console.log("not the basic element");
    }
}

function replaceExistingPreview(){
    const tags = JSON.parse(currentPreview.dataset.tags);    
    const q = {
        id: currentPreview.dataset.id,
        title: currentPreview.dataset.title,
        upvotes: currentPreview.dataset.upvotes,
        username: currentPreview.dataset.username,
        tags
    };

    const replace = createBasicQuestionElement(q);
    currentPreview.after(replace);
    currentPreview.remove();
    currentPreview = null;
}