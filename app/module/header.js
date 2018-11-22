define(["jquery","cookie"],function($,cookie){
	function Header(){

	}
	Header.prototype.init = function(){
		//console.log($("#select-list"));
		$("#select-list").click(function(){
			$(".select").css({"display":"block"});
		})
		$(".select").mouseenter(function(){
			$(this).show();
			
			$(".select li").click(function(){
				//console.log(this.html());
				$(".select").css({"display":"none"});
				$("#select-list a").html($(this).html());
			})
		})
	}

	Header.prototype.click = function(){
		//console.log($(".nav li"));
		$(".nav li").click(function(){
			//console.log($(this).children());
			$(this).children().addClass("ac");
			$(this).siblings().children().removeClass("ac");
		})
	}

	Header.prototype.welcome = function(){
		var username = $.cookie("username");
		if(username){
			$(".login-register").hide();
			$(".welcome").show().html("欢迎您！"+ username);
			$(".logout").css({"display":"block"});

			
			$(".logout").click(function(){
				$.cookie("username","",{
					expires:-1,
					path:"/"
				})
				$(".login-register").show();
				$(".welcome").hide();
				$(".logout").hide();
			})
		}
	}
	return new Header();
})