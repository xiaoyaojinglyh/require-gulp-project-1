 require(["config"],function(){
	require(["jquery","template","lunbo","header","footer"],function($,template,lunbo,header,footer){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
		}).then(function(){
			header.init();
			header.click();
			header.welcome();
		}).then(function(){
			$("#div").lunbo({
				goPrev:"left_go",
				goNext:"right_go"
			})
		}).then(function(){
			$(".filer-group .conter").click(function(){
				$(".cake-theme").show(1000);
			})
			$(".cake-theme").mouseenter(function(){
				$(".cake-theme").css({"display":"block"});
			})
			$(".cake-theme").mouseleave(function(){
				$(".cake-theme").css({"display":"none"});
			})
		})


		new Promise(function(resolve,reject){
			$("footer").load("/html/component/footer.html",function(){
				resolve();
				footer.init();
			});
		}).then(function(){
			$.ajax({
				method:"get",
				url:"http://localhost/projectserver/api/about.php",
				dataType:"json",
				success:function(data){
						var html = template("pro-template",{products:data.project});
						//console.log(html);
						$("#proList").html(html);

					
				}
			})
		}).then(function(){
			$.ajax({
				method:"get",
				url:"http://localhost/projectserver/api/theme.php",
				dataType:"json",
				success:function(data){
					var html = template("pro-theme",{project:data.product});
					//console.log(html);
					$("#cake-theme-ul").html(html);

					//console.log($("#cake-theme-ul li:nth-child(1)"));

					$("#cake-theme-ul li:nth-child(1)").click(function(){
						$.ajax({
							method:"get",
							url:"http://rap2api.taobao.org/app/mock/117679/jlh.il",
							dataType:"json",
							success:function(data){
								//console.log(data);
								var html = template("pro-template",{products:data.arr});
								//console.log(html);
								$("#proList").html(html);
								$(".cake-theme").hide(500); 
								$(".left").css({"background":"#f3f2f1"});
								$(".left a").css({"color":"#333333"});
								$(".filer-group .conter").css({"background":"#333333","color":"#f3f2f1"});
								$(".filer-group .conter span").html("冰雪梦想家");
							}
						})
					})

					$("#cake-theme-ul li:nth-child(2)").click(function(){
						$.ajax({
							method:"get",
							url:"http://localhost/projectserver/api/every_1.php",
							dataType:"json",
							success:function(data){
								var html = template("pro-template",{products:data.every});
								//console.log(html);
								$("#proList").html(html);
								$(".cake-theme").hide(500);
								$(".left").css({"background":"#f3f2f1"});
								$(".left a").css({"color":"#333333"});
								$(".filer-group .conter").css({"background":"#333333","color":"#f3f2f1"}); 
								$(".filer-group .conter span").html("卡通系列");
							}
						})
					})
				}
			})
		})
	})
})