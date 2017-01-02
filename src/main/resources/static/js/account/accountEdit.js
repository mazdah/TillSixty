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
		
//		var param = {};
//		param.id = userId;
//		
//		if (SessionDB.selectRow('UserTable', param) != null) {
//			alert("사용하실 수 없는 ID 입니다. 이미 등록된 ID 입니다.");
//			return;
//		}
//		
//		param = {};
//		param.email = email;
//		if (SessionDB.selectRow('UserTable', param) != null) {
//			alert("사용하실 수 없는 Email 입니다. 이미 등록된 Email 입니다.");
//			return;
//		}
		
		/*
		 * 	private String name;
			private String userId;
			private String password;
			private String email;
			private String facebook;
			private String twitter;
			private String link;
			private String imgPath;
			private String introduction;
		 */
		
		var Profile = {};
		Profile.name = userName;
		Profile.userId = userId;
		Profile.password = password;
		Profile.email = email;
		
		controller.addUserInfo(Profile);
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
	
	var _checkUserID = function (Profile) {
		$.ajax({
			url : "/rest/users/search/countByUserId?userId=" + Profile.userId,
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {
				if (data == 0) {
					_checkEmail (Profile);
				} else {
					alert("사용 중인 사용자 ID입니다. 다른 ID를 입력해주세요.");
				}
			},
			error : function (jqXHR, status) {
				alert("error : ID 중복 검사 중 오류가 발생하였습니다. [" + status + "]");
			}
		})
	};
	
	var _checkEmail = function (Profile) {
		$.ajax({
			url : "/rest/users/search/countByEmail?email=" + Profile.email,
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {
				if (data == 0) {
					_insertUser (Profile);
				} else {
					alert("사용 중인 Email 주소입니다. 다른 Email 주소를 입력해주세요.");
				}
			},
			error : function (jqXHR, status) {
				alert("error : Email 중복 검사 중 오류가 발생하였습니다. [" + status + "]");
			}
		})
	};
	
	var _insertUser = function (Profile) {
		$.ajax({
			url : "/rest/users",
			type : "POST",
			contentType : "application/json; charset=utf-8",
			data : JSON.stringify(Profile),
			dataType : "json",
			success : function (data, status, jqXHR) {
				//alert(JSON.stringify(data));
				alert("사용자 등록을 성공적으로 마쳤습니다. 로그인 화면으로 이동합니다.");
				window.location.href = "/";
			},
			error : function (jqXHR, status) {
				alert("error : 사용자 정보 등록 중 오류가 발생하였습니다. [" + status + "]");
			}
		})
	};
	
	var _addUserInfo = function (param) {
		var Profile = param;
		
		if (!Profile) {
			Profile = {};
			
			var userName = $('#_user-name').val();
			var userId = $('#_user-id').val();
			var password = $('#_password').val();
			var email = $('#_email').val();
			
			Profile.name = userName;
			Profile.userId = userId;
			Profile.password = password;
			Profile.email = email;
		}
		
//		var result = SessionDB.insertRow('UserTable', JSON.stringify(Profile));
//		
//		if (result == 1) {
//			alert("사용자 등록을 성공적으로 마쳤습니다. 로그인 화면으로 이동합니다.");
//			window.location.href = "/";
//		}
		
		_checkUserID (Profile);
	}
	
	return {
		init		: _init,
		addUserInfo	: _addUserInfo
	}
}();
controller.init();