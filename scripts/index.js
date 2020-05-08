console.log('index.js loaded')

// const baseEndpoint = "http://localhost:3000";
const baseEndpoint = "https://flatoverflow-api.herokuapp.com";

createNotificationWebsocketConnection();

function showInitialView(){
    // hide sidebar content
    // show disclaimer
    // hide question header
    // hide question list
    // hide question form
    // hide question detail
    // show the login and registration

    const disclaimer = document.getElementById("disclaimer");
    const sidebar = document.getElementById("sidebar");
    const left_header = document.getElementById("left-subheader");
    const user_container = document.getElementById("user_container");
    const question_container = document.getElementById("question_container");
    const button_bar = document.getElementById("button_bar");
    const back_to_questions = document.getElementById("back_to_questions");
    
    disclaimer.style.display = "block";
    sidebar.style.display = "none";
    left_header.style.display = "none";
    question_container.style.display = "none";
    user_container.style.display = "block";

    const loginInput = document.getElementById("username-login-input");
    loginInput.focus();
}

function showMainQuestionView(){
    // hide login and registration
    // hide disclaimer
    // hide question form
    // hide question detail
    // show sidebar content
    // show question header
    // show question list

    // getQuestions();

    const disclaimer = document.getElementById("disclaimer");
    const sidebar = document.getElementById("sidebar");
    const left_header = document.getElementById("left-subheader");
    const user_container = document.getElementById("user_container");
    const question_container = document.getElementById("question_container");

    const question_title = document.querySelector(".center_title");
    
    disclaimer.style.display = "none";
    sidebar.style.display = "block";
    left_header.style.display = "block";
    question_container.style.display = "block";
    user_container.style.display = "none";

    // question_title.style.display = "none";

    const question_list = document.getElementById("question-display");
    const question_form = document.getElementById("user-question");
    const question_detail = document.getElementById("question-view");

    question_list.style.display = "block";
    question_form.style.display = "none";
    question_detail.style.display = "none";
    button_bar.style.display = "flex";
    back_to_questions.style.display = "none";
    reload_questions.style.display = "inline";

    // I'm not sure where else to put it?
    cancelCommentSocket();
}

function showQuestionFormView(){
    // hide question list
    // hide question detail
    // show question form
    const question_list = document.getElementById("question-display");
    const question_form = document.getElementById("user-question");
    const question_detail = document.getElementById("question-view");

    const question_title = document.querySelector(".center_title");

    question_list.style.display = "none";
    question_form.style.display = "inline-block";
    question_detail.style.display = "none";
    button_bar.style.display = "none";
    back_to_questions.style.display = "inline";
    reload_questions.style.display = "none";

    // question_title.style.display = "block";

    // calling it here for now for testing purposes
    fillTagsDataList();
}

function showQuestionDetailView(){
    // hide question list
    // hide question form
    // show question detail
    const question_list = document.getElementById("question-display");
    const question_form = document.getElementById("user-question");
    const question_detail = document.getElementById("question-view");

    const question_title = document.querySelector(".center_title");

    question_list.style.display = "none";
    question_form.style.display = "none";
    question_detail.style.display = "block";
    button_bar.style.display = "none";
    back_to_questions.style.display = "inline";
    reload_questions.style.display = "none";

    // question_title.style.display = "block";
}

document.addEventListener("DOMContentLoaded", event => {
    showInitialView();
});

