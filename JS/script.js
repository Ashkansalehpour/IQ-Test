// Adding Html code to making change and add Q/A
document.querySelector("body").innerHTML = `
<div class="container"></div>
  <div id="background">
    <section id="main">
    <a onclick="TimeCounter(); RemoveIntro(); EnterQuestions(1)" href="#">Start the test</a>
    </section>
    <section id="TotalImages"></section>
    <section id="result"></section> 
  </div>
</div>`;
// Html Selectors
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


// Functions 


// Images shower function
//  QS is Stand for Questions
function EnterQuestions(QS){
  // appear Q/A after clicking on START button and make test begin
  // go to the next page when we click
    if (QS >= 2) {
    // select Q/A div to appear our images
    let TotalQuestions = document.querySelector("#questions") .querySelector("img")
    let TotalAnswers = document.querySelector("#answers") .querySelector("img")
    // Select <img> from ("#questions"),("#answers")
  
    // delete pervious questions 
    if(!!TotalQuestions){
      TotalQuestions.remove() 
    }
    // delete previous answers of images
    if(!!TotalAnswers){
      for(let j = TotalAnswers.length - 1 ; j >= 0; j--){
        TotalAnswers[j].remove();
      }
    }
  }

    // Create Q/A places
    if(QS >= 1 && QS <= MaxQS){
    // Adding Q/A HTML code
    Images.innerHTML= `
    <h2 id="TopQuestion">Choose right Answer to calculate your IQ</h2>
    <div id="questions"></div>
    <h1>Questions</h1>
    <div id="answers"></div>
    `;
    // Q/A selectors
    let questions = document.querySelector("#questions"),
    answers = document.querySelector("#answers");
    

    // add Questions images to our HTML 
    let QuestionImages = document.createElement("img")
    // Get images attribute to our IMG element
    // QS is work as images number which is help us to select questions
    QuestionImages.setAttribute(
      "src",
      "./Images/" + QS + "/test" + QS + ".png"
    );
    // Append this element and attribute to our Questions Variable
    questions.appendChild(QuestionImages);

    // ImgNum stands for Numbers of images
    let ImgNum; 
    if(QS >= 13){
      ImgNum = 9;

    } else{
      ImgNum = 7;
    }

    // Define Answers for each questions

    for(let t =1 ; t < ImgNum; t++){
      let AnswerImages = document.createElement("img");
      // Get images attribute to our IMG element
      // QS is work as images number which is help us to select questions
      AnswerImages.setAttribute("id",t);
      AnswerImages.setAttribute(
        "src",  
        "./Images/" + QS + "/" + QS + "-" + t + ".png"
      );
      AnswerImages.setAttribute(
        "onclick",
        "GetUserChoice(); EnterQuestions(" + (QS + 1) + ")"
      );
      // Append this element and attribute to our Questions Variable
      answers.appendChild(AnswerImages);
      }   
    } else if (QS > MaxQS) {
      // delete test pages with questions img and answer img
      Images.remove();
      // Compare correct answers UsersAnswers

      
      let AnswersCounter = 0, // Counter for our answers
      FinalResult, // Total Correct Answerers
      FinalScore; // Verbal Final Result
      // Creating condition for compare right question with user question
      for(let i=0; i<UserChoice.length; i++){
      if(UserChoice[i]==RightAnswers[i]){
        AnswersCounter++;
      }
    }
    // Calculate our score
    FinalResult = ((AnswersCounter / MaxQS) * 100).toFixed(2);
    // Giving The result verbally 
    if (FinalResult < 50) {
      FinalScore = "Bishtar fekr kon";
    } else {  
      FinalScore = "Boro NasA!";
    }
    // Final page which show our total time spent and Score
    result.innerHTML =`
    <div>
    <span>Score:</span>
    <p>(${AnswersCounter}/${MaxQS})</p>
    </div>
    <div>
    <span>YourTime:</span>
    <p>${TotalTime}</p>
    </div>
    <div>
    <span>${FinalScore}</span>
    </div>`;
    }

    }
  


  // Users choice 

  function GetUserChoice(){
    window.onclick = (e) => {
      // Get the choices by ID
      UserChoice.push(e.target.id);
  
      //Calculate time 
      let SpentTime = (e.SpentTime - WastedTime) / 1000;
      if (SpentTime <= 60) {
        TotalTime = SpentTime.toFixed(2) + " seconds";
      } else {
        TotalTime = (SpentTime / 60).toFixed(2) + " minute(s)";
      }
    };
  }

  // Calculate wasted time function

  function TimeCounter(){
    window.onclick = (e) => {
      //Calculated the total time we spent in page
      WastedTime = e.SpentTime;
    };
  }

  function RemoveIntro(){
    main.remove();
  }