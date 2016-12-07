// 创建一个二维数组，来对应每一个格子上的数字
var cells = [
              [0,0,0,0],
              [0,2,0,0],
              [0,0,0,0],
              [0,2,0,0]
            ]

//记录分数
var score = 0;

function $(id) {
	
	//通过id获取某一个元素
	return document.getElementById(id); 
}

//window加载出来时开始游戏
window.onload = function () {
	
  $("gameOver").style.display = "none";
  $("newGame").onclick = StartAction;

	StartAction();
}

//游戏初始化
function StartAction() {

  
  score = 0;
  finalScore = 0;

	//先清空每个格子，确保每次开始游戏都是初始状态
    for(var row=0;row<4;row++){

    	for(var col=0;col<4;col++){

    		cells[row][col] = 0;
    	}
    }

    RandomNum();
    RandomNum();

    UpdateView();
}

//更新格子内容
function UpdateView() {
  
   for(var row=0;row<4;row++){

    for(var col=0;col<4;col++){
        
        //获取相应位置格子对象
        var cell = $("cell"+row+col);
       
        //获取相应位置的值
        var n = cells[row][col];
        
        //改变div的class属性
        cell.className = "cell";

        //赋值之前先将格子内容给清空
        cell.innerHTML　= "";
        
        //当n大于0，不需要再赋值，减少下面两句代码的执行次数
        if(n>0){
          //给每个格子赋值
          cell.innerHTML　=　n;
          //重新给格子设置class属性
          cell.className = "cell "+ "num"+n;
        }

    }
   }
   
   $("score").innerHTML　 = score;
   $("finalScore").innerHTML　 = score;

}

//在随机位置放置一个2或4
function RandomNum() {
	
	if(Full()){return;}
    
    while(true){
    	//Math.random()*(Max-min+1) +min
	    var row = parseInt(Math.random()*4);
	    var col = parseInt(Math.random()*4);

	    if(cells[row][col] == 0){

          cells[row][col] = Math.random() < 0.9 ? 2 : 4;
          break;
	    }
    }
}
//判断格子是否已满
function Full() {
	
	 for(var row=0;row<4;row++){

    	for(var col=0;col<4;col++){

    		if(cells[row][col] == 0){

    			return false;
    		}
    	}
    }

    return true;
}


/****************上移*****************/
function UpAction() {
  
   //游戏是否结束
   if(GameOver()){return}

   //是否可以向上移动
   if(!CanMoveUp()) {return}


   //移动格子
   for(var col=0;col<4;col++){

      MoveUp(col);
   }

   RandomNum();

   UpdateView();
}

/**************************移动格子**********************/
function MoveUp(col) {
   
   //遍历行
   for(var row=0;row<4;){
       
       var current = cells[row][col];
       
       //找到同一列下行有数字的格子下标
       var nextRow = GetRowInCol(col,row+1,1);
    
       if(nextRow == -1){

           return;
       }

       var next = cells[nextRow][col];

       console.log(next + "=" + current);
      
       //向上移动的核心逻辑
       if(current == 0){

          cells[row][col] = next;
          cells[nextRow][col] = 0;

       }else if(current == next){

          cells[row][col] = current+next;
          cells[nextRow][col] = 0;
          score += cells[row][col];

          row++;

      }else{

         row++;
      }

   }

}
// 找到同一列下行有数字的格子下标，如果没找到返回-1
function GetRowInCol(col,row,step) {
  
    while(true){

        if(row<0 || row >=4){
           
           return -1;
        }

        if(cells[row][col] != 0){
           return row;
        }
        row+=step;
    }

}


//是否可以向上移动
function CanMoveUp() {
     
    //行要从下标为1的行开始
    for(var row=1;row<4;row++){

       for(var col=0;col<4;col++){

          //当前格子不等于0 &&　同一列的上一个格子等于０
          if(cells[row][col] != 0 && cells[row-1][col] == 0){

              return true;
          }
          //当前格子不等于0 &&　等于同一列的上一个格子
          if(cells[row][col] !=0 && cells[row][col] == cells[row-1][col]){
               
              return true;
          }
       }
    }
    return false;
}


/******************向下移动逻辑*******/
function DownAction(){

    if(GameOver()){return}

    if(!CanMoveDown()){return}

    for(var col=0;col<4;col++){

       MoveDown(col);
    }

    RandomNum();

    UpdateView();

}

function MoveDown(col) {
   
   //向上移动时，是从第0行开始，向下移动时，是从第3行开始
   for(var row=3;row>=0;){//变化1
       
       var current = cells[row][col];
       
       var nextRow = GetRowInCol(col,row-1,-1);//变化2
    
       if(nextRow == -1){

           return;
       }

       var next = cells[nextRow][col];

    
       if(current == 0){

          cells[row][col] = next;
          cells[nextRow][col] = 0;

       }else if(current == next){

          cells[row][col] = current+next;
          cells[nextRow][col] = 0;
          score += cells[row][col];

          row--;//变化3

      }else{

         row--;//变化4
      }

   }

}

