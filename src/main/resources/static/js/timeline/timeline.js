var userInfo;
var goalInfo;
var prevRsourceBtn;
var prevContents;
var mode;

$('document').ready(function () {
	SessionDB.init('local');
	
	prevContents = $('._dashboard-contents');
	$('.goal-title').hide();
	
//	$('[data-toggle="popover"]').popover({
//        placement : 'bottom',
//        title: "title",
//        content: "And here's some amazing content. It's very engaging. Right?"
//    });
	
//	$('._nav-gaol-title-anchor').click(function () {
//		$("#panel").slideToggle("slow");
//	})
	
	$('._add-elements-btn').click(function () {
		$("#panel2").slideToggle("slow");
	})
	
	$('#_elements-type').on('change', function () {
		if ('M' == $(this).val()) {
			$('._elements-name-pane').removeClass('hidden');
			$('._elements-email-pane').removeClass('hidden');
		} else {
			$('._elements-name-pane').addClass('hidden');
			$('._elements-email-pane').addClass('hidden');
		}
	})
	
	$('#_close-modal').click(function () {
		$("#panel2").slideToggle("slow");
	})
	
	var userInfoStr = SessionDB.getSessionStorage("userInfo");

	if (userInfoStr == undefined) {
		window.location.href = "/";
		return;
	}

	userInfo = JSON.parse(userInfoStr);
	goalInfo = userInfo.goalList[0];
	
	$('._user-id').empty();
	$('._user-name').empty();
	$('._user-id').text("@" + userInfo.userId);
	$('._user-name').text(userInfo.name);
	
	$('._anchor-home').click(function () {
		window.location.href = "/html/main.html";
		$('._timeline').removeClass('active');
		$('._home').addClass('active');
		$('._profile').removeClass('active');
	});
	
	$('._anchor-profile').click(function () {
		window.location.href = "/html/profile/profile.html";
		$('._timeline').removeClass('active');
		$('._home').removeClass('active');
		$('._profile').addClass('active');
	});
	
	$('._anchor-logout').click(function () {
		SessionDB.removeSessionStorage('userInfo', '');
		window.location.href = "/";
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
		var elementType = $('#_elements-type').val();
		
		param.userId = SessionDB.getSessionStorage("userId");
		param.goalId = SessionDB.getSessionStorage("goalId");
		param.elementType = elementType;
		param.title = title;
		param.description = description;
		
		var today = new Date();		
		param.createDate = today.formattedDate('-');
		
		if (elementType == 'M') {
			param.name = $('#_elements-name').val();
			param.email = $('#_elements-email').val();
		}
		
		controller.addElementsInfo(param);
		
		$('#_elements-title').val('');
		$('#_elements-description').val('');
		$('#_elements-name').val('');
		$('#_elements-email').val('');
		
		$("#panel2").slideToggle("slow");
	});
	
	$('._go-profile').click(function () {
		window.location.href="/html/profile/profile.html"
	})
	
	view.setProfile();
	view.setGoal();
	controller.getElementsList();
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
		
		if (userInfo.description != undefined && userInfo.description != '') {
			descObj.text(userInfo.description);
		}
		
		if (userInfo.facebook != undefined && userInfo.facebook != '') {
			fbObj.append('<img src="../../images/profile/ico_facebook.png" width="25px" height="25px"> ' + userInfo.facebook);
		}
		
		if (userInfo.twitter != undefined && userInfo.twitter != '') {
			twObj.append('<img src="../../images/profile/ico_twitter.png" width="25px" height="25px"> ' + userInfo.twitter);
		}
		
		if (userInfo.link != undefined && userInfo.link != '') {
			lnkObj.append('<div class="_link-area">&nbsp;<img src="../../images/profile/ico_link.png" width="15px" height="15px">&nbsp;&nbsp; ' + userInfo.link + '</div>');
		}
		
		//<img src="../../images/profile/ico_facebook.png" width="25px" height="25px"> 100012050000
		//<img src="../../images/profile/ico_twitter.png" width="25px" height="25px"> @mazdah70
		//<div class="_link-area">&nbsp;<img src="../../images/profile/ico_link.png" width="15px" height="15px">&nbsp;&nbsp; http://mazdah.tistory.com/</div>
	};

	var _setGoal = function () {
		$('._nav-gaol-title-anchor').text(goalInfo.goalTitle);
		$('._description-text').text(goalInfo.goalDescription);
		
//		$('._container-add-goal').hide();
//		$('.btn-main').removeClass('hide');
//		$('.goal-title').show();
//		$('#_goal-item').text(goalInfoArr[0].goalTitle);
		$('._startday-label').text(goalInfo.startDate);
		$('._endday-label').text(goalInfo.endDate);
		
		var startDate = new Date(goalInfo.startDate);
		var endDate = new Date(goalInfo.endDate);
		var currDate = new Date();
		var currDay = 24 * 60 * 60 * 1000;
		
		var totdiff = endDate - startDate;
		var currdiff = currDate - startDate;
		
		var intTotdiff = parseInt(totdiff/currDay);
		var intCurrdiff = Math.ceil(currdiff/currDay);
		
		var today = new Date();
		$('._today-label').text(today.formattedDate('-') + " (" + intCurrdiff + "일차)");

//		$('._goal-process').attr('aria-valuemax', intTotdiff + "");
//		$('._goal-process').attr('aria-valuenow', intCurrdiff + "");
		var percent = parseInt(intCurrdiff / intTotdiff * 100);
		
		if (percent < 0) percent = 0;
		
		$('.progress-bar').css('width', percent+'%').attr('aria-valuenow', intCurrdiff).attr('aria-valuemax', intTotdiff);  
		$('._goal-process').text(percent + "%");
	}
	
	var _setElementsCount = function (dataArr) {
		mode = "";
		
		if (goalInfo == undefined) {
			$('._chart-goal-process').hide();
			$('._timeline-pane').hide();
			return;
		}
		
		$('._chart-goal-process').show();
		$('._timeline-pane').show();
		
		var today = new Date();
		var todayStr = today.formattedDate('-');
		var prevDate = '';
		
		var tlul = $('.timeline');
		
		tlul.empty();
		
		if (dataArr != null) {
			var cnt = dataArr.length;
			
			for (i = 0; i < cnt; i++) {
				var createDate = dataArr[i].createDate;
				var elementType = dataArr[i].elementType;
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
								  '<div class="text-center"><h4>최초 목표 등록<h4></div>' +
								  '<div class="text-center"><h2>' + dataArr[i].title + '</h2></div>' +
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
//		setGoalEdit				: _setGoalEdit,
//		changeElements			: _changeElements,
//		setElements				: _setElements,
//		addElements				: _addElements,
		setElementsCount		: _setElementsCount
	}
}();
view.init();

var controller = function () {
	var _init = function () {
		
	};

	var _getElementsList = function () {
		var userId = SessionDB.getSessionStorage("userId");
		var goalId = goalInfo.goalId;
		
		$.ajax({
			url : "/rest/elements/search/findByUserIdAndGoalId?userId=" + userId + "&goalId=" + goalId,
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {			
				view.setElementsCount(data._embedded.elementses)
			},
			error : function (jqXHR, status) {
				alert("error : 요소 목록을 가져오는 중 오류가 발생하였습니다. [" + status + "]");
			}
		});
	};
	
	var _addElementsInfo = function (param) {

		$.ajax({
			url : "/rest/elements/",
			type : "POST",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : JSON.stringify(param),
			success : function (data, status, jqXHR) {
//				alert("_addElementsInfo : " + JSON.stringify(data));
				_getElementsList();
			},
			error : function (jqXHR, status) {
				alert("error : 요소 등록에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
			}
		});
	};
	
	
	return {
		init				: _init,
		getElementsList		: _getElementsList,
//		addGoalInfo			: _addGoalInfo,
//		addProfileInfo		: _addProfileInfo,
		addElementsInfo		: _addElementsInfo
	}
}();
controller.init();