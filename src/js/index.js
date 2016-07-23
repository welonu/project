jQuery(function($){
	/*=============================sidebar-nav================*/
	//设置开关，滑过时为true，滑出为false，根据开关显示h3的背景颜色
	var $mainSidebar = $('.sidebar-left');
	var $sidebarLeft = $mainSidebar.children('div');
	var $sidebarTitle = $sidebarLeft.find('h3');
	var borderColor = $sidebarTitle.css('border-color');

	$sidebarLeft.on('mouseenter',function(){
		$(this).find('h3').css({
			backgroundColor:currentBg,
			borderColor:currentBg
		});
		$(this).siblings().find('h3').css({
			backgroundColor:'#fff',
			borderColor:borderColor
		});
	});
	
	/*======================banner=========================*/
	var $banner = $('.banner');
	var $bannerPic = $('.big-pic');
	var $picNav = $('.banner-nav ul');
	//大图区域
	var $bigPic = $bannerPic.find('a');
	//渐现轮播效果
	var index = 0;
	var len = $bannerPic.length;

	//生成图片导航
	for(var i=0;i<len;i++){
		$('<li/>').html(i+1).appendTo($picNav);
	}
	
	
	//获取图片导航li 的宽度
	var $picNavList = $picNav.find('li');
	var picNavLiWidth = $picNavList.eq(0).outerWidth() + 8;

	$picNav.css({
		width:picNavLiWidth*len
	});
	
	showImg();
	
	//获取当前大图的背景颜色，用于侧边导航h3的背景色
	var currentBg;
	
	//轮播间隔3秒
	var timer = setInterval(changImg,5000);
	
	//滑过轮播区域，停止自动轮播,滑出恢复自动轮播
	$bannerPic.hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(changImg,5000);
	});
	
	function changImg(){
		index++;
		showImg();
	}
	
	function showImg(){
		if(index >= len){
			index = 0;
		}else if(index < 0){
			index = len -1;
		}
		
		//获取当前大图的背景颜色，用于侧边导航h3的背景色
		currentBg = $bannerPic.eq(index).css('background-color');

		//图片显示后，回调函数缩小图片,图片隐藏后恢复尺寸
		$bannerPic.eq(index).stop(true).fadeIn(/*function(){
			$(this).find('img').stop().animate({
				width:770,
				height:360,
				margin:0
			},5000);
		}*/).siblings('.big-pic').stop(true).fadeOut(/*function(){
			$(this).find('img').css({
				width:'102%',
				height:'102%',
				marginLeft:'-1%',
				marginTop:'-1%'
			});
		}*/);
		
		$picNavList.eq(index).css({
			backgroundColor:'#fff',
			color:'#000'
		}).siblings().css({
			backgroundColor:'#989b94',
			color:'#fff'
		});
	}
	
	//滑过图片导航li显示相应大图
	$picNav.on('mouseenter','li',function(){
		index = $(this).index();
		showImg();
	});
	
	//banner商品栏,滑过图片，改变其left值
	var $bannerGoods = $('.banner-goods');
	$bannerGoods.on('mouseenter','img',function(){
		$(this).stop().animate({
			left:-10
		});
	}).on('mouseleave','img',function(){
		$(this).stop().animate({
			left:0
		});
	});
	
	/*========================================页头评价翻转效果===================================*/
	//左侧
	var $topAssessLeft = $('.top-assessLeft');
	var $newgoodsNumber = $topAssessLeft.find('.newgoods-number');
	var $goodAssRate = $topAssessLeft.find('.goodAss-rate');
	
	//右侧
	var	$topAssessRight = $('.top-assessRight');
	var $topAssessWords = $topAssessRight.find('.top-assessWords');
	var $topAssessPic = $topAssessRight.find('.top-assessPic');
	//设置两个开关
	var overTurnLeft = true;
	var overTurnRight = true;
	//左侧翻转定时器
	var turnLeftTimer = setInterval(turnLeft,3000);
	//右侧翻转定时器
	var turnRightTimer = setInterval(turnRight,2500);
	
	//滑过停止自动翻转，离开恢复自动翻转
	$topAssessLeft.hover(function(){
		clearInterval(turnLeftTimer);
	},function(){
		turnLeftTimer = setInterval(turnLeft,3000);
	});
	
	$topAssessRight.hover(function(){
		clearInterval(turnRightTimer);
	},function(){
		turnRightTimer = setInterval(turnRight,2500);
	});
	
	//左侧翻转函数
	function turnLeft(){
		if(overTurnLeft){
			overTurn($newgoodsNumber);
		}else{
			overTurn($goodAssRate);
		}
		overTurnLeft = !overTurnLeft;
	}
	//右侧翻转函数
	function turnRight(){
		if(overTurnRight){
			overTurn($topAssessWords);
		}else{
			overTurn($topAssessPic);
		}
		overTurnRight = !overTurnRight;
	}
	
	//翻转效果函数
	function overTurn(ele){
		ele.css('display','block');
		ele.animate({
			top:100,
			height:0
		},100,function(){
			ele.css('display','none');
			ele.siblings().css('display','block');
			ele.siblings().animate({
				top:0,
				height:200
			},100);
		});
	}
	
	
	/*=========================================天天惊喜=========================================*/
	var $surTimeList = $('.surprise-showTime ul');
	var $surpriseGoodslist = $('.surprise-goodslist ul');
	
	//默认显示
	$surTimeList.find('li').eq(0).find('.time-active').show().siblings().hide();
	$surTimeList.find('li').eq(0).siblings().find('.time-active').hide().siblings().show();
	$surpriseGoodslist.eq(0).show();
	
	$surTimeList.on('mouseenter','li',function(){
		
		$(this).find('.time-active').show().siblings().hide();
		$(this).siblings().find('.time-active').hide().siblings().show();
		 $surpriseGoodslist.eq($(this).index()).show().siblings().hide();
	});
	
	/*===========小banner轮播==================*/
	var $surpriseContent = $('.surprise-content');
	var $surpriseBannerPic = $surpriseContent.find('.surprise-banner img');
	var $surpriseBannerNav = $surpriseContent.find('.surprise-banner p');
	
	var surLength = $surpriseBannerPic.length;
	//console.log($surpriseBannerPic,$surpriseBannerNav);
	//生成小圆点导航
	for(var i=0;i<surLength;i++){
		$('<span/>').appendTo($surpriseBannerNav);
	}
	
	var surIndex = 0;
	showIndexImg();
	var surpriseTimer = setInterval(changeIndex,3000);
	function changeIndex(){
		surIndex++;
		showIndexImg();
	}
	
	function showIndexImg(){
		if(surIndex >= surLength){
			surIndex = 0;
		}else if(surIndex < 0){
			surIndex = surLength-1;
		}
		//显示当前index图片
		$surpriseBannerPic.eq(surIndex).fadeIn().siblings('img').fadeOut();
		//相应小圆点高亮
		$surpriseBannerNav.find('span').eq(surIndex).addClass('active').siblings().removeClass('active');
	}
	
	//点击小圆点，显示相应大图
	$surpriseBannerNav.on('click','span',function(){
		surIndex = $(this).index();
		showIndexImg();
	});
});
