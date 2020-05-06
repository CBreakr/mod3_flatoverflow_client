console.log('index.js loaded')

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
    
    disclaimer.style.display = "block";
    sidebar.style.display = "none";
    left_header.style.display = "none";
    question_container.style.display = "none";
    user_container.style.display = "block";
}

function showMainQuestionView(){
    // hide login and registration
    // hide disclaimer
    // hide question form
    // hide question detail
    // show sidebar content
    // show question header
    // show question list

    const disclaimer = document.getElementById("disclaimer");
    const sidebar = document.getElementById("sidebar");
    const left_header = document.getElementById("left-subheader");
    const user_container = document.getElementById("user_container");
    const question_container = document.getElementById("question_container");
    
    disclaimer.style.display = "none";
    sidebar.style.display = "block";
    left_header.style.display = "block";
    question_container.style.display = "block";
    user_container.style.display = "none";

    const question_list = document.getElementById("question-display");
    const question_form = document.getElementById("user-question");
    const question_detail = document.getElementById("question-view");

    question_list.style.display = "block";
    question_form.style.display = "none";
    question_detail.style.display = "none";
    button_bar.style.display = "flex";
}

function showQuestionFormView(){
    // hide question list
    // hide question detail
    // show question form
    const question_list = document.getElementById("question-display");
    const question_form = document.getElementById("user-question");
    const question_detail = document.getElementById("question-view");

    question_list.style.display = "none";
    question_form.style.display = "block";
    question_detail.style.display = "none";
    button_bar.style.display = "none";

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

    question_list.style.display = "none";
    question_form.style.display = "none";
    question_detail.style.display = "block";
    button_bar.style.display = "none";
}

document.addEventListener("DOMContentLoaded", event => {
    showInitialView();
});

