$(document).ready(function(){
	/*侧栏导航动画*/
	$("#fenxiang").mouseover(function(){
		$("#share").fadeIn(200);
	});
	$("#fenxiang").mouseout(function(){
		$("#share").fadeOut(400);
	});
	$("#share").mouseover(function(){
		$("#share").stop(true);
		$("#share").show();
	});
	$("#share").mouseout(function(){
		$("#share").hide();
	});
	
	$("#side-nav-box > div > ul > li >a").mouseover(function(){
		$(this).addClass("side-nav");
		$(this).text(function(){
			return $(this).attr("title")
		});
		$(this).mouseout(function(){
			$(this).removeClass();
			$(this).text("");
		});
	})
	
});
