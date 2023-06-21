var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

function nextSequence(){

    userClickedPattern = [];   
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoserColor);
}

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
    
})

function playSound(name){

    var sounds = new Audio("sounds/"+name+".mp3");
    sounds.play();

}

function animatePress(currentColor){
    
    $("#"+ currentColor ).addClass(".pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass(".pressed");
    },100)
}
function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success!!");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
                   
            },1000)
        }
    }
    else{

        console.log("wrong!!")

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart!!");

        startOver();
    }
}

function startOver(){
    
    level = 0;
    gamePattern = [];
    started = false;
}