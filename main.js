
song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

leftWrist_x = 0;
leftWrist_y= 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);                                                                
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized!!!");
}

function gotPoses(results){
    if(results.length > 0){
         console.log(results);
   
           scorerightWrist = results[0].pose.keypoints[10].score;
           console.log(scorerightWrist);
           scoreleftWrist = results[0].pose.keypoints[9].score;
           console.log(scoreleftWrist);
   
   
         leftWrist_x = results[0].pose.leftWrist.x;
         leftWrist_y = results[0].pose.leftWrist.y;
         console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);
   
         rightWrist_x = results[0].pose.rightWrist.x;
         rightWrist_y = results[0].pose.rightWrist.y;
         console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
   }

function draw(){
    image(video, 0, 0, 600, 500);
    song1_status =  song1.isPlaying();
    song2_status =  song2.isPlaying();

    fill("#37ff00");
    stroke("#37ff00");

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20 );
        song1.stop();
        if(song2_status ==  false){
             song2.play();
             document.getElementById("song").innerHTML = "playing peter pan song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x, rightWrist_y, 20 );
        song2.stop();
        if(song1_status ==  false){
             song1.play();
             document.getElementById("song").innerHTML = "harry potter theme song";
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}





