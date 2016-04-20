function getStyle(obj, name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj, false)[name];
	}
}
function startMove (elem,json,fun){
	clearInterval(elem.timer);
	elem.timer = null;
	elem.timer= setInterval(function(){
	var flag = true;
	for(name in json){
		var curn;
		if(name == "opacity"){
			curn = parseFloat(getStyle(elem,name))*100;
		}else{
			curn = parseInt(getStyle(elem,name));
		}
		var speed = (json[name]-curn)/10;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		curn += speed;

		if(name == 'opacity'){
				elem.style.opacity = curn/80;
		}else{
				elem.style[name] = curn + "px";
			}
		if(json[name] != curn){
			flag = false;
		}
	}
	if(flag == true){
		clearInterval(elem.timer);
		if(fun){fun();}
	}
	},30)
}