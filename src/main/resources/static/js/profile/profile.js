$('document').ready(function () {
	var userInfoStr = SessionDB.getSessionStorage("userInfo");
	
	if (userInfoStr == undefined) {
		window.location.href = "/";
	}
	
	var userInfo = JSON.parse(userInfoStr);
	
	$('._user-id').empty();
	$('._user-name').empty();
	$('._user-id').text("@" + userInfo.id);
	$('._user-name').text(userInfo.name);
});