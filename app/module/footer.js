define(["jquery"],function($){
	function Footer(){

	}
	Footer.prototype.init = function(){
		//console.log($(".right-icon .img1"));
		$(".right-icon .img1").mouseenter(function(){
			$(".weibo").css({"display":"block"});
		})
		$(".right-icon .img1").mouseleave(function(){
			$(".weibo").css({"display":"none"});
		})
		$(".right-icon .img2").mouseenter(function(){
			$(".weixin").css({"display":"block"});
		})
		$(".right-icon .img2").mouseleave(function(){
			$(".weixin").css({"display":"none"});
		})
		$(".right-icon .img3").mouseenter(function(){
			$(".taobao").css({"display":"block"});
		})
		$(".right-icon .img3").mouseleave(function(){
			$(".taobao").css({"display":"none"});
		})
	}

	return new Footer();
})