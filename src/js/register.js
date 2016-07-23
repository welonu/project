;jQuery(function($){
	
	/*===============获取本地数据=====================*/
	var _usermsg;
	if(localStorage.usermsg){
		_usermsg = JSON.parse(localStorage.getItem('usermsg'));
	}else{
		_usermsg = [];
	}
	
	
	/*================注册信息验证======================*/
	var $registerMsg = $('.user-msg');
	var $setUserName = $('.set-username');
	var $setPassWord = $('.set-password');
	var $affPassWord = $('.aff-password');
	var $inputPhoneNum = $('.input-phone');
	var $textCode = $('.text-code');
	var $agree = $('.agree');
	//var $registerBtn = $('.register-btn');
	
	var regUserName = /^[a-z]\w{3,19}/g;
	var regPassWord = /\S{4,16}/g;
	var regPhoneNum = /^[1][0-9]{10}/g;
	
	//创建一个空对象，保存注册信息到本地
	
	var username;
	var passWord;
	//失去焦点触发事件
	$setUserName.find('input').blur(function(){
		var checkName = true;
		username = $(this).val();
		if(regUserName.test(username)){console.log(111);
			$.each(_usermsg,function(idx,obj){console.log(222);
				//判断用户名是否重复
				if(username == obj.name){
					$setUserName.find('span').html('该用户名已被占用').addClass('error');
					checkName = false;
					return false;
				}else{
					checkName = true;	
				}
			});
			if(checkName){
				$setUserName.find('span').html('该账号可以注册').removeClass('error');
			}
			
		}else{
			$setUserName.find('span').html('4-20位中英文、数字、下划线或组合').addClass('error');
		}
	});

	$setPassWord.find('input').blur(function(){
		passWord = $(this).val();
		if(regPassWord.test(passWord)){
			$setPassWord.find('span').html('密码合法').removeClass('error');
		}else{
			$setPassWord.find('span').html('密码不符合规则').addClass('error');
		}
	});
	
	$affPassWord.find('input').blur(function(){
		var affPassWord = $(this).val();
		if(!affPassWord){
			$affPassWord.find('span').html('重复密码不能为空').addClass('error');
			return;
		}
		if(affPassWord == passWord){
			$affPassWord.find('span').html('密码一致').removeClass('error');
		}else{
			$affPassWord.find('span').html('两次输入的密码不一致').addClass('error');
		}
	});
	
	$inputPhoneNum.find('input').blur(function(){
		var phoneNum = $(this).val();
		if(regPhoneNum.test(phoneNum)){
			$inputPhoneNum.find('span').removeClass('error').hide();
			
		}else{
			$inputPhoneNum.find('span').show().html('请输入正确的手机号码').addClass('error');
		}
	});
	
	//生成验证码
	var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	var textcode;
	createCode();
	function createCode(){
		textcode = '';
		for(var i=0;i<4;i++){
			//生成随机下标(0-61)
			var randomIndex = parseInt(Math.random()*61);
			textcode += arr[randomIndex];
		}
		$textCode.find('strong').html(textcode);
	}
	
	$textCode.find('strong').on('click',function(){
		createCode();
	});
	
	$textCode.find('input').blur(function(){
		var currentCode = $(this).val();
		if(currentCode.toLowerCase() == textcode.toLowerCase()){
			$textCode.find('span').html('验证码正确').removeClass('error');
		}else{
			$textCode.find('span').html('验证码不正确').addClass('error');
		}
	});
	
	//勾选框
	var $checkBox = $('.agree input');
	//注册按钮
	
	var $registerBtn = $('.register-btn a');
	
	$registerBtn.on('click',function(e){
		if($registerMsg.find('span').hasClass('error') || !$checkBox.prop('checked')){
			alert('请输入正确的注册信息');
			e.preventDefault();
		}else{
			//注册成功，将用户信息记录到本地数据
			//location.reload('login.html');
			var localMsg={};
			localMsg.name = username;
			localMsg.pas = passWord;
			_usermsg.push(localMsg);
			
			localStorage.setItem('usermsg',JSON.stringify(_usermsg));
		}
	});	
	
});
