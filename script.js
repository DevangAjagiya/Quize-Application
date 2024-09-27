
const questions = [
    {
        question: "Which is the largest animal in the planet?",
        answers:[
            { text: "Shark", correct: false},
            { text: "Elephant", correct: true},
            { text: "Rabbit", correct: false},
            { text: "Lion", correct: false},
        ]
    },

    {
        question: "Which is the biggest star in the universe?",  
        answers:[
            { text: "Sun", correct: true},
            { text: "Mars", correct: false},
            { text: "Jupiter", correct: false},
            { text: "Venus", correct: false},
        ]
    },

    {
        question: "Who is the prime minister of Canada?",
        answers:[
            { text: "Narendra Modi", correct: false},
            { text: "Donald Trump", correct: false},
            { text: "Justin Trudeau", correct: true},
            { text: "Rishi Shunak", correct: false},
        ]
    },

    {
        question: "Where is the Taj Mahal?",
        answers:[
            { text: "Canada", correct: false},
            { text: "America", correct: false},
            { text: "Brazil", correct: false},
            { text: "India", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const timerElement = document.getElementById("timer-countdown");
let timerInterval;
let timerSeconds = 60; // Set the timer duration in seconds

const startTimer = () => {
  timerInterval = setInterval(updateTimer, 1000);
}

const updateTimer = () => {
    timerElement.textContent = timerSeconds;
    if (timerSeconds === 0) {
      clearInterval(timerInterval);
      handleNextButton();
    } else {
      timerSeconds--;
    }
}

const resetTimer = () => {
  clearInterval(timerInterval);
  timerSeconds = 60;
  timerElement.textContent = timerSeconds;
}




let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () =>{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
}

const showQuestion = () =>{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        });
    }

    const resetState = () =>{
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }


    const selectAnswer = (e) =>{
        let selectedBtn = e.target;
        let iscorrect = selectedBtn.dataset.correct === "true";

        if(iscorrect)
        {
            selectedBtn.classList.add("correct");
            score++;
        }
        else
        {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button =>{
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    const showScore = () =>{
        resetState();
        questionElement.innerHTML = ` You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    const handleNextButton =() =>{
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }
        else
        {
            showScore();
        }
    }

    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }
        else
        {
            startQuiz();
        }
    })

startQuiz();
