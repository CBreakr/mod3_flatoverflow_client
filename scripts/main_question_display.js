
let questionUL = null;

const questionURL = "http://localhost:3000/questions";

document.addEventListener("DOMContentLoaded", event => {
    const addButton = document.getElementById("add_question_button");
    questionUL = document.getElementById("question_list");

    questionUL.addEventListener("click", showPreview);

    addButton.addEventListener("click", addMockQuestion);

    document.querySelector(".button_bar").addEventListener("click", filterClick);

    getQuestions();
});

function getQuestions(){
    fetch(questionURL)
    .then(res => res.json())
    .then(data => {
        renderAllQuestions(data)
    })
    .catch(err => console.log("error", err));
}

function getSingleQuestionWithCallback(id, callback){
    fetch(`${questionURL}/${id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        callback(data);
    })
    .catch(err => console.log("error", err));
}

function renderAllQuestions(data){
    data.forEach(question => {
        appendQuestion(question);
    });
}

function addMockQuestion(event){
    q = {
        title: "Lorem Ipsum",
        user: "CBreakr",
        text: "This is the text of the question right here",
        upvotes: 4,
        comments: 5,
        tags: ["javascript", "rails", "lab201"]
    }

    prependQuestion(q);
}

function prependQuestion(question){
    const li = document.createElement("li");
    li.className = "new-element";
    const questionElement = createBasicQuestionElement(question);
    li.append(questionElement);
    questionUL.prepend(li);
}

function appendQuestion(question){
    const li = document.createElement("li");
    const questionElement = createBasicQuestionElement(question);
    li.append(questionElement);
    questionUL.append(li);
}

function createBasicQuestionElement(question){
    const div = document.createElement("div");
    div.className = "question basic";
    div.dataset.id = question.id;
    div.innerText = question.title;
    return div;
}

function createPreviewQuestionElement(question){
    const replace = document.createElement("div");
    replace.className = "preview";
    replace.dataset.id = question.id;
    replace.innerHTML = `
        <span class="title is-4">${question.title}</span>
        &nbsp;-&nbsp;
        <span class="title is-5">${question.user.name}</span>
        <br />
        <p class="title is-6">${question.text}</p>
        <p>${showTagDisplay(question.tags)}</p>
        <p>${question.question_upvotes.length} ^ &nbsp; &nbsp; ${question.comments.length} comments</p>
    `;
    return replace;
}

function showTagDisplay(tags){
    let str = "";
    tags.forEach(tag => str += `<span class="question_tag">#${tag.text}</span>`)
    return str;
}

function showPreview(event){
    if(event.target.className.indexOf("basic") > -1){
        const id = event.target.dataset.id;
        getSingleQuestionWithCallback(id, (question) => {
            const questionPreview = createPreviewQuestionElement(question);    
            event.target.after(questionPreview);
            event.target.remove();
        });

        /*
        q = {
            title: "Lorem Ipsum",
            user: "CBreakr",
            text: "This is the text of the question right here",
            upvotes: 4,
            comments: 5,
            tags: ["javascript", "rails", "lab201"]
        }
        */
    }
    else{
        console.log("not the basic element");
    }
}

function filterClick(event){
    console.dir(event.target);

    if(event.target.dataset.filter_type) {
        fetch(`${questionURL}/filter/${event.target.dataset.filter_type}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderAllQuestions(data);
        })
        .catch(err => console.log("error", err));
    }
}