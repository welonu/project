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
	
	
	/*=======================放大镜===========================*/
	/*图片tab切换*/
	var $goodsmsgPic = $('.goodsmsg-pic');
	var $normalArea = $goodsmsgPic.find('.normal-pic');
	var $normalPic = $normalArea.find('img');
	var $tabPic = $goodsmsgPic.find('.tab-piclist ul');
	var $toBig = $goodsmsgPic.find('.to-big');
	var $bigPic = $toBig.find('img');
	
	//默认状态
	$tabPic.find('li').eq(0).addClass('hover');
	$normalPic.eq(0).show();
	$bigPic.eq(0).show();
	
	//滑过小图列表，显示相应li对应的大图
	$tabPic.on('mouseenter','li',function(){
		//改变对应的li边框颜色
		$(this).addClass('hover').siblings().removeClass('hover');
		$normalPic.eq($(this).index()).show().siblings().hide();
		$bigPic.eq($(this).index()).show().siblings().hide();
	});
	
	/*==============放大镜效果================*/
	//小色块
	var $smallCursor = $normalArea.find('span');
	//分别获取小图，大图，和放大区域的宽高
	var normalPicWidth = $normalPic.outerWidth();
	var normalPicHeight = $normalPic.outerHeight();
	
	var bigPicWidth = $bigPic.outerWidth();
	var bigPicHeight = $bigPic.outerHeight();
	
	var toBigWidth = $toBig.outerWidth();
	var toBigHeight = $toBig.outerHeight();
	
	//设置色块的宽高
	smallCursorWidth = parseInt(normalPicWidth*toBigWidth/bigPicWidth);
	smallCursorHeight = parseInt(normalPicHeight*toBigHeight/bigPicHeight);
	//console.log(smallCursorWidth,smallCursorHeight);
	$smallCursor.css({
		width:smallCursorWidth,
		height:smallCursorHeight,
	});
	
	var rate = bigPicWidth/normalPicWidth;
	
	//滑入小图，显示色块和放大区域
	$normalArea.hover(function(){
		$smallCursor.show();
		$toBig.show();
	},function(){
		$smallCursor.hide();
		$toBig.hide();
	});
	
	//边界处理
	var leftSide = 0;
	var rightSide = normalPicWidth - smallCursorWidth;
	var topSide = 0;
	var bottomSide = normalPicHeight - smallCursorHeight;
		
	var normalAreaLeft = $normalArea.offset().left;
	var normalAreaTop = $normalArea.offset().top;
	//绑定mousemove事件
	$normalArea.on('mousemove',function(e){
		var x = e.pageX - normalAreaLeft - smallCursorWidth/2;
		var y = e.pageY - normalAreaTop - smallCursorHeight/2;
		
		if(x<0){
			x=0;
		}else if(x>=rightSide){
			x=rightSide;
		}
		
		if(y<0){
			y=0;
		}else if(y>bottomSide){
			y=bottomSide;
		}
		
		$smallCursor.css({
			left:x,
			top:y
		});
		
		$bigPic.css({
			left:-rate*x,
			top:-rate*y
		});
		
	});
	
	/*=============加入购物车=================*/
	var $buyNumControl = $('.buy-num').find('span');
	var $buyNum = $('.buy-num').find('input');
	var $goodsSize = $('.goods-size');
	
	//默认
	$goodsSize.find('span').eq(0).addClass('active');
	var buyNum = 1;
	$buyNumControl.on('click',function(){
		if($(this).html() == '-'){
			buyNum--;
			if(buyNum<1){
				buyNum = 1;
			}
		}else if($(this).html() == '+'){
			buyNum++;
		}
		$buyNum.val(buyNum);
	});
	
	$goodsSize.on('click','span',function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	//输入框商品数量判断
	$buyNum.blur(function(){
		if($(this).val()<1){
			$(this).val(1);
		}
	});
	
	/*===================写入本地数据====================*/
	//先获取本地数据
	var _shopcart;
	if(localStorage.shopcart){
		_shopcart = JSON.parse(localStorage.getItem('shopcart'));
	}else{
		_shopcart = [];
	}
	
	
	var $addCartBtn = $('.buy-btn');
	var $goodsName = $('.content-title h4');
	var $goodsPrice = $('.content-title p strong');
	
	$addCartBtn.on('click',function(){
		var buymsg = {};
		
		//获取图片路径
		var goodsUrl = $normalArea.find('img:visible').attr('src');
		//console.log(goodsUrl);
		
		//获取商品名称
		var goodsName = $goodsName.html();
		
		//获取购买数量
		var goodsNum = $buyNum.val();
		
		//获取单价
		var onePrice = $goodsPrice.html();
		//console.log(onePrice);
		
		//判断商品是否重复
		$.each(_shopcart,function(idx,obj){
			if(goodsName == obj.name){
				goodsNum = parseInt(goodsNum) + parseInt(obj.num);
				_shopcart.splice(idx,1);
			}
		});
		
		//将获取到的商品信息写入本地数据
		buymsg.Url = goodsUrl;
		buymsg.name = goodsName;
		buymsg.num = goodsNum;
		buymsg.price = onePrice;

		_shopcart.push(buymsg);
		//console.log(_shopcart);
		localStorage.setItem('shopcart',JSON.stringify(_shopcart));
		
	});
	
	
	
	
	
	

	

	
	
	
	
});