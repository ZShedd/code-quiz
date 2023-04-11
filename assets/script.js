// declare variables:
let timerElement = document.getElementById('countdown');
let quizElement = document.getElementById('quiz');
let quizElementDisplaySetting = quizElement.style.display;
let quizQuestionElement = document.getElementById('quiz-questions');
let finalResults = document.getElementsByClassName("final");
let intro = document.getElementById('intro');
let submitBtn = document.getElementById('submit-question');
let startBtn = document.getElementById('start-btn');
let answers = document.getElementsByName("answer");
let displayQuestionResults = document.getElementById("question-results");
let questionResults = document.createElement('div');
let finalScore = document.getElementById('final-score');
let userName = document.getElementById('user-name');
let submitScoreBtn = document.getElementById('submit-score');
let highScorePage = document.getElementById('high-scores')
let highScoreNav = document.getElementById('nav-item');
let highScoresList = document.getElementById('high-scores-list');
let addHighScore = document.createElement('li');

let timeLeft = 60;

let totalCorrectAnswers = 0;
let questionNumber = 0; 
let shuffledQuestionsArray = [];

let currentQuestion = {};
let currentQuestionAnswer;

function countdown() {
    var timeInterval = setInterval(function () {
        if (finalResults[0].style.display == 'block') {
            // If user finishes quiz before time runs out:
            timeLeft = 0;
            clearInterval(timeInterval);
            timerElement.textContent = "";
        } else if (timeLeft >= 1) {
            // normal timer 
            timerElement.textContent = timeLeft;
            timeLeft--;
        } else {
            // handle when time runs out
            clearInterval(timeInterval);
            timerElement.textContent = "Time's Up!";
            quizQuestionElement.style.display = 'none';
            finalResults[0].style.display = 'block';
            quizResults();
        }
    }, 1000)
}

const questions = [
    {
        question: 'How do you declare a variable in JS?',
        optionA: "var",
        optionB: "let",
        optionC: "const",
        optionD: "all of the above",
        answer: "optionD"
    },
    {
        question: 'What is the OR operator in JS?',
        optionA: "||",
        optionB: "&&",
        optionC: "or",
        optionD: ">=",
        answer: "optionA"
    },
    {
        question: 'What is a dynamically typed language??',
        optionA: "the interpreter assigns variables at runtime",
        optionB: "the interpreter assigns variables at compile time",
        optionC: "the programmer must specify what type each variable is",
        optionD: "A language that allows for dynamic variables",
        answer: "optionA"
    },
    {
        question: 'How do you initiate a multi-line comment in JS?',
        optionA: "--",
        optionB: "<#",
        optionC: "/**",
        optionD: '"""',
        answer: "optionC"
    },
    {
        question: 'What is an example of high-level programming language?',
        optionA: "Python",
        optionB: "C",
        optionC: "Javascript",
        optionD: "Option 1 & Option 3",
        answer: "optionD"
    },
    {
        question: 'What does HTML stand for?',
        optionA: "Home Tool Markup Language",
        optionB: "Hyper Text Markup Language",
        optionC: "Hyperlinks and Text Markup Language",
        optionD: "Option 1 & Option 3",
        answer: "optionB"
    },
    {
        question: 'How many tags are in a regular element in HTML?',
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        answer: "optionB"
    },
    {
        question: 'What is an array?',
        optionA: "A list",
        optionB: "An ordered list",
        optionC: "A dictionary",
        optionD: "A string",
        answer: "optionA"
    },
    {
        question: 'What does JSON stand for?',
        optionA: "Java Source Open Network",
        optionB: "Javascript Stringify On Note",
        optionC: "Javascript Object Notation",
        optionD: "Java Standard Output Network",
        answer: "optionC"
    },
    {
        question: 'How do you remove the last item in an array in JS?',
        optionA: ".remove(item)",
        optionB: ".splice",
        optionC: "array[-1]",
        optionD: ".pop",
        answer: "optionD"
    }
]

