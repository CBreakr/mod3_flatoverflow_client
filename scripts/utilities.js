
function escapeHtml(unsafe) {
    if(unsafe){
        return unsafe
        .replace(/</g, " &lt; ")
        .replace(/>/g, " &gt; ")
        .replace(/"/g, " &quot; ")
        .replace(/'/g, " &#039; ");
        //         .replace(/&/g, " &amp; ")
    }
    return unsafe;
}

function cleanQuestion(question){
    question.title = escapeHtml(question.title);
    question.text = escapeHtml(question.text);
    question.update_note = escapeHtml(question.update_note);
}

function cleanComment(comment){
    comment.text = escapeHtml(comment.text);
}

function cleanTag(tag){
    tag.text = escapeHtml(tag.text);
}