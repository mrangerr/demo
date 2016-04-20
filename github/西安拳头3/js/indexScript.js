$(function(){
	var link = document.createElement("link");
	$("head").append(link);
	$(link).attr("href","css/jquery.fullPage.css");

    $("#dowebok").fullpage({
    	verticalCentered:false,
    	resize:false,
    	scrollOverflow:true,
    	navigation:true,
    	navigationPosition:"left",
    	afterLoad:function(afterLoad,index){
    		switch(index){
    			case 1:
    				move('.navblock .navblock_logo').scale(1.1).end();
    				break;
    			case 2:
    				move('.showblock .showblock_img .img1').rotate(360).end(function(){
						move('.showblock .showblock_img .img2').rotate(360).end(function(){
							move('.showblock .showblock_img .img3').rotate(360).end(function(){
								move('.showblock_news h2').scale(1.3).end();
							});
						});
					});
					
    				break;
    		}
    	},
    	onLeave:function(index,nextIndex,direction){
    		switch(index){
    			case 1:
    				move('.navblock .navblock_logo').scale(1).end();
    				break;
    			case 2:
    				move('.showblock .showblock_img .img1').rotate(-360).end();
					move('.showblock .showblock_img .img2').rotate(-360).end();
					move('.showblock .showblock_img .img3').rotate(-360).end();
					move('.showblock_news h2').scale(1).end();
    				break;
    		}
    	}
    });
});