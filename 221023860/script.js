const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 60; // or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  


startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

//Function for starting the timer
function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}

//function to start the quiz
function startQuiz() {

nameField.disabled=true
idField.textContent =`Id:${idField.value}`
idField.disabled=true
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}

//function to set next question

function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "YOUR GRADE  " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

//Function to display the questions
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}
//function to reset the state of the body

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}


function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [ {    question: 'Do men live longer than women?',    answers: [      { text: 'No', correct: true },      { text: 'Yes', correct: false }    ]
},
{
  question: 'Which kind of ladies do Ghanaian men prefere?',
  answers: [
      { text: 'Dbee Ladies', correct: true },
      { text: 'Hour glass shaped women', correct: true },
      { text: 'Normal Lady', correct: false },
      { text: 'Fiar bad Women', correct: true }
  ]
},
{
  question: 'Do witches exist?',
  answers: [
    { text: 'Yes', correct: true },
    { text: 'No', correct: false }
   
  ]
},
{

  question: 'How many senses do human Beings have?',
  answers: [
      { text: '90', correct: false },
      { text: '8', correct: false },
      { text: '15', correct: false },
      { text: '5', correct: true }
  ]
},
{
question: 'Who has been the best class prefect in our class?',
answers: [
    { text: 'Johanan Aido', correct: true },
    { text: 'Kratos Emmanuel', correct: false },
    { text: 'Iris Orthogonal', correct: false },
    { text: 'Jernuel Malkatruv', correct: false }
]
},
{
question: 'Is polygamy accepted in America?',
answers: [

  { text: 'Yes.', correct: false },
  { text: 'No', correct: true }
]
},
{
question: 'What is the percentage of people who want to travel out of Ghana?',
answers: [
  { text: '1.9%', correct: false },
  { text: '20%', correct: false },
  { text: '15%', correct: false },
  { text: '110%', correct: true }
]
},
{
question: 'What is the shape of the world?',
answers: [
  { text: 'Box', correct: false },
  { text: 'Circle', correct: false },
  { text: 'Sphere', correct: true },
  { text: 'Flat', correct: false }
]
},
{
question: 'Capital city of Ghana is?',
answers: [
  { text: 'Kumasi', correct: false },
  { text: 'Keta', correct: false },
  { text: 'Greater Accra', correct: true },
  { text: 'Dome', correct: false }
]
},
{
question: 'Are you sure you will pass?',
answers: [
  { text: 'Yes', correct: true },
  { text: 'No', correct: true }
]
},
 
];
