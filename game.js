var buttonColours = ["red", "blue", "green", "yellow"],
  gamePattern = [],
  userClickedPattern = [],
  started = false;

let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence(); // Corrected function name
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  console.log("answer " + currentLevel);
  console.log("correct color " + gamePattern[currentLevel]);
  console.log("user choose " + userClickedPattern[currentLevel]);
  console.log(` user length ${userClickedPattern.length}`);
  console.log(`game length ${gamePattern.length}`);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(); // Corrected function name
      }, 1000);
    }
  } else {
    startOver();
    console.log("wrong");
    
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    $("#level-title").css("font-size", "2em");


    playSound("wrong");


    $(document.body).addClass("game-over");
    setTimeout(function(){
      $(document.body).removeClass("game-over");
    }, 200)
  }
}

function nextSequence() {
  userClickedPattern = [];
  console.log("user", userClickedPattern);
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("game color", gamePattern);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = []
  started = false;
}