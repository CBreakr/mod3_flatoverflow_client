
const webSocketUrl = 'ws://localhost:3000/cable';

let commentSocket = null;

let currentQuestionId = null;

//
//
// GET COMMENTS
//
//

//
//
// Opens a websocket connection to a specific Chat Room stream
function createCommentWebsocketConnection(questionId) {

    console.log("");

    if(commentSocket){
        cancelCommentSocket();
    }
    
    currentQuestionId = questionId;

    // Creates the new websocket connection
    commentSocket = new WebSocket(webSocketUrl);

    // When the connection is 1st created, this code runs subscribing the clien to a specific chatroom stream in the ChatRoomChannel
    commentSocket.onopen = function(event) {
        console.log('COMMENT WebSocket is connected.', commentSocket);

        const msg = {
            command: 'subscribe',
            identifier: JSON.stringify({
                id: questionId,
                channel: 'QuestionChannel'
            }),
        };

        commentSocket.send(JSON.stringify(msg));
    };
    
    // When the connection is closed, this code is run
    commentSocket.onclose = function(event) {
        console.log('WebSocket is closed.');
        returnToMainPage();
    };

    // When a message is received through the websocket, this code is run
    commentSocket.onmessage = function(event) {            
        const response = event.data;
        const msg = JSON.parse(response);
        
        // Ignores pings
        if (msg.type === "ping" || msg.type === "confirm_subscription" || msg.type === "welcome") {
            return;
        } 

        console.log("COMMENT FROM RAILS: ", msg);
        
        // Renders any newly created messages onto the page
        if (msg.message) {
            console.log("COMMENT SOCKET MESSAGE", msg);
            if(msg.message.type === "new"){
                appendComment(msg.message, true);
            }
            else if(msg.message.type === "answer"){
                // reload this page?
                viewQuestion(currentQuestionId);
            }
        }
    };
    
    // When an error occurs through the websocket connection, this code is run printing the error message
    commentSocket.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };
}

function cancelCommentSocket(){
    if(commentSocket && currentQuestionId){
        console.log("end websocket for new comments");

        const msg = {
            command: 'unsubscribe',
            identifier: JSON.stringify({
                id: currentQuestionId,
                channel: 'QuestionChannel'
            }),
        };

        commentSocket.send(JSON.stringify(msg));
        commentSocket.close();
    }

    commentSocket = null;
    currentQuestionId = null;
}

//
//
// GET NOTIFICATIONS
//
//

//
//
// Opens a websocket connection to a specific Chat Room stream
function createNotificationWebsocketConnection() {
    
    // Creates the new websocket connection
    const socket = new WebSocket(webSocketUrl);

    // When the connection is 1st created, this code runs subscribing the clien to a specific chatroom stream in the ChatRoomChannel
    socket.onopen = function(event) {
        console.log('WebSocket is connected.', socket);

        const msg = {
            command: 'subscribe',
            identifier: JSON.stringify({
                channel: 'NotificationChannel'
            }),
        };

        socket.send(JSON.stringify(msg));
    };
    
    // When the connection is closed, this code is run
    socket.onclose = function(event) {
        console.log('WebSocket is closed.');
        // returnToMainPage();
    };

    // When a message is received through the websocket, this code is run
    socket.onmessage = function(event) {            
        const response = event.data;
        const msg = JSON.parse(response);
        
        // Ignores pings
        if (msg.type === "ping" || msg.type === "confirm_subscription" || msg.type === "welcome") {
            return;
        } 

        console.log("FROM RAILS: ", msg);
        
        // Renders any newly created messages onto the page
        if (msg.message) {
            console.log("from broadcast", msg);
            console.log(msg.message);
            console.log(msg.message.users);
            if(currentUser && msg.message.users.some(id => {
                console.log(id, currentUser.id);
                return id === currentUser.id;
            })){
                getNotifications();
            }
        }
    };
    
    // When an error occurs through the websocket connection, this code is run printing the error message
    socket.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };
}