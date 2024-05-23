// Array of questions and answers.
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
        question: "Which language has the longest alphabet?",
        answers: [
            {text: "Khmer", correct: true},
            {text: "Arabic", correct: false},
            {text: "English", correct: false},
            {text: "Russian", correct: false}
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
        question: "What is the tallest breed of dog?",
        answers: [
            {text: "Great Dane", correct: true},
            {text: "German Shepard", correct: false},
            {text: "Chihuahua", correct: false},
            {text: "Beagle", correct: false}
        ]
    },
    {
        question: "What color is the sunset on Mars?",
        answers: [{text: "Blue", correct: true}]
    },
    {
        question: "What is the largest continent?",
        answers: [{text: "Asia", correct: true}]
    },
    {
        question: "Which U.S. state is the only state to grow coffee beans?",
        answers: [{text: "Hawaii", correct: true}]
    },
    {
        question: "How many bones are in the human body?",
        answers: [{text: "206", correct: true}]
    },
    {
        question: "In what year was the internet opened to the public?",
        answers: [{text: "1993", correct: true}]
    }
]

// Get the HTML elements.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Initialize the current question index and score.
let currentQuestionIndex = 0;
let score = 0

// Function to reset the state of the quiz.
function resetState(){
    // Hide the next button and remove all answer buttons.
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to display a question.
function showQuestion(){
    resetState();
    // Get the current question.
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;
    // Randomly sort the answers and create a button for each.
    currentQuestion.answers.sort( () => Math.random()-0.5 ).forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        // Add an event listener to handle the answer selection.
        button.addEventListener("click", selectAnswer);
    });
}

// Function to handle the answer selection.
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    // Update the score and the class of the button based on whether the answer is correct or not.
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // Disable all buttons and highlight the correct answer.
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Show the next button.
    nextButton.style.display = "block";
}

// Function to start the quiz.
function startQuiz(){
    // Randomly sort the questions.
    questions.sort( () => Math.random()-0.5 );
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to show the score.
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to handle the next button click.
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// Add an event listener to the next button.
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

// Start the quiz.
startQuiz();
