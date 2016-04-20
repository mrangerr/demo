window.onload = function(){
	var list_ul = document.getElementById("list_ul");
	var list_li = list_ul.getElementsByTagName("li");
	var move_icon = getClass(document,"moveicon");

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
		}
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
		}
	}

	var link = list_ul.getElementsByTagName("a");
	for(var i = 0; i < link.length; i++){
		getClick(link[i]);
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
function getClick(link){
		link.onclick = function(){
			showPic(link);
			return !showPic;
		}
}
function showPic(whichpic){
	if(!whichpic.getAttribute){return false;}
	if(!whichpic.getAttribute("href")){return false;}
	if(!document.getElementById){return false;}
	if(!document.getElementById("placeholder")){return false;}
	if(!document.getElementById("description")){return false;}
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	var description = document.getElementById("description");
	var text = whichpic.lastChild.nodeValue;
	description.firstChild.nodeValue = text;
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