$(document).ready(function(){
	var h=$(window).height(), //浏览器窗口高度
		ftop,  //第一段top值
		t=1,	//动画计时变量
		s=0,	//nav索引值
		ps,		//前一次nav索引值
		
		startX,//触摸时的坐标
        startY,
        x, //滑动的距离
        y,
        aboveY=0; //设一个全局变量记录上一次内部块滑动的位置 
		
		
 
//-------------------------------------------------------触控-------------------------------------------	

	     
    function touchSatrt(e){//触摸
    	e.preventDefault();
     	var touch=e.touches[0];
      	startY = touch.pageY;   //刚触摸时的坐标              
    }

    function touchMove(e){//滑动          
     	e.preventDefault();        
     	var  touch = e.touches[0]; 
		y = touch.pageY - startY;//滑动的距离           
    }  

    function touchEnd(e){//手指离开屏幕
        e.preventDefault();  
		
		ftop=$("#outer-box").position().top;	//记录当前首段top值
		if(Math.abs(y)>=100){
			if(t==1){
				t=0;
				$(".nav-text>li").removeClass("nav-high-light");
				if(y>100){
					if(s==0){
						t=1;
						return false;
					}else{
						s--;
						ps=s;
					}
				}
				if(y<-100){
					if(s==4){
						t=1;
						return false;
					}else{
						s++;
						ps=s;
					}
				}
				$(".nav-text>li:eq("+s+")").addClass("nav-high-light");
				$(".on-show").animate({left:"10%",opacity:"0"},450,function (){
					$('body').removeClass("on-show");
					if(ftop<0){   	//利用首段top值防止内容滚动出浏览器窗口     
						if(y>100){
							y=0;
							main_animate();
			  			}
					}
					if(y<-100){
						y=0;
						main_animate();
					}
				})
        	}
		}
	}
			
    document.getElementById("outer-box").addEventListener('touchstart', touchSatrt,false);  
    document.getElementById("outer-box").addEventListener('touchmove', touchMove,false);  
    document.getElementById("outer-box").addEventListener('touchend', touchEnd,false);  
	
	
	$("#nav-btn").on("tap",function(){	//触屏nav开关
		var i=$("#top-nav").css("opacity");
		if(i==1){
			$("#top-nav").animate({left:"60%",opacity:"0"},400);
		}else{
			$("#top-nav").animate({left:"0%",opacity:"1"},400);
		};
	})
	
	
	$(".nav-text>li").on("tap",function(){	//nav交互PC 触屏共用
		if(t==1){
			t=0;
			$(".nav-text>li").removeClass("nav-high-light");
			$(this).addClass("nav-high-light");
			ps=s;
			s=$(".nav-text>.nav-high-light").index();
			if(ps==s){		//通过与前一次nav索引值比较，如果相同防止重复运行动画
				t=1;
				return false;
			}else{
				$(".on-show").animate({left:"10%",opacity:"0"},400,function (){
					main_animate();
				})
			}
		}
	})

	

	
//----------------------------------------------pc交互-----------------------------------------------

	$('.scroll').mousewheel(function(event, delta) {	//鼠标滚轮交互
		if(t==1){
			t=0;	
			if(delta>0){	//滚轮方向判断nav变化
				if(s==0){
					t=1;
					return false;
				}else{
					s--;
				}
			}else{
				if(s==4){
					t=1;
					return false;
				}else{
					s++;
				}
			};
			$(".nav-text>li").removeClass("nav-high-light");
			$(".nav-text>li:eq("+s+")").addClass("nav-high-light");
			$(".on-show").animate({left:"10%",opacity:"0"},400,function (){
				$('div').removeClass("on-show");
				if(delta>0){   
					ftop=$("#outer-box").position().top;
					if(ftop<0){ 
						main_animate();
					}
				}else{
					ftop=$("#outer-box").position().top; 
					main_animate();
				}
			})
		}
    });
	
	$(".size-responsive").height($(window).height());	//页面加载时自动判断段落宽高，窗口尺寸改变时重新计算宽高
	$(".size-responsive").width($(window).width());
	$(window).resize(function() { 
		h=$(window).height(); 
		$("#nav-btn").css("opacity","1");
		var th=h*$(".nav-text>.nav-high-light").index();
		$('#outer-box').animate({top:"-"+th+""},0);
		$(".size-responsive").height($(window).height());
		$(".size-responsive").width($(window).width());
	})
	

	
	function main_animate(){	//段落切换动画
		s=$(".nav-text>.nav-high-light").index();
		var th=h*s;
		$('#outer-box').animate({top:"-"+th+""},450,
			function(){
				if(s==1){
					$('#p2').addClass("on-show");
					$("#p2").animate({left:"0",opacity:"1"},450,function(){
						t=1;
					})
				}
				if(s==2){
					$('#p3').addClass("on-show");
					$("#p3").animate({left:"0",opacity:"1"},450,function(){
						t=1;
					})
				}
				if(s==3){
					$('#p4').addClass("on-show");
					$("#p4").animate({left:"0",opacity:"1"},450,function(){
						t=1;
					})
				}
				if(s==0||s==4){
					$('#p2').addClass("on-show");
					t=1;
				}
			});
	}	
})



