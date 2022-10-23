var startGame = document.getElementById("startGame");
var saveScore = document.getElementById("saveScore");
var viewScore = document.getElementById("viewScore");
var playAgain = document.getElementById("playAgain");
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

    quiz.style.display = "none";
    result.style.display = "flex";

    summary.textContent = "Your score is: " + score;
}

// If the user gets the answer right, 1 point is added to their score. If not, 1 pont and ten seconds are deducted from the timer.
function selectAnswer(e){
    var correctAnswer = questions[questionNumber].answer
    var userSelect = e.target.textContent;

    if(correctAnswer == userSelect){
        score+=5;

        displayMessage("Correct :)")
    }else{
        score--;
        secondsLeft-=10;
        displayMessage("Wrong :(")
    }

    displayQuestion();
}

function displayMessage(msg){
    message.textContent = msg;

    // Clears the message after a second
    setTimeout(function(){
        message.textContent = "";
    }, 1000)
}

// Displays all of the questions for the quiz onto the screen
function displayQuestion(){
    // Increments the current question by one
    questionNumber++;

    // Logs to the console which question the user is currently on
    console.log("current question is " + questionNumber);

    // Stops the game is the user has finished the quiz
    if(questionNumber >= questions.length){
        gameStop();
        return;
    }

    // Stores the questions from the questions.js file into an array
    var question = questions[questionNumber];
    document.getElementById("question").textContent = question.title;

    options.innerHTML = "";

    // This loop will show the options from the questions.js file and display them in a list for the user to choose.
    for(var i = 0; i < question.choices.length; i++){

        var option = document.createElement("button");
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

    // Decrements the timer by one until there is none left, the stops the game
    countdownTime = setInterval(function() {
         if(secondsLeft > 0){
            timer.textContent = secondsLeft;
         } else{
            gameStop();
         }
         secondsLeft--;
    }, 1000)

    // Once the game starts, both the welcome screen and the results screen are hidden from the user, displaying the questions and the options for them to shoose from
    welcomeScreen.style.display = 'none';
    result.style.display = 'none';
    quiz.style.display = 'flex';

    displayQuestion();
}

startGame.addEventListener("click", gameStart);
saveScore.addEventListener("click", scoreSave);
viewScore.addEventListener("click", scoreView);
playAgain.addEventListener("click", gameStart);

