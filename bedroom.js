function Back(){
    window.location="index.html";
}

img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bedroom-wall-decor-ideas-1627317588.jpeg?crop=1.00xw:0.751xh;0.00160xw,0.230xh&resize=640:*");
}

function setup(){
    canvas = createCanvas(640 , 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(img , 0 , 0 ,  640 , 420);
    if(status != ""){
       for(i = 0 ; i < objects.length ; i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";

        fill("red");
        stroke("red");
        noFill();
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
       }
    }
}

function modelLoaded(){
    console.log("Model Loaded Successfully!!!");
    status = "true";
    objectDetector.detect(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}