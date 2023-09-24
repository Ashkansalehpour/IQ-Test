//  Title: IQ test

//   Version:2.0 v

//   Developer: Ashkan Salehpour

// Adding HTML code to make changes and add Q/A
document.querySelector("body").innerHTML = `
<div class="container"></div>
  <div id="background">
    <section id="main">
    <a id="startButton" href="#">Start the test</a>
    </section>
    <section id="TotalImages"></section>
    <section id="result"></section> 
  </div>
</div>`;

// HTML Selectors
let MaxQS = 30,
  background = document.querySelector("#background"),
  main = document.querySelector("#main"),
  Images = document.querySelector("#TotalImages"),
  result = document.querySelector("#result"),
  UserChoice = [],
  RightAnswers = [
    3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 4,
    7, 7, 3, 2, 8,
  ];
let WastedTime, // time wasted before starting the test
  TotalTime; // time spent on the test
let testStartTime; // variable to store the test start time

// Functions

// Images shower function
function EnterQuestions(QS) {
  const Images = document.querySelector("#TotalImages");
  const result = document.querySelector("#result");

  // Check if QS is greater than or equal to 2
  if (QS >= 2) {
    // Remove previous questions and answers
    const questions = document.querySelector("#questions");
    const answers = document.querySelector("#answers");

    if (questions) {
      questions.innerHTML = ''; // Clear the content
    }

    if (answers) {
      answers.innerHTML = ''; // Clear the content
    }
  }

  // Create Q/A places
  if (QS >= 1 && QS <= MaxQS) {
    // Adding Q/A HTML code
    Images.innerHTML = `
      <h2 id="TopQuestion">Choose the right answer to calculate your IQ</h2>
      <div id="questions"></div>
      <h1>Questions</h1>
      <div id="answers"></div>
    `;

    const questionsDiv = document.querySelector("#questions");
    const answersDiv = document.querySelector("#answers");

    // Create Question Image element
    const questionImage = document.createElement("img");
    questionImage.src = `./Images/${QS}/test${QS}.png`;
    questionsDiv.appendChild(questionImage);

    let ImgNum;
    if (QS >= 13) {
      ImgNum = 9;
    } else {
      ImgNum = 7;
    }

    // Define Answers for each question
    for (let t = 1; t < ImgNum; t++) {
      const answerImage = document.createElement("img");
      answerImage.id = t;
      answerImage.src = `./Images/${QS}/${QS}-${t}.png`;
      answerImage.onclick = function () {
        GetUserChoice();
        EnterQuestions(QS + 1);
      };
      answersDiv.appendChild(answerImage);
    }
  } else if (QS > MaxQS) {
    // Delete the test pages with questions and answer images
    Images.innerHTML = '';

    // Compare correct answers with user answers
    let AnswersCounter = 0;
    let FinalResult;
    let FinalScore;

    for (let i = 0; i < UserChoice.length; i++) {
      if (UserChoice[i] == RightAnswers[i]) {
        AnswersCounter++;
      }
    }

    // Calculate the score
    FinalResult = ((AnswersCounter / MaxQS) * 100).toFixed(2);

    // Giving the result verbally
    if (FinalResult < 50) {
      FinalScore = "Bishtar fekr kon";
    } else {
      FinalScore = "Boro NasA!";
    }

    // Display the final page with the total time and score
    result.innerHTML = `
      <div>
        <span>Score:</span>
        <p>(${AnswersCounter}/${MaxQS})</p>
      </div>
      <div>
        <span>Your Time:</span>
        <p>${TotalTime}</p>
      </div>
      <div>
        <span>${FinalScore}</span>
      </div>
    `;
  }
}

function StartTest() {
  let QS = 1;

  // Hide the Start Test button
  const startButton = document.querySelector("#startButton");
  if (startButton) {
    startButton.style.display = "none";
  }

  // Record the start time when the test begins
  testStartTime = new Date();

  // Start the timer for wasted time
  TimeCounter();

  EnterQuestions(QS);
}

// Calculate wasted time function
function TimeCounter() {
  // Record the time when the test is started
  WastedTime = new Date().getTime();
}

function GetUserChoice() {
  const container = document.querySelector("#answers");

  container.addEventListener("click", function (e) {
    // Check if the clicked element is an image
    if (e.target.tagName === "IMG") {
      // Get the choices by ID
      UserChoice.push(e.target.id);

      // Calculate time elapsed since the test started
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - testStartTime;
      const elapsedSeconds = elapsedMilliseconds / 1000;

      // Format the time
      if (elapsedSeconds <= 60) {
        TotalTime = elapsedSeconds.toFixed(2) + " seconds";
      } else {
        const elapsedMinutes = elapsedSeconds / 60;
        TotalTime = elapsedMinutes.toFixed(2) + " minute(s)";
      }
    }
  });
}

// Event listener for starting the test
document.querySelector("#startButton").addEventListener("click", StartTest);

function RemoveIntro() {
  main.remove();
}
