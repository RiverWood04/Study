$(document).ready(function(){ 
//-----------------------------------------------------属性定义以及初始化-----------------------------------------------------

	var canvas=document.getElementById("main_window");
	var context=canvas.getContext("2d");
	context.font="20px STHeiti"
	context.fillText('使用W,S,A,D或上、下、左、右控制方向',140,80,250);
	
	var up=down=left=right=false;
	var first,start=true;	// 运动起始控制变量

	var stops;		// setInterval引用
	var score=0,volume=9	//分数变量
	var game=false;	//游戏开始判断变量
	
	$("#reset").click(function(){	//游戏重置按钮
		location.reload();
		game=false;
	})

	var snakeB=function(x,y){	// 蛇躯干坐标对象
		this.x=x;				// 属性为一块躯干的横纵坐标
		this.y=y;
	}

	var snakebody=new Array();	// 蛇躯干坐标数组初始化
	var body_y=175		// 初始蛇躯干y坐标
	for(i=0;i<=8;i++){
		snakebody.push(new snakeB(150,body_y));
		body_y=body_y+5;
	}

	

//-----------------------------------------------------蛇对象及属性方法-----------------------------------------------------

			//蛇对象，整体相关方法
	function new_snake(array_name){
		snake=new Object();
		var xm=0,ym=0,hx=0,hy=0;	// xm,ym 身体运动变量 hx hy头部运动变量
		var fx,fy;		//食物坐标
//-----------------------------------------------------改变色彩-----------------------------------------------------

		snake.color=function(c){	//为蛇躯干选择颜色
			context.fillStyle=c;
		}
		
//-----------------------------------------------------躯干生成-----------------------------------------------------

		snake.creat=function(array_name){		// 生成蛇躯干
			$.each(array_name,function(){	
				context.fillRect(this.x,this.y,5,5);
			})
		}
		
//-----------------------------------------------------食物生成-----------------------------------------------------

		snake.food=function(array_name){		// 生成食物
			fx=Math.floor(Math.random()*canvas.width/5)*5;
			fy=Math.floor(Math.random()*canvas.height/5)*5;

			$.each(array_name,function(){	//防止食物生成在蛇体内
				if(array_name.x==fx&&array_name.y==fy){
					snake.food(array_name);
				}
			})
			context.fillRect(fx,fy,5,5);
		}
		
//-----------------------------------------------------运动控制函数-----------------------------------------------------

		snake.move=function(array_name,array_name2){	//蛇运动控制函数
			game=true;									//游戏开始，禁用色板选项
			context.clearRect(0,0,canvas.width,canvas.height);
		
			for(i=array_name.length-1;i>0;i--){	// for循环控制躯干运动
				var q=array_name[i]		// 后一节躯干
				var e=array_name[i-1]	// 前一节躯干
			
				if(q.x==e.x){	//xm,ym身体坐标变量
					ym=e.y-q.y
					xm=0
				}
				if(q.y==e.y){
					xm=e.x-q.x
					ym=0
				}
				q.y=q.y+ym;
				q.x=q.x+xm;
				context.fillRect(q.x,q.y,5,5);	//绘制蛇身
			}
		
		if(up==true){		// 通过up,down,left,right为hx,hy赋不同的值控制蛇头运动，身体跟着蛇头动，进而控制整条蛇
			if(first==true){	// hx,hy头部x,y运动变量
				hy=-5
				hx=0
				start=false
			}
			if(hx!=0){
				hy=-5
				hx=0
			}
		}
		if(down==true){
			if(hx!=0){
				hy=5
				hx=0
			}
		}
		if(left==true){
			if(first==true){
				hx=-5
				hy=0
				start=false
			}
			if(hy!=0){
				hx=-5
				hy=0
			}
		}
		if(right==true){
			if(first==true){
				hx=5
				hy=0
				start=false
			}
			if(hy!=0){
				hx=5
				hy=0
			}
		}
		var sh=array_name[0];	//计算运动后头部坐标
		sh.y=sh.y+hy;
		sh.x=sh.x+hx;
		
		
		function restore(){			//暂停40毫秒后重新开始运动
			stops=setInterval(snakemove,40);
		}
		if(sh.x+hx==canvas.width&&hx!=0||sh.x==0&&hx!=0||sh.y+hy==canvas.height&&hy!=0||sh.y==0&&hy!=0){	//临近墙壁暂停运动
			stops=window.clearInterval(stops);																//让玩家有时间调整
			setTimeout(restore,200);	
		}
		
		if(sh.x>canvas.width||sh.x<0||sh.y>canvas.height||sh.y<0){	//撞墙停止运动
			game_over();
		}
		for(i=1;i<array_name.length;i++){	//判断是否撞身体
			var cb=array_name[i];
			if(sh.x+hx==cb.x&&sh.y+hy==cb.y){
				stops=window.clearInterval(stops);
				setTimeout(restore,200);
			}
			if(sh.x==cb.x&&sh.y==cb.y){
				game_over();
			}
		}

		context.fillRect(sh.x,sh.y,5,5);	//绘制新蛇头
		context.fillRect(fx,fy,5,5);	//绘制被函数开始清除掉的食物
		
		if(fx==sh.x&&fy==sh.y){	//吃食物
			snake.food(array_name);		// 重新生成一对fx,fy坐标，即下一帧动画重新绘制食物
			var last=array_name[array_name.length-1];

			score=score+100;			//计分
			$("#score").val(score);
			volume++
			$("#sng").html("分数："+score+"");
			$("#snt").html("总长："+volume+"");

			array_name.push(new snakeB(last.x,last.y));	//将“吃掉”的食物加到身体坐标中
		}
	}
	return snake;	//以工厂的模式返回一个snake对象，主要为了可能增加的双人模式服务
}

//-----------------------------------------------------蛇对象及属性方法结束-----------------------------------------------------


//-----------------------------------------------------功能函数定义及初始化-----------------------------------------------------

	snake1=new_snake(snakebody);

	function game_over(){	//游戏结束功能函数
		stops=window.clearInterval(stops);
		$("#gameover").show();
		var bord_score = $("#score_tab>li:eq(9)").html().split(':');
		if(score > bord_score[1]){
			$("#highscore_sub").show();
		}
	}
	
	function snakemove(){	//为使用setInterval所设函数
		snake1.move(snakebody)
	}
	
	$(".color").click(function(){	//颜色选择按钮	
		if(game==false){	
		context.clearRect(0,0,canvas.width,canvas.height);
			snake1.color($(this).val());	//改变游戏主体颜色	
			$("#current_color > div").css("background-color",$(this).val());	//改变当前颜色div背景色	
			snake1.creat(snakebody); //用新选定颜色重载
			snake1.food(snakebody);
			context.fillText('使用W,S,A,D或上、下、左、右控制方向',140,80,250);
		}else{
			$("#error_messege").html("游戏已经开始，请在游戏开始前选择喜欢的颜色");
		}
	})
	
	$("#send").click(function(){	// Ajax异步提交并刷新高分
		$.post("snake_highscore.php", 
		{ 
			username :  $("#username").val() , 
			score :  $("#score").val()  
		}, function (data, textStatus){
         		$("#resText").html(data); // 把返回的数据添加到页面上
				$("#username").val('');	
			}
		);
	})
	
	snake1.creat(snakebody);	 // 蛇躯干初始化	
	snake1.food(snakebody);	// 食物初始化

	


//-----------------------------------------------------属性定义以及初始化结束-----------------------------------------------------	
	
//-----------------------------------------------------按键控制-----------------------------------------------------
	
	$("*").bind("keydown",function(event){			// 键盘控制函数
		var keyID = event.keyCode ? event.keyCode :event.which;
		if(keyID === 38 || keyID === 87)  { // 键盘方向键“上”以及"w"
			up=true;
			left=right=down=false;
		}
		if(keyID === 39 || keyID === 68)  { // 键盘方向键“右”以及"d"
			right=true;
			left=up=down=false;
		}
		if(keyID === 40 || keyID === 83)  { // 键盘方向键“下”以及"s"
			down=true;
			up=left=right=false;
		}
		if(keyID === 37 || keyID === 65)  { // 键盘方向键“左”以及"a"
			left=true;
			right=up=down=false;
		}
		
		if(down==false&&up==true||right==true||left==true){	//确保起始运动无法往回走，且只在按下左右上三个方向键时才开始运动
			if(start==true){	// 起始运动判断
				first=true;
				stops=setInterval(snakemove,40);
			}else{
				first=false;
			}
		}
	
		event.stopPropagation();
	})	
	
//-----------------------------------------------------按键控制结束-----------------------------------------------------	

});
	