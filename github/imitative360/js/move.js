//获取非行内样
	function getStyle(obj,attr)
	{
		if(obj.currentStyle)
			return obj.currentStyle[attr];
		else
			return getComputedStyle(obj,false)[attr];
	};
	//运动
	function startMove(obj,json,fnEnd)
	{
		clearInterval(obj.timer);

		obj.timer=setInterval(function()
			{
				var flar=true;

				for(var attr in json)
				{
					//获取当前值
					var curn=0;
					if(attr=="opacity")
						{
							curn=Math.round(parseFloat(getStyle(obj,attr))*100);
						}
					else
						{
							curn=parseInt(getStyle(obj,attr));
						}

					//计算速度
					var speed=(json[attr]-curn)/5;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);

					if(curn!=json[attr])
					{
						flar=false;

						if(attr=="opacity")
						{
							obj.style.opacity=(curn+speed)/100;
						}
						else
						{
							obj.style[attr]=curn+speed+"px";
						}
					}

					
				}

				if(flar)
				{
					clearInterval(obj.timer);
					if(fnEnd)fnEnd();
				}
				
			},30)

	};