$('document').ready(function () {
	var userInfoStr = SessionDB.getSessionStorage("userInfo");
	
	$('#_goal-start-date').datepicker(
			{
				format: "yyyy-mm-dd",
				language: "ko",
				todayBtn: true,
				todayHighlight: true,
				toggleActive: true,
				autoclose: true
			}
	);
	
	$('#_goal-end-date').datepicker(
			{
				format: "yyyy-mm-dd",
				language: "ko",
				todayBtn: true,
				todayHighlight: true,
				toggleActive: true,
				autoclose: true
			}	
	);
	
	if (userInfoStr == undefined) {
		window.location.href = "/";
	}
	
	var userInfo = JSON.parse(userInfoStr);
	
	$('._user-id').empty();
	$('._user-name').empty();
	$('._user-id').text("@" + userInfo.id);
	$('._user-name').text(userInfo.name);
});