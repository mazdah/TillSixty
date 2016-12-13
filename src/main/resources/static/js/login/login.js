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
		param.goalStatus = "O"; // O : ongoing, D : Drop, H : Hold
		
		var today = new Date();
		param.createDate = today.formattedDate('-');

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
		var userId = SessionDB.getSessionStorage("userId");		
		var goalCnt = SessionDB.getSessionStorage("goalCount");	
		
		param.goalId = userId + "_" + (Number(goalCnt) + 1);
		var paramStr = '{"goalList":[' + JSON.stringify(param) + ']}'

//		alert("userId = " + userId + "\n\nparamStr = " + paramStr);

		$.ajax({
			url : "/rest/profiles/" + userId,
			type : "PATCH",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : paramStr,
			success : function (data, status, jqXHR) {
//				alert("_addGoalInfo : " + JSON.stringify(data));
				
				SessionDB.setSessionStorage("goalId", param.goalId);
				
				var userInfo = JSON.parse(SessionDB.getSessionStorage("userInfo"));
				userInfo.goalList = [];
				userInfo.goalList.push(param);
				
				SessionDB.setSessionStorage("userInfo", JSON.stringify(userInfo));
				/*
				private String id;
				
				private String userId;
				private String goalId;
				private String elementType;
				private String title;
				private String description;
				private List<Media> mediaList;
				private String name;
				private String email;
				private List<SnsAccount> snsIdList;
				private String createDate;
				private String updateDate;
				*/
				
				var elementParam = {};
				
				elementParam.userId = userId;				
				elementParam.goalId = param.goalId;
				elementParam.elementType = "G";
				elementParam.title = param.goalTitle;
				elementParam.description = param.goalDescription;	
				elementParam.createDate = param.createDate;
				
				_addElementsInfo(elementParam);
			},
			error : function (jqXHR, status) {
				alert("error : 목표 등록에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
			}
		});
	};
	
	var _addElementsInfo = function (param) {
//		alert(JSON.stringify(param));
//		return;
		
		$.ajax({
			url : "/rest/elements/",
			type : "POST",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : JSON.stringify(param),
			success : function (data, status, jqXHR) {
//				alert("_addElementsInfo : " + JSON.stringify(data));
			},
			error : function (jqXHR, status) {
				alert("error : 요소 등록에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
			}
		});
	};
	
	var _checkUserAccount = function () {
		var userid = $('#_userid').val();
		var password = $('#_password').val();
		
		$.ajax({
			url : "/rest/profiles/search/countByUserIdAndPassword?userId=" + userid + "&password=" + password,
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {
				if (data == 0) {
					alert("User ID 또는 Password가 일치하지 않습니다.")
				} else {
					_setUserSession (userid, password);
				}
			},
			error : function (jqXHR, status) {
				alert("error : 로그인 중 오류가 발생하였습니다. [" + status + "]");
			}
		})
	};
	
	var _setUserSession = function (userid, password) {
		$.ajax({
			url : "/rest/profiles/search/findByUserIdAndPassword?userId=" + userid + "&password=" + password,
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {			
//				alert(JSON.stringify(data._links.self.href));
				var urlArr = data._links.self.href.split("/");
				
				SessionDB.setSessionStorage("userId", urlArr[urlArr.length - 1]);
				SessionDB.setSessionStorage("userInfo", JSON.stringify(data));
				
				// localStorage를 이용한 목표 처리
				if (data.goalList == null || data.goalList.length == 0) {	
					SessionDB.setSessionStorage("goalCount", "0");
					$('#_modal-tutorial').modal();
					return;
				}
				
				SessionDB.setSessionStorage("goalCount", data.goalList.length);
				SessionDB.setSessionStorage("goalInfo", JSON.stringify(data.goalList));
				SessionDB.setSessionStorage("goalId", data.goalList[0].goalId);
				// localStorage를 이용한 목표 처리 끝
				window.location.href = "/html/timeline/timeline.html";
			},
			error : function (jqXHR, status) {
				alert("error : 로그인 중 오류가 발생하였습니다. [" + status + "]");
			}
		});
	}
	
	return {
		init				: _init,
		addGoalInfo			: _addGoalInfo,
		checkUserAccount	: _checkUserAccount
	};
}();
controller.init();