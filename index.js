$(document).ready(function(){
    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    var highScore = 0;
    
    var updateTimeLeft = function (amount) {
      timeLeft += amount;
      $('#time-left').text(timeLeft);
    };
    
    var updateScore = function (amount) {
      score += amount;
      $('#score').text(score);
      if (score > highScore) {
        highScore = score;
        $('#high-score').text(highScore);
      }
    };

    var updateHighScore = function(){
      if(score > highScore){
          highScore = score;
          $('#high-score').text(highScore);
      }
      }
    
    var startGame = function () {
      if (!interval) {
        if (timeLeft === 0) {
          updateTimeLeft(10);
          updateScore(-score);
        }
        interval = setInterval(function () {
          updateTimeLeft(-1);
          if (timeLeft === 0) {
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000);  
      }
    };
    
    var randomNumberGenerator = function (size) {
      return Math.ceil(Math.random() * size);
    };
    
    var questionGenerator = function () {
      var question = {};
      var num1 = randomNumberGenerator(10);
      var num2 = randomNumberGenerator(10);
      
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
      
      return question;
    };
    
    var renderNewQuestion = function () {
      currentQuestion = questionGenerator();
      $('#equation').text(currentQuestion.equation);  
    };
    
    var checkAnswer = function (userInput, answer) {
      if (userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
        updateHighScore();
      }
    };
    
    $('#user-input').on('keyup', function () {
      startGame();
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    
    $('#reset').on('click', function () {
      renderNewQuestion();
      clearInterval(interval);
      interval = undefined;
      updateTimeLeft(10 - timeLeft);
      $('#user-input').val('');
      updateScore(-score);
    });
  
    $('#start').on('click', function () {
      renderNewQuestion();
      startGame();
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    renderNewQuestion();
  });