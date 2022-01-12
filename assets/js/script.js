const startButtonEl = document.getElementById("start-btn")
const questionEl = document.getElementById("question");
const startEl = document.getElementById("start")
const questioncontainerEl = document.getElementById("question-container")


startButtonEl.addEventListener('click', startQuiz)

function startQuiz(){
    startButtonEl.style.display= "none";
    startEl.style.display="none";
    questioncontainerEl.style.display="flex";

}

