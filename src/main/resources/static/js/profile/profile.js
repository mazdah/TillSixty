var userInfo;
var goalInfo;
var prevRsourceBtn;
var prevContents;
var elementType;
var prevModalBg;

$('document').ready(function () {
	SessionDB.init('local');
	prevContents = $('._dashboard-contents');
	$('.goal-title').hide();
	
//	$('._nav-gaol-title-anchor').click(function () {
//		$("#panel").slideToggle("slow");
//	})
	
	var userInfoStr = SessionDB.getSessionStorage("userInfo");

	if (userInfoStr == undefined) {
		window.location.href = "/";
		return;
	}
	
	//alert(userInfoStr);
	userInfo = JSON.parse(userInfoStr);
	goalInfo = userInfo.goalList[0];
	
	$('._user-id').empty();
	$('._user-name').empty();
	$('._user-id').text("@" + userInfo.userId);
	$('._user-name').text(userInfo.name);
	
	var initialLocaleCode = 'ko';
	var today = new Date();
	var todayStr = today.formattedDate('-');

	$('._anchor-home').click(function () {
		window.location.href = "/html/main.html";
		$('._timeline').removeClass('active');
		$('._home').addClass('active');
		$('._profile').removeClass('active');
	});
	
	$('._anchor-timeline').click(function () {
		window.location.href = "/html/timeline/timeline.html";
		$('._timeline').addClass('active');
		$('._home').removeClass('active');
		$('._profile').removeClass('active');
	});
	
	$('._anchor-logout').click(function () {
		SessionDB.removeSessionStorage('userInfo');
		window.location.href = "/";
	});
	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listMonth'
		},
		defaultDate: todayStr,
		locale: initialLocaleCode,
		buttonIcons: false, // show the prev/next text
		weekNumbers: true,
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		eventClick: function(calEvent, jsEvent, view) {
			var date = new Date(calEvent.start);
	        alert('Event: ' + calEvent.title + '\nStart: ' + date.formattedDate('-') + '\nElementType: ' + calEvent.elementType);
//	        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//	        alert('View: ' + view.name);

	        // change the border color just for fun
	        $(this).css('border-color', 'red');

	    }
//		events: [
//			{
//				title: 'All Day Event',
//				start: '2016-09-01'
//			},
//			{
//				title: 'Long Event',
//				start: '2016-09-07',
//				end: '2016-09-10'
//			},
//			{
//				id: 999,
//				title: 'Repeating Event',
//				start: '2016-09-09T16:00:00'
//			},
//			{
//				id: 999,
//				title: 'Repeating Event',
//				start: '2016-09-16T16:00:00'
//			},
//			{
//				title: 'Conference',
//				start: '2016-09-11',
//				end: '2016-09-13'
//			},
//			{
//				title: 'Meeting',
//				start: '2016-09-12T10:30:00',
//				end: '2016-09-12T12:30:00'
//			},
//			{
//				title: 'Lunch',
//				start: '2016-09-12T12:00:00'
//			},
//			{
//				title: 'Meeting',
//				start: '2016-09-12T14:30:00'
//			},
//			{
//				title: 'Happy Hour',
//				start: '2016-09-12T17:30:00'
//			},
//			{
//				title: 'Dinner',
//				start: '2016-09-12T20:00:00'
//			},
//			{
//				title: 'Birthday Party',
//				start: '2016-09-13T07:00:00'
//			},
//			{
//				title: 'Click for Google',
//				url: 'http://google.com/',
//				start: '2016-09-28'
//			}
//		]
	});
	
	$('._link-calendar').click(function () {
		setTimeout(function () {
			$('#calendar').fullCalendar('render');
		}, 200);
	})
	
	
	$("#_frm-profile-image").fileinput({
		showUpload: false,
		showCaption: false,
		browseClass: "btn btn-primary btn-sm",
		fileType: "any",
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
	});
	
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
		$('#_frm-profile-facebook').val(userInfo.facebook?userInfo.facebook:"");
		$('#_frm-profile-twitter').val(userInfo.twitter?userInfo.twitter:"");
		$('#_frm-profile-link').val(userInfo.link?userInfo.link:"");
		$('#_frm-profile-description').val(userInfo.introduction?userInfo.introduction:"");
	});
	
	$('._go-timeline').click(function () {
		window.location.href = '/html/timeline/timeline.html';
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
		param.goalStatus = $("#_goal-status option:selected").val();
		
		var today = new Date();		
		param.updateDate = today.formattedDate('-');

		controller.updateGoalInfo(param);
		
		$('#_goal-title').val('');
		$('#_goal-start-date').val('');
		$('#_goal-end-date').val('');
		$('#_goal-description').val('');
		$('#_modal-add-goal').modal('hide');
	});
	
	$('#_save-profile').click(function() {
		var facebook = $('#_frm-profile-facebook').val();
		var twitter = $('#_frm-profile-twitter').val();
		var link = $('#_frm-profile-link').val();
		var description = $('#_frm-profile-description').val();
		var image = $("#_frm-profile-image").fileinput('getFileStack'); //$('#_frm-profile-image').val();
		
		//alert("image path = " + image[0].value);
		//return;
		
		if ((facebook == undefined || facebook == '') &&
				(twitter == undefined || twitter == '') &&
				(link == undefined || link == '') &&
				(description == undefined || description == '')) {
			alert('등록할 정보가 없습니다.');
			return;
		}
		
		var param = {};
		
		param.facebook = facebook;
		param.twitter = twitter;
		param.link = link;
		param.introduction = description;
		
		controller.addProfileInfo(param);
		
		$('#_frm-profile-facebook').val('');
		$('#_frm-profile-twitter').val('');
		$('#_frm-profile-link').val('');
		$('#_frm-profile-description').val('');
		$('#_modal-add-profile').modal('hide');
	});
	
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
	
	$('#_goal-item').click(function (){
		//view.changeElements();
		controller.getElementsList();
		
		if (prevRsourceBtn) {
			prevRsourceBtn.parent().removeClass('btn-active');
		}
		
		if (prevContents) {
			prevContents.addClass('hide');
		}
		
		prevContents = $('._dashboard-contents');
		prevContents.removeClass('hide');
	});
	
