var userInfo;
var goalInfo;
var prevRsourceBtn;
var prevContents;
var elementType = "TD";
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
	
	$('#_due-date').datepicker(
			{
				format: "yyyy-mm-dd",
				language: "ko",
				todayBtn: true,
				todayHighlight: true,
				toggleActive: true,
				autoclose: true
			}	
	);
	
	$('#_todo-date').datepicker(
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
		elementType = "TD";
		controller.getTodoList();
		
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
		$('._modal-content-elements').css('height', '350px');
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
		$('._modal-content-elements').css('height', '500px');
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
	
	$('._elements-status').on('change', function () {
		if ($(this).val() == '예정') {
			$('._due-date').removeClass('hidden');
		} else {
			$('._due-date').addClass('hidden');
		}
	});
	
	$('._add-todo').click(function () {
		_headerChange("modal-header-default");
		$('.modal-title').text("To-Do 추가");
		_mentorHide();
	});
	
	$('#_save-elements').click(function () {
		var title = $('#_elements-title').val();
		var description = $('#_elements-description').val();
		var status = $('#_elements-status').val();
		var seq = '1';
		var dueDate = $('#_due-date').val();

		var today = new Date();
		var elementId = today.getTime();
		var todayStr = today.formattedDate('-');
		
		if (title == undefined || title == '' || description == undefined || description == '') {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
		
		
		var param = {};
		param.dueDateList = [];
		
		param.userId = SessionDB.getSessionStorage("userId");
		param.goalId = SessionDB.getSessionStorage("goalId");
		param.elementId = elementId;
		param.elementType = elementType;
		param.title = title;
		param.description = description;
		param.status = status;
//		alert('status = ' + status);
		if (status == '예정') {
			if (dueDate) {
				param.dueDateList.push(dueDate);
			}
		} else {
			param.endDate = todayStr;
		}
			
		param.createDate = todayStr;
		
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
	
	$('#_save-todo').click(function () {
		var title = $('#_todo-title').val();
		var description = $('#_todo-description').val();
		elementType = $('#_elements-type').val();
		var dueDate = $('#_todo-date').val();
		var status = '예정';
		
		if (title == undefined || title == '' || description == undefined || description == '') {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
		
		var today = new Date();
		var elementId = today.getTime();
		var todayStr = today.formattedDate('-');
		
		var param = {};
		param.dueDateList = [];
		
		param.userId = SessionDB.getSessionStorage("userId");
		param.goalId = SessionDB.getSessionStorage("goalId");
		param.elementId = elementId;
		param.elementType = elementType;
		param.title = title;
		param.description = description;
		if (dueDate) {
			param.dueDateList.push(dueDate);
		}
		param.status = status;
		
				
		param.createDate = todayStr;
		
		if (elementType == 'M') {
			param.name = $('#_todo-name').val();
			param.email = $('#_todo-email').val();
		}
		
//		alert(SessionDB.getSessionStorage("goalId"));
//		alert(JSON.stringify(param));
		controller.addElementsInfo(param);
		
		$('#_todo-title').val('');
		$('#_todo-description').val('');
		$('#_todo-date').val('');
		$("#_elements-type option:selected").val("I");
		$('#_modal-add-todo').modal('hide');
	});
	
	var dueDateForUpdate;
	$(document).on('click', '._edit_duedate', function (){
		var elId = $(this).attr('id');
		
		//alert(JSON.stringify($('._btn-group-' + elId).data('dueDateList')));
		//alert('edit : element id = ' + elId + ' : due-date = ' + $(this).attr('due-date'));
		//controller.updateDueDate($(this).attr('id'));
		dueDateForUpdate = $(this).attr('due-date');
		
		$('._due-date-text-' + elId).empty();
		$('._due-date-text-' + elId).html('<div class="form-group form-group-sm" style="display: inline-block; margin-top: -9px"><input type="text" class="form-control" id="_due-date-for-update" value=""></div>');
		
		$('#_due-date-for-update').datepicker(
				{
					format: "yyyy-mm-dd",
					language: "ko",
					todayBtn: true,
					todayHighlight: true,
					toggleActive: true,
					autoclose: true
				}	
		);
		
		$('._btn-group-' + elId).empty();
		$('._btn-group-' + elId).html("<a class='btn btn-xs btn-danger _go-edit-duedate' id='" + $(this).attr('id') + "' due-date='" + $(this).attr('due-date') + "'>저장</a> <a class='btn btn-xs btn-default _edit-duedate-cancel' id='" + $(this).attr('id') + "' due-date='" + $(this).attr('due-date') + "'>취소</a>");
	});
	
	$(document).on('click', '._edit-duedate-cancel', function() {
		var elId = $(this).attr('id');
		
		$('._due-date-text-' + elId).empty();
		$('._due-date-text-' + elId).text(dueDateForUpdate);
		$('._btn-group-' + elId).empty();
		$('._btn-group-' + elId).html("<a class='btn btn-xs btn-danger _edit_duedate' id='" + elId + "' due-date='" + dueDateForUpdate + "'>수정</a></div>");
	});
	
	$(document).on('click', '._go-edit-duedate', function() {
		//alert($('#_due-date-for-update').val());
		var elId = $(this).attr('id');		
		var paramObj = $('._btn-group-' + elId).data('dueDateList');
		var updateDate = $('#_due-date-for-update').val();
		
		if (updateDate == undefined || updateDate == "") {
			alert("수정할 날짜를 입력해주세요!");
			
			$('._due-date-text-' + elId).empty();
			$('._due-date-text-' + elId).text(dueDateForUpdate);
			$('._btn-group-' + elId).empty();
			$('._btn-group-' + elId).html("<a class='btn btn-xs btn-danger _edit_duedate' id='" + elId + "' due-date='" + dueDateForUpdate + "'>수정</a></div>");
			
			return;
		}
		
		paramObj.push(updateDate);
		controller.updateDueDate(elId, paramObj);
	});
	
	$(document).on('change', '#_complete', function() {
		//alert(elementType);
		var elId = $(this).attr('element-id')
		
		if ($(this).is(':checked')) {
			if (confirm("이 할일을 완료하시겠습니까?")) {
				controller.setComplete(elId);
			}
		}
	});
	
	view.setProfile();
	view.setGoal();
	controller.getElementsList();
	controller.getTodoList();
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
		
		if (profileObj.profile) {
			if (profileObj.profile.introduction != undefined && profileObj.profile.introduction != '') {
				descObj.text(profileObj.profile.introduction);
			}
			
			if (profileObj.profile.facebook != undefined && profileObj.profile.facebook != '') {
				fbObj.append('<a href="https://www.facebook.com/profile.php?id=' + profileObj.profile.facebook + '" target="_blank"><img src="../../images/profile/ico_facebook.png" width="25px" height="25px">' + profileObj.profile.facebook + '</a>');
			}
			
			if (profileObj.profile.twitter != undefined && profileObj.profile.twitter != '') {
				twObj.append('<a href="https://twitter.com/' + profileObj.profile.twitter + '" target="_blank"><img src="../../images/profile/ico_twitter.png" width="25px" height="25px">' + profileObj.profile.twitter + '</a>');
			}
			
			if (profileObj.profile.link != undefined && profileObj.profile.link != '') {
				lnkObj.append('<div class="_link-area">&nbsp;<img src="../../images/profile/ico_link.png" width="15px" height="15px">&nbsp;&nbsp; <a href="' + profileObj.profile.link + '" target="_blank">' + profileObj.profile.link + '</a></div>');
			}
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
	
	var _setUpdateDueDate = function (dataObj) {
		var dueDate = dataObj.dueDateList.sort().reverse()[0];
		var urlArr = dataObj._links.self.href.split("/");
		var _id = urlArr[urlArr.length - 1];
		
		$('._due-date-text-' + _id).empty();
		$('._due-date-text-' + _id).text(dueDate);
		$('._btn-group-' + _id).empty();
		$('._btn-group-' + _id).html("<a class='btn btn-xs btn-danger _edit_duedate' id='" + _id + "' due-date='" + dueDate + "'>수정</a></div>");
	};
	
	var _setElements = function (dataArr, flag) {
		var appendToDoStr = "";
		var appendStr = "";
		var elementsContainer;
		var bgStyle;

		
		var cnt = dataArr.length;
		
		$('._idea_todo_list_container').empty();
		$('._idea_complete_list_container').empty();
		
		$('._resource_todo_list_container').empty();
		$('._resource_complete_list_container').empty();
		
		$('._info_todo_list_container').empty();
		$('._info_complete_list_container').empty();
		
		$('._mentor_todo_list_container').empty();
		$('._mentor_complete_list_container').empty();
		
		$('._risk_todo_list_container').empty();
		$('._risk_complete_list_container').empty();
		
		$('._action_todo_list_container').empty();
		$('._action_complete_list_container').empty();
		
		$('._todo-list-div').empty();
		
		for (i = (cnt - 1); i >= 0; i--) {
			//alert(JSON.stringify(dataArr[i]));
			var status = dataArr[i].status;
			var dueDate = dataArr[i].dueDateList.sort().reverse()[0];
			var complete = "";
			var urlArr = dataArr[i]._links.self.href.split("/");
			var _id = urlArr[urlArr.length - 1];
			
			if (dataArr[i].elementType == 'I') {
				bgStyle = 'panel-primary';
				
				if (status == "예정" || status == "연기") {
					elementsContainer = $('._idea_todo_list_container');
				} else {
					elementsContainer = $('._idea_complete_list_container');
				}
			} else if (dataArr[i].elementType == 'R') {
				bgStyle = 'panel-warning';
				
				if (status == "예정" || status == "연기") {
					elementsContainer = $('._resource_todo_list_container');
				} else {
					elementsContainer = $('._resource_complete_list_container');
				}
			} else if (dataArr[i].elementType == 'IN') {
				bgStyle = 'panel-info';
				
				if (status == "예정" || status == "연기") {
					elementsContainer = $('._info_todo_list_container');
				} else {
					elementsContainer = $('._info_complete_list_container');
				}
			} else if (dataArr[i].elementType == 'M') {
				bgStyle = 'panel-success';
				
				if (status == "예정" || status == "연기") {
					elementsContainer = $('._mentor_todo_list_container');
				} else {
					elementsContainer = $('._mentor_complete_list_container');
				}
			} else if (dataArr[i].elementType == 'RI') {
				bgStyle = 'panel-danger';
				
				if (status == "예정" || status == "연기") {
					elementsContainer = $('._risk_todo_list_container');
				} else {
					elementsContainer = $('._risk_complete_list_container');
				}
			} else if (dataArr[i].elementType == 'A') {
				bgStyle = 'panel-default';
				
				if (status == "예정" || status == "연기") {
					elementsContainer = $('._action_todo_list_container');
				} else {
					elementsContainer = $('._action_complete_list_container');
				}
			}
			
			var description = dataArr[i].description.replace(/\n/gi, '<br>')
			if (status == "예정" || status == "연기") {
				var date = new Date();
				var todayStr = date.formattedDate("-");
				if (todayStr > dueDate) {
					complete = "<div class='panel-footer'>&nbsp;<div class='_duedate pull-left'>예정일 : <span class='_due-date-text" + _id + "'><font color='#ff0000'>" + dueDate + "</font></span> <div class='_btn-group-" + _id + "' style='display: inline-block'><a class='btn btn-xs btn-danger _edit_duedate' id='" + _id + "' due-date='" + dueDate + "'>수정</a></div></div> <label class='complete pull-right' for='_complete'>완료 <input type='checkbox' id='_complete' element-id='" + _id + "'></label></div>";
				} else {
					complete = "<div class='panel-footer'>&nbsp;<div class='_duedate pull-left'>예정일 : <span class='_due-date-text-" + _id + "'>" + dueDate + "</span> <div class='_btn-group-" + _id + "' style='display: inline-block'><a class='btn btn-xs btn-danger _edit_duedate' id='" + _id + "' due-date='" + dueDate + "'>수정</a></div></div> <label class='complete pull-right' for='_complete'>완료 <input type='checkbox' id='_complete' element-id='" + _id + "'></label></div>";
				}
				
				if (flag == "TD") {
					appendToDoStr = "<div class='panel " + bgStyle + "'>" +
				  	 "<div class='panel-heading'>" + dataArr[i].title + "<small class='pull-right'>" + dataArr[i].createDate + "</small></div>" +
				  	 "<div class='panel-body'>" +
				  	 description +
				  	 "</div>" +
				  	 complete +
				  	 "</div>";
					
					$('._todo-list-div').append(appendToDoStr);
				} else {
					appendToDoStr = "<div class='panel " + bgStyle + "'>" +
				  	 "<div class='panel-heading'>" + dataArr[i].title + "<small class='pull-right'>" + dataArr[i].createDate + "</small></div>" +
				  	 "<div class='panel-body'>" +
				  	 description +
				  	 "</div>" +
				  	 complete +
				  	 "</div>";
					
					elementsContainer.append(appendToDoStr);
				}
							
				$('._btn-group-' + _id).data('dueDateList', dataArr[i].dueDateList);
			} else {
				appendStr = "<div class='panel " + bgStyle + "'>" +
			  	 "<div class='panel-heading'>" + dataArr[i].title + "<small class='pull-right'>" + dataArr[i].createDate + "</small></div>" +
			  	 "<div class='panel-body'>" +
			  	 description +
			  	 "</div>" +
			  	 "<div class='panel-footer'>&nbsp;<small class='_duedate pull-right'>완료일 : <span class='_due-date-text-" + _id + "'>" + dataArr[i].endDate + "</span></small></div>" +
			  	 "</div>";
				
				elementsContainer.append(appendStr);
			}
		}
	};
	
	var _addElements = function (dataObj) {
		var elementsObj = dataObj;
		var elementsContainer;
		var bgStyle;
		var elCntObj;
		var status = elementsObj.status;
		var dueDate = dataObj.dueDateList.sort().reverse()[0];
		var urlArr = dataObj._links.self.href.split("/");
		var _id = urlArr[urlArr.length - 1];
		
		if (elementType == 'I') {
			if (status == "예정" || status == "연기") {
				elementsContainer = $('._idea_todo_list_container');
			} else {
				elementsContainer = $('._idea_complete_list_container');
			}
			
			bgStyle = 'panel-primary';
			elCntObj = $('._label-idea');
		} else if (elementType == 'R') {
			if (status == "예정" || status == "연기") {
				elementsContainer = $('._resource_todo_list_container');
			} else {
				elementsContainer = $('._resource_complete_list_container');
			}
			
			bgStyle = 'panel-warning';
			elCntObj = $('._label-resource');
		} else if (elementType == 'IN') {
			if (status == "예정" || status == "연기") {
				elementsContainer = $('._info_todo_list_container');
			} else {
				elementsContainer = $('._info_complete_list_container');
			}
			
			bgStyle = 'panel-info';
			elCntObj = $('._label-info');
		} else if (elementType == 'M') {
			if (status == "예정" || status == "연기") {
				elementsContainer = $('._mentor_todo_list_container');
			} else {
				elementsContainer = $('._mentor_complete_list_container');
			}
			
			bgStyle = 'panel-success';
			elCntObj = $('._label-mentor');
		} else if (elementType == 'RI') {
			if (status == "예정" || status == "연기") {
				elementsContainer = $('._risk_todo_list_container');
			} else {
				elementsContainer = $('._risk_complete_list_container');
			}
			
			bgStyle = 'panel-danger';
			elCntObj = $('._label-risk');
		} else if (elementType == 'A') {
			if (status == "예정" || status == "연기") {
				elementsContainer = $('._action_todo_list_container');
			} else {
				elementsContainer = $('._action_complete_list_container');
			}
			
			bgStyle = 'panel-default';
			elCntObj = $('._label-action');
		}
		
		var complete = "";
		
		if (status == "예정" || status == "연기") {
			complete = "<div class='panel-footer'>&nbsp;<div class='_duedate pull-left'>예정일 : <span class='_due-date-text-" + _id + "'>" + dueDate + "</span> <div class='_btn-group-" + _id + "' style='display: inline-block'><a class='btn btn-xs btn-danger _edit_duedate' id='" + _id + "' due-date='" + dueDate + "'>수정</a></div></div> <label class='complete pull-right' for='_complete'>완료 <input type='checkbox' id='_complete' element-id='" + _id + "'></label></div>";
		} else {
			complete = "<div class='panel-footer'>&nbsp;<small class='_duedate pull-right'>완료일 : <span class='_due-date-text-" + _id + "'>" + dataArr[i].endDate + "</span></small></div>";
		}
		
		var description = elementsObj.description.replace(/\n/gi, '<br>')
		var prependStr = "<div class='panel " + bgStyle + "'>" +
					  	 "<div class='panel-heading'>" + elementsObj.title + "<small class='pull-right'>" + elementsObj.createDate + "</small></div>" +
					  	 "<div class='panel-body'>" +
					  	 description +
					  	 "</div>" +
					  	 complete +
					  	 "</div>";
		
		elementsContainer.prepend(prependStr);
		
		if (status == "예정" || status == "연기") {
			$('._btn-group-' + _id).data('dueDateList', dataObj.dueDateList);
		}
	
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
		setElementsCount		: _setElementsCount,
		setUpdateDueDate		: _setUpdateDueDate
	}
}();
view.init();

var controller = function () {
	var _init = function () {
		
	};
	
	var _updateGoalInfo = function (param) {
		var paramStr = '{"goalList":[' + JSON.stringify(param) + ']}'
		
		$.ajax({
			url : "/rest/users/" + SessionDB.getSessionStorage("userId"),
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
			url : "/rest/users/" + SessionDB.getSessionStorage("userId"),
			type : "PATCH",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : '{"profile":' + JSON.stringify(param) + '}',
			success : function (data, status, jqXHR) {
				alert("_addProfileInfo : " + JSON.stringify(data));
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
			url : "/rest/elements/search/findByUserIdAndGoalIdAndElementTypeOrderByStatusDesc?userId=" + userId + "&goalId=" + goalId + "&elementType=" + elementType,
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {			
//				alert(JSON.stringify(data));
				view.setElements(data._embedded.elementses);
			},
			error : function (jqXHR, status) {
				alert("error : 요소 목록을 가져오는 중 오류가 발생하였습니다. [" + status + "]");
			}
		});
	};
	
	var _getTodoList = function () {
		var userId = SessionDB.getSessionStorage("userId");
		var goalId = goalInfo.goalId;
		
		$.ajax({
			url : "/rest/elements/search/findByUserIdAndGoalIdAndStatusInOrderByCreateDateAsc?userId=" + userId + "&goalId=" + goalId + "&status=예정&status=연기",
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function (data, status, jqXHR) {			
//				alert(JSON.stringify(data));
				view.setElements(data._embedded.elementses, "TD");
			},
			error : function (jqXHR, status) {
				alert("error : ToDo 목록을 가져오는 중 오류가 발생하였습니다. [" + status + "]");
			}
		});
	}

	var _updateDueDate = function(elementId, paramObj) {
		var paramStr = '{"dueDateList": ' + JSON.stringify(paramObj) + ', "status": "연기"}'
		
		$.ajax({
			url : "/rest/elements/" + elementId,
			type : "PATCH",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : paramStr,
			success : function (data, status, jqXHR) {
				//alert("_addProfileInfo : " + JSON.stringify(data));
				view.setUpdateDueDate(data);
			},
			error : function (jqXHR, status) {
				alert("error : Profile 등록에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
			}
		});
	};
	
	var _setComplete = function (elementId) {
		var date = new Date();
		var todayStr = date.formattedDate("-");
		
		var paramStr = '{"status": "완료","endDate": "' + todayStr + '"}'
		
		$.ajax({
			url : "/rest/elements/" + elementId,
			type : "PATCH",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			data : paramStr,
			success : function (data, status, jqXHR) {
				//alert("_addProfileInfo : " + JSON.stringify(data));
				if (elementType == "TD") {
					_getTodoList();
				} else {
					_getElementListForType(elementType);
				}
			},
			error : function (jqXHR, status) {
				alert("error : Profile 등록에 실패하였습니다. 잠시 후 다시 시도해주세요. [" + status + "]");
			}
		});
	};
	
	return {
		init					: _init,
		updateGoalInfo			: _updateGoalInfo,
		addProfileInfo			: _addProfileInfo,
		addElementsInfo			: _addElementsInfo,
		getElementsList			: _getElementsList,
		getElementListForType	: _getElementListForType,
		getTodoList				: _getTodoList,
		updateDueDate			: _updateDueDate,
		setComplete				: _setComplete
	}
}();
controller.init();