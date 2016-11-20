var userInfo;
var prevRsourceBtn;
var prevContents;

$('document').ready(function () {
	SessionDB.init('local');
	prevContents = $('._dashboard-contents');
	$('.goal-title').hide();
	
	var userInfoStr = SessionDB.getSessionStorage("userInfo");

	if (userInfoStr == undefined) {
		window.location.href = "/";
		return;
	}
	
	userInfo = JSON.parse(userInfoStr);
	
	$('._user-id').empty();
	$('._user-name').empty();
	$('._user-id').text("@" + userInfo.id);
	$('._user-name').text(userInfo.name);
	
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
	
	$('._pop-edit-profile').click(function () {
		var param = {};
		param.id = userInfo.id;
		
		var profileInfoArr = controller.selectData('ProfileTable', param);
		if (profileInfoArr != null) {
			var profileObj = profileInfoArr[0];
			
			$('#_frm-profile-facebook').val(profileObj.facebook);
			$('#_frm-profile-twitter').val(profileObj.twitter);
			$('#_frm-profile-link').val(profileObj.link);
			$('#_frm-profile-description').val(profileObj.description);
		}
	});
	
	$('#_save-goal').click(function() {
		var goalTitle = $('#_goal-title').val();
		var startDate = $('#_goal-start-date').val();
		var endDate = $('#_goal-end-date').val();
		var goalDescription = $('#_goal-description').val();
		
		
		if (goalTitle == undefined || goalTitle == '') {
			alert('목표를 입력해주세요.');
			$('#_goal-title').trigger('focus');
			return;
		}
		
		if (startDate == undefined || startDate == '') {
			alert('목표 시작일을 입력해주세요.');
			$('#_goal-start-date').trigger('focus');
			return;
		}
		
		if (endDate == undefined || endDate == '') {
			alert('목표 종료일을 입력해주세요.');
			$('#_goal-end-date').trigger('focus');
			return;
		}
		
		var startDateNum = startDate.replace(/-/g, '');
		var endDateNum = endDate.replace(/-/g, '');
		
		if (startDateNum > endDateNum) {
			alert('종료일은 시작일 보다 커야 합니다.');
			$('#_goal-end-date').trigger('focus');
			return;
		}
		
		if (goalDescription == undefined || goalDescription == '') {
			alert('목표에 대한 설명을 입력해주세요.');
			$('#_goal-description').trigger('focus');
			return;
		}
		
		var param = {};
		
		param.goalTitle = goalTitle;
		param.startDate = startDate;
		param.endDate = endDate;
		param.goalDescription = goalDescription;
		param.owner = userInfo.id;
		param.status = "O"; // O : ongoing, D : Drop, H : Hold
		
		controller.addGoalInfo(param);
		
		$('#_modal-add-goal').modal('hide');
	});
	
	$('#_save-profile').click(function() {
		var facebook = $('#_frm-profile-facebook').val();
		var twitter = $('#_frm-profile-twitter').val();
		var link = $('#_frm-profile-link').val();
		var description = $('#_frm-profile-description').val();
		
		if ((facebook == undefined || facebook == '') &&
				(twitter == undefined || twitter == '') &&
				(link == undefined || link == '') &&
				(description == undefined || description == '')) {
			alert('등록할 정보가 없습니다.');
			return;
		}
		
		var param = {};
		
		param.name = userInfo.name;
		param.id = userInfo.id;
		param.email = userInfo.email;
		param.facebook = facebook;
		param.twitter = twitter;
		param.link = link;
		param.description = description;
		
		controller.addProfileInfo(param);
		
		$('#_modal-add-profile').modal('hide');
	});
	
	$('#_idea-item').click(function (){
		view.setPrev();
		
		prevRsourceBtn = $('#_idea-item');
		$('#_idea-item').parent().addClass('btn-active');
		
		prevContents = $('._idea-contents');
		$('._idea-contents').removeClass('hide');
	});
	
	$('#_resource-item').click(function (){
		view.setPrev();
		
		prevRsourceBtn = $('#_resource-item');
		$('#_resource-item').parent().addClass('btn-active');
		
		prevContents = $('._resource-contents');
		prevContents.removeClass('hide');
	});

	$('#_info-item').click(function (){
		view.setPrev();
		
		prevRsourceBtn = $('#_info-item');
		$('#_info-item').parent().addClass('btn-active');
		
		prevContents = $('._info-contents');
		prevContents.removeClass('hide');
	});
	
	$('#_mentor-item').click(function (){
		view.setPrev();
		
		prevRsourceBtn = $('#_mentor-item');
		$('#_mentor-item').parent().addClass('btn-active');
		
		prevContents = $('._mentor-contents');
		prevContents.removeClass('hide');
	});

	$('#_risk-item').click(function (){
		view.setPrev();
		
		prevRsourceBtn = $('#_risk-item');
		$('#_risk-item').parent().addClass('btn-active');
		
		prevContents = $('._risk-contents');
		prevContents.removeClass('hide');
	});
	
	$('#_goal-item').click(function (){
		view.setPrev();
		prevContents = $('._dashboard-contents');
		prevContents.removeClass('hide');
	});
	
	view.setProfile();
	view.setGoal();
});

