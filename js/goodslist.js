jQuery(function($){
	/*==================侧边导航显示隐藏=============*/
	var $mainSidebar = $('.sidebar-left');
	var $sidebarLeft = $mainSidebar.children('div');
	$sidebarLeft.on('mouseenter',function(){
		$(this).find('h3').css({
			background:'#46aa50'
		});
		$(this).siblings().find('h3').css({
			background:'#fff'
		});
	}).on('mouseleave',function(){
		$(this).find('ul').hide();
	});
	
	/*=============主体导航===================*/
	var $containerNav = $('.container-nav div');
	$containerNav.hover(function(){
		$(this).find('ul').show();
	},function(){
		$(this).find('ul').hide();
	});
	
	/*====================商品列表导航顶部悬浮=======================*/
	var $chooseWay = $('.choose-way');
	var chooseWayTop = $chooseWay.offset().top;
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();
		if(chooseWayTop >= scrollTop){
			$chooseWay.css({
				position:'static',
				zIndex:1,
				top:chooseWayTop
			})
		}else{
			$chooseWay.css({
				position:'absolute',
				top:scrollTop
			});
		}
	});
	
	/*===========滑过购物车图标改变================*/
	var $shopCar = $('.shop-car');
	$shopCar.on('mouseenter','a',function(){
		$(this).find('span').show();
	}).on('mouseleave','a',function(){
		$(this).find('span').hide();
	});
});
