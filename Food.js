class Food{
  constructor(){
  }
  getFoodStock(){
    var reference=database.ref("foodStock");
    reference.on("value",function(data){
       foodS=data.val();
    })
    console.log(foodS);
  }
  updateFoodStock(stock){
    database.ref("/").update({foodStock:stock});
  }

  deductFood(){
     foodS=foodS-1;
      this.updateFoodStock(foodS);
  }

  display(){
      var x=80,y=100;

      imageMode(CENTER);
      image(milkImg,x,y,50,50);

      if(foodS!=0){
       for(var i=0;i<foodS;i++){
       if(i%10==0){
       x=80;
       y=y+50;
       }
       image(milkImg,x,y,50,50);
       x=x+30;
       }
      }
  }
}