var view = function () {
	var _init = function () {
		
	};
	
	var _setProfile = function () {
		var fbObj = $('._profile_facebook');
		var twObj = $('._profile_twitter');
		var lnkObj = $('._profile_link');
		var descObj = $('._profile-description');
		
		fbObj.empty();
		twObj.empty();
		lnkObj.empty();
		descObj.empty();
		
		var profileInfoStr = controller.getTable('ProfileTable');
		if (profileInfoStr == null) {
			return;
		}

		var param = {};
		param.id = userInfo.id;
		
		var profileInfoArr = controller.selectData('ProfileTable', param);
		if (profileInfoArr == null) {
			return;
		}
		
		var profileObj = profileInfoArr[0];
		
		if (profileObj.description != undefined && profileObj.description != '') {
			descObj.text(profileObj.description);
		}
		
		if (profileObj.facebook != undefined && profileObj.facebook != '') {
			fbObj.append('<img src="../../images/profile/ico_facebook.png" width="25px" height="25px"> ' + profileObj.facebook);
		}
		
		if (profileObj.twitter != undefined && profileObj.twitter != '') {
			twObj.append('<img src="../../images/profile/ico_twitter.png" width="25px" height="25px"> ' + profileObj.twitter);
		}
		
		if (profileObj.link != undefined && profileObj.link != '') {
			lnkObj.append('<div class="_link-area">&nbsp;<img src="../../images/profile/ico_link.png" width="15px" height="15px">&nbsp;&nbsp; ' + profileObj.link + '</div>');
		}
		
		//<img src="../../images/profile/ico_facebook.png" width="25px" height="25px"> 100012050000
		//<img src="../../images/profile/ico_twitter.png" width="25px" height="25px"> @mazdah70
		//<div class="_link-area">&nbsp;<img src="../../images/profile/ico_link.png" width="15px" height="15px">&nbsp;&nbsp; http://mazdah.tistory.com/</div>
	};

	var _setGoal = function () {
		var goalInfoStr = controller.getTable('GoalTable');
		
		if (goalInfoStr == null) {
			return;
		}

		var param = {};
		param.owner = userInfo.id;
		
		var goalInfoArr = controller.selectData('GoalTable', param);
		if (goalInfoArr == null) {
			return;
		}
		
		$('._container-add-goal').hide();
		$('.btn-main').removeClass('hide');
		$('.goal-title').show();
		$('#_goal-item').text(goalInfoArr[0].goalTitle);
	}
	
	var _setPrev = function () {
		if (prevRsourceBtn) {
			prevRsourceBtn.parent().removeClass('btn-active');
		}
		
		if (prevContents) {
			prevContents.addClass('hide');
		}
	};
	
	return {
		init		: _init,
		setProfile	: _setProfile,
		setGoal		: _setGoal,
		setPrev	: _setPrev
	}
}();
view.init();

var controller = function () {
	var _init = function () {
		
	};
	
	var _addGoalInfo = function (param) {
		var result = SessionDB.insertRow('GoalTable', JSON.stringify(param));
		
		if (result > 0) {
			view.setGoal();
		} else {
			alert("목표 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
		}
	};
	
	var _addProfileInfo = function (param) {
		var result = SessionDB.insertRow('ProfileTable', JSON.stringify(param));
		
		if (result > 0) {
			view.setProfile();
		} else {
			alert("Profile 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
		}
	};
	
	var _getTable = function (tblNm) {
		return SessionDB.getTable(tblNm);
	};
	
	var _selectData = function (tblNm, param) {
		return SessionDB.selectRow(tblNm, param);
	};
	
	return {
		init			: _init,
		addGoalInfo		: _addGoalInfo,
		addProfileInfo	: _addProfileInfo,
		getTable		: _getTable,
		selectData		: _selectData
	}
}();
controller.init();