var userInfo;
var goalInfo;
var prevRsourceBtn;
var prevContents;
var mode;
var elementType;

$('document').ready(function () {
	SessionDB.init('local');
	prevContents = $('._dashboard-contents');
	$('.goal-title').hide();
	
	$('[data-toggle="popover"]').popover({
        placement : 'bottom',
        title: "title",
        content: "And here's some amazing content. It's very engaging. Right?"
    });
	
//	$('._nav-gaol-title-anchor').click(function () {
//		alert('popover');
//		$('._nav-gaol-title-anchor').popover('show');
//	})
	
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
	
	$('._anchor-profile').click(function () {
		window.location.href = "/html/profile/profile.html";
		$('._profile').addClass('active');
		$('._home').removeClass('active');
	});
	
	$('._anchor-logout').click(function () {
		SessionDB.removeSessionStorage('userInfo', '');
		window.location.href = "/";
	});
	
//	$('#_goal-start-date').datepicker(
//			{
//				format: "yyyy-mm-dd",
//				language: "ko",
//				todayBtn: true,
//				todayHighlight: true,
//				toggleActive: true,
//				autoclose: true
//			}
//	);
	
//	$('#_goal-end-date').datepicker(
//			{
//				format: "yyyy-mm-dd",
//				language: "ko",
//				todayBtn: true,
//				todayHighlight: true,
//				toggleActive: true,
//				autoclose: true
//			}	
//	);
	
//	$('._pop-edit-profile').click(function () {
//		var param = {};
//		param.id = userInfo.id;
//		
//		var profileInfoArr = controller.selectData('ProfileTable', param);
//		if (profileInfoArr != null) {
//			var profileObj = profileInfoArr[0];
//			
//			$('#_frm-profile-facebook').val(profileObj.facebook);
//			$('#_frm-profile-twitter').val(profileObj.twitter);
//			$('#_frm-profile-link').val(profileObj.link);
//			$('#_frm-profile-description').val(profileObj.description);
//		}
//	});
	
	
	$('#_idea-item').click(function (){
		view.changeElements('I');
		
		prevRsourceBtn = $('#_idea-item');
		$('#_idea-item').parent().addClass('btn-active');
		
		prevContents = $('._idea-contents');
		$('._idea-contents').removeClass('hide');
	});
	
	$('#_resource-item').click(function (){
		view.changeElements('R');
		
		prevRsourceBtn = $('#_resource-item');
		$('#_resource-item').parent().addClass('btn-active');
		
		prevContents = $('._resource-contents');
		prevContents.removeClass('hide');
	});

	$('#_info-item').click(function (){
		view.changeElements('IN');
		
		prevRsourceBtn = $('#_info-item');
		$('#_info-item').parent().addClass('btn-active');
		
		prevContents = $('._info-contents');
		prevContents.removeClass('hide');
	});
	
	$('#_mentor-item').click(function (){
		view.changeElements('M');
		
		prevRsourceBtn = $('#_mentor-item');
		$('#_mentor-item').parent().addClass('btn-active');
		
		prevContents = $('._mentor-contents');
		prevContents.removeClass('hide');
	});

	$('#_risk-item').click(function (){
		view.changeElements('RI');
		
		prevRsourceBtn = $('#_risk-item');
		$('#_risk-item').parent().addClass('btn-active');
		
		prevContents = $('._risk-contents');
		prevContents.removeClass('hide');
	});
	
	$('#_action-item').click(function (){
		view.changeElements('A');
		
		prevRsourceBtn = $('#_action-item');
		$('#_action-item').parent().addClass('btn-active');
		
		prevContents = $('._action-contents');
		prevContents.removeClass('hide');
	});

	var _metorHide = function () {
		$('._elements-name-pane').addClass('hidden');
		$('._elements-email-pane').addClass('hidden');
	};
	
	$('._add-idea').click(function () {
		elementType = 'I';
		_metorHide();
	});
	
	$('._add-resource').click(function () {
		elementType = 'R';
		_metorHide();
	});
	
	$('._add-info').click(function () {
		elementType = 'IN';
		_metorHide();
	});
	
	$('._add-mentor').click(function () {
		elementType = 'M';
		$('._elements-name-pane').removeClass('hidden');
		$('._elements-email-pane').removeClass('hidden');
	});
	
	$('._add-risk').click(function () {
		elementType = 'RI';
		_metorHide();
	});
	
	$('._add-action').click(function () {
		elementType = 'A';
		_metorHide();
	});
	
	$('#_save-elements').click(function () {
		mode = 'EL';
		var title = $('#_elements-title').val();
		var description = $('#_elements-description').val();
		
		if (title == undefined || title == '' || description == undefined || description == '') {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
				
		var param = {};
		
		param.userid = userInfo.id;
		param.goal = goalInfo._id;
		param.elementtype = elementType;
		param.title = title;
		param.description = description;
		
		var today = new Date();		
		param.createdate = today.formattedDate('-');
		
		if (elementType == 'M') {
			param.name = $('#_elements-name').val();
			param.email = $('#_elements-email').val();
		}
		
		controller.addElementsInfo(param);
		$('#_elements-title').val('');
		$('#_elements-description').val('');
		$('#_modal-add-elements').modal('hide');
	});
	
	$('._go-profile').click(function () {
		window.location.href="/html/profile/profile.html"
	})
	
	view.setProfile();
	view.setGoal();
	view.setElementsCount();
//	view.setChart();
//	view.setRadarChart();
//	view.setTodayStatChart();
//	view.setElementsStatChart();
//	view.setRangeStatChart();
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
		
		goalInfo = goalInfoArr[0];

		$('._nav-gaol-title-anchor').text(goalInfoArr[0].goalTitle);
		
//		$('._container-add-goal').hide();
//		$('.btn-main').removeClass('hide');
//		$('.goal-title').show();
//		$('#_goal-item').text(goalInfoArr[0].goalTitle);
		$('._startday-label').text(goalInfoArr[0].startDate);
		$('._endday-label').text(goalInfoArr[0].endDate);
		
		var today = new Date();
		$('._today-label').text(today.formattedDate('-'));
		
		var startDate = new Date(goalInfoArr[0].startDate);
		var endDate = new Date(goalInfoArr[0].endDate);
		var currDate = new Date();
		var currDay = 24 * 60 * 60 * 1000;
		
		var totdiff = endDate - startDate;
		var currdiff = currDate - startDate;
		
		var intTotdiff = parseInt(totdiff/currDay);
		var intCurrdiff = Math.ceil(currdiff/currDay);

//		$('._goal-process').attr('aria-valuemax', intTotdiff + "");
//		$('._goal-process').attr('aria-valuenow', intCurrdiff + "");
		var percent = parseInt(intCurrdiff / intTotdiff * 100);
		
		if (percent < 0) percent = 0;
		
		$('.progress-bar').css('width', percent+'%').attr('aria-valuenow', intCurrdiff).attr('aria-valuemax', intTotdiff);  
		$('._goal-process').text(percent + "%\n(" + intCurrdiff + "일 째)");
	}
	
	var _setGoalEdit = function (dataArr) {
		$('#_goal-title').val(dataArr[0].goalTitle);
		$('#_goal-start-date').val(dataArr[0].startDate);
		$('#_goal-end-date').val(dataArr[0].endDate);
		$('#_goal-description').val(dataArr[0].goalDescription);
		$('#_goal-id').val(dataArr[0]._id);
		$("#_goal-status option:selected").val(dataArr[0].status);
	};
	
	var _changeElements = function (elType) {
		mode = 'EL';
		elementType = elType;
		
		if (prevRsourceBtn) {
			prevRsourceBtn.parent().removeClass('btn-active');
		}
		
		if (prevContents) {
			prevContents.addClass('hide');
		}
		
		var param = {};
		param.goal = goalInfo._id;
		param.elementtype = elementType;
		controller.selectData('ElementsTable', param);
	};
	
	var _setElements = function (dataArr) {
		
		var elementsContainer;
		var bgStyle;
		
		if (elementType == 'I') {
			elementsContainer = $('._idea-container');
			bgStyle = 'panel-primary';
		} else if (elementType == 'R') {
			elementsContainer = $('._resource-container');
			bgStyle = 'panel-warning';
		} else if (elementType == 'IN') {
			elementsContainer = $('._info-container');
			bgStyle = 'panel-info';
		} else if (elementType == 'M') {
			elementsContainer = $('._mentor-container');
			bgStyle = 'panel-success';
		} else if (elementType == 'RI') {
			elementsContainer = $('._risk-container');
			bgStyle = 'panel-danger';
		} else if (elementType == 'A') {
			elementsContainer = $('._action-container');
			bgStyle = 'panel-default';
		}
		
		var cnt = dataArr.length;
		var appendStr = "";
		
		for (i = (cnt - 1); i >= 0; i--) {
			var description = dataArr[i].description.replace(/\n/gi, '<br>')
			appendStr += "<div class='panel " + bgStyle + "'>" +
					  	 "<div class='panel-heading'>" + dataArr[i].title + "<small class='pull-right'>" + dataArr[i].createdate + "</small></div>" +
					  	 "<div class='panel-body'>" +
					  	 description +
					  	 "</div>" +
					  	 "</div>";
		}
		elementsContainer.empty();
		elementsContainer.append(appendStr);
	};
	
//	var _addElements = function (dataArr) {
//		var elementsObj = dataArr[0];
//		var elementsContainer;
//		var bgStyle;
//		var elCntObj;
//		
//		if (elementType == 'I') {
//			elementsContainer = $('._idea-container');
//			bgStyle = 'panel-primary';
//			elCntObj = $('._label-iead');
//		} else if (elementType == 'R') {
//			elementsContainer = $('._resource-container');
//			bgStyle = 'panel-warning';
//			elCntObj = $('._label-resource');
//		} else if (elementType == 'IN') {
//			elementsContainer = $('._info-container');
//			bgStyle = 'panel-info';
//			elCntObj = $('._label-info');
//		} else if (elementType == 'M') {
//			elementsContainer = $('._mentor-container');
//			bgStyle = 'panel-success';
//			elCntObj = $('._label-mentor');
//		} else if (elementType == 'RI') {
//			elementsContainer = $('._risk-container');
//			bgStyle = 'panel-danger';
//			elCntObj = $('._label-risk');
//		} else if (elementType == 'A') {
//			elementsContainer = $('._action-container');
//			bgStyle = 'panel-default';
//			elCntObj = $('._label-action');
//		}
//		
//		var description = elementsObj.description.replace(/\n/gi, '<br>')
//		var prependStr = "<div class='panel " + bgStyle + "'>" +
//					  	 "<div class='panel-heading'>" + elementsObj.title + "<small class='pull-right'>" + elementsObj.createdate + "</small></div>" +
//					  	 "<div class='panel-body'>" +
//					  	 description +
//					  	 "</div>" +
//					  	 "</div>";
//		
//		elementsContainer.prepend(prependStr);
//		
////		var elCnt = Number(elCntObj.text()) + 1;
////		elCntObj.text(elCnt);
//		
//		_setElementsCount();
//	}
	
	var _setElementsCount = function () {
		mode = "";
		
		if (goalInfo == undefined) {
			$('._chart-goal-process').hide();
			$('._timeline-pane').hide();
			return;
		}
		
		$('._chart-goal-process').show();
		$('._timeline-pane').show();
		
		var param = {};
		param.userid = userInfo.id;
		param.goal = goalInfo._id;
		var dataArr = controller.selectData('ElementsTable', param);
		
		var today = new Date();
		var todayStr = today.formattedDate('-');
		var prevDate = '';
		
		var tlul = $('.timeline');
		
		if (dataArr != null) {
			var cnt = dataArr.length;
			
			for (i = 0; i < cnt; i++) {
				var eltype = dataArr[i].elementtype;
				var createDate = dataArr[i].createdate;
				var elementType = dataArr[i].elementtype;
				var elTyleStr = '';
				
				if (elementType == 'I') {
					elTyleStr = 'Idea';
				} else if (elementType == 'R') {
					elTyleStr = 'Resource';
				} else if (elementType == 'IN') {
					elTyleStr = 'Info';
				} else if (elementType == 'M') {
					elTyleStr = 'Mentor';
				} else if (elementType == 'RI') {
					elTyleStr = 'Risk';
				} else if (elementType == 'A') {
					elTyleStr = 'Action';
				}

				if (prevDate == '' || (prevDate != '' && prevDate != createDate)) {
					if (prevDate != '') {
						tlul.prepend('<li><div class="tldate">' + prevDate + '</div></li>');
					}
					prevDate = createDate;
				}

				var prependStr = '';
				
				
				if (elementType == 'G') {
					prependStr += '<li><div style="border: #999 solid 3px; border-radius: 10px; background-color: #fff">' +
								  '<div class="text-center">' + prevDate + '</div>' +
								  '<div class="text-center"><h3>최초 목표 등록<h3></div>' +
								  '<div class="text-center"><h4>' + dataArr[i].title + '</h4></div>' +
								  '<div class="text-center">' + 
								  '<p>' + dataArr[i].description.replace(/\n/gi, '<br />') + '</p>'+
								  '</div>' +
								  '</div></li>';
				} else {
					if ((i % 2) == 1) {
						prependStr += '<li class="timeline-inverted">';			      
					} else {
						prependStr += '<li>';
					}
					
					prependStr += '<div class="tl-circ"></div>' +
				      '<div class="timeline-panel">' +
				        '<div class="tl-heading">' +
				          '<h4>' + dataArr[i].title + '</h4>' +
				          '<p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + createDate + '</small><br>' + 
				          '<i class="glyphicon glyphicon-star"></i> ' + elTyleStr + '</small></p>' +
				        '</div>' +
				        '<div class="tl-body">' +
				        '<p>' + dataArr[i].description.replace(/\n/gi, '<br />') + '</p>'+
				        '</div>' +
				      '</div>' +
				    '</li>';
				}
				
				
				tlul.prepend(prependStr);
			}
			tlul.prepend('<li><div class="tldate">' + prevDate + '</div></li>');
		}
	};
	
	return {
		init					: _init,
		setProfile				: _setProfile,
		setGoal					: _setGoal,
		setGoalEdit				: _setGoalEdit,
		changeElements			: _changeElements,
		setElements				: _setElements,
//		addElements				: _addElements,
		setElementsCount		: _setElementsCount
	}
}();
view.init();

var controller = function () {
	var _init = function () {
		
	};
	
	var _addGoalInfo = function (param) {
		if (mode != undefined && mode == 'A') {
			var result = SessionDB.insertRow('GoalTable', JSON.stringify(param));
			
			if (result > 0) {
				view.setGoal();
			} else {
				alert("목표 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
			}
		} else if (mode != undefined && mode == 'E') {			
			var result = SessionDB.updateRow('GoalTable', "_id", $('#_goal-id').val(), param);
			
			if (result > 0) {
				$('#_goal-item').text(param.goalTitle);
				$('._startday-label').text(param.startDate);
				$('._endday-label').text(param.endDate);
			} else {
				alert("목표 수장에 실패하였습니다. 잠시 후 다시 시도해주세요.");
			}
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
	
	var _addElementsInfo = function (param) {
//		alert(JSON.stringify(param));
//		return;
		
		var result = SessionDB.insertRow('ElementsTable', JSON.stringify(param));
		
		if (result > 0) {
			var elementsArr = [param];
			view.addElements(elementsArr);
		} else {
			alert("요소 등록에 실패하였습니다. 잠시 후 다시 시도해주세요.");
		}
	};
	
	var _getTable = function (tblNm) {
		return SessionDB.getTable(tblNm);
	};
	
	var _selectData = function (tblNm, param) {
		var dataArr = SessionDB.selectRow(tblNm, param);
		
		if (mode != undefined && mode == 'E') {
			view.setGoalEdit(dataArr);
			return;
		} else if (mode != undefined && mode == 'EL') {
			if (dataArr != null) {
				view.setElements(dataArr);
			}
			
			return;
		}
		
		return dataArr;
	};
	
	return {
		init				: _init,
		addGoalInfo			: _addGoalInfo,
		addProfileInfo		: _addProfileInfo,
		addElementsInfo		: _addElementsInfo,
		getTable			: _getTable,
		selectData			: _selectData
	}
}();
controller.init();