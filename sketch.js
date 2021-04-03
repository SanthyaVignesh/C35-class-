var ball,database;
var position;

async function setup(){
    createCanvas(500,500);
    //1) Create object of database and store it into a variable.
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //Step 2: Reading vaue from the databse
    //Step 3: Refer to that particular node which has necessar data
    /*Step 4 : use .on listener to listen to changes made in the value
    syntax : varThatRefers.on("value",callBackFunction)
    Note: we don't give() in call back function
    */

    var ballPosition = await database.ref('ball/position');
    ballPosition.on("value",function(data){
        position = data.val();
        ball.x = position.x;
        ball.y = position.y;
    });

}

function draw(){
    background("white");
    if(position!== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    }
    if(keyDown('a')){
        addColor();
    }

    if(keyDown("c")){
        var colorPosition = database.ref('ball/color');
        colorPosition.on("value",changeColor)
    }
    drawSprites();
}

function readPosition(data){
    
}

function writePosition(x,y){
    //STEP 5 :Refer to that particular node then change the value of the position
    database.ref("ball/position").set({
        'x': position.x + x,
        'y': position.y+y})
}

function addColor(){
    var dbRef = database.ref("ball").update({
        "color" : 'blue'
    })
}

function changeColor(data){
    ball.shapeColor = data.val();
}
