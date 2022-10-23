var scoresheet = document.getElementById("scoresheet");
var goBack = document.getElementById("goBack");

// Returns the user to the main page of the quiz
function backToQuiz(){
    window.location.href = 'index.html';
}

// Stores the users name and score to local storage, then prints it off whener the user achieves a new score
for(var i = 0; i < localStorage.length; i++){
    var username = localStorage.key(i);
    var score = localStorage.getItem(username);

    var result = document.createElement("div");
    result.classList.add("result");

    result.innerHTML = "";
    
    scoresheet.appendChild("result");
}

goBack.addEventListener("click", backToQuiz);