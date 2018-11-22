require(["config"],function(){
	require(["jquery","header","template","fdj","footer","cookie"],function($,header,template,fdj,footer,cookie){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
				resolve();
			});
		}).then(function(){
			header.init();
			header.click();
			header.welcome();
		}).then(function(){

		}).then(function(){
			var str = location.search.slice(1);
			var arr = str.split("=");
			var obj = {};
			obj[arr[0]] = arr[1];

			$.ajax({
				method:"get",
				url:"http://localhost/projectserver/api/detail_1.php",
				dataType:"json",
				data:obj,
				success:function(data){
					//console.log(data.detail);
						var html = template("detail-template",{product:data.product});

						$("#content").html(html);
						//console.log($("#left"));
						$("#left").Fdj({
							smallDiv:"left",
							move:"move",
							bigDiv:"left-big",
							bigImg:"bigImg"
					})
						//找到数量加的input框里面的value值
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
						//找到三张小图片  点击切换大div里面的图片
					$(".bottom1 li").click(function(){
						$(".left img").eq($(this).index()).show().siblings().hide();
						$(".left-big img").eq($(this).index()).show().siblings().hide();
					})


					var title = data.product.title;
					var price =  data.product.price;
					var addBtn = $(".add_shopping");

					//console.log(addBtn);
					//找到加入购物车的按钮
				/*	var arr = [];
					var product = $.cookie("product");
					if(product){
						arr = JSON.parse()
					}*/
					 $(addBtn).click(function(e){
					 	/*var str1 = location.search.slice(1);
						var arr1 = str1.split("=");
						var obj1 = {};
						obj1[arr1[0]] = arr1[1];
						//匹配自动在js值和json文本中的转换
*/						$.cookie.json = true;
						//获取当前选购的商品信息
				 				var data = {
							 		id:arr[1],
							 		img:$(".left #img1").attr("src"),
							 		title:title,
							 		price:price,
							 		size:$(".right_1 .form #size").val(),
							 		num:$(".sum").val()
					 			};
					 			console.log($(".sum").val());
						//判断是否已经选购过当前商品
						//首先从cookie读取已有的数据
					 			var pro;
					 			if($.cookie("product")){
					 				pro = $.cookie("product");
					 			}else{
					 				pro = [];
					 			}
						 	//判断是否已有选购
						 	var has = pro.some(function(now){
						 		//此商品已经选购过 就让数量++
						 		if(now.id == data.id){
						 			now.num++;
						 			return true;
						 		}
						 		return false;
						 	})
						 	//商品没有选购的话 就构造一条新的商品
						 	if(!has){
						 		pro.push(data);
						 	}
						 	//pro = JSON.stringify(pro);
						 	$.cookie("product",pro,{
						 		expires:2,
						 		path:"/"
						 	})
						 
						 	$(".success").show();
						 	setTimeout(function(){
						 		$(".success").hide();
						 	},3000)
						 	
		 			})
						 	
				}		
			})
		}).then(function(){
			$.ajax({
				method:"get",
				url:"http://localhost/projectserver/api/detail.php",
				dataType:"json",
				success:function(data){
					//console.log(data.detail);
						var html = template("pro-template",{products:data.detail});
						//console.log(data.detail);
						$("#proList").html(html);
				}
			})
		}).then(function(){
			$("#idea-title dl").click(function(){
				//console.log($(this));
				$(this).addClass("ac").siblings().removeClass("ac");
				$(this).find("dd").addClass("ac");
				$(this).siblings().find("dd").removeClass("ac");
				$(".idea-bottom img").eq($(this).index()).show().siblings().hide();

			})
		}).then(function(){

		})
	})
})