
const notificationEndpoint = `${baseEndpoint}/notifications`;

const notificationHeaders = {
    "content-type": "application/json",
    "accept": "application/json"
};

document.addEventListener("click", event => {
    console.dir(event.target.parentNode.parentNode);
});

const notificationContainer = document.getElementById("notifications");
// const refresh = document.getElementById("refresh_notifications");
const notification_bell = document.getElementById("notification_bell");

console.log("NOTIFICATION CONTAINER", notificationContainer);

function getNotifications(){
    notificationContainer.innerHTML = "";
    fetch(`${notificationEndpoint}/${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
        renderAllNotifications(data);
        if(data && data.length > 0){
            notifyUser(`${data.length} notifications!`);
        }
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
    if(data && data.length > 0){
        notification_bell.className = "notification_bell_empty";
        data.forEach(notification => {
            renderNotification(notification);
        });

        // flash it
        setTimeout(() => {
            notification_bell.className = "notification_bell_full";
        }, 10);
    }
    else{
        notification_bell.className = "notification_bell_empty";
    }
}

function renderNotification(notification){
    const li = document.createElement("li");
    const div = document.createElement("div");

    let content = null;

    if(notification.is_answered){
        div.className = "answer";
        content = `<i class="fas fa-check"></i> ${notification.question.title}`;
    }
    else{
        content = `<i class="fas fa-reply"></i> ${notification.question.title}`;
    }

    div.dataset.id = notification.id;
    div.dataset.question_id = notification.question_id;
    div.innerHTML = content;
    li.append(div);
    notificationContainer.append(li);
}

// refresh.addEventListener("click", event => {
//     console.log("REFRESH");
//     getNotifications();
// });

notificationContainer.addEventListener("click", event => {
    console.log(event.target);
    if(event.target.dataset.question_id) {
        removeNotification(event.target.dataset.id);
        viewQuestion(event.target.dataset.question_id);
    }
});

function notifyUser(notice) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(`FlatOverflow! ${notice}`);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(`FlatOverflow! ${notice}`);
            }
        });
    }
}