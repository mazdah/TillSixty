var prevStep;
var rememberFlag;
$('document').ready(function () {
	SessionDB.init('local');
	
	var savedId = SessionDB.getLocalStorage('savedId');
	var savedPass = SessionDB.getLocalStorage('savedPass');
	var savedRemember = SessionDB.getLocalStorage('savedRemember');
	
	
	if (savedRemember && 'T' == savedRemember) {
		$('._remember-account').attr('checked', true);
		rememberFlag = true;
	}
	
	if ($('._remember-account').is(':checked')) {
		$('#_userid').val(savedId?savedId:'');
		$('#_password').val(savedPass?savedPass:'');
	} else {
		$('#_userid').val('');
		$('#_password').val('');
	}
	
	$('._sigin_up').click(function () {
		window.location.href="/html/account/accountEdit.html"
	});
	
	$('._sigin_in').click(function () {
		if (rememberFlag) {
			SessionDB.setLocalStorage('savedRemember', 'T');
			SessionDB.setLocalStorage('savedId', $('#_userid').val());
			SessionDB.setLocalStorage('savedPass', $('#_password').val());
		} else {
			SessionDB.removeLocalStorage('savedRemember');
			SessionDB.removeLocalStorage('savedId');
			SessionDB.removeLocalStorage('savedPass');
		}
		
		controller.checkUserAccount();
	});
	
	$('._btn-prev').click(function () {
		if (prevStep) {
			prevStep.removeClass('active');
		}
		
		var step = $(this).attr('href');
		
		step = step.replace(/#/, '_');
		$('.' + step).addClass('active');
		
		prevStep = $('.' + step);
	});
	
	$('._btn-next').click(function () {
		if (prevStep) {
			prevStep.removeClass('active');
		} else {
			$('._tab1').removeClass('active');
		}

		var step = $(this).attr('href');
		
		step = step.replace(/#/, '_');
		$('.' + step).addClass('active');

		prevStep = $('.' + step);
	});
	
	$('._btn-finish').click(function () {
		$('#_modal-tutorial').modal('hide');
		window.location.href="/html/timeline/timeline.html"
	});
	
	$('._remember-account').change(function () {
		if ($('._remember-account').is(':checked')) {
			rememberFlag = true;
		} else {
			rememberFlag = false;
		}
	})
	
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
		
		var userInfo = JSON.parse(SessionDB.getSessionStorage("userInfo"));
		param.goalTitle = goalTitle;
		param.startDate = startDate;
		param.endDate = endDate;
		param.goalDescription = goalDescription;
		param.owner = userInfo.id;
		
		param.status = "O"; // O : ongoing, D : Drop, H : Hold

		controller.addGoalInfo(param);
		
		$('#_goal-title').val('');
		$('#_goal-start-date').val('');
		$('#_goal-end-date').val('');
		$('#_goal-description').val('');
	
		$('._btn-next').trigger('click');
	});
});

var controller = function () {
	var _init = function () {
		
	};
	
	var _addGoalInfo = function (param) {
		var result = SessionDB.insertRow('GoalTable', JSON.stringify(param));
		
		if (result > 0) {
			var newparam = {};
			var userInfo = JSON.parse(SessionDB.getSessionStorage("userInfo"));
			
			newparam.owner = userInfo.id;
			var goalObj = _selectData('GoalTable', newparam)[0];
			
			newparam = {};
			
			newparam.userid = userInfo.id;
			newparam.goal = goalObj._id;
			newparam.elementtype = "G";
			newparam.title = param.goalTitle;
			newparam.description = param.goalDescription;
			
			var today = new Date();		
			newparam.createdate = today.formattedDate('-');
			newparam.name = "";
			newparam.email = "";
			
			_addElementsInfo(newparam);
			
		} else {
			alert("목표 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
		}
	};
	
	var _addElementsInfo = function (param) {
//		alert(JSON.stringify(param));
//		return;
		
		var result = SessionDB.insertRow('ElementsTable', JSON.stringify(param));
	};
	
	var _checkUserAccount = function () {
		var userid = $('#_userid').val();
		var password = $('#_password').val();
		
		var param = {};
		
		param.id = userid;
		param.password = password;
		
		var resultArr = SessionDB.selectRow('UserTable', param);
		
		if (resultArr != null) {
			SessionDB.setSessionStorage("userInfo", JSON.stringify(resultArr[0]));
			var param = {};
			param.owner = userid;
			
			var goalInfoArr = _selectData('GoalTable', param);
			if (goalInfoArr == null) {				
				$('#_modal-tutorial').modal();
				return;
			}
			
			SessionDB.setSessionStorage("goalInfo", JSON.stringify(goalInfoArr[0]));
			window.location.href = "/html/timeline/timeline.html";
		} else {
			alert("User ID 또는 Password가 일치하지 않습니다.")
		}
	};
	
	var _selectData = function (tblNm, param) {
		return SessionDB.selectRow(tblNm, param);
	};
	
	return {
		init				: _init,
		addGoalInfo			: _addGoalInfo,
		checkUserAccount	: _checkUserAccount
	};
}();
controller.init();