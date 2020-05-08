console.log('main_question_display.js loaded')

let questionUL = document.getElementById("question_list");

let currentPreview = null;

let currentQuestion = null;

//used to display question in detailed view
//set within getSingleQuestionWithCallback 

const questionURL = "http://localhost:3000/questions";

document.addEventListener("DOMContentLoaded", event => {
    const addButton = document.getElementById("add_question_button");
    const back_to_questions = document.getElementById("back_to_questions");

    questionUL.addEventListener("click", questionEventHandler);

    addButton.addEventListener("click", event => {
        setTagDisplayVisibility();
        clearAllQuestionFormInputs();
        showQuestionFormView();
    });

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
        // console.log("can we see the data", data);
        currentQuestion = data
        callback(data);
    })
    .catch(err => console.log("error", err));
}

//
//
function renderAllQuestions(data){
    console.log("render");
    questionUL.innerHTML = "";
    data && data.forEach(question => {
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
function createBasicQuestionElement(question, already_upvoted = null){
    cleanQuestion(question);

    const div = document.createElement("div");
    div.className = "question basic";
    if(question.is_answered){
        div.className += " answer";
    }

    div.dataset.id = question.id;
    const upvotes = question.upvotes !== undefined ? question.upvotes : question.question_upvotes.length;
    const username = question.username || question.user.name;
    // console.log(question, 'plus i am here')

    let upvoteClass = getUpvoteClass((question.question_upvotes || already_upvoted), "question-upvote");

    div.innerHTML = `
        <span>
            <span class="upvote-counter" data-id="${question.id}">${upvotes}</span> 
            <span class="${upvoteClass}"><i class="fas fa-chevron-up"></i></span>
            &nbsp; &nbsp;
            <span class="author" data-userID="${question.user_id}">${username}</span>
        </span>
        <span class="basic_question_title">${question.title}</span> 
        <span>${showTagDisplay(question.tags)}</span>
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

    const upvoteClass = getUpvoteClass(question.question_upvotes, "question-upvote");

    replace.dataset.id = question.id;
    replace.dataset.title = question.title;
    replace.dataset.tags = JSON.stringify(question.tags);
    replace.dataset.upvotes = question.question_upvotes.length;   
    replace.dataset.username = question.user.name; 

    //added user_id to span to create following on click with current user
    replace.innerHTML = `
        <span class="title is-4">${question.title}</span>
        &nbsp;&nbsp;
        <span class="title is-5 author" data-user_id="${question.user.id}">${question.user.name}</span>
        <br />
        <p class="boxed text">
            ${question.text}
        </p>
        <p>            
            <span class="upvote-counter" data-id="${question.id}">
                ${question.question_upvotes.length}
            </span> 
            <span class="${upvoteClass}"><i class="fas fa-chevron-up"></i></span> 
            &nbsp; &nbsp; ${question.reverse_comments.length} comments
            &nbsp; &nbsp; ${showTagDisplay(question.tags)}
            &nbsp; &nbsp; ${viewQuestionButton(question)}
        </p>
    `;

    currentPreview = replace;
    return replace;
}

//
//
function viewQuestionButton(question) {
    currentQuestion = question;

    if (currentUser && question.user_id === currentUser.id) {
        return `<button class="detail" data-id="${question.id}">Edit Question</button>`
    }
    else{
        return `<button class="detail" data-id="${question.id}">Answer Question</button>`
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
        str += `<span class="question_tag">${tag.text}</span>`
    });
    return str;
}

//
//
function questionEventHandler(event){
    if(typeof event.target.className === "string"){
        if(event.target.className.indexOf("detail") > -1){
            //resets clicks on upvote button
            upvoteClickTracker = 0
            console.log('inside questionEventHandler')
            viewQuestion(event.target.dataset.id);
        }
        else if (typeof event.target.className === "string"){
            showPreview(event);
        }
    }
}

function showPreview(event){
    let target = event.target;

    if(target.className.indexOf("basic_question_title") > -1){
        target = target.parentNode;
    }

    console.log("show preview", target);

    if(target.className.indexOf("basic") > -1){
        const id = target.dataset.id;
        getSingleQuestionWithCallback(id, (question) => {
            if(currentPreview && currentPreview.parentNode){
                replaceExistingPreview();
            }
            currentPreview = null;
            const questionPreview = createPreviewQuestionElement(question);    
            target.after(questionPreview);
            target.remove();
        });
    }
    else{
        //upon click of username will create a following with current user
        if (event.target.className === "title is-5 author") {
            let ul = document.getElementById('followees-list')
            let isPresent = false

            Array.from(ul.children).forEach(li => {
                let text = li.innerText.replace('Unfollow', '')
                if (text=== target.innerText) {
                    isPresent = true
                }
            }) 
                if(currentUser.id !== parseInt(event.target.dataset.user_id)){
                    if (!isPresent) {
                        followUser(event.target.dataset.user_id)
                    } else {
                        alert('you already follow this person!')
                    }
                } else {
                    alert('you cannot follow yourself!')
                }
        }
    }
}

//create following
function followUser(userID) {
    let follow = {
        follower_id: currentUser.id,
        followee_id: userID
    }

    fetch('http://localhost:3000/follows', {
        method: 'POST',
        headers, 
        body: JSON.stringify(follow)
    })
    .then(resp => resp.json())
    .then(follow => {
        console.log(follow)
        addUserToSidebar(follow)
    })
}

function replaceExistingPreview(){
    const tags = JSON.parse(currentPreview.dataset.tags);

    const already_upvoted = currentPreview.querySelector(".already-upvoted");
    const upvoteCounter = currentPreview.querySelector(".upvote-counter");

    const q = {
        id: currentPreview.dataset.id,
        title: currentPreview.dataset.title,
        upvotes: upvoteCounter.innerHTML,
        username: currentPreview.dataset.username,
        tags
    };

    const replace = createBasicQuestionElement(q, already_upvoted ? "already" : null);
    currentPreview.after(replace);
    currentPreview.remove();
    currentPreview = null;
}