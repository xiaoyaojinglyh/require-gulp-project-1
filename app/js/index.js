require(["config"],function(){
	require(["jquery","template","header","fdj","footer"],function($,template,header,fdj,footer){
		//new一个Promise来实现代码的同步请求
		new Promise(function(resolve,reject){
				//用ajax请求头部的html
				$("header").load("/html/component/header.html",function(){
				resolve();
			});
			//承诺兑现时，执行的代码
		}).then(function(){
			header.init();
			header.click();
			header.welcome();
		}).then(function(){
			//执行该页面相应的代码
			//点击span标签让div显示隐藏
			$(".span").on("click",function(){
			$(".box1-middle").slideToggle(1000);
		})

			$(".p").on("click",function(){
			$(".box1-middle1").slideToggle(1000);
			})

		}).then(function(){
			/*$.ajax({
				method:"GET",
				dataType:"json",
				url:"http://localhost/projectserver/api/index.php",
				success:function(res){
					var html = template("pro-template",{box1-middle: res.product});
					console.log(html);
					$("#content").html(html);
				}
			})*/
		}).then(function(){
			//中间部分的放大镜效果
			//console.log($(".left"));
			$(".left").Fdj({
				smallDiv:"left",
				move:"move",
				bigDiv:"left-big",
				bigImg:"bigImg"
			})
			
		}).then(function(){
			$(".top li").click(function(){
				$(this).find("img").addClass("ac");
				$(this).siblings().find("img").removeClass("ac");
				$(".left img").eq($(this).index()).show(500).siblings().hide(500);
				$(".left-big Img").eq($(this).index()).show(500).siblings().hide(500);
				$(".bottom1 ul").eq($(this).index()).show(500).siblings().hide(500);
			})

		}).then(function(){
			//尾部的放大镜效果
			$(".left").Fdj({
				smallDiv:"smallDiv",
				move:"move1",
				bigDiv:"bigDiv",
				bigImg:"bigImg1"
			})
		}).then(function(){
			var sum = $(".sum").val();
			//console.log($(".add"));
			//console.log(sum);
			$(".add").click(function(){
				//console.log(sum);
				$(".sum").val(++sum);
			})
			$(".increase").click(function(){
				//console.log(sum);
				sum = --sum;
				if(sum < 1){
					alert("该宝贝不能再减少了！");
					return;

				}else{
					$(".sum").val(sum);
				}

			})
		}).then(function(){
			
		})
		//console.log(111);
	
		
		new Promise(function(resolve,reject){
			$("footer").load("/html/component/footer.html",function(){
					resolve();
				});
		}).then(function(){
			footer.init();
		})
	})
})