//	$('._add-goal').click(function (){
//		mode = 'A';
//	});
	
	$('._edit-goal').click(function (){
		$('#_goal-title').val(goalInfo.goalTitle);
		$('#_goal-start-date').val(goalInfo.startDate);
		$('#_goal-end-date').val(goalInfo.endDate);
		$('#_goal-description').val(goalInfo.goalDescription);
		$("#_goal-status option:selected").val(goalInfo.goalStatus);
	});
	
	var _mentorHide = function () {
		$('._elements-name-pane').addClass('hidden');
		$('._elements-email-pane').addClass('hidden');
	};
	
	var _headerChange = function (className) {
		if (prevModalBg) {
			$('.modal-header').removeClass(prevModalBg);
		}
		
		$('.modal-header').addClass(className);
		prevModalBg = className;
	}
	
	$('._add-idea').click(function () {
		_headerChange("modal-header-primary");
		$('.modal-title').text("Idea 추가");
		
		elementType = 'I';
		_mentorHide();
	});
	
	$('._add-resource').click(function () {
		_headerChange("modal-header-warning");
		$('.modal-title').text("Resource 추가");
		elementType = 'R';
		_mentorHide();
	});
	
	$('._add-info').click(function () {
		_headerChange("modal-header-info");
		$('.modal-title').text("Info 추가");
		elementType = 'IN';
		_mentorHide();
	});
	
	$('._add-mentor').click(function () {
		_headerChange("modal-header-success");
		$('.modal-title').text("Mentor 추가");
		elementType = 'M';
		$('._elements-name-pane').removeClass('hidden');
		$('._elements-email-pane').removeClass('hidden');
	});
	
	$('._add-risk').click(function () {
		_headerChange("modal-header-danger");
		$('.modal-title').text("Risk 추가");
		elementType = 'RI';
		_mentorHide();
	});
	
	$('._add-action').click(function () {
		_headerChange("modal-header-default");
		$('.modal-title').text("Action 추가");
		elementType = 'A';
		_mentorHide();
	});
	
	$('#_save-elements').click(function () {
		var title = $('#_elements-title').val();
		var description = $('#_elements-description').val();
		
		if (title == undefined || title == '' || description == undefined || description == '') {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
				
		var param = {};
		
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
		
//		alert(SessionDB.getSessionStorage("goalId"));
//		alert(JSON.stringify(param));
		controller.addElementsInfo(param);
		
		$('#_elements-title').val('');
		$('#_elements-description').val('');
		$('#_modal-add-elements').modal('hide');
	});
	
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
	
//	var _setChart = function () {
//		mode = "";
//		
//		var param = {};
//		param.userid = userInfo.id;
//		param.goal = goalInfo._id;
//		var dataArr = controller.selectData('ElementsTable', param);
//	};
	
	var _setRadarChart = function (data, maxCnt) {
		//////////////////////////////////////////////////////////////
		//////////////////////// Set-Up ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
		var margin = {top: 65, right: 60, bottom: 45, left: 60},
			width = Math.min(420, window.innerWidth - 10) - margin.left - margin.right,
			height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
				
		//alert(width + ' : ' + height);
		////////////////////////////////////////////////////////////// 
		//////////////////// Draw the Chart ////////////////////////// 
		////////////////////////////////////////////////////////////// 
		var color = d3.scale.ordinal().range(["#EDC951","#CC333F","#00A0B0"]);
			
		var radarChartOptions = {
		  w: width,
		  h: height,
		  margin: margin,
		  maxValue: maxCnt + 2,
		  levels: 5,
		  roundStrokes: true,
		  color: color
		};
		//Call function to draw the Radar chart
		RadarChart(".radarChart", data, radarChartOptions);
	};
	
	var _setTodayStatChart = function (data) {
  		nv.addGraph(function() {
  	        var chart = nv.models.discreteBarChart()
  	            .x(function(d) { return d.label })
  	            .y(function(d) { return d.value })
  	            .staggerLabels(false)
  	            //.staggerLabels(historicalBarChart[0].values.length > 8)
  	            .showValues(true)
  	            .duration(250)
  	            .width(440)
	        	.height(160)
//	        	.margin({top: -5}) 
  	            ;

  	        chart.yAxis.tickFormat(d3.format('d'));
  	        chart.valueFormat(d3.format('d'));
  	        
  	        d3.select('#_today-chart svg')
  	            .datum(data)
  	            .call(chart);

  	        nv.utils.windowResize(chart.update);
  	        return chart;
  	    });
	};
	
	var _setElementsStatChart = function (data) {
		nv.addGraph(function() {
	        var chart = nv.models.discreteBarChart()
	            .x(function(d) { return d.label })
	            .y(function(d) { return d.value })
	            .staggerLabels(false)
	            //.staggerLabels(historicalBarChart[0].values.length > 8)
	            .showValues(true)
	            .duration(250)
	            .width(440)
	        	.height(160)
//	        	.margin({top: -5}) 
	            ;

	        chart.yAxis.tickFormat(d3.format('d'));
  	        chart.valueFormat(d3.format('d'));
	        
	        d3.select('#_elements-chart svg')
	            .datum(data)
	            .call(chart);

	        nv.utils.windowResize(chart.update);
	        return chart;
	    });
	};
	
	var _setRangeStatChart = function (data) {
		
			nv.addGraph(function() {
				var chart = nv.models.lineChart()
//	            .margin({top: -5})  //Adjust chart margins to give the x-axis some breathing room.
	            .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
//	            .transitionDuration(350)  //how fast do you want the lines to transition?
	            .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
	            .showYAxis(true)        //Show the y-axis
	            .showXAxis(true)        //Show the x-axis
	            .width(440)
	        	.height(155)
	        ;

	        chart.xAxis.tickFormat(function(d) {
	            return d3.time.format('%y/%m/%d')(new Date(d))
	        });

	        chart.yAxis.tickFormat(d3.format('d'));

	        d3.select('#_range_chart svg')
	            .datum(data)
	            .call(chart);

	        //TODO: Figure out a good way to do this automatically
	        nv.utils.windowResize(chart.update);

	        return chart;
	    });
	}
	
	var _setProfile = function () {
		var fbObj = $('._profile_facebook');
		var twObj = $('._profile_twitter');
		var lnkObj = $('._profile_link');
		var descObj = $('._profile-description');
		
		fbObj.empty();
		twObj.empty();
		lnkObj.empty();
		descObj.empty();		
		
		var profileObj = userInfo;
		
		if (profileObj.introduction != undefined && profileObj.introduction != '') {
			descObj.text(profileObj.introduction);
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
		
		$('._nav-gaol-title-anchor').text(goalInfo.goalTitle);
		$('._description-text').text(goalInfo.goalDescription);
		
		$('._container-add-goal').hide();
		$('.btn-main').removeClass('hide');
		$('.goal-title').show();
		$('#_goal-item').text(goalInfo.goalTitle);
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
	
	var _setGoalEdit = function (dataArr) {
		$('#_goal-title').val(dataArr[0].goalTitle);
		$('#_goal-start-date').val(dataArr[0].startDate);
		$('#_goal-end-date').val(dataArr[0].endDate);
		$('#_goal-description').val(dataArr[0].goalDescription);
		$('#_goal-id').val(dataArr[0]._id);
		$("#_goal-status option:selected").val(dataArr[0].status);
	};
	
	var _changeElements = function (elType) {
		elementType = elType;
		
		if (prevRsourceBtn) {
			prevRsourceBtn.parent().removeClass('btn-active');
		}
		
		if (prevContents) {
			prevContents.addClass('hide');
		}
		
		controller.getElementListForType(elementType);
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
					  	 "<div class='panel-heading'>" + dataArr[i].title + "<small class='pull-right'>" + dataArr[i].createDate + "</small></div>" +
					  	 "<div class='panel-body'>" +
					  	 description +
					  	 "</div>" +
					  	 "</div>";
		}
		elementsContainer.empty();
		elementsContainer.append(appendStr);
	};
	
	var _addElements = function (dataObj) {
		var elementsObj = dataObj;
		var elementsContainer;
		var bgStyle;
		var elCntObj;
		
		if (elementType == 'I') {
			elementsContainer = $('._idea-container');
			bgStyle = 'panel-primary';
			elCntObj = $('._label-iead');
		} else if (elementType == 'R') {
			elementsContainer = $('._resource-container');
			bgStyle = 'panel-warning';
			elCntObj = $('._label-resource');
		} else if (elementType == 'IN') {
			elementsContainer = $('._info-container');
			bgStyle = 'panel-info';
			elCntObj = $('._label-info');
		} else if (elementType == 'M') {
			elementsContainer = $('._mentor-container');
			bgStyle = 'panel-success';
			elCntObj = $('._label-mentor');
		} else if (elementType == 'RI') {
			elementsContainer = $('._risk-container');
			bgStyle = 'panel-danger';
			elCntObj = $('._label-risk');
		} else if (elementType == 'A') {
			elementsContainer = $('._action-container');
			bgStyle = 'panel-default';
			elCntObj = $('._label-action');
		}
		
		var description = elementsObj.description.replace(/\n/gi, '<br>')
		var prependStr = "<div class='panel " + bgStyle + "'>" +
					  	 "<div class='panel-heading'>" + elementsObj.title + "<small class='pull-right'>" + elementsObj.createDate + "</small></div>" +
					  	 "<div class='panel-body'>" +
					  	 description +
					  	 "</div>" +
					  	 "</div>";
		
		elementsContainer.prepend(prependStr);
		
		var elCnt = Number(elCntObj.text()) + 1;
		elCntObj.text(elCnt);
		
//		_setElementsCount(dataArr);
	}
	
	var _setElementsCount = function (dataArr) {
		if (goalInfo == undefined) {
			$('._dashboard-contents').hide();
			return;
		}
		
		$('._dashboard-contents').show();
		
//		var param = {};
//		param.userid = userInfo.id;
//		param.goal = goalInfo._id;
//		var dataArr = controller.selectData('ElementsTable', param);
		
		var ideaCnt = 0;
		var resourceCnt = 0;
		var infoCnt = 0;
		var mentorCnt = 0;
		var riskCnt = 0;
		var actionCnt = 0;
				
		var todayIdeaCnt = 0;
		var todayResourceCnt = 0;
		var todayInfoCnt = 0;
		var todayMentorCnt = 0;
		var todayRiskCnt = 0;
		var todayActionCnt = 0;
		
		var today = new Date();
		var todayStr = today.formattedDate('-');
		
//		$('#calendar').fullCalendar({
//		    events: [
//		        {
//		            title  : 'event1',
//		            start  : '2010-01-01'
//		        },
//		        {
//		            title  : 'event2',
//		            start  : '2010-01-05',
//		            end    : '2010-01-07'
//		        },
//		        {
//		            title  : 'event3',
//		            start  : '2010-01-09T12:30:00',
//		            allDay : false // will make the time show
//		        }
//		    ]
//		});
		
//		alert(JSON.stringify(dataArr));
		
		var calEvents = [];
		
		if (dataArr != null) {
			var cnt = dataArr.length;

			for (i = 0; i < cnt; i++) {
				var eltype = dataArr[i].elementType;
				var createdate = dataArr[i].createDate;
				
				var event = {title: dataArr[i].title, start: createdate, allDay: false, elementType: eltype};
				
				
				if (eltype == 'I') {
					event.backgroundColor = "#337ab7";
					event.className = "#286090";
					event.textColor = "#ffffff";
					ideaCnt++;
					
					if (createdate == todayStr) {
						todayIdeaCnt++;
					}
				} else if (eltype == 'R') {
					event.backgroundColor = "#fcf8e3";
					event.className = "#f7ecb5";
					event.textColor = "#000000";
					resourceCnt++;
					
					if (createdate == todayStr) {
						todayResourceCnt++;
					}
				} else if (eltype == 'IN') {
					event.backgroundColor = "#d9edf7";
					event.className = "#afd9ee";
					event.textColor = "#000000";
					infoCnt++;
					
					if (createdate == todayStr) {
						todayInfoCnt++;
					}
				} else if (eltype == 'M') {
					event.backgroundColor = "#dff0d8";
					event.className = "#c1e2b3";
					event.textColor = "#000000";
					mentorCnt++;
					
					if (createdate == todayStr) {
						todayMentorCnt++;
					}
				} else if (eltype == 'RI') {
					event.backgroundColor = "#f2dede";
					event.className = "#e4b9b9";
					event.textColor = "#000000";
					riskCnt++;
					
					if (createdate == todayStr) {
						todayRiskCnt++;
					}
				} else if (eltype == 'A') {
					event.backgroundColor = "#dddddd";
					event.className = "#aaaaaa";
					event.textColor = "#000000";
					actionCnt++;
					
					if (createdate == todayStr) {
						todayActionCnt++;
					}
				} else if (eltype == 'G') {
					event.title = "목표 등록 : " + event.title;
					event.backgroundColor = "#dddddd";
					event.className = "#aaaaaa";
					event.textColor = "#000000";
				}
				
				calEvents.push(event);
			}
		}
		
		$('#calendar').fullCalendar('removeEvents');
		$('#calendar').fullCalendar('addEventSource', calEvents);
		
		$('._label-idea').text(ideaCnt);
		$('._label-resource').text(resourceCnt);
		$('._label-info').text(infoCnt);
		$('._label-mentor').text(mentorCnt);
		$('._label-risk').text(riskCnt);
		$('._label-action').text(actionCnt);
		
		//////////////////////////////////////////////////////////////
		////////////////////////// Radar chart data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
//		var maxCnt = Math.max(Math.max(Math.max(Math.max(Math.max(ideaCnt, resourceCnt), infoCnt), mentorCnt), riskCnt), actionCnt);
//		
//		var rcdata = [
//				  [//iPhone
//					{axis:"Idea",value:ideaCnt},
//					{axis:"Info",value:infoCnt},
//					{axis:"Resource",value:resourceCnt},
//					{axis:"Mentor",value:mentorCnt},
//					{axis:"Risk",value:riskCnt},
//					{axis:"action",value:actionCnt}
//				  ]
//				];
//		
//		_setRadarChart(rcdata, maxCnt);
		
		//////////////////////////////////////////////////////////////
		////////////////////////// Today bar chart data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
//		var todayBarChart = [
//			      		            {
//			      		                key: "Cumulative Return",
//			      		                values: [
//			      		                  { 
//			      		                    "label" : "Idea" ,
//			      		                    "value" : todayIdeaCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Resource" , 
//			      		                    "value" : todayResourceCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Info" , 
//			      		                    "value" : todayInfoCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Mentor" , 
//			      		                    "value" : todayMentorCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Risk" ,
//			      		                    "value" : todayRiskCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Action" ,
//			      		                    "value" : todayActionCnt
//			      		                  }
//			      		                ]
//			      		              }
//			      		            ]
//		
//		_setTodayStatChart(todayBarChart);
		
		//////////////////////////////////////////////////////////////
		////////////////////////// Total elements chart data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
//		var elementsBarChart = [
//			      		            {
//			      		                key: "Cumulative Return",
//			      		                values: [
//			      		                  { 
//			      		                    "label" : "Idea" ,
//			      		                    "value" : ideaCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Resource" , 
//			      		                    "value" : resourceCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Info" , 
//			      		                    "value" : infoCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Mentor" , 
//			      		                    "value" : mentorCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Risk" ,
//			      		                    "value" : riskCnt
//			      		                  } , 
//			      		                  { 
//			      		                    "label" : "Action" ,
//			      		                    "value" : actionCnt
//			      		                  }
//			      		                ]
//			      		              }
//			      		            ]
//		
//		_setElementsStatChart(elementsBarChart);
		
		//////////////////////////////////////////////////////////////
		////////////////////////// Range elements chart data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 	
//		alert(testDate.otherFormattedDate('y', 3));
		
//		if (dataArr == null) {
//			var rangeData = [
////				             {
////				                key: "Idea",
////				                values: [ { x:1083297600000 , y:1} , 
////				                          { x:1085976000000 , y:1} , 
////				                          { x:1088568000000 , y:0} , 
////				                          { x:1091246400000 , y:0} , 
////				                          { x:1093924800000 , y:2} , 
////				                          { x:1096516800000 , y:0} , 
////				                          { x:1099195200000 , y:0} , 
////				                          { x:1101790800000 , y:0} , 
////				                          { x:1104469200000 , y:1}]
////				            },
////				            {
////				                key: "Resource",
////				                values: [ { x:1083297600000 , y:0} , 
////				                          { x:1085976000000 , y:0} , 
////				                          { x:1088568000000 , y:0} , 
////				                          { x:1091246400000 , y:0} , 
////				                          { x:1093924800000 , y:1} , 
////				                          { x:1096516800000 , y:1} , 
////				                          { x:1099195200000 , y:0} , 
////				                          { x:1101790800000 , y:1} , 
////				                          { x:1104469200000 , y:0}]
////				            },
////				            {
////				                key: "Info",
////				                values: [ { x:1083297600000 , y:2} , 
////				                          { x:1085976000000 , y:0} , 
////				                          { x:1088568000000 , y:1} , 
////				                          { x:1091246400000 , y:1} , 
////				                          { x:1093924800000 , y:0} , 
////				                          { x:1096516800000 , y:1} , 
////				                          { x:1099195200000 , y:0} , 
////				                          { x:1101790800000 , y:1} , 
////				                          { x:1104469200000 , y:1}]
////				            },
////				            {
////				                key: "Mentor",
////				                values: [ { x:1083297600000 , y:1} , 
////				                          { x:1085976000000 , y:0} , 
////				                          { x:1088568000000 , y:0} , 
////				                          { x:1091246400000 , y:0} , 
////				                          { x:1093924800000 , y:0} , 
////				                          { x:1096516800000 , y:0} , 
////				                          { x:1099195200000 , y:0} , 
////				                          { x:1101790800000 , y:0} , 
////				                          { x:1104469200000 , y:0}]
////				            },
////				            {
////				                key: "Risk",
////				                values: [ { x:1083297600000 , y:0} , 
////				                          { x:1085976000000 , y:0} , 
////				                          { x:1088568000000 , y:0} , 
////				                          { x:1091246400000 , y:0} , 
////				                          { x:1093924800000 , y:0} , 
////				                          { x:1096516800000 , y:0} , 
////				                          { x:1099195200000 , y:1} , 
////				                          { x:1101790800000 , y:1} , 
////				                          { x:1104469200000 , y:0}]
////				            },
////				            {
////				            	key: "Action",
////				                values: [ { x:1083297600000 , y:2} , 
////				                          { x:1085976000000 , y:2} , 
////				                          { x:1088568000000 , y:3} , 
////				                          { x:1091246400000 , y:1} , 
////				                          { x:1093924800000 , y:1} , 
////				                          { x:1096516800000 , y:2} , 
////				                          { x:1099195200000 , y:3} , 
////				                          { x:1101790800000 , y:0} , 
////				                          { x:1104469200000 , y:1}]
////				             }
//				        ];
//				
//				_setRangeStatChart(rangeData);
//				return;
//		}
		
//		var startDate = new Date(goalInfo.startDate);
//		var currDate = new Date();
//		var currDay = 24 * 60 * 60 * 1000;
//
//		var currdiff = currDate - startDate;
//		var intCurrdiff = parseInt(currdiff/currDay);
//		
//		var data = [];
//		var ideaItem = {};
//		var resourceItem = {};
//		var infoItem = {};
//		var mentorItem = {};
//		var riskItem = {};
//		var actionItem = {};
//		
//		ideaItem.key = "Idea";
//		resourceItem.key = "Resource";
//		infoItem.key = "Info";
//		mentorItem.key = "Mentor";
//		riskItem.key = "Risk";
//		actionItem.key = "Action";
//		
//		ideaItem.values = [];
//		resourceItem.values = [];
//		infoItem.values = [];
//		mentorItem.values = [];
//		riskItem.values = [];
//		actionItem.values = [];
////		dataItem.values = [];
//		
//		
//		
//		if (intCurrdiff >= 7) {
//			intCurrdiff = 7;
//		}
//		
//		for (i = intCurrdiff; i >= 0; i--) {
//			var ideaArr = [];
//			var resourceArr = [];
//			var infoArr = [];
//			var mentorArr = [];
//			var riskArr = [];
//			var actionArr = [];			
//			
//			var otherDate = new Date();
//			otherDate.setDate(currDate.getDate() - i);
//			var otherDateTime = otherDate.getTime();
//			var otherDateStr = otherDate.formattedDate('-');
//			
//			var cnt = dataArr.length;
//			
//			var otherIdeaCnt = 0;
//			var otherResourceCnt = 0;
//			var otherInfoCnt = 0;
//			var otherMentorCnt = 0;
//			var otherRiskCnt = 0;
//			var otherActionCnt = 0;
//			
//			for (j = 0; j < cnt; j++) {
//				var eltype = dataArr[j].elementType;
//				var createdate = dataArr[j].createDate;
//				
//				if (eltype == 'I') {
//					if (createdate == otherDateStr) {
//						otherIdeaCnt++;
//					}
//				} else if (eltype == 'R') {
//					if (createdate == otherDateStr) {
//						otherResourceCnt++;
//					}
//				} else if (eltype == 'IN') {
//					if (createdate == otherDateStr) {
//						otherInfoCnt++;
//					}
//				} else if (eltype == 'M') {
//					if (createdate == otherDateStr) {
//						otherMentorCnt++;
//					}
//				} else if (eltype == 'RI') {
//					if (createdate == otherDateStr) {
//						otherRiskCnt++;
//					}
//				} else if (eltype == 'A') {
//					if (createdate == otherDateStr) {
//						otherActionCnt++;
//					}
//				}
//			}
//			
//			ideaItem.values.push({x:otherDateTime, y:otherIdeaCnt});
//			resourceItem.values.push({x:otherDateTime, y:otherResourceCnt});
//			infoItem.values.push({x:otherDateTime, y:otherInfoCnt});
//			mentorItem.values.push({x:otherDateTime, y:otherMentorCnt});
//			riskItem.values.push({x:otherDateTime, y:otherRiskCnt});
//			actionItem.values.push({x:otherDateTime, y:otherActionCnt});
//		}
//		
//		data.push(ideaItem);
//		data.push(resourceItem);
//		data.push(infoItem);
//		data.push(mentorItem);
//		data.push(riskItem);
//		data.push(actionItem);
//		
//		_setRangeStatChart(data);

		
	};
	
	return {
		init					: _init,
		setTodayStatChart		: _setTodayStatChart,
		setRadarChart			: _setRadarChart,
		setElementsStatChart	: _setElementsStatChart,
		setRangeStatChart		: _setRangeStatChart,
		setProfile				: _setProfile,
		setGoal					: _setGoal,
		setGoalEdit				: _setGoalEdit,
		changeElements			: _changeElements,
		setElements				: _setElements,
		addElements				: _addElements,
		setElementsCount		: _setElementsCount
	}
}();
view.init();

var controller = function () {
	var _init = function () {
		
	};
	
	var _updateGoalInfo = function (param) {
		var paramStr = '{"goalList":[' + JSON.stringify(param) + ']}'
		
		$.ajax({
			url : "/rest/profiles/" + SessionDB.getSessionStorage("userId"),
			type : "PATCH",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : paramStr,
			success : function (data, status, jqXHR) {
				alert("_updateGoalInfo : " + JSON.stringify(data));
				SessionDB.setSessionStorage("userInfo", JSON.stringify(data));
				SessionDB.setSessionStorage("goalInfo", JSON.stringify(data.goalList));
				userInfo = data;
				goalInfo = userInfo.goalList[0];
				view.setGoal();
			},
			error : function (jqXHR, status) {
				alert("error : 목표 수정에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
			}
		});

	};
	
	var _addProfileInfo = function (param) {
		$.ajax({
			url : "/rest/profiles/" + SessionDB.getSessionStorage("userId"),
			type : "PATCH",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : JSON.stringify(param),
			success : function (data, status, jqXHR) {
//				alert("_addProfileInfo : " + JSON.stringify(data));
				SessionDB.setSessionStorage("userInfo", JSON.stringify(data));
				userInfo = data;
				view.setProfile();
			},
			error : function (jqXHR, status) {
				alert("error : Profile 등록에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
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
//				_getElementsList();
				view.addElements(data);
			},
			error : function (jqXHR, status) {
				alert("error : 요소 등록에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
			}
		});
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
	
	var _getElementListForType = function(elementType) {
		var userId = SessionDB.getSessionStorage("userId");
		var goalId = goalInfo.goalId;
		
		$.ajax({
			url : "/rest/elements/search/findByUserIdAndGoalIdAndElementType?userId=" + userId + "&goalId=" + goalId + "&elementType=" + elementType,
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {			
				//alert(JSON.stringify(data));
				view.setElements(data._embedded.elementses);
			},
			error : function (jqXHR, status) {
				alert("error : 요소 목록을 가져오는 중 오류가 발생하였습니다. [" + status + "]");
			}
		});
	};

	return {
		init					: _init,
		updateGoalInfo			: _updateGoalInfo,
		addProfileInfo			: _addProfileInfo,
		addElementsInfo			: _addElementsInfo,
		getElementsList			: _getElementsList,
		getElementListForType	: _getElementListForType
	}
}();
controller.init();