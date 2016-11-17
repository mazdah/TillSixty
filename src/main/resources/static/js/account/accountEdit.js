$('document').ready(function () {
	SessionDB.init('local');
	
	$('._sign-up').click(function() {
		var userName = $('#_user-name').val();
		var userId = $('#_user-id').val();
		var password = $('#_password').val();
		var passwdConfirm = $('#_password-confirm').val();
		var email = $('#_email').val();
		
		if (userName == null || '' == userName) {
			alert('이름을 입력해주세요.');
			return;
		}
		
		if (userId == null || '' == userId) {
			alert('ID를 입력해주세요.');
			return;
		}
		
		if (password == null || '' == password) {
			alert('Password를 입력해주세요.');
			return;
		}
		
		if (passwdConfirm == null || '' == passwdConfirm) {
			alert('Password확인을 해주세요.');
			return;
		}
		
		if (email == null || '' == email) {
			alert('email을 입력해주세요.');
			return;
		}
		
		var param = {};
		param.id = userId;
		
		if (SessionDB.selectRow('UserTable', param) != null) {
			alert("사용하실 수 없는 ID 입니다. 이미 등록된 ID 입니다.");
			return;
		}
		
		param = {};
		param.email = email;
		if (SessionDB.selectRow('UserTable', param) != null) {
			alert("사용하실 수 없는 Email 입니다. 이미 등록된 Email 입니다.");
			return;
		}
		
		var rowDataObj = {};
		rowDataObj.name = userName;
		rowDataObj.id = userId;
		rowDataObj.password = password;
		rowDataObj.email = email;
		
		controller.addUserInfo(rowDataObj);
	});
	
	$('#_password-confirm').on('blur', function() {
		var passwd = $('#_password').val();
		var passwdConfirm = $('#_password-confirm').val();
		
		if (passwd != passwdConfirm) {
			$('#_password-confirm').val('');
			$('#_password-confirm').attr("placeholder", "Password가 일치하지 않습니다.");
			$('#_password-confirm').trigger('focus');
		}
	});
});

var controller = function () {
	var _init = function () {
		
	};
	
	var _addUserInfo = function (param) {
		var reqParam = param;
		
		if (!reqParam) {
			reqParam = {};
			
			var userName = $('#_user-name').val();
			var userId = $('#_user-id').val();
			var password = $('#_password').val();
			var email = $('#_email').val();
			
			reqParam.name = userName;
			reqParam.id = userId;
			reqParam.password = password;
			reqParam.email = email;
		}
		
		var result = SessionDB.insertRow('UserTable', JSON.stringify(reqParam));
		
		if (result == 1) {
			alert("사용자 등록을 성공적으로 마쳤습니다. 로그인 화면으로 이동합니다.");
			window.location.href = "/";
		}
	}
	
	return {
		init		: _init,
		addUserInfo	: _addUserInfo
	}
}();
controller.init();