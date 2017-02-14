$(document).ready(function(){
	/*轮播动画*/
	choose();
	slide_image();
	$("#slide-image-box").mouseout(function(){
		$("#slide-image-box").stop(true,true);
		slide_image();
	});
});
/*轮播动画控制函数*/
function slide_image()		
		{	
			$("#slide-image-box").mouseover(function(){
				window.clearInterval(s);
				
			});
			
			var s=setInterval("slide()",4000);
		};
		
		
/*轮播动画函数*/	
function slide()
		{
			var i=$("li.slide-icon-sp").index();
			var n=i-4;
			
			$("#slide-image-icon > li:eq("+n+")").addClass("slide-icon-sp");
			$("#slide-image-icon > li:eq("+n+")").siblings().removeClass();
			
			$("#slide-image-box > div > img:eq("+n+")").fadeIn(700);
			$("#slide-image-box > div > img:eq("+i+")").fadeOut(800);
			
			$("#slide-image-message-box > a:eq("+i+")").removeClass();
			$("#slide-image-message-box > a:eq("+i+")").hide();
			$("#slide-image-message-box > a:eq("+n+")").show();
		};
/*轮播交互函数*/
function choose()
		{
			$("#slide-image-icon > li").mouseover(function(){
				$("#slide-image-message-box > a").removeClass();
				$(this).addClass("slide-icon-sp");
				$(this).siblings().removeClass();
				var ic=$(this).index();
				$("#slide-image-message-box > a").hide();
				$("#slide-image-message-box > a:eq("+ic+")").show();
				
				if($("#slide-image-box > div > img:eq("+ic+")").hasClass("current-image")){
					return false;
				}
				$("#slide-image-box > div > img").stop(true,true);
				
				$("img.current-image").fadeOut(800);
				$("img.current-image").removeClass();
				$("#slide-image-box > div > img:eq("+ic+")").fadeIn(700);
				$("#slide-image-box > div > img:eq("+ic+")").addClass("current-image");
				
			});
		};