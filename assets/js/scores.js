var scoresheet = document.getElementById("scoresheet");
var goBack = document.getElementById("goBack");

function backToQuiz(){
    window.location.href = 'index.html';
}

for(var i = 0; i < localStorage.length; i++){
    var username = localStorage.key(i);
    var score = localStorage.getItem(username);

    var result = document.createElement("div");
    result.classList.add("result");

    result.innerHTML = `<div class="player-item">$(username)</div>
            <div class="score-item>$(score)"</div>`;
    
    scoresheet.appendChild("result");
}

goBack.addEventListener("click", backToQuiz);