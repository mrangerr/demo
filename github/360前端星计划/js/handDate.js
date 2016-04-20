window.onload = function() {
	var year = document.getElementById("year");
	var year_down = getClass(year,"icon-year-down")[0];
	var year_content = getClass(year,"year-content")[0];
	var year_content_li = year_content.getElementsByTagName("li");
	var yearNow = getClass(year,"year-now")[0];

	var month = document.getElementById("month");
	var month_down = getClass(month,"icon-month-down")[0];
	var month_left = getClass(month,"icon-month-left")[0];
	var month_right = getClass(month,"icon-month-right")[0];
	var month_content = getClass(month,"month-content")[0];
	var month_content_li = month_content.getElementsByTagName("li");
	var monthNow = getClass(month,"month-now")[0];

	var holiday = document.getElementById("holiday");
	var holiday_down = getClass(holiday,"icon-holiday-down")[0];
	var holiday_content = getClass(holiday,"holiday-content")[0];
	var holiday_content_li = holiday_content.getElementsByTagName("li");
	var holidayNow = getClass(holiday,"holiday-now")[0];

	var table = document.getElementById("table");
	var tbody = table.getElementsByTagName("tbody")[0];
	var td = tbody.getElementsByTagName("td");

	var backToday = document.getElementById("today");
	var myDate = new Date();
	yearNow.innerHTML = myDate.getFullYear() + "年";  
	monthNow.innerHTML = myDate.getMonth()+1 + "月"; 

	

	function cute() {
		//获得本年本月具体日历表	
		var week = coutDate(yearNow.innerHTML, monthNow.innerHTML, month_content_li);
		//获得上一个月的月历表
		var before = getBefore(monthNow.innerHTML,yearNow.innerHTML,month_content_li,year_content_li);
		var beforeWeek = coutDate(year_content_li[before.afterYearIndex].innerHTML,
								month_content_li[before.afterMonthIndex].innerHTML,
								month_content_li).length;
		//日历入表
		fillTable( td, week, beforeWeek);
	}
	//标记节假日
	function festival(value) {
		switch(value){
			case "1月":
				cute();
				currentFestival(td,"1","元旦");
			break;
			case "3月":
				cute();
				currentFestival(td,"8","妇女节");
			break;
			case "5月":
				cute();
				currentFestival(td,"1","劳动节");
			break;
			case "6月":
				cute();
				currentFestival(td,"1","儿童节");
			break;
			case "9月":
				cute();
				currentFestival(td,"15","教师节");
			break;
			case "10月":
				cute();
				currentFestival(td,"1","国庆")
			break;
			case "11月":
				cute();
				currentFestival(td,"1","万圣节")
			break;
			break;
				case "12月":
				cute();
				currentFestival(td,"25","圣诞节");
			break;
		}
	}
	//
	function spring() {
		var value = monthNow.innerHTML;
		result = solarTerm(parseInt(yearNow.innerHTML)); 

		switch(value) {
			case "1月":
				festival();
				currentSolar(td,result[0][0],result[0][1]);
				currentSolar(td,result[1][0],result[1][1]);
			break;
			case "2月":
				festival();
				currentSolar(td,result[2][0],result[2][1]);
				currentSolar(td,result[3][0],result[3][1]);
			break;
			case "3月":
				festival();
				currentSolar(td,result[4][0],result[4][1]);
				currentSolar(td,result[5][0],result[5][1]);
			break;
			case "4月":
				festival();
				currentSolar(td,result[6][0],result[6][1]);
				currentSolar(td,result[7][0],result[7][1]);
			break;
			case "5月":
				festival();
				currentSolar(td,result[8][0],result[8][1]);
				currentSolar(td,result[9][0],result[9][1]);
			break;
			case "6月":
				festival();
				currentSolar(td,result[10][0],result[10][1]);
				currentSolar(td,result[11][0],result[11][1]);
			break;
			case "7月":
				festival();
				currentSolar(td,result[12][0],result[12][1]);
				currentSolar(td,result[13][0],result[13][1]);
			break;
			case "8月":
				festival();
				currentSolar(td,result[14][0],result[14][1]);
				currentSolar(td,result[15][0],result[15][1]);
			break;
			case "9月":
				festival();
				currentSolar(td,result[16][0],result[16][1]);
				currentSolar(td,result[17][0],result[17][1]);
			break;
			case "10月":
				festival();
				currentSolar(td,result[18][0],result[18][1]);
				currentSolar(td,result[19][0],result[19][1]);
			break;
			case "11月":
				festival();
				currentSolar(td,result[20][0],result[6][1]);
				currentSolar(td,result[21][0],result[21][1]);
			break;
			case "12月":
				festival();
				currentSolar(td,result[22][0],result[22][1]);
				currentSolar(td,result[23][0],result[23][1]);
			break;
		}
	}
	//标记今天
	function confirmToday() {
		var myDate = new Date();
		var year = myDate.getFullYear() + "年";
		var month = myDate.getMonth()+1 + "月";
		var today = parseInt(myDate.getDate());
		var result = getAppointTd(td,"current");

		for(var i = 0,len = result.length; i < len; i++){
			result[i].style.backgroundColor = "";
		}
		if (year === yearNow.innerHTML && month === monthNow.innerHTML){
			for(var j = 0,len = result.length; j < len; j++) {
				if (parseInt(result[j].innerHTML) === today) {
					result[j].style.backgroundColor = "#50616d";
				}
			}
		} 
	}
	//返回今天
	function goToday() {
		var myDate = new Date();
		yearNow.innerHTML = myDate.getFullYear() + "年";    //获取完整的年份(4位,1970-????)
		monthNow.innerHTML = myDate.getMonth()+1 + "月";       //获取当前月份(0-11,0代表1月)
		
		init();
	}


	//年份下拉框
	year_down.onclick = function() {//TODO 跨浏览器绑定事件
		select(year_content);
	}

	//月份下拉框
	month_down.onclick = function() {
		select(month_content);
	}
	//假期下拉表
	holiday_down.onclick = function() {
		select(holiday_content);
	}

	//选定具体年份
	for(var i = 0, len = year_content.length; i < len; i++) {//可整合代码1
		(function(i){
			year_content_li[i].onclick = function() {
				var value = this.innerHTML;
				yearNow.innerHTML = value;

				year_content.style.display = "none";

				init();
			}
		})(i);
	}

	//选定具体月份
	for(var i = 0, len = month_content_li.length; i < len; i++) {//可整合代码1
		(function(i) {
			month_content_li[i].onclick = function () {
				var value = this.innerHTML;
				monthNow.innerHTML = value;

				month_content.style.display = "none";

				init();
			}
		})(i);
	}

	//选定具体假期
	for(var i = 0; i < holiday_content_li.length; i++) {
		(function(i) {
			holiday_content_li[i].onclick = function() {
				var value = this.innerHTML;
				holidayNow.innerHTML = value;

				switch(value){
					case "元旦":
						monthNow.innerHTML = "1月";
						cute();
						currentFestival(td,"1","元旦");
						spring();
						confirmToday();
					break;
					case "妇女节":
						monthNow.innerHTML = "3月";
						cute();
						currentFestival(td,"8","妇女节");
						spring();
						confirmToday();
					break;
					case "劳动节":
						monthNow.innerHTML = "5月";
						cute();
						currentFestival(td,"1","劳动节");
						spring();
						confirmToday();
					break;
					case "儿童节":
						monthNow.innerHTML = "6月";
						cute();
						currentFestival(td,"1","儿童节");
						spring();
						confirmToday();
					break;
					case "教师节":
						monthNow.innerHTML = "9月";
						cute();
						currentFestival(td,"15","教师节");
						spring();
						confirmToday();
					break;
					case "国庆节":
						monthNow.innerHTML = "10月";
						cute();
						currentFestival(td,"1","国庆");
						spring();
						confirmToday();
					break;
					case "万圣节":
						monthNow.innerHTML = "11月";
						cute();
						currentFestival(td,"1","国庆");
						spring();
						confirmToday();
					break;
					case "圣诞节":
						monthNow.innerHTML = "12月";
						cute();
						currentFestival(td,"25","圣诞");
						spring();
						confirmToday();
					break;
					
				}
				holiday_content.style.display = "none";
			}
		})(i);
	}

	//月份左右两侧切换按钮
	month_left.onclick = function() {
		var index = getNowIndex(monthNow.innerHTML,month_content_li);
		index -= 1;
		if(index < 0) {
			index = 11;
			//月份更改对应造成年份更改
			var yearNowIndex = getNowIndex(yearNow.innerHTML,year_content_li);
			yearNowIndex -= 1;
			if (yearNowIndex < 0) {
				yearNowIndex = year_content_li.length-1;
			}
			yearNow.innerHTML = year_content_li[yearNowIndex].innerHTML;
		}
		monthNow.innerHTML = month_content_li[index].innerHTML;
		init();
		//console.log(monthNow.innerHTML);

	};
	month_right.onclick = function() {
		var index = getNowIndex(monthNow.innerHTML,month_content_li);
		index += 1;
		if(index > 11) {
			index = 0;
			//月份更改对应造成年份更改
			var yearNowIndex = getNowIndex(yearNow.innerHTML,year_content_li);
			yearNowIndex += 1;
			if (yearNowIndex >= year_content_li.length) {
				yearNowIndex = 0;
			}
			yearNow.innerHTML = year_content_li[yearNowIndex].innerHTML;
		}
		monthNow.innerHTML = month_content_li[index].innerHTML;

		init();
	};

	//返回今天
	backToday.onclick = function() {
		goToday();
	};

	function init()  {
		cute();
		festival(monthNow.innerHTML);
		spring();
		confirmToday();
	}

	init();
}




//获取className为cls的元素
function getClass(obj, cls) {
 	if (obj.getElementsByClassName) {
 		return obj.getElementsByClassName(cls);
 	} else {
 		var result = [];
 		var childs = obj.getElementsByTagName("*");

 		for (var i = 0, len = childs.length; i < len; i++) {
 			if(childs[i].className === cls) {
 				result.push(childs[i]);
 			}
 		}

 		return result;
 	}
}
//下拉框
function select(option) {
	if (option.style.display === "none") {

		option.style.display = "block";
	} else {

		option.style.display = "none";
	}
}
//判断是否为闰年
function isLearYear(year) {
	if (year%100 === 0) {
		if (year % 400 === 0) {
			return 1;
		} else {
			return 0;
		}
	} else {
		if(year % 4 === 0) {
			return 1;
		} else {
			return 0;
		}
	}
}
//获取当前月份/年份下标
function getNowIndex(now, dateArray) {
	var result;
	for(var i = 0, len = dateArray.length; i < len; i++) {
		if (now === dateArray[i].innerHTML) {
			result = i;
		}
	}
	return result;
}
//获取上月(上年)下标
function getBefore(nowMonth, nowYear, monthArray, yearArray){
	var nowMonthIndex = getNowIndex(nowMonth, monthArray);
	var nowYearIndex = getNowIndex(nowYear, yearArray);
	var result = {};

	if(nowMonthIndex == 0 ) {
		result.afterMonthIndex = 11;
		if(nowYearIndex == 0) {
			result.afterYearIndex = yearArray.length-1;
		} else {
			result.afterYearIndex = nowYearIndex - 1;
			
		}
	} else {
		result.afterMonthIndex = nowMonthIndex - 1;
		result.afterYearIndex = nowYearIndex;
	}
	return result;
}
//确定当前年当前月的日历
function getDate(lear,monthindex) {
	var last_day = [31,28+lear,31,30,31,30,31,31,30,31,30,31]
	var month_date = [];
	for (var i = 0; i < last_day[monthindex]; i++) {
		month_date.push(i+1);
	}
	return month_date;

}
/*输出当前年当前月具体日历表*/
function coutDate(year,month,monthArray) {
	var year_int = parseInt(year);
	var month_index = getNowIndex(month,monthArray);
	var lear = isLearYear(year_int);
	var week = [];
	var result = [];
	var date = getDate(lear,month_index);
	
	//判断具体的某一天是星期几
	for(var i = 0, len = date.length; i < len; i++) {
		var specific = new Date(year_int,month_index, date[i]);
		var specific_week = specific.getDay();
		week.push(specific_week);
	}
	//返回值是一个数组：length为本月的总天数，每个数字是每天的星期
	return week;
}
//日期填入表格
function fillTable(td, week, before) {
	var start = week[0];
	var length = week.length;
	start = (start === 0) ? 6 : (start-1);
	//初始化日历
	for(var i = 0, len = td.length; i < len; i++) {
		td[i].innerHTML = " ";
		td[i].className = "";
	}
	//填入上一个月的日历
	for(var i = 0, len = start; i < len; i++){
		td[i].innerHTML = before - (start-i) +1;
		td[i].className = "other";
	}
	//填入当前日历
	for(var i = start, len = (start + length); i < len; i++) {
		td[i].innerHTML = i - start + 1;
		td[i].className = "current";
	}
	//填入下个月的日历
	var k = 1;
	for (var i = (start+length), len = td.length; i < len; i++) {
		td[i].innerHTML = k;
		k++;
		td[i].className = "other"
    }
}
//本月日历在td中排列的位置
function getAppointTd(td,cls) {
	var result = [];
	for (var i = 0, len = td.length; i < len; i++) {
		if(td[i].className === cls){
			result.push(td[i]);
		}
	}
	return result;
}
//标记节日
function currentFestival(td,date,name) {
	var result = getAppointTd(td,"current");

	for(var j = 0, len = result.length; j < len; j++) {

		if(result[j].childNodes[0].nodeValue === date) {
			var span = document.createElement("span");
			span.className = "festivel";
			result[j].appendChild(span);
			span.innerHTML = name;
		}
	}
}
//获取节气
function solarTerm(SY) {
	//1900年的节气日期的定气常数 各个节气到小寒的分钟数
	var solarConst = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
	var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
	var result = [];

	for(var i = 0; i < solarTerm.length;i++) {
		var arr = [];
		tmp = new Date((31556925974.7*(SY-1900)+solarConst[i]*60000)+Date.UTC(1900,0,6,2,5));
		/*console.log(tmp.getDate())*/
		arr[0] = solarTerm[i];
		arr[1] = (tmp.getDate()-1);
		result.push(arr);
	}
	return result;
}
//标记节气
function currentSolar(td,name,date){
	date = ""+date;
	var result = getAppointTd(td,"current");

	for(var j = 0, len = result.length; j < len; j++) {

		if(result[j].childNodes[0].nodeValue === date) {
			var span = document.createElement("span");
			span.className = "spring";
			result[j].appendChild(span);
			span.innerHTML = name;
		}
	}
}