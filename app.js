const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "giraffe", correct: false},
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            {text: "New Delhi", correct: true},
            {text: "Mumbai", correct: false},
            {text: "Chennai", correct: false},
            {text: "Bangalore", correct: false},
        ]
    },
    {
        question: "Who created Bitcoin?",
        answers: [
            {text: "Dorian Nakamoto", correct: false},
            {text: "Craig Wright", correct: false},
            {text: "Satoshi Nakamoto", correct: true},
            {text: "Changpeng Zhao", correct: false},
        ]
    },
    {
        question: "Which flies a green, white, and orange (in that order) tricolor flag?",
        answers: [
            {text: "India", correct: false},
            {text: "Italy", correct: false},
            {text: "Ivory Coast", correct: false},
            {text: "Ireland", correct: true},
        ]
    },
    {
        question: "Which of the following languages has the longest alphabet?",
        answers: [
            {text: "Greek", correct: false},
            {text: "French", correct: false},
            {text: "Arabic", correct: false},
            {text: "Russian", correct: true},
        ]
    },
    {
        question: "What is the largest US state (by landmass)?",
        answers: [
            {text: "Alaska", correct: true},
            {text: "California", correct: false},
            {text: "Arizona", correct: false},
            {text: "Texas", correct: false},
        ]
    },
    {
        question: "What city hosted the 2002 Olympic Games?",
        answers: [
            {text: "Tokyo", correct: false},
            {text: "Beijing", correct: false},
            {text: "Sydney", correct: true},
            {text: "London", correct: false},
        ]
    },
    {
        question: "Which of the following was considered one of the Seven Ancient Wonders?",
        answers: [
            {text: "The Great wall of China", correct: false},
            {text: "Colossus of Rhodes", correct: true},
            {text: "Colosseum", correct: false},
            {text: "Petra Jordan", correct: false},
        ]
    },
    {
        question: "What is the strongest muscle in the human body?",
        answers: [
            {text: "Tongue", correct: false},
            {text: "Heart", correct: false},
            {text: "Glute", correct: false},
            {text: "Jaw", correct: true},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Monaco", correct: false},
            {text: "San Marino", correct: false},
            {text: "Vatican City", correct: true},
            {text: "Rome", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();