function shuffleQuestions() {
    while (shuffledQuestionsArray.length <= 9) {
        let random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestionsArray.includes(random)) {
            shuffledQuestionsArray.push(random)
            let questionIndex = questions.indexOf(random)
            if (questionIndex > -1) {
                questions.splice(questionIndex,1)
            }
        }
    }
}

function nextQuestion() {
    // clear question result
    if (questionResults) {
        questionResults.textContent = '';
    }

    // set question and answer
    shuffleQuestions();
    let currentQuestion = shuffledQuestionsArray[questionNumber];
    document.getElementById("question-title").textContent = currentQuestion.question;
    document.getElementById("optionA").textContent = currentQuestion.optionA;
    document.getElementById("optionB").textContent = currentQuestion.optionB;
    document.getElementById("optionC").textContent = currentQuestion.optionC;
    document.getElementById("optionD").textContent = currentQuestion.optionD;
    currentQuestionAnswer = currentQuestion.answer;

    // clears preselected options from questions
    let options = document.querySelector('input[name="answer"]:checked')

    if (options) {
        options.checked = false;
    }


    questionNumber++;
}

function navigateAfterSubmission() {
    if(questionNumber < 10){
        nextQuestion(questionNumber);
    } else {
        // hide questions and display final score
        quizQuestionElement.style.display = 'none';
        finalResults[0].style.display = 'block';
        quizResults();
    }
}

function submitQuestion () {
    // check answer & display if correct or not
    let answerChoices = document.getElementsByName("answer"); 
    let selectedAnswer;
    
    // style questionResults
    // questionResults.style.color, etc etc
    displayQuestionResults.appendChild(questionResults);

    for (let i = 0; i < answerChoices.length; i++) {
        if (answerChoices[i].checked) {
            selectedAnswer = answerChoices[i].value;
            if (selectedAnswer == currentQuestionAnswer) {
                questionResults.style.color = "green"
                questionResults.textContent = "Correct!"
                totalCorrectAnswers++;
                setTimeout(navigateAfterSubmission, 1000);
            } else {
                questionResults.style.color = "red"
                questionResults.textContent = "Wrong! -10 seconds from the clock."
                timeLeft = timeLeft - 10;
                setTimeout(navigateAfterSubmission, 1000);
            }
        }
    }
}

function quizResults() {
    let score = `${totalCorrectAnswers}/10`
    finalScore.textContent += score;
}

function submitScore() {
    let highScoreEntry = {
        userName: userName.value,
        totalCorrectAnswers: totalCorrectAnswers,
    }

    localStorage.setItem('highScoreEntry', JSON.stringify(highScoreEntry));
    navigateToHighScores();
}

function navigateToHighScores() {
    // only show high score page
    intro.style.display = 'none'
    quizQuestionElement.style.display = 'none';
    finalResults[0].style.display = 'none';
    quizElement.style.display = 'block'
    highScorePage.style.display = 'block';

    let retrieveScore = localStorage.getItem('highScoreEntry');
    let parsedScore = JSON.parse(retrieveScore);

    console.log(parsedScore.userName)
    // display results
    highScoresList.appendChild(addHighScore);
    addHighScore.textContent = parsedScore.userName + ' - ' + parsedScore.totalCorrectAnswers + ' pts'

}

function startQuiz() {
    if (quizElementDisplaySetting == 'block') {
        // show intro & hide quiz
        quizElement.style.display = 'none';
    }
    else {
        // show quiz & hide intro 
        quizElement.style.display = 'block';
        intro.style.display = 'none'
    }

    countdown();
    nextQuestion(questionNumber);
}

startBtn.addEventListener("click", startQuiz)
submitBtn.addEventListener("click", submitQuestion)
submitScoreBtn.addEventListener("click", submitScore)
highScoreNav.addEventListener("click", navigateToHighScores)