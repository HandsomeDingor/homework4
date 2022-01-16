
var questions = [
    {
        title: "Which one is a looping structure in JavaScript?",
        choices: ["All the below",
         "For",
        "While", 
         "do-while loops"
        ],
        answer: "All the below"
    },
    {
        title: "What are the two basic groups of data types in JavaScript?",
        choices: [
            "Primitive and attribute",
            "Primitive and reference types",
            "Reference types and attribute",
            "None of the above"
        ],
        answer: "Primitive and reference types"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: [
            "strings", "booleans", "alerts", "numbers"
        ],
        answer: "booleans"
    },
    {
        title: "The condition in an if / else statement in enclosed within _______.",
        choices: [
            "quotes", "curly brackets", "parenthesis", "square brackets"
        ],
        answer: "quotes"
    },
    {
        title:  "Arrays in JavaScript can be used to store _______.",
        choices: [
            "numbers and strings", "other arrays", "booleans", "all of the above", "none of the above"
        ],
        answer: "booleans"
    },
    {
        title:  "String values must be enclosed within _______ when being assigned to variables",
        choices: [
            "commas", "curly brackets", "quotes", "parenthesis"
        ],
        answer: "curly brackets"
    },
    {
        title:  "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "JavaScript", "terminal / bash", "for loops", "console.log"
        ],
        answer: "for loops"
    }


];




var startButtonEl = document.getElementById("start-btn")
var startQuizEl = document.getElementById("startQuiz");

var questioncontainerEl = document.getElementById("question-container")
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var feedbackEl = document.getElementById("answer")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var btnGoBackEl = document.getElementById("go-back")
var btnClearScoresEl = document.getElementById("clear-high-scores")
var doneEl = document.getElementById("done");


var currentQuestionIndex = 0;

var score = 0;


//High Score Array
var HighScores = [];

var setTime = function () {
    timeleft = 100;

    var timercheck = setInterval(function () {
        timerEl.innerText = "Time: " + timeleft--;

        if (currentQuestionIndex === questions.length) {
            timerEl.innerText = "Time: " + timeleft;
            clearInterval(timercheck);
            quizEnd();
        }


        else if (timeleft < 0) {

            timerEl.innerText = "Time: 0";
            timeleft = 0;
            clearInterval(timercheck);
            quizEnd();
        }

        // else if (){
        //     clearInterval(timercheck);
        // }

        else {
            getQuestion();
        }
    }, 1000)
}






function startQuiz() {
    startButtonEl.setAttribute("class", "hide")
    startQuizEl.setAttribute("class", "hide")

    // un-hide questions section
    questioncontainerEl.setAttribute("class", "")


    setTime();
    getQuestion();
}

function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function (choice, i) {
        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // attach click event listener to each choice
        choiceNode.onclick = questionClick;

        // display on the page
        choicesEl.appendChild(choiceNode);
    });
}


function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        timeleft -= 10;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "200%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "200%";
    }

    // flash right/wrong feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // next question
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        timerEl.innerText = "Time: " + timeleft;

        quizEnd();
    }

    else {
        getQuestion();
    }
    

}


function quizEnd() {

    // show end screen
    doneEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = timeleft;

    // hide questions section
    questioncontainerEl.setAttribute("class","hide")
}









//create high score values
var createHighScore = function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        return;
    }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: timeleft
    }

    //push and sort scores
    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });

    //clear visibile list to resort
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }

    saveHighScore();
    displayHighScores();

}


//save high score
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))

}

//load values/ called on page load
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => { return b.score - a.score })


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);

    }
    
    
}

//display high score screen from link or when intiials entered
var displayHighScores = function () {
   

    containerHighScoresEl.setAttribute("class","none");
    
    doneEl.setAttribute("class", "hide")
    startQuizEl.setAttribute("class","hide")

    questioncontainerEl.setAttribute("class","hide")

    currentQuestion=0;
    currentQuestionIndex = 0;

    return setTime;

   




}
//clears high scores
var clearScores = function () {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);

}

loadHighScore()





//if go back button is hit on high score page
var goback = function () {
    containerHighScoresEl.setAttribute("class", "hide")
    
    
    startButtonEl.setAttribute("class", "")
    startQuizEl.setAttribute("class", "title")
    currentQuestion=0;
    currentQuestionIndex = 0;

    

 
}









startButtonEl.addEventListener('click', startQuiz);

formInitials.addEventListener("submit", createHighScore)

ViewHighScoreEl.addEventListener("click", displayHighScores)

btnGoBackEl.addEventListener("click", goback)

btnClearScoresEl.addEventListener("click", clearScores)

