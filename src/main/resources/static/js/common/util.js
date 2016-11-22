Date.prototype.formattedDate = function (delemeter) {
	if (!delemeter) delemeter = '';
	
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString();
	var dd = this.getDate().toString();
	
	if (mm < 10) mm = "0" + mm;
	if (dd < 10) dd = "0" + dd;
	
	return "" + yyyy + delemeter + mm + delemeter + dd;
}