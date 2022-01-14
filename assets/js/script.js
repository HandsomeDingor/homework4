
var questions = [
    {
        title: "Which one is a looping structure in JavaScript?",
        choices: ["All the below", "For", "While", "do-while loops"],
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
    }

];




var startButtonEl = document.getElementById("start-btn")
var startEl = document.getElementById("start")
var questioncontainerEl = document.getElementById("question-container")
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var feedbackEl = document.getElementById("answer")

var currentQuestionIndex = 0;


var setTime = function () {
    timeleft = 100;

    var timercheck = setInterval(function () {
        timerEl.innerText = "Time: " + timeleft--;
  
        if(currentQuestionIndex === questions.length){
            timerEl.innerText = "Time: " + timeleft;
            clearInterval(timercheck);
            quizEnd();
        }


        else if (timeleft < 0) {
           
            timerEl.innerText = "Time: 0";
            timeleft=0;
            clearInterval(timercheck);
            quizEnd();
        }
       else {
        getQuestion();
      }
    }, 1000)
}






function startQuiz() {
    var startQuizEl = document.getElementById("startQuiz");
    startButtonEl.setAttribute("class","hide")
    startQuizEl.setAttribute("class","hide")

    // un-hide questions section
    questioncontainerEl.setAttribute("class","")


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
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // next question
    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length){
        timerEl.innerText = "Time: " + timeleft;
  
        quizEnd();
    }

     else {
        getQuestion();
    }
  
}
  

function quizEnd() {

    // show end screen
    var doneEl = document.getElementById("done");
    doneEl.removeAttribute("class");
  
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = timeleft;
  
    // hide questions section
    questioncontainerEl.style.display = "none";
}
  






startButtonEl.addEventListener('click', startQuiz);


