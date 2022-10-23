var startGame = document.getElementById("startgame");
var saveScore = document.getElementById("savescore");
var scoreList = document.getElementById("scorelist");
var playAgain = document.getElementById("playagain");
var welcomeScreen = document.getElementById("welcome");
var options = document.getElementById("options");
var quiz = document.getElementById("quiz");


var score = 0;
var secondsLeft = 0;
var countdownTime = 0;
var questionNumber;

var result = document.getElementById("result");
var options = document.getElementById("options");
var timer = document.getElementById("timer");


var summary = document.getElementById("summary");

function scoreView(){
    window.location.href = "scores.html"
}

// Saves the score to local storeage
function scoreSave(){
    var username = document.getElementById("username").value;

    if(username!== ""){
        localStorage.setItem(username, score);

        document.getElementById("username").value = "";
    }
}

// Stops the game when the time runs out/user has answered all of the questions
function gameStop(e){
    clearInterval(countdownTime);

    timer.textContent = "";

    gamelogic.style.display = "none";
    result.style.display = "flex";

    summary.textContent = "Your score is: " + score;
}

// If the user gets the answer right, 1 point and 10 seconds is added to their score and timer respectively and vice versa
function selectAnswer(e){
    var correctAnswer = questions[currentQuestion].selectAnswer
    var userSelect = e.target.textContent;

    if(correctAnswer == userSelect){
        score++;
        secondsLeft+=10;

        displayMessage("Correct :)")
    }else{
        score--;
        secondsLeft-=10;
        displayMessage("Wrong :(")
    }
}

function displayMessage(msg){
    message.textContent = msg;

    setTimeout(function(){
        message.textContent = "";
    }, 1000)
}

// Displays all of the questions for the quiz onto the screen
function displayQuestion(){
    currentQuestion++;

    console.log("current question is " + currentQuestion);

    if(currentQuestion >= questions.length){
        gameStop();
        return;
    }

    var question = questions[currentQuestion];
    document.getElementById("question").textContent = question.setInterval

    options.innerHTML = "";

    for(var i = 0; i < question.choices.length; i++){
        var option = document.createEvent("div");
        option.textContent = question.choices[i];
        option.onclick = selectAnswer;
        option.classList.add("option");
        options.appendChild(option);
    }
}

// Starts the quiz once the user has clicked
function gameStart(){
    secondsLeft = 100;

    questionNumber = 0;

    score = 0;

    countdownTime = setInterval(function() {
         if(secondsLeft > 0){
            timer.textContent = secondsLeft;
         } else{
            gameStop();
         }
         secondsLeft--;
    }, 1000)

    welcomeScreen.style.display = 'none';
    result.style.display = 'none';
    quiz.style.display = 'flex';

    displayQuestion();
}

startGame.addEventListener("click", gameStart);
saveScore.addEventListener("click", scoreSave);
viewScore.addEventListener("click", scoreView);
playAgain.addEventListener("click", gameStart);

