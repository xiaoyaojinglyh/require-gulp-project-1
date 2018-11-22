define(["jquery"],function($){
	/*$().fdj();*/
	$.fn.extend({
		Fdj:function(obj){
			
			var smallDiv = $("."+obj.smallDiv);
			var move = $("."+obj.move);
			var bigDiv = $("."+obj.bigDiv);
			var bigImg = $("."+obj.bigImg);

			$(smallDiv).mousemove(function(e){
				//算出移动这个元素离父级的top值和left值
				var _top = e.pageY - $(smallDiv).offset().top - $(move).height()/2;
				var _left = e.pageX - $(smallDiv).offset().left - $(move).width()/2;
				//console.log(_top,_left);
				
				//判断移动元素的边界
				if(_left < 0) _left = 0;
				if(_top < 0) _top = 0;
				if(_left > $(smallDiv).width() - $(move).width()) _left = $(smallDiv).width() - $(move).width();
				if(_top > $(smallDiv).height() - $(move).height()) _top = $(smallDiv).height() - $(move).height();
				
				$(bigDiv).css({"display":"block"});
				$(move).css({"left":_left,"top":_top,"display":"block"});
				
				//小div移动 大图片也要跟着等比例的移动
				$(bigImg).css({"left":-2*_left});
				$(bigImg).css({"top":-2*_top});
			})
			$(smallDiv).mouseleave(function(){
				//鼠标离开的时候隐藏大div和移动的那个元素
				$(move).css({"display":"none"});
				$(bigDiv).css({"display":"none"});
			})
		}
	})
	/*function Fdj(){

	}
	Fdj.prototype.init = function(){
		var leftDiv = $(".left");
		var move = $(".move");
		var bigDiv = $(".left-big");
		var bigImg = $(".bigImg");

		$(leftDiv).mousemove(function(e){
			var _top = e.pageY - $(leftDiv).offset().top - $(move).height()/2;
			var _left = e.pageX - $(leftDiv).offset().left - $(move).width()/2;
			console.log(_top,_left);
			
			if(_left < 0) _left = 0;
			if(_top < 0) _top = 0;
			if(_left > $(leftDiv).width() - $(move).width()) _left = $(leftDiv).width() - $(move).width();
			if(_top > $(leftDiv).height() - $(move).height()) _top = $(leftDiv).height() - $(move).height();
			
			$(move).css({"left":_left,"top":_top,"display":"block"});
			$(bigDiv).css({"display":"block"});

			$(bigImg).css({"left":-2*_left});
			$(bigImg).css({"top":-2*_top});
		})
		$(leftDiv).mouseleave(function(){
			$(move).css({"display":"none"});
			$(bigDiv).css({"display":"none"});
		})
	}
	return new Fdj();*/
})