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
	
	
	/*===================================获取购物车数据======================*/
	var _shopcart;
	if(localStorage.shopcart){
		_shopcart = JSON.parse(localStorage.getItem('shopcart'));
	}else{
		_shopcart = [];
	}
	
	var $nothing = $('.nothing');
	var $cartContent = $('.cart-content');
	var $buyList = $cartContent.find('.buy-list');
	 
	if(_shopcart.length==0){
		$nothing.show();
		$cartContent.hide();
	}else{
		$cartContent.show();
		$nothing.hide();
	}
	 
	$.each(_shopcart,function(idx,obj){
		//生成商品列表框
		var $buylist = $('<div/>').addClass('buy-pro');
		
		//勾选框
		var $check = $('<p/>').addClass('buy-check').addClass('left').appendTo($buylist);
		$('<input/>').attr('type','checkbox').appendTo($check);
		
		//写入商品图片
		var $pic = $('<p/>').addClass('buy-pic').addClass('left').appendTo($buylist);
		var $picLink = $('<a/>').appendTo($pic);
		$('<img/>').attr('src',obj.Url).appendTo($picLink);
		
		//写入商品名
		$('<p/>').html(obj.name).addClass('buy-name').addClass('left').appendTo($buylist);
		
		//写入数量
		var $numControl = $('<div/>').addClass('num-control').addClass('left').appendTo($buylist);
		var $numP = $('<p/>').appendTo($numControl);
		var $jian = $('<span/>').html('-').appendTo($numP);
		var $inputNum = $('<input/>').val(obj.num).appendTo($numP);
		var $jia = $('<span/>').html('+').appendTo($numP);
		
		//写入单价
		$('<p/>').addClass('buy-price').addClass('left').html('&yen;' + obj.price).appendTo($buylist);
		
		//收藏，删除按钮
		$('<p/>').addClass('buy-control').addClass('left').html('<span>[收藏]<span/><span>[删除]<span/>').appendTo($buylist);
		
		$('<div/>').addClass('clear').appendTo($buylist);
		
		//写入页面
		$buyList.append($buylist);
	});
	
});
