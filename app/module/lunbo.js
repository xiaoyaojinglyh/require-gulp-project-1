define(["jquery"],function($){
	
	$.fn.extend({
		lunbo:function(obj){
			var goPrev = $("#" + obj.goPrev);
			var goNext = $("#" + obj.goNext);

			//找到放图片的那个ul
			var $ul = this.find("ul");
			var $imgs = this.find("ul li");
			var $ol = this.find("ol");
			//默认情况下是第一张图片
			var index = 0;
			//总的长度就是图片的张数
			var len = $imgs.length;
			//默认下图片是没有轮播的
			var flag = false;
			var timer = null;
			//定义一张图片的宽度
			var imgWidth = $imgs.eq(0).width();

			//遍历每一张图片，然后添加相对应的按钮
			$imgs.each(function(){
				$("<li>")
					.addClass($(this).index()==0?"ac":"")
					.appendTo($ol);
			});
			$imgs.eq(0).clone(true).appendTo($ul);
			$ul.css("width",imgWidth*(len+1));

			$ol.on("click","li",function(){
				if(!flag){
					flag = true;
					$(this).addClass("ac").siblings().removeClass("ac");
					index  = $(this).index();
					$ul.animate({"left":-index*imgWidth},"slow",function(){
						flag = false;
					});
				}
			})

			goPrev.on("click",function(){
				if(!flag){
					flag = true;
					if(--index < 0){
						$ul.css({"left":-len*imgWidth});
						index = len - 1;
						$ul.animate({"left":-index*imgWidth},function(){
							flag = false;
						});
					}else{
						$ul.animate({"left":-index*imgWidth},function(){
							flag = false;
						});
					}
					$ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
				}
			})

			goNext.click(function(){
				if(!flag){
					flag = true;
					if(++index >= len){
						$ul.animate({"left":-len*imgWidth},"slow",function(){
							$ul.css({"left":0});
							flag = false;
						});
						index = 0;
					}else{
						$ul.animate({"left":-index*imgWidth},"slow",function(){
							flag = false;
						});
					}
					$ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
				}
			})

			this.hover(function(){
				clearInterval(timer);
			},(function autoPlay(){
				timer = setInterval(function(){
					goNext.trigger("click");
				},2000);
				return autoPlay;
		})());

		}
	})
})