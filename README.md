
# FlatOverflow

Many thanks to my project partner Uriel Rodriguez: https://github.com/codenameuriel

Production URL: https://flatoverflow.herokuapp.com/

Demo Video: https://youtu.be/yXrTgQEpQv8

Server-side repo: https://github.com/CBreakr/mod3_flatoverflow_server

## Question and Answer Forum

A simple StackOverflow clone, allowing users to ask questions and receive answers and comments, as well as upvote quality content. Correct answers can be marked by the user who asked the question.

Questions can be tagged, and the leading tags can be used to filter questions for view.

There's also a notification system to keep users informed of changes. Answers on their own questions will generate notifications. If a user answers a question, they will be notified about further answers.

Clicking on a username on the main screen will follow that user. When that user creates a new question, users following them will be notified.

## Technical Details

This site uses vanilla Javascript for the frontend and Ruby on Rails for the backend. A postgreSQL database is used for storage. 

## Next Step

Right now login involves just a username, without any sort of authentication, so the next step is to apply a proper JWT authentication scheme using LocalStorage.

As a corollary to this, having a proper "loading" display during the login process would be useful, rather than the current pause.