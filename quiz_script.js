function updateClock () {
  let date_time = new Date().toLocaleString()
document.getElementById('date').innerHTML = "The time is: " + date_time;
setTimeout(updateClock, 1000);
}
updateClock();

const time = 400;
let slideNum = 0;
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');


// This is an array of quiz question objects. Each question object has a question, 
// set of answers, and a correct answer.

const questionContent= [{
  question : "How old are you?",
  answers : { a : "0-25", 
              b : "26-50",
              c : "51-75",
              d : "75+"},
  correctAnswer : "a"
  },
  {
  question : "Which is your favorite ice cream flavor?",
  answers : { a : "Chocolate", 
              b : "Vanilla",
              c : "Strawberry",
              d : "Mint Oreo and Coffee Heath from Ben and Bill's"},
  correctAnswer : "d"
  },
  {
  question : "Do you like quizzes?",
  answers : { a : "Yes", 
              b : "No",
              c : "They are super fun. Especially this one."},
  correctAnswer : "c"
  },
  {
  question : "Which of these do you prefer?",
  answers : { a : "Dogs", 
              b : "Cats",
              c : "Kangaroos",
              d : "Squirrels"},
  correctAnswer : "a"
  }
]




function buildQuiz() {
  const output = [];

  //This adds the HTML for each question based on the questionContent variable.

  questionContent.forEach((currentQuestion, index) => {
    let answers = [];

    output.push(`<div class = "hidden" id = "question_${index + 1}">
                 <div class=question> 
                    ${currentQuestion.question}
                 </div>`);
    
    for (letter in currentQuestion.answers) {
      answers.push(`<div class = "answer">
                    <label>
                      <input class = "ans" type="radio" name="question_${index}" value="${letter}"> 
                      ${letter} : ${currentQuestion.answers[letter]}
                    </label>
                    </div>
                    `
                    );
    }

    output.push(answers.join('') + "</div>");
    
  })
  quizContainer.innerHTML = output.join("");

}

buildQuiz();



function showQuestion(n) {

  slideNum += n
  
  // This section handles the buttons shown:

  $("#start_button").hide()

  //replaces the submit button with the next button 
  //on last question
  if (slideNum === questionContent.length) {
    $("#next").hide()
    $('#submit').delay(time).fadeIn()

  }
  //Hides the previous button on the first question
  else if (slideNum === 1) {
    $("#previous").hide();
    $("#next").delay(time).fadeIn(time)
  }

  // If the question isn the first or last this shows the 
  // Next and Previous buttons and hides the submit button

  else if (slideNum > 1) {
      $('#next').hide().removeClass().delay(time).fadeIn(time);
      $('#submit').hide()
      $("#previous").hide().removeClass().delay(time).fadeIn(time);
  }

  //This section handles the questions shown:

  //Previous button shows previous question
  if(n === -1) {
    $(`#question_${slideNum + 1}`).fadeOut(time);
    $(`#question_${slideNum}`).delay(time).fadeIn(time);
  }
  // Next Button shows next question
  if (n === 1) {
    $(`#question_${slideNum - 1}`).fadeOut(time);
    $(`#question_${slideNum}`).delay(time).fadeIn(time);
  }
  
}

function showResults () { 
  
  $(`#question_${questionContent.length}`).fadeOut(time)
  $('#previous').fadeOut(time);
  $('#submit').fadeOut(time);

  // This counts the correct number of answers and displays a score/message.

  let correct = 0

  questionContent.forEach( (currentQuestion, index) => {
    if (document.querySelector(`input[name="question_${index}"]:checked`) != null) {
      let chosen = document.querySelector(`input[name="question_${index}"]:checked`).value;
      
      if (chosen === currentQuestion.correctAnswer) {
        correct += 1;
      }
    }
    
  });
  const correctPercent = correct / questionContent.length


  $('#results').hide()
  const scoreMessage = `You answered ${correct}/${questionContent.length} correctly.`
  

  if (correctPercent < .6) {
    resultsContainer.innerHTML = scoreMessage + `<div>Congradulations! You failed!</div>`
  }

  else if (correctPercent <= .85 && correctPercent >= .6) {
    resultsContainer.innerHTML = scoreMessage + `<div> You didn't fail! </div>`
  }
  else {
    resultsContainer.innerHTML = scoreMessage + `<div> Great job! You either got a good score or figured out how to make your score negative!</div>`
  }

  $('#results').delay(time).fadeIn(time)
  $('#reset').delay(time).fadeIn(time)
}

function resetPage() {
  
  //This resests the quiz so it can be taken again.

  $('.ans').prop('checked', false);
  slideNum = 0
  $('#results').fadeOut(time)
  $('#reset').fadeOut(time)
  $('#start_button').delay(time).fadeIn(time)


}

const startButton = document.getElementById("start_button")
const submitButton = document.getElementById("submit")
const previousButton = document.getElementById("previous")
const nextButton = document.getElementById("next")
const resetButton = document.getElementById("reset")


startButton.addEventListener('click', showQuestion.bind(this, 1));
previousButton.addEventListener("click", showQuestion.bind(this, -1));
nextButton.addEventListener("click", showQuestion.bind(this, 1));
submitButton.addEventListener('click', showResults);
resetButton.addEventListener('click', resetPage);
