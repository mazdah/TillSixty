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
		
		if (mode == 'E') {
			param.status = $("#_goal-status option:selected").val();
		} else {
			param.status = "O"; // O : ongoing, D : Drop, H : Hold
		}

		controller.addGoalInfo(param);
		
		$('#_modal-add-goal').modal('hide');
	});
	
	$('#_save-profile').click(function() {
		var facebook = $('#_frm-profile-facebook').val();
		var twitter = $('#_frm-profile-twitter').val();
		var link = $('#_frm-profile-link').val();
		var description = $('#_frm-profile-description').val();
		var image = $("#_frm-profile-image").fileinput('getFileStack'); //$('#_frm-profile-image').val();
		
		alert("image path = " + image[0].value);
		return;
		
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
		view.changeElements();
		prevContents = $('._dashboard-contents');
		prevContents.removeClass('hide');
	});
	
	$('._add-goal').click(function (){
		mode = 'A';
	});
	
	$('._edit-goal').click(function (){
		mode = 'E';
		$('._goal-stat-pane').removeClass('hide');
		
		var param = {};
		param.owner = userInfo.id;
		
		controller.selectData('GoalTable', param);
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
		var title = $('#_elements-title').val();
		var description = $('#_elements-description').val();
		
		if (title == undefined || title == '' || description == undefined || description == '') {
			alert('제목과 내용을 입력해주세요.');
			return;
		}
				
		var param = {};
		
		param.userid = userInfo.id;
		
		alert(goalInfo._id);
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
	});
	
	
	view.setProfile();
	view.setGoal();
	view.setRadarChart();
	view.setTodayStatChart();
	view.setElementsStatChart();
	view.setRangeStatChart();
});

