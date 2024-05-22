const questions = [
    {
        question: "What is the tiny piece at the end of a shoelace called?",
        answers: [
            {text: "Aglet", correct: true},
            {text: "End", correct: false},
            {text: "Tie", correct: false},
            {text: "Thingy", correct: false}
        ]
    },
    {
        question: "Which of the following languages has the longest alphabet?",
        answers: [
            {text: "Russian", correct: true},
            {text: "Arabic", correct: false},
            {text: "English", correct: false},
            {text: "Greek", correct: false}
        ]
    },
    {
        question: "Which of the following is NOT a fruit?",
        answers: [
            {text: "Rhubarb", correct: true},
            {text: "Tomatoes", correct: false},
            {text: "Avocados", correct: false},
            {text: "Pumpkins", correct: false}
        ]
    },
    {
        question: "What city hosted the 2002 Olympic Games?",
        answers: [
            {text: "Sydney", correct: true},
            {text: "Tokyo", correct: false},
            {text: "Los Angeles", correct: false},
            {text: "Oslo", correct: false}
        ]
    },
    {
        question: "What color is the sunset on Mars?",
        answers: [
            {text: "Blue", correct: true},
            {text: "Green", correct: false},
            {text: "Red", correct: false},
            {text: "Pink", correct: false}
        ]
    },
    {
        question: "How many bones are in the human body?",
        answers: [
            {text: "206", correct: true},
            {text: "300", correct: false},
            {text: "195", correct: false},
            {text: "777", correct: false}
        ]
    },
    {
        question: "Which U.S. state is the only state to grow coffee beans?",
        answers: [
            {text: "Hawaii", correct: true},
            {text: "Oregon", correct: false},
            {text: "Wyoming", correct: false},
            {text: "Florida", correct: false}
        ]
    },
    {
        question: "What is the tallest breed of dog?",
        answers: [
            {text: "Great Dane", correct: true},
            {text: "German Shepard", correct: false},
            {text: "Chihuahua", correct: false},
            {text: "Beagle", correct: false}
        ]
    },
    {
        question: "What is the largest continent?",
        answers: [
            {text: "Asia", correct: true},
            {text: "North America", correct: false},
            {text: "Europe", correct: false},
            {text: "Africa", correct: false}
        ]
    },
    {
        question: "In what year was the internet opened to the public?",
        answers: [
            {text: "1993", correct: true},
            {text: "1990", correct: false},
            {text: "2000", correct: false},
            {text: "2024", correct: false}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;
    currentQuestion.answers.sort( () => Math.random()-0.5 ).forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
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
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function startQuiz(){
    questions.sort( () => Math.random()-0.5 );
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
