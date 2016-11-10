var TillSixty = function () {
	var _StorageDB = function () {
		var $storage;
		
		var _createDb = function(dbname, datastr, type) {
			
		}
		
		var _checkDuplicateDB = function(dbname) {
			var storageLen = sessionStro
		}
	}();
	
	return {
		StorageDB:	_StorageDB
	}
}();

/*
var cnt = 0;
var dbName = '';
var tblNm = '';
var row = '';

function createTable(tblNm) {
	if (tblNm != undefined && tblNm != '') {
		dbName = tblNm;
	} else {
		dbName = document.getElementById('dbNm').value;
	}
	

	if (dbName == undefined || '' == dbName) {
		alert('Table 이름은 필수입니다.');
		return;
	}

	if (window.sessionStorage[dbName] != undefined) {
		alert('이미 존재하는 테이블입니다.');
		return;
	}

	window.sessionStorage[dbName] = '{"table": []}';

	alert("테이블 생성에 성공하였습니다. :: " + window.sessionStorage[dbName]);
}

function insertRow() {
	tblNm = document.getElementById('tblNm').value;
	row = document.getElementById('row').value;

	if (tblNm == undefined || '' == tblNm) {
		alert('Table 이름은 필수입니다.');
		return;
	}

	if (row == undefined || '' == row) {
		alert('insert할 데이터가 없습니다.');
		return;
	}

	if (window.sessionStorage[tblNm] == undefined) {
		if (confirm('테이블이 존재하지 않습니다. 테이블을 생성하여 진행하시겠습니까?')) {
			createTable(tblNm);
		} else {
			return;
		}
	}

	var tableObj = JSON.parse(window.sessionStorage[tblNm]);
	var rowObj = JSON.parse(row);

	alert("insertRow :: tableObj = " + JSON.stringify(tableObj));

	var tableArr = tableObj.table;
	var rowCnt = tableArr.length;
	alert('tableArr = ' + JSON.stringify(tableArr) + ' : length = ' + rowCnt);

	var rowId = 0;
	if (rowCnt > 0) {
		rowId = Number(tableArr[tableArr.length - 1].id) + 1;
	}

	rowObj.id = rowId + "";

	tableArr.push(rowObj);
	tableObj.table = tableArr;

	window.sessionStorage[tblNm] = JSON.stringify(tableObj);
	alert("insertRow :: tableObj = " + JSON.stringify(tableObj));
}

function selectRow() {
	var col = document.getElementById('column').value;
	var val = document.getElementById('val').value;
	var tblNm2 = document.getElementById('tblNm2').value;

	if (tblNm2 == undefined || '' == tblNm2 || val == undefined || '' == val || col == undefined || '' == col) {
		alert('Table 이름과 컬럼 이름과 컬럼 값은 필수입니다.');
		return;
	}

	var tableObj = JSON.parse(window.sessionStorage[tblNm2]);
	var tableArr = tableObj.table;
	var rowCnt = tableArr.length;
	var cnt = 0;
	var resultArr = [];

//	for (var obj in tableArr) {		//이렇게 하면 obj에 id만 들어감!!!
	for (i = 0; i < rowCnt; i++) {
		var obj = tableArr[i]
		if (obj[col] == val) {
			cnt++;
			resultArr.push(obj);
		}
	};

	if (cnt == 0) {
		alert("조회 조건에 맞는 데이터가 없습니다.");
	} else {
		alert("총 " + cnt + "건의 데이터가 조회되었습니다.\n" + JSON.stringify(resultArr));
	}
}
*/