
const notificationEndpoint = "http://localhost:3000/notifications";

const notificationHeaders = {
    "content-type": "application/json",
    "accept": "application/json"
};

const notificationContainer = document.getElementById("notifications");
const refresh = document.getElementById("refresh_notifications");

function getNotifications(){
    notificationContainer.innerHTML = "";
    fetch(`${notificationEndpoint}/${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
        renderAllNotifications(data);
    })
    .catch(err => console.log("err", err));
}

function removeNotification(id){
    fetch(`${notificationEndpoint}/${id}`,
    {
        method: "DELETE",
        headers: notificationHeaders
    })
    .then(res => {
        getNotifications();
    })
    .catch(err => console.log("err", err));
}

function renderAllNotifications(data){
    data && data.forEach(notification => {
        renderNotification(notification);
    });
}

function renderNotification(notification){
    const li = document.createElement("li");
    const div = document.createElement("div");

    let content = null;

    if(notification.is_answered){
        div.className = "answer";
        content = `ANSWERED: ${notification.question.title}`;
    }
    else{
        content = `RESPONSE: ${notification.question.title}`;
    }

    div.dataset.id = notification.id;
    div.dataset.question_id = notification.question_id;
    div.innerHTML = content;
    li.append(div);
    notificationContainer.append(li);
}

refresh.addEventListener("click", event => {
    console.log("REFRESH");
    getNotifications();
});

notificationContainer.addEventListener("click", event => {
    console.log(event.target);
    if(event.target.dataset.question_id) {
        removeNotification(event.target.dataset.id);
        viewQuestion(event.target.dataset.question_id);
    }
});