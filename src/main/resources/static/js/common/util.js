Date.prototype.formattedDate = function (delemeter) {
	var dm = delemeter;
	
	if (!dm) dm = '';
	
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString();
	var dd = this.getDate().toString();
	
	if (mm < 10) mm = "0" + mm;
	if (dd < 10) dd = "0" + dd;
	
	return "" + yyyy + dm + mm + dm + dd;
}

Date.prototype.otherFormattedDate = function (flag, value, delemeter) {
	var fl = flag;
	var val = value;
	var dm = delemeter;
	
	if (!dm) dm = '';
	
	if (!fl || (fl != 'm' && fl != 'y' && fl != 'd')) fl = 'd';
	else fl = flag.toLowerCase();
	
	if (!value) delemeter = 0;
	
	if (fl == 'd') {
		this.setDate(this.getDate() + val);
	} else if (fl == 'm') {
		this.setMonth(this.getMonth() + val);
	} else {
		this.setFullYear(this.getFullYear() + val);
	}
	
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString();
	var dd = this.getDate().toString();
	
	if (mm < 10) mm = "0" + mm;
	if (dd < 10) dd = "0" + dd;
	
	return "" + yyyy + dm + mm + dm + dd;
}