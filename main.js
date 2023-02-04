song="";
song1 = "";
song2="";
leftWristX=0;
rigthWristX=0;
leftWristY=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);

   
    fill('#00B9FF');
    stroke('#0032FC');
    circle(rigthWristX,rightWristY,20);
    if(scoreRightWrist>0.2){
song1.stop();
song2.play()
    }
    circle(leftWristX,leftWristY,20);
if(scoreLeftWrist>0.2){
    song2.stop();
    song1.play();

}

}
function preload(){
    song1 =loadSound("dreamers.mp3");
    song2=loadSound("HP.mp3");
    song1.rate(1);
    song2.rate(1);
    song2.setVolume(1);
    song1.setVolume(1);
}

function modelLoaded(){
    console.log('PoseNet Is Initialised');
}
function gotPoses(results){
     if(results.length > 0){
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log( "ScoreRightWrist = "+ scoreRightWrist + "     ScoreLeftWrist=  " + scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Left Wrist X =  " + leftWristX  + "     Left Wrist Y =  " + leftWristY );
        console.log("Right Wrist X = " + rightWristX + "     Right Wrist Y = " + rightWristY);
     }
}