function CanMoveDown() {
     
    //变化3 row=1;row<4 =》 row=0;row<3
    for(var row=0;row<3;row++){

       for(var col=0;col<4;col++){
          
          //变化1 row-1 = >row+1
          if(cells[row][col] != 0 && cells[row+1][col] == 0){

              return true;
          }
          //变化2 row-1 = >row+1
          if(cells[row][col] !=0 && cells[row][col] == cells[row+1][col]){
               
              return true;
          }
       }
    }
    return false;
}

/****************向左移动的逻辑*******************/

function leftAction() {

     if(GameOver()){return}

     if(!CanMoveLeft()){return}

     for(var row=0;row<4;row++){

        MoveLeft(row);
     }

     RandomNum();
     UpdateView();
}

function MoveLeft(row) {
   
   //遍历行
   for(var col=0;col<4;){ 
       
       var current = cells[row][col];
       
       var nextCol = GetColInRow(row,col+1,1);
    
       if(nextCol == -1){

           return;
       }

       var next = cells[row][nextCol];

       //向上移动的核心逻辑
       if(current == 0){

          cells[row][col] = next;
          cells[row][nextCol] = 0;

       }else if(current == next){

          cells[row][col] = current+next;
          cells[row][nextCol] = 0;
          score += cells[row][col];

          col++;

      }else{

         col++;
      }

   }

}

function GetColInRow(row,col,step) {
  
    while(true){

        if(col<0 || col >=4){
           
           return -1;
        }

        if(cells[row][col] != 0){
           return col;
        }
        col+=step;
    }

}

function CanMoveLeft() {
     
    //行要从下标为1的行开始
    for(var row=0;row<4;row++){

       for(var col=1;col<4;col++){

          //当前格子不等于0 &&　同一列的上一个格子等于０
          if(cells[row][col] != 0 && cells[row][col-1] == 0){

              return true;
          }
          //当前格子不等于0 &&　等于同一列的上一个格子
          if(cells[row][col] !=0 && cells[row][col] == cells[row][col-1]){
               
              return true;
          }
       }
    }
    return false;
}


/*****************向右移动的逻辑*********************/

function rightAction() {
  
    if(GameOver()){return}

    if(!CanMoveRight()){return}
  
    for(var row=0;row<4;row++){

       MoveRight(row);
    }
    
    RandomNum();
    UpdateView();
}

function CanMoveRight() {
     
    //行要从下标为1的行开始
    for(var row=0;row<4;row++){

       for(var col=0;col<3;col++){

          //当前格子不等于0 &&　同一列的上一个格子等于０
          if(cells[row][col] != 0 && cells[row][col+1] == 0){

              return true;
          }
          //当前格子不等于0 &&　等于同一列的上一个格子
          if(cells[row][col] !=0 && cells[row][col] == cells[row][col+1]){
               
              return true;
          }
       }
    }
    return false;
}

function MoveRight(row) {
   
   for(var col=3;col>=0;){ 
       
       var current = cells[row][col];
       
       var nextCol = GetColInRow(row,col-1,-1);
    
       if(nextCol == -1){

           return;
       }

       var next = cells[row][nextCol];

       //向上移动的核心逻辑
       if(current == 0){

          cells[row][col] = next;
          cells[row][nextCol] = 0;

       }else if(current == next){

          cells[row][col] = current+next;
          cells[row][nextCol] = 0;
          score += cells[row][col];

          col--;

      }else{
         col--;
      }
   }
}




/*****************游戏结束的逻辑*******************/
function GameOver() {
   

    //四个方向都不可移动 结束
    if((CanMoveUp || CanMoveDown || CanMoveRight || CanMoveLeft)){
          
        return false;
    }

    //提示框出现
    $("gameOver").style.display = "block";

    //结算分数
    $("finalScore").innerHTML　= score;
    
    //给重新开始绑定事件
    $("reStart").onclick = StartAction;

    return true;
    
}


/*
 * 2048初始化逻辑

 * 1. 将创建的二维数组给清空

   2. 随机两个位置并放上2或4

   3. 更新试图

      1）首先将cell的class给改为cell
      2) 让cell的值给清空
      3）将数组的值赋值给cell
      4) 重新设置class，这是为了让不同数字显示不同背景颜色
      5）修改分数

 *　向上移动逻辑

 　　1. 判断游戏是否结束

   2. 判断是否可以向上移动

      1) 当前格子为0，同一列的下一个格子不为0
      2）当前格子不为0，且等于同一列的下一个格子

   3. 按列移动
      
      0) 需要找下一个有数字格子的下标
      1）当currrent=0,
      2）current == next

   4. 生成一个2或4放在随机位置

   5. 更新试图
   
 */






