require(["config"],function(){
	require(["jquery","header","footer","cookie"],function($,header,footer,cookie){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
				
			});
		}).then(function(){
			//console.log($("form"));
			$(".btn").click(function(e){

				var data = {
					username:$("#username").val(),
					password:$("#password").val()
				}
			
				//console.log(data);
				$.ajax({
					method:"post",
					dataType:"json",
					data:data,
					url:"http://localhost/projectserver/api/login.php",
					success:function(data){
						console.log(data);
						if(data.code === 1){
							alert("登陆成功！");
							$.cookie("username",data.project[0].username,{
								path:"/"
							})
							
							location.href = "http://localhost:2110/index.html";
						}else{
							alert("用户名或密码错误！");
						}
					}
				})

				e.preventDefault();
			})
		})
	})
})