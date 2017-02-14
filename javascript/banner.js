$(document).ready(function(){
	/*全站导航按钮*/
	$("#top-sp2 > a").mouseover(function(){
		nav_over();
		})
	$("#top-sp2 > a").mouseout(function(){
		nav_out();
		})
	$("#quan-nav").mouseover(function(){
		nav_over();
		})
	$("#quan-nav").mouseout(function(){
		nav_out();
		})
		
	/*R星按钮背景替换*/
	$("#r-star-4").mouseover(function(){
		$(this).addClass("gta4");
		})
	$("#r-star-4").mouseout(function(){
		$(this).removeClass("gta4");
		})
	$("#r-star-sa").mouseover(function(){
		$(this).addClass("gtasa");
		})
	$("#r-star-sa").mouseout(function(){
		$(this).removeClass("gtasa");
		})
	$("#r-star-vc").mouseover(function(){
		$(this).addClass("gtavc");
		})
	$("#r-star-vc").mouseout(function(){
		$(this).removeClass("gtavc");
		})
		
	/*导航按钮背景替换*/
	$("#main-nav-bg1").mouseover(function(){
		$(this).addClass("main-nav-image1");
		})
	$("#main-nav-bg1").mouseout(function(){
		$(this).removeClass("main-nav-image1");
		})
/*------------------------------------------------------------------------------------------*/
	$("#main-nav-bg2").mouseover(function(){
		$(this).addClass("main-nav-image2");
		})
	$("#main-nav-bg2").mouseout(function(){
		$(this).removeClass("main-nav-image2");
		})
/*------------------------------------------------------------------------------------------*/
	$("#main-nav-bg3").mouseover(function(){
		$(this).addClass("main-nav-image3");
		})
	$("#main-nav-bg3").mouseout(function(){
		$(this).removeClass("main-nav-image3");
		})
/*------------------------------------------------------------------------------------------*/
	$("#main-nav-bg4").mouseover(function(){
		$(this).addClass("main-nav-image4");
		})
	$("#main-nav-bg4").mouseout(function(){
		$(this).removeClass("main-nav-image4");
		})
/*------------------------------------------------------------------------------------------*/
	$("#main-nav-bg5").mouseover(function(){
		$(this).addClass("main-nav-image5");
		})
	$("#main-nav-bg5").mouseout(function(){
		$(this).removeClass("main-nav-image5");
		})
/*------------------------------------------------------------------------------------------*/
	$("#main-nav-bg7").mouseover(function(){
		$(this).addClass("main-nav-image7");
		})
	$("#main-nav-bg7").mouseout(function(){
		$(this).removeClass("main-nav-image7");
		})
/*------------------------------------------------------------------------------------------*/
	$("#main-nav-bg8").mouseover(function(){
		$(this).addClass("main-nav-image8");
		})
	$("#main-nav-bg8").mouseout(function(){
		$(this).removeClass("main-nav-image8");
		})

	/*投稿与下载按钮背景替换*/
	$("#tougao-bg").mouseover(function(){
		$(this).addClass("tougao-sp");
		$("#tougao").css('color','#fae9d9');
		})
	$("#tougao-bg").mouseout(function(){
		$(this).removeClass("tougao-sp");
		$("#tougao").css('color','#c3aea3');
		})
	$("#dl-bg").mouseover(function(){
		$(this).addClass("dl-sp");
		})
	$("#dl-bg").mouseout(function(){
		$(this).removeClass("dl-sp");
		})
	/*搜索框*/
	$("#serch-option").mouseover(function(){
		$("#switch").show();
	});
	$("#serch-option").mouseout(function(){
		$("#switch").hide();
	});
	$("#switch").mouseover(function(){
		$("#switch").show();
	});
	$("#switch > ul > li").mouseover(function(){
		$(this).addClass("switch-sp")
	});
	$("#switch").mouseout(function(){
		$("#switch").hide();
	});
	$("#switch > ul > li").mouseout(function(){
		$(this).removeClass("switch-sp");
	});
	$("#switch > ul > li").click(function(){
		$("#serch-option").text($(this).text());
		$("#switch").hide();
	});
});
	
	/*全站导航按钮动画函数*/
	
	function nav_over(){
		$("#top-sp2 > a").addClass("quan-nav-image");
		$("#quan-nav").show();
	}
	function nav_out(){
		$("#top-sp2 > a").removeClass("quan-nav-image");
		$("#quan-nav").hide();
	}