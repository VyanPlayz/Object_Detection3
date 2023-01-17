function Back(){
    window.location="index.html";
}
img = "";
status = "";
objects = [];
function preload(){
    img = loadImage("https://www.shutterstock.com/image-photo/glass-water-bottle-on-table-260nw-315092069.jpg");
}

function setup(){
    canvas = createCanvas(640 , 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(img , 0 , 0 , 640 , 420);
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