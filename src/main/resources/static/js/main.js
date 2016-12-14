var userInfo;
var goalInfo;

$('document').ready(function () {	
	$('._nav-gaol-title-anchor').click(function () {
		$("#panel").slideToggle("slow");
	})
	
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

	
	$('._anchor-timeline').click(function () {
		window.location.href = "/html/timeline/timeline.html";
		$('._timeline').addClass('active');
		$('._home').removeClass('active');
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
	
	$('._go-profile').click(function () {
		window.location.href="/html/profile/profile.html"
	})
	
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
	
	var _setGoal = function () {
		$('._goal-title').text(goalInfo.goalTitle);
		$('._goal-description').html(goalInfo.goalDescription.replace(/\n/gi, '<br />'));
		$('._goal-start-date').text("기간 : " + goalInfo.startDate + " ~ " + goalInfo.endDate);
		
		var startDate = new Date(goalInfo.startDate);
		var endDate = new Date(goalInfo.endDate);
		var currDate = new Date();
		var currDay = 24 * 60 * 60 * 1000;
		
		var totdiff = endDate - startDate;
		var currdiff = currDate - startDate;
		
		var intTotdiff = parseInt(totdiff/currDay);
		var intCurrdiff = Math.ceil(currdiff/currDay);
		
		var today = new Date();
		
		$('._goal-layer-title .text').html("오늘은<br />목표 실행</br><font color='#f00'>" + intCurrdiff + "일차</font><br />입니다!");

//		$('._goal-process').attr('aria-valuemax', intTotdiff + "");
//		$('._goal-process').attr('aria-valuenow', intCurrdiff + "");
		var percent = parseInt(intCurrdiff / intTotdiff * 100);
		
		if (percent < 0) percent = 0;
		
		$('.progress-bar').css('width', percent+'%').attr('aria-valuenow', intCurrdiff).attr('aria-valuemax', intTotdiff);  
		$('._goal-process').text(percent + "%");
	}
	
	var _setTodayStatChart = function (data) {
  		nv.addGraph(function() {
  	        var chart = nv.models.discreteBarChart()
  	            .x(function(d) { return d.label })
  	            .y(function(d) { return d.value })
  	            .staggerLabels(false)
  	            //.staggerLabels(historicalBarChart[0].values.length > 8)
  	            .showValues(true)
  	            .duration(250)
  	            .width(780)
	        	.height(180)
	        	//.margin({left: -5}) 
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
	
	var _setElementsCount = function (dataArr) {
		
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
		
//		$('#calendar').fullCalendar('removeEvents');
//		$('#calendar').fullCalendar('addEventSource', calEvents);
		
//		$('._label-idea').text(ideaCnt);
//		$('._label-resource').text(resourceCnt);
//		$('._label-info').text(infoCnt);
//		$('._label-mentor').text(mentorCnt);
//		$('._label-risk').text(riskCnt);
//		$('._label-action').text(actionCnt);
		
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
		
//		_setRadarChart(rcdata, maxCnt);
		
		//////////////////////////////////////////////////////////////
		////////////////////////// Today bar chart data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
		var todayBarChart = [
			      		            {
			      		                key: "Cumulative Return",
			      		                values: [
			      		                  { 
			      		                    "label" : "Idea" ,
			      		                    "value" : todayIdeaCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Resource" , 
			      		                    "value" : todayResourceCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Info" , 
			      		                    "value" : todayInfoCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Mentor" , 
			      		                    "value" : todayMentorCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Risk" ,
			      		                    "value" : todayRiskCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Action" ,
			      		                    "value" : todayActionCnt
			      		                  }
			      		                ]
			      		              }
			      		            ]
		
		_setTodayStatChart(todayBarChart);
		
		//////////////////////////////////////////////////////////////
		////////////////////////// Total elements chart data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 
		var elementsBarChart = [
			      		            {
			      		                key: "Cumulative Return",
			      		                values: [
			      		                  { 
			      		                    "label" : "Idea" ,
			      		                    "value" : ideaCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Resource" , 
			      		                    "value" : resourceCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Info" , 
			      		                    "value" : infoCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Mentor" , 
			      		                    "value" : mentorCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Risk" ,
			      		                    "value" : riskCnt
			      		                  } , 
			      		                  { 
			      		                    "label" : "Action" ,
			      		                    "value" : actionCnt
			      		                  }
			      		                ]
			      		              }
			      		            ]
		
//		_setElementsStatChart(elementsBarChart);
		
		//////////////////////////////////////////////////////////////
		////////////////////////// Range elements chart data ////////////////////////////// 
		////////////////////////////////////////////////////////////// 	
//		alert(testDate.otherFormattedDate('y', 3));
		
		if (dataArr == null) {
			var rangeData = [
//				             {
//				                key: "Idea",
//				                values: [ { x:1083297600000 , y:1} , 
//				                          { x:1085976000000 , y:1} , 
//				                          { x:1088568000000 , y:0} , 
//				                          { x:1091246400000 , y:0} , 
//				                          { x:1093924800000 , y:2} , 
//				                          { x:1096516800000 , y:0} , 
//				                          { x:1099195200000 , y:0} , 
//				                          { x:1101790800000 , y:0} , 
//				                          { x:1104469200000 , y:1}]
//				            },
//				            {
//				                key: "Resource",
//				                values: [ { x:1083297600000 , y:0} , 
//				                          { x:1085976000000 , y:0} , 
//				                          { x:1088568000000 , y:0} , 
//				                          { x:1091246400000 , y:0} , 
//				                          { x:1093924800000 , y:1} , 
//				                          { x:1096516800000 , y:1} , 
//				                          { x:1099195200000 , y:0} , 
//				                          { x:1101790800000 , y:1} , 
//				                          { x:1104469200000 , y:0}]
//				            },
//				            {
//				                key: "Info",
//				                values: [ { x:1083297600000 , y:2} , 
//				                          { x:1085976000000 , y:0} , 
//				                          { x:1088568000000 , y:1} , 
//				                          { x:1091246400000 , y:1} , 
//				                          { x:1093924800000 , y:0} , 
//				                          { x:1096516800000 , y:1} , 
//				                          { x:1099195200000 , y:0} , 
//				                          { x:1101790800000 , y:1} , 
//				                          { x:1104469200000 , y:1}]
//				            },
//				            {
//				                key: "Mentor",
//				                values: [ { x:1083297600000 , y:1} , 
//				                          { x:1085976000000 , y:0} , 
//				                          { x:1088568000000 , y:0} , 
//				                          { x:1091246400000 , y:0} , 
//				                          { x:1093924800000 , y:0} , 
//				                          { x:1096516800000 , y:0} , 
//				                          { x:1099195200000 , y:0} , 
//				                          { x:1101790800000 , y:0} , 
//				                          { x:1104469200000 , y:0}]
//				            },
//				            {
//				                key: "Risk",
//				                values: [ { x:1083297600000 , y:0} , 
//				                          { x:1085976000000 , y:0} , 
//				                          { x:1088568000000 , y:0} , 
//				                          { x:1091246400000 , y:0} , 
//				                          { x:1093924800000 , y:0} , 
//				                          { x:1096516800000 , y:0} , 
//				                          { x:1099195200000 , y:1} , 
//				                          { x:1101790800000 , y:1} , 
//				                          { x:1104469200000 , y:0}]
//				            },
//				            {
//				            	key: "Action",
//				                values: [ { x:1083297600000 , y:2} , 
//				                          { x:1085976000000 , y:2} , 
//				                          { x:1088568000000 , y:3} , 
//				                          { x:1091246400000 , y:1} , 
//				                          { x:1093924800000 , y:1} , 
//				                          { x:1096516800000 , y:2} , 
//				                          { x:1099195200000 , y:3} , 
//				                          { x:1101790800000 , y:0} , 
//				                          { x:1104469200000 , y:1}]
//				             }
				        ];
				
//				_setRangeStatChart(rangeData);
				return;
		}
		
		var startDate = new Date(goalInfo.startDate);
		var currDate = new Date();
		var currDay = 24 * 60 * 60 * 1000;

		var currdiff = currDate - startDate;
		var intCurrdiff = parseInt(currdiff/currDay);
		
		var data = [];
		var ideaItem = {};
		var resourceItem = {};
		var infoItem = {};
		var mentorItem = {};
		var riskItem = {};
		var actionItem = {};
		
		ideaItem.key = "Idea";
		resourceItem.key = "Resource";
		infoItem.key = "Info";
		mentorItem.key = "Mentor";
		riskItem.key = "Risk";
		actionItem.key = "Action";
		
		ideaItem.values = [];
		resourceItem.values = [];
		infoItem.values = [];
		mentorItem.values = [];
		riskItem.values = [];
		actionItem.values = [];
//		dataItem.values = [];
		
		
		
		if (intCurrdiff >= 7) {
			intCurrdiff = 7;
		}
		
		for (i = intCurrdiff; i >= 0; i--) {
			var ideaArr = [];
			var resourceArr = [];
			var infoArr = [];
			var mentorArr = [];
			var riskArr = [];
			var actionArr = [];			
			
			var otherDate = new Date();
			otherDate.setDate(currDate.getDate() - i);
			var otherDateTime = otherDate.getTime();
			var otherDateStr = otherDate.formattedDate('-');
			
			var cnt = dataArr.length;
			
			var otherIdeaCnt = 0;
			var otherResourceCnt = 0;
			var otherInfoCnt = 0;
			var otherMentorCnt = 0;
			var otherRiskCnt = 0;
			var otherActionCnt = 0;
			
			for (j = 0; j < cnt; j++) {
				var eltype = dataArr[j].elementType;
				var createdate = dataArr[j].createDate;
				
				if (eltype == 'I') {
					if (createdate == otherDateStr) {
						otherIdeaCnt++;
					}
				} else if (eltype == 'R') {
					if (createdate == otherDateStr) {
						otherResourceCnt++;
					}
				} else if (eltype == 'IN') {
					if (createdate == otherDateStr) {
						otherInfoCnt++;
					}
				} else if (eltype == 'M') {
					if (createdate == otherDateStr) {
						otherMentorCnt++;
					}
				} else if (eltype == 'RI') {
					if (createdate == otherDateStr) {
						otherRiskCnt++;
					}
				} else if (eltype == 'A') {
					if (createdate == otherDateStr) {
						otherActionCnt++;
					}
				}
			}
			
			ideaItem.values.push({x:otherDateTime, y:otherIdeaCnt});
			resourceItem.values.push({x:otherDateTime, y:otherResourceCnt});
			infoItem.values.push({x:otherDateTime, y:otherInfoCnt});
			mentorItem.values.push({x:otherDateTime, y:otherMentorCnt});
			riskItem.values.push({x:otherDateTime, y:otherRiskCnt});
			actionItem.values.push({x:otherDateTime, y:otherActionCnt});
		}
		
		data.push(ideaItem);
		data.push(resourceItem);
		data.push(infoItem);
		data.push(mentorItem);
		data.push(riskItem);
		data.push(actionItem);
		
//		_setRangeStatChart(data);

		
	};
	
	return {
		init					: _init,
		setGoal					: _setGoal,
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