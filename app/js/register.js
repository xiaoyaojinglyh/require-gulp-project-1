require(["config"],function(){
	require(["jquery","header","footer"],function($,header,footer){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
				resolve();
			});
		}).then(function(){
			$("form").submit(function(e){
				var data ={
					username:$("#username").val(),
					password:$("#password").val(),
					password_1:$("#password_1").val(),
					email:$("#email").val()
				}
				//console.log(username);
				$.ajax({
					method:"post",
					dataType:"json",
					data:data,
					url:"http://localhost/projectserver/api/register.php",
					success:function(data){
						//console.dir(data);
						if(data.code === 1){
							if($(password).val().length>=6){
								if($(password).val() === $(password_1).val()){
										alert("注册成功！");
										location.href="http://localhost:2110/html/login.html";
								}else{
										alert("两次输入的密码不一致！");
									}
							}else{
								
								alert("请输入6位以上的密码");
							}
						}else{
							alert("注册失败！");
						}
						
					}
				})

				e.preventDefault();
			})
			
		})
	})
})