let buttonColors = new Array("red", "blue", "green", "yellow");
let gamePattern = new Array();
let userClickedPattern = new Array();
let level = 1;
let nextLevel;
let gameStart = false;
//event handlers
$(document).on("keydown touchstart", function() {
  if (!gameStart) {
    nextSequence();
    gameStart = true;
    //$(".restart").css("display", "none");
  }
});

$(".btn").on("click", buttonHandler);

function nextSequence() { //determine next button in pattern

  updateLevel();
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatebuttons(randomChosenColor);
  console.log("GamePattern: " + gamePattern);
  userClickedPattern.splice(0, userClickedPattern.length); //reset users pattern for next level
}

function animatebuttons(randomChosenColor) { //animation for next button in pattern
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function buttonHandler() { //register user's selection and determine if correct
  let userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log("User Pattern: " + userClickedPattern);
  checkAnswer();
}

function checkAnswer() { //check to see if user's answer is correct
  let buttonIndex = userClickedPattern.length - 1;
  if (userClickedPattern[buttonIndex] == gamePattern[buttonIndex] && buttonIndex == gamePattern.length - 1) { //user has successfully guessed sequence
    level++;

    nextLevel = setTimeout(function() {
      nextSequence()
    }, 1000); //delay before next button is shown

  } else if (userClickedPattern[buttonIndex] != gamePattern[buttonIndex]) { //wrong button
    clearTimeout(nextLevel); //stop nextLevel if user guesses square before next square is chosen
    $("h1").html("Game Over, Press any key to restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    $(".restart").css("display", "inline-block");

  }
}

function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) { //animate users selection
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 50);
}

function updateLevel() { //update level number
  $("h1").html("Level " + level);
}

function startOver() { //reset all variables
  level = 1;
  userClickedPattern.splice(0, userClickedPattern.length);
  gamePattern.splice(0, gamePattern.length);
  gameStart = false;
}

function restart() { //restart button function
  if (!gameStart) {
    nextSequence();
    gameStart = true;
    $(".restart").css("display", "none");
  }
}
