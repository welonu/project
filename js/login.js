jQuery(function($){
	var $loginName = $('.username input');
	var $loginPassword = $('.password input');
	var $loginBtn = $('.login-btn a');
	
	/*===============获取本地数据=====================*/
	var _usermsg;
	if(localStorage.usermsg){
		_usermsg = JSON.parse(localStorage.getItem('usermsg'));
	}else{
		_usermsg = [];
	}
	
	var check = false;
	$loginBtn.on('click',function(e){
		var loginName = $loginName.val();
		var loginPassword = $loginPassword.val();
		//console.log(loginPassword)
		//遍历本地注册数据
		$.each(_usermsg,function(idx,obj){
			//判断用户名和密码是否正确
			if((loginName == obj.name) && (loginPassword ==obj.pas)){console.log(2222)
				check = true;
				return false;
			}
		});
		
		if(!check){
			alert('用户名或者密码错误');
			e.preventDefault();
		}
		
	});
	
	
});
