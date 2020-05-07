
let commentForm = null;
let commentList = document.getElementById("comment_list");

let alreadyAnswered = false;

const commentHeaders = {
    "content-type":"application/json",
    "accept": "application/json"
};

const commentEndpoint = "http://localhost:3000/comments";

document.addEventListener("DOMContentLoaded", event => {
    commentForm = document.getElementById("comment_form");

    commentForm.addEventListener("submit", submitComment);
    commentList.addEventListener("click", event => {
        const classes = event.target.className;
        console.log("classes", classes);
        if(classes && typeof classes === "string" && classes.indexOf("answer_button") > -1){
            markCommentAsAnswer(event.target);
        }
        else if(classes && typeof classes === "string" && classes.indexOf("comment_upvote_button") > -1){
            addUpvote(event.target);
        }
        else if(classes && typeof classes !== "string"){
            let parent = event.target.parentNode;
            console.log(parent);
            if(parent.tagName === "svg"){
                parent = parent.parentNode;
            }

            if(parent.className.indexOf("answer_action") > -1){
                markCommentAsAnswer(parent);
            }
        }
    });
});

function renderAllComments(comments){
    commentList.innerHTML = "";
    alreadyAnswered = false;
    comments.forEach(comment => {
        if(comment.is_answer){
            alreadyAnswered = true;
        }
    });
    comments.forEach(comment => {        
        appendComment(comment);
    });
}

function prependNewComment(comment){
    const li = document.createElement("li");
    li.className = "new-element";
    li.append(createCommentElement(comment));
    commentList.prepend(li);
}

function appendComment(comment, markNew = false){
    const li = document.createElement("li");
    li.append(createCommentElement(comment));
    commentList.append(li);
}

function createCommentElement(comment){
    const div = document.createElement("div");
    if(comment.is_answer){
        div.className = "answer";
    }

    const upvoteClass = getUpvoteClass(comment.comment_upvotes, "comment-upvote");

    div.innerHTML = `
        ${createAnswerDisplay(comment)}&nbsp;
        <span class="upvote-counter" data-id=${comment.id}>${comment.comment_upvotes.length}</span>
        <span class="${upvoteClass}"><i class="fas fa-chevron-up"></i></span>
        &nbsp; 
        ${comment.user.name}
        ${comment.text}
    `;
    return div;
}

function createAnswerDisplay(comment){
    if(comment.is_answer){
        return `<span class="answer_mark"><i class="fas fa-check"></i></span>`
    }
    else if(!alreadyAnswered && currentUser && currentUser.id === currentQuestion.user_id){
        return `<span class="answer_action" data-id="${comment.id}"><i class="fas fa-check"></i></span>`
    }
    return "";
}

function submitComment(event){
    event.preventDefault();
    const comment = createCommentFromForm();

    fetch(commentEndpoint, {
        method: "POST",
        headers: commentHeaders,
        body: JSON.stringify(comment)
    })
    .then(res => res.json())
    .then(data => {
        commentForm.reset();
        if(comment.is_answer){
            alreadyAnswered = true;
        }
        prependNewComment(data);
    })
    .catch(err => console.log("err", err));
}

function createCommentFromForm(){
    return {
        user_id: currentUser.id,
        question_id: currentQuestion.id,
        text: commentForm.text.value
    }
}

function markCommentAsAnswer(button){
    // check if the answer is already set for this question
    // if not, then proceed
    console.log("mark as answer", button);
    // /mark_answer/:id
    fetch(`${commentEndpoint}/mark_answer/${button.dataset.id}`, {
        method: "PATCH",
        headers: commentHeaders
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setAnswerDisplay(button);
    })
    .catch(err => console.log("err", err));
}

function setAnswerDisplay(button){
    button.className = "answer_mark";
    alreadyAnswered = true;
    button.parentNode.className = "answer";

    const answerButtons = document.querySelectorAll(".answer_action");
    answerButtons.forEach(ans => {
        if(ans !== button){
            ans.remove();
        }
        else{
            console.log("this is the answer", ans);
        }
    });
}

function addUpvote(button){
    // check if the current user has already upvoted this comment
    // if not, then proceed
}
