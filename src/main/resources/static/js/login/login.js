$('document').ready(function () {
	SessionDB.init('local');
	
	$('._sigin_up').click(function () {
		window.location.href="/html/account/accountEdit.html"
	});
	
	$('._sigin_in').click(function () {
		var userid = $('#_userid').val();
		var password = $('#_password').val();
		
		var param = {};
		
		param.id = userid;
		param.password = password;
		
		var resultArr = SessionDB.selectRow('UserTable', param);
		
		if (resultArr != null) {
			window.location.href = "/html/profile/profile.html";
		} else {
			alert("User ID 또는 Password가 일치하지 않습니다.")
		}
	})
});