var view = function () {
	var _init = function () {
		
	};
	
	var _setRadarChart = function () {
		//////////////////////////////////////////////////////////////
		//////////////////////// Set-Up ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
		var margin = {top: 65, right: 60, bottom: 45, left: 60},
			width = Math.min(420, window.innerWidth - 10) - margin.left - margin.right,
			height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
				
		//alert(width + ' : ' + height);
		////////////////////////////////////////////////////////////// 
		////////////////////////// Data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
		var data = [
				  [//iPhone
					{axis:"Idea",value:10},
					{axis:"Info",value:7},
					{axis:"Resource",value:5},
					{axis:"Mentor",value:2},
					{axis:"Risk",value:3},
					{axis:"action",value:15}
				  ]
				];
		////////////////////////////////////////////////////////////// 
		//////////////////// Draw the Chart ////////////////////////// 
		////////////////////////////////////////////////////////////// 
		var color = d3.scale.ordinal().range(["#EDC951","#CC333F","#00A0B0"]);
			
		var radarChartOptions = {
		  w: width,
		  h: height,
		  margin: margin,
		  maxValue: 10,
		  levels: 5,
		  roundStrokes: true,
		  color: color
		};
		//Call function to draw the Radar chart
		RadarChart(".radarChart", data, radarChartOptions);
	};
	
	var _setTodayStatChart = function () {
		var historicalBarChart = [
		      		            {
		      		                key: "Cumulative Return",
		      		                values: [
		      		                  { 
		      		                    "label" : "Idea" ,
		      		                    "value" : 1
		      		                  } , 
		      		                  { 
		      		                    "label" : "Resource" , 
		      		                    "value" : 0
		      		                  } , 
		      		                  { 
		      		                    "label" : "Info" , 
		      		                    "value" : 2
		      		                  } , 
		      		                  { 
		      		                    "label" : "Mentor" , 
		      		                    "value" : 0
		      		                  } , 
		      		                  { 
		      		                    "label" : "Risk" ,
		      		                    "value" : 0
		      		                  } , 
		      		                  { 
			      		                    "label" : "Action" ,
			      		                    "value" : 2
			      		                  }
		      		                ]
		      		              }
		      		            ]
		      		
		      		nv.addGraph(function() {
		      	        var chart = nv.models.discreteBarChart()
		      	            .x(function(d) { return d.label })
		      	            .y(function(d) { return d.value })
		      	            .staggerLabels(false)
		      	            //.staggerLabels(historicalBarChart[0].values.length > 8)
		      	            .showValues(true)
		      	            .duration(250)
		      	            ;

		      	        chart.yAxis.tickFormat(d3.format('d'));
		      	        chart.valueFormat(d3.format('d'));
		      	        
		      	        d3.select('#_today-chart svg')
		      	            .datum(historicalBarChart)
		      	            .call(chart);

		      	        nv.utils.windowResize(chart.update);
		      	        return chart;
		      	    });
	};
	
	var _setElementsStatChart = function () {
		var historicalBarChart = [
		            {
		                key: "Cumulative Return",
		                values: [
		                  { 
		                    "label" : "Idea" ,
		                    "value" : 5
		                  } , 
		                  { 
		                    "label" : "Resource" , 
		                    "value" : 3
		                  } , 
		                  { 
		                    "label" : "Info" , 
		                    "value" : 7
		                  } , 
		                  { 
		                    "label" : "Mentor" , 
		                    "value" : 1
		                  } , 
		                  { 
		                    "label" : "Risk" ,
		                    "value" : 2
		                  } , 
		                  { 
			                    "label" : "action" ,
			                    "value" : 15
			                  }
		                ]
		              }
		            ]
		
		nv.addGraph(function() {
	        var chart = nv.models.discreteBarChart()
	            .x(function(d) { return d.label })
	            .y(function(d) { return d.value })
	            .staggerLabels(false)
	            //.staggerLabels(historicalBarChart[0].values.length > 8)
	            .showValues(true)
	            .duration(250)
	            ;

	        chart.yAxis.tickFormat(d3.format('d'));
  	        chart.valueFormat(d3.format('d'));
	        
	        d3.select('#_elements-chart svg')
	            .datum(historicalBarChart)
	            .call(chart);

	        nv.utils.windowResize(chart.update);
	        return chart;
	    });
	};
	
	var _setRangeStatChart = function () {
		var data = [
		             {
		                key: "Idea",
		                values: [ { x:1083297600000 , y:1} , { x:1085976000000 , y:1} , { x:1088568000000 , y:0} , { x:1091246400000 , y:0} , { x:1093924800000 , y:2} , { x:1096516800000 , y:0} , { x:1099195200000 , y:0} , { x:1101790800000 , y:0} , { x:1104469200000 , y:1}]
		            },
		            {
		                key: "Resource",
		                values: [ { x:1083297600000 , y:0} , { x:1085976000000 , y:0} , { x:1088568000000 , y:0} , { x:1091246400000 , y:0} , { x:1093924800000 , y:1} , { x:1096516800000 , y:1} , { x:1099195200000 , y:0} , { x:1101790800000 , y:1} , { x:1104469200000 , y:0}]
		            },
		            {
		                key: "Info",
		                values: [ { x:1083297600000 , y:2} , { x:1085976000000 , y:0} , { x:1088568000000 , y:1} , { x:1091246400000 , y:1} , { x:1093924800000 , y:0} , { x:1096516800000 , y:1} , { x:1099195200000 , y:0} , { x:1101790800000 , y:1} , { x:1104469200000 , y:1}]
		            },
		            {
		                key: "Mentor",
		                values: [ { x:1083297600000 , y:1} , { x:1085976000000 , y:0} , { x:1088568000000 , y:0} , { x:1091246400000 , y:0} , { x:1093924800000 , y:0} , { x:1096516800000 , y:0} , { x:1099195200000 , y:0} , { x:1101790800000 , y:0} , { x:1104469200000 , y:0}]
		            },
		            {
		                key: "Risk",
		                values: [ { x:1083297600000 , y:0} , { x:1085976000000 , y:0} , { x:1088568000000 , y:0} , { x:1091246400000 , y:0} , { x:1093924800000 , y:0} , { x:1096516800000 , y:0} , { x:1099195200000 , y:1} , { x:1101790800000 , y:1} , { x:1104469200000 , y:0}]
		            },
		            {
		                key: "Action",
		                values: [ { x:1083297600000 , y:2} , { x:1085976000000 , y:2} , { x:1088568000000 , y:3} , { x:1091246400000 , y:1} , { x:1093924800000 , y:1} , { x:1096516800000 , y:2} , { x:1099195200000 , y:3} , { x:1101790800000 , y:0} , { x:1104469200000 , y:1}]
		            }
		        ];
		
			nv.addGraph(function() {
				var chart = nv.models.lineChart()
//	            .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
	            .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
//	            .transitionDuration(350)  //how fast do you want the lines to transition?
	            .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
	            .showYAxis(true)        //Show the y-axis
	            .showXAxis(true)        //Show the x-axis
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
		
		$('._container-add-goal').hide();
		$('.btn-main').removeClass('hide');
		$('.goal-title').show();
		$('#_goal-item').text(goalInfoArr[0].goalTitle);
		$('._startday-label').text(goalInfoArr[0].startDate);
		$('._endday-label').text(goalInfoArr[0].endDate);
		
		var today = new Date();
		$('._today-label').text(today.formattedDate('-'));
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
		for (i = (cnt - 1); i == 0; i--) {
			appendStr += "<div class='panel " + bgStyle + "'>" +
					  	 "<div class='panel-heading'>" + dataArr[i].title + "<small class='pull-right'>" + dataArr[i].createdate + "</small></div>" +
					  	 "<div class='panel-body'>" +
					  	 dataArr[i].description +
					  	 "</div>" +
					  	 "</div>";
		}
		
		alert(appendStr);
		
		elementsContainer.empty();
		elementsContainer.append(appendStr);
	};
	
	var _addElements = function (dataArr) {
		var elementsObj = [0];
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
		
		var prependStr = "<div class='panel " + bgStyle + "'>" +
					  	 "<div class='panel-heading'>" + elementsObj.title + "<small class='pull-right'>" + elementsObj.createdate + "</small></div>" +
					  	 "<div class='panel-body'>" +
					  	 elementsObj.description +
					  	 "</div>" +
					  	 "</div>";
		
		elementsContainer.prepend(prependStr);
	}
	
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
		addElements				: _addElements
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
		init			: _init,
		addGoalInfo		: _addGoalInfo,
		addProfileInfo	: _addProfileInfo,
		addElementsInfo	: _addElementsInfo,
		getTable		: _getTable,
		selectData		: _selectData
	}
}();
controller.init();