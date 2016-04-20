(function(){
	var reset = { 
		_get: function(id){
			return document.getElementById(id);
		},
		_addHandler: function(element,type,fn){
		 	if(element.addeventLinster){
		 		element.addeventLinster(type,fn,false);
		 	}else if(element.attachEvent){
		 		element.attachEvent("on"+type,fn);
		 	}else{
		 		element["on"+type] = fn;
		 	}
		},
		_init: function(){

			var _this = this;
			var oNavTopicLi =_this._get("nav-topic");
			var aNavTopicLi =_this._get("nav-topic").getElementsByTagName("li");
			var underLine =_this._get("nav-topic-line");
			var oBtnAndiord =_this._get("button-android");
			var iAndiordImd =_this._get("android-img");
			var backTop =_this._get("backtop");

			for(var i = 0;i<aNavTopicLi.length;i++){
				_this._addHandler(aNavTopicLi[i],"mousemove",function(){
				startMove(underLine,{"left":this.offsetLeft,"width":this.offsetWidth});
			});
			}
			//鼠标移入显示二维码
			_this._addHandler(oBtnAndiord,"mouseenter",function(){
				$(iAndiordImd).animate({height: "180px"});
				iAndiordImd.style.display = "block";
			});
			//鼠标移除收起二维码
			_this._addHandler(oBtnAndiord,"mouseleave",function(){
				$(iAndiordImd).animate({height: "0px"});
			});
			//回到顶部按钮
			_this._addHandler(window,"scroll",function(){
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				backTop.onclick = function(){
					$("html,body").animate({scrollTop:"0px"},500);
				}
				if(scrollTop > 1000){
					startMove(backTop,{"bottom":60});
				}else{
					startMove(backTop,{"bottom":-80})
				}
			});
		}
	}
	reset._init();
})()