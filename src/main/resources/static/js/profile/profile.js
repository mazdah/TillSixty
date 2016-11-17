var userInfo;
$('document').ready(function () {
	SessionDB.init('local');
	
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
	
	view.setGoal();
});

var view = function () {
	var _init = function () {
		
	};
	
	var _setGoal = function () {
		var goalInfoStr = controller.getGoalTable;
		
		if (goalInfoStr == null) {
			return;
		}

		var param = {};
		param.owner = userInfo.id;
		
		var goalInfoArr = controller.selectGoal(param);
		if (goalInfoArr == null) {
			return;
		}
		
		$('._container-add-goal').addClass('hide');
		$('._container-goal-list').removeClass('hide');
		$('#_goal-item').text(goalInfoArr[0].goalTitle);
	}
	
	return {
		init	: _init,
		setGoal	: _setGoal
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
	
	var _getGoalTable = function () {
		return SessionDB.getTable('GoalTable');
	};
	
	var _selectGoal = function (param) {
		return SessionDB.selectRow('GoalTable', param);
	};
	
	return {
		init			: _init,
		addGoalInfo		: _addGoalInfo,
		getGoalTable	: _getGoalTable,
		selectGoal		: _selectGoal
	}
}();
controller.init();