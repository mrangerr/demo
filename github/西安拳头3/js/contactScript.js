window.onload = function(){
	var list_ul = document.getElementById("list_ul");
	var list_li = list_ul.getElementsByTagName("li");
	var move_icon = getClass(document,"moveicon");
	var view_item = getClass(document,"view_item");
	
	for(var i = 0; i < list_li.length; i++){
		list_li[i].index = i;
		list_li[i].onmouseenter = function(){
			var dire = getPos(this);
			switch(dire){
				case 0:
					move_icon[this.index].style.left = 200 + "px";
					move_icon[this.index].style.top = 0;
					break;
				case 1:
					move_icon[this.index].style.left = 0 + "px";
					move_icon[this.index].style.top = 100;
					break;
				case 2:
					move_icon[this.index].style.left =   -200 + "px";
					move_icon[this.index].style.top = 0;
					break;
				case 3:
					move_icon[this.index].style.left = 0 + "px";
					move_icon[this.index].style.top = -100;
					break;
				default:
					break;
			}
			startMove(move_icon[this.index],{"top":0,"left":0});
		};
		list_li[i].onmouseleave = function(){
			var dire = getPos(this);
			switch(dire){
				case 0:
					startMove(move_icon[this.index],{"left":200,"top":0});
					break;
				case 1:
					startMove(move_icon[this.index],{"left":0,"top":100});
					break;
				case 2:
					startMove(move_icon[this.index],{"left":-200,"top":0});
					break;
				case 3:
					startMove(move_icon[this.index],{"left":0,"top":-100});
					break;
				default:
					break;
			}
		};
		list_li[i].onclick = function(){
			for(var j = 0; j < view_item.length; j++){
				view_item[j].style.display = "none";
			}
			view_item[this.index].style.display = "block";
			return false;
		}
	}	
}
function getPos(obj,e){
	var oEvent = e || event;
	var w = obj.offsetWidth;
	var h = obj.offsetHeight;
	var x = obj.offsetLeft+w/2-oEvent.pageX;
	var y = obj.offsetTop+h/2-oEvent.pageY;
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
function getClass(obj,cls){
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(cls);
	}else{
		var result = new Array();
		var a_childs = obj.getElementsByTagName("*");
		for(var i = 0; i < a_childs.length; i++){
			if(a_childs[i].className == cls
				|| a_childs[i].className.indexOf(cls+" ") >=0
				|| a_childs[i].className.indexOf(" "+cls) >=0
				|| a_childs[i].className.indexOf(" "+cls+" ")>=0){
			result.push(a_childs[i]);
		}
	}
		return result;
	}
}