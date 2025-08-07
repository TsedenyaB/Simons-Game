var buttonColors = ["red", "blue", "green", "yellow"]
var gamepattern = []
var userClickedPattern = []
var level = 0;
var started = false;

$(".btn").on("click", function(){
        var userChosenColor = $(this).attr("id") ;
        userClickedPattern.push(userChosenColor);
        
        playSound(userChosenColor);
        animePress(userChosenColor);
        // return userClickedPattern;
        checkAnswer(userClickedPattern.length-1);
    })

function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamepattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    // animePress(randomChosenColor);


}

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3")
    audio.play();
}

function animePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 200)
}

$(document).on("keypress", function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
})

function checkAnswer(currentLevel){
    if(gamepattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success!");
        if(userClickedPattern.length === gamepattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game Over! , Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000)  
        
        startOver();
    }

    

}

function startOver(){
    level = 0;
    gamepattern = [];
    started = false;
}
