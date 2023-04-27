song= "";


function preload()
{
  song = loadSound("music.mp3");

}
scoreRightWrist =  0;
scoreLeftWrist = 0;

RightWristX = 0;
LefWristX = 0;
RightWristY = 0;
LeftWristY = 0;

function modelLoaded(){
    console.log("poseNet está iniciado");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results){
if(results.length > 0){
scoreRightWrist = results[0].pose.keypoints[10].score;
scoreLefWrist = results[0].pose.keypoints[9].score;
RightWristX = results[0].pose.rightWrist.x;
LefWristX = results[0].pose.leftWrist.x;
RightWristY = results[0].pose.rightWrist.y;
LeftWristY = results[0].pose.leftWrist.y;


}
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2){
        circle(RightWristX, RightWristY, 20);
        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML = "velocidad = 0.5X";
            song.rate(0.5);
        }
        else if (RightWristY > 100 && RightWristY <= 200){
            document.getElementById("speed").innerHTML = "velocidad = 1X";
            song.rate(1);
            
        }

        else if (RightWristY > 200 && RightWristY <= 300){
            document.getElementById("speed").innerHTML = "velocidad = 1.5X";
            song.rate(1.5);
        }

        else if (RightWristY > 300 && RightWristY <= 400){
            document.getElementById("speed").innerHTML = "velocidad = 2X";
            song.rate(2);
        }

        else if (RightWristY > 400 ){
            document.getElementById("speed").innerHTML = "velocidad = 2.5X";
            song.rate(2.5);
        }

        
    }

    if (scoreLefWrist > 0.2){
        circle(LefWristX, LeftWristY, 20);
        InNumberleftWristY = Number(LeftWristY);
        new_leftWristY = floor(InNumberleftWristY * 2);
        lefWristY_divide_1000 = new_leftWristY/1000;
        document.getElementById("volume").innerHTML = "volumen = " + leftWristY_divide_1000;
        song.setVolume (leftWristY_divide_1000);
    
    }
}

function play()
{

        song.play();
        song.setVolume(1);
        song.rate(1);


}


