
document.addEventListener("DOMContentLoaded", event => {
    document.getElementById("button_bar").addEventListener("click", filterClick);
});

//
//
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
    else if(event.target.id === "mine_filter_question_button"){
        fetch(`${questionURL}/myfilter/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderAllQuestions(data);
        })
        .catch(err => console.log("error", err));
    }
}