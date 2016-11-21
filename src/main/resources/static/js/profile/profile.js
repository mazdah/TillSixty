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
		  maxValue: 1,
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

		      	        //chart.yAxis.tickFormat(d3.format(',.0%'));
		      	        
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

	        //chart.yAxis.tickFormat(d3.format(',.0%'));
	        
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
		                values: [ [ 1083297600000 , -2.974623048543] , [ 1085976000000 , -1.7740300785979] , [ 1088568000000 , 4.4681318138177] , [ 1091246400000 , 7.0242541001353] , [ 1093924800000 , 7.5709603667586] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194]]
		                ,
		                mean: 250
		            },
		            {
		                key: "Resource",
		                values: [ [ 1083297600000 , -0.77078283705125] , [ 1085976000000 , -1.8356366650335] , [ 1088568000000 , -5.3121322073127] , [ 1091246400000 , -4.9320975829662] , [ 1093924800000 , -3.9835408823225] , [ 1096516800000 , -6.8694685316805] , [ 1099195200000 , -8.4854877428545] , [ 1101790800000 , -15.933627197384] , [ 1104469200000 , -15.920980069544]]
		                ,
		                mean: -60
		            },
		            {
		                key: "Info",
		                mean: 125,
		                values: [ [ 1083297600000 , -3.7454058855943] , [ 1085976000000 , -3.6096667436314] , [ 1088568000000 , -0.8440003934950] , [ 1091246400000 , 2.0921565171691] , [ 1093924800000 , 3.5874194844361] , [ 1096516800000 , 13.742776534056] , [ 1099195200000 , 13.212577494462] , [ 1101790800000 , 24.567562260634] , [ 1104469200000 , 34.543699343650]]
		            },
		            {
		                key: "Mentor",
		                values: [ [ 1083297600000 , -1.7798428181819] , [ 1085976000000 , -0.36883324836999] , [ 1088568000000 , 1.7312581046040] , [ 1091246400000 , -1.8356125950460] , [ 1093924800000 , -1.5396564170877] , [ 1096516800000 , -0.16867791409247] , [ 1099195200000 , 1.3754263993413] , [ 1101790800000 , 5.8171640898041] , [ 1104469200000 , 9.4350145241608]]
		            },
		            {
		                key: "Risk",
		                values: [ [ 1083297600000 , 1.7798428181819] , [ 1085976000000 , 0.36883324836999] , [ 1088568000000 , 2.7312581046040] , [ 1091246400000 , 3.8356125950460] , [ 1093924800000 , 4.5396564170877] , [ 1096516800000 , 5.16867791409247] , [ 1099195200000 , 5.3754263993413] , [ 1101790800000 , 5.8171640898041] , [ 1104469200000 , 9.4350145241608]]
		            },
		            {
		                key: "Action",
		                values: [ [ 1083297600000 , 2.7798428181819] , [ 1085976000000 , 0.36883324836999] , [ 1088568000000 , 4.7312581046040] , [ 1091246400000 , 5.8356125950460] , [ 1093924800000 , 6.5396564170877] , [ 1096516800000 , 7.16867791409247] , [ 1099195200000 , 10.3754263993413] , [ 1101790800000 , 12.8171640898041] , [ 1104469200000 , 15.4350145241608]]
		            }
		        ];
		
		nv.addGraph(function() {
	        var chart = nv.models.cumulativeLineChart()
	            .useInteractiveGuideline(true)
	            .x(function(d) { return d[0] })
	            .y(function(d) { return d[1]/100 })
	            .color(d3.scale.category10().range())
	            .average(function(d) { return d.mean/100; })
	            .duration(300)
	            .clipVoronoi(false)
	            .showControls(false);
	        chart.dispatch.on('renderEnd', function() {
	            console.log('render complete: cumulative line with guide line');
	        });

	        chart.xAxis.tickFormat(function(d) {
	            return d3.time.format('%m/%d/%y')(new Date(d))
	        });

	        chart.yAxis.tickFormat(d3.format(',.0%'));

	        d3.select('#_range_chart svg')
	            .datum(data)
	            .call(chart);

	        //TODO: Figure out a good way to do this automatically
	        nv.utils.windowResize(chart.update);

	        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
	        chart.state.dispatch.on('change', function(state){
	            nv.log('state', JSON.stringify(state));
	        });

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
		init					: _init,
		setTodayStatChart		: _setTodayStatChart,
		setRadarChart			: _setRadarChart,
		setElementsStatChart	: _setElementsStatChart,
		setRangeStatChart		: _setRangeStatChart,
		setProfile				: _setProfile,
		setGoal					: _setGoal,
		setPrev					: _setPrev
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