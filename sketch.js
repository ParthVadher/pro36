var dog,sadDog,happyDog,milk,milkImg,feed,addFood,foodObj,foodS=0,database;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
 
  milkImg=loadImage("Milk.png")
}

function setup() {
  createCanvas(1000,400);

  database=firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj=new Food();
}

function draw() {
  background(255,255,255);
  drawSprites();
  readFoodStock();
  foodObj.display();
}

//function to read food Stock
function readFoodStock(){
  var reference=database.ref("foodStock");
  reference.on("value",function(data){
      foodS=data.val();
  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  console.log(foodS);
  if(foodS<=0){
    foodObj.updateFoodStock(foodS*0);
  }else{
    foodObj.updateFoodStock(foodS-1)
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    foodStock:foodS
  })
}