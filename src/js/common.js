jQuery(function($){
	/*==============header顶部导航栏效果=================*/
	var $topLi = $('.top-nav li').has('ul');
	//给有二级菜单的li添加三角
	$('<b/>').addClass('sanjiao').appendTo($topLi);
	//三角旋转
	$topLi.hover(function(){
		$(this).find('.sanjiao').css({
			transform:'rotate(180deg)'
		});
		$(this).find('ul').show();
	},function(){
		$(this).find('.sanjiao').css({
			transform:'rotate(0deg)'
		});
		$(this).find('ul').hide();
	});
	
	/*==============================phone-App================*/
	var $phoneApp = $('.phone-app');
	$phoneApp.hover(function(){
		$(this).animate({left:1000},200);
	},function(){
		$(this).animate({left:1010},200);
	});
	/*=============================sidebar-nav================*/
	//设置开关，滑过时为true，滑出为false，根据开关显示h3的背景颜色
	var $mainSidebar = $('.sidebar-left');
	var $sidebarLeft = $mainSidebar.children('div');
	
	//二级菜单
	var $secondBar = $sidebarLeft.find('.menu-second');
	$sidebarLeft.on('mouseenter',function(){
		//当前列表显示，兄弟下的列表隐藏
		$(this).find('ul').show();
		$(this).siblings().find('ul').hide();
		
		$(this).find('h3 span').css({
			color:'#fff'
		});
		$(this).siblings().find('h3 span').css({
			color:'#474747'
		});
	}).on('mouseleave',function(){
		$secondBar.hide();
		$(this).find('.cover-border').hide();
	});
	
	//显示二级菜单
	var $firstNav = $('.first-nav');
	
	$firstNav.on('mouseenter','li',function(){
		$(this).find('.menu-second').show();
		$(this).find('.cover-border').show();
		$(this).siblings().find('.menu-second').hide();
		$(this).siblings().find('.cover-border').hide();
		$(this).find('.menu-one p').stop().animate({left:10},200);
		$(this).siblings().find('.menu-one p').stop().animate({left:0},200);
	}).on('mouseleave',function(){
		$(this).find('.menu-one p').stop().animate({left:0},200);
	});
});
