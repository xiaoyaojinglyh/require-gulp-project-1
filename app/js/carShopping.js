require(["config"],function(){
	require(["jquery","header","footer","cookie","template"],function($,header,footer,cookie,template){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			})
		}).then(function(){
			header.init();
			header.click();
			header.welcome();
		}).then(function(){
			var cart = $("#my_cart");
			var str = $.cookie("product");
			//console.log(str);
			var priceBtn = $(".priceBtn");
			var products = $(".car_products");
			//var tbody = $(products.parentNode);
			//console.log(str);
			var res = JSON.parse(str);
			//console.log(res);
			var html = template("html-product",{products:res});
			//console.log(html);
			$(".tbody").html(html);
			//给删除按钮绑定事件
			$(".tbody").on("click",".delBtn",function(){
				var product = $.cookie("product");
				product = JSON.parse(product);
				var _this = this;
				$(".delBox").css({"display":"block"});
				$("#okBtn").click(function(){
					//console.log("11111");
					$(".delBox").css({"display":"none"});
					//找到这一行商品
					var tr = $(_this).parent().parent();
					tr.remove();
					for(var i = 0; i < res.length; i++){
						//var _id = $(this).parent().parent().attr("data-id");
						
						if($(_this).parent().parent().attr("data-id") == res[i].id){
							res.splice(i,1);
							
							if(str === null || res.length === 0){
								$(".car_box").css({"display":"none"});
								$(".bigBox").css({"display":"block"});
								$(".cart-empty").css({"display":"block"});
							}
							var str = JSON.stringify(res);
							$.cookie("product",str,{path:"/",expires:5});
						}
					}
					total();
				})

				$("#cencelBtn").click(function(){
					$(".delBox").css({"display":"none"});
				})
				
			})
			var mon;
			//点击数量加的按钮
			$(".btn").click(function(){
				var num = $(this).next().val();
				//console.log($.cookie("product"));
				var str= $.cookie("product");
				var res = JSON.parse(str);
				num = --num;
				//console.log(num);
					if(num < 1){
						alert("亲，见底啦！");
						return;
					}else{
						$(this).next().val(num);
					}
					var price = $(this).parent().prev().text().slice(1);
					//console.log(price);
				    mon = num * price;
				   //console.log(mon);
				    $(this).parent().next().text("￥"+ mon);
				    //$(".price").html(mon);
				    for(var i = 0; i < res.length; i++){
				    	if($(this).parent().parent().attr("data-id") == res[i].id){
				    		res[i].num = num;
				    	}
				    	
				    	var pro = JSON.stringify(res);
				    	$.cookie("product",pro,{path:"/",expires:5});
				    }
				    //调用计算总金额的函数
				  total();
			})

			//点击数量加的按钮
			$(".btn1").click(function(){
				var num = $(this).prev().val();
				//console.log(num);
				var str = $.cookie("product");
				var res = JSON.parse(str);
				num = ++num;
				//console.log(num);
				 $(this).prev().val(num);
				var price = $(this).parent().prev().text().slice(1);
				//console.log(price);
			    mon = num * price;
				$(this).parent().next().text("￥"+mon);

				//修改过后的值重新存cookie
				 for(var i = 0; i < res.length; i++){
				 	//获取当前按钮的爷爷的自定义属性等于cookie里面的id时
				 	//就把改变之后的值重新存入cookie
			    	if($(this).parent().parent().attr("data-id") == res[i].id){
			    		res[i].num = num;
			    		//console.log(res);
			    		
			    	}
			    	var pro = JSON.stringify(res);
			    	$.cookie("product",pro,{path:"/",expires:5});
			    }
			    //调用计算总金额的函数
			    total();
			  
			})

			//全选按钮
			//console.log($(".all-check"));
			$(".all-check").click(function(e){
				all.call(this);
				//调用计算总金额的函数
				total();
			});
			total();
			//部分选中
			$(".single-check").click(function(e){
				var count = $(".single-check");
				var sum = 0;
				//遍历选中按钮的长度，如果选中就数量++
				for(var i = 0; i < count.length; i++){
					if($(count[i]).prop("checked")){
						sum++;
					}
				}
				if(sum === count.length){
					$(".all-check").prop("checked",true);
				    	var pro = JSON.stringify(res);
				    	$.cookie("product",pro,{path:"/",expires:5});
				}else{
					$(".all-check").prop("checked",false);
				}
				//调用计算总金额的函数
				total();
			})

			//全选按钮函数
			function all(){
				var status = $(this).prop("checked");
				//将单选按钮与全选按钮的checked状态设为一致
				$(".single-check").prop ("checked",status);
			}			
			/*var price = $(".td-price").text().slice(1);
				console.log(price);*/
			//计算总金额的函数
			function total(){
				var str = $.cookie("product");
				var res = JSON.parse(str);
				var allPrice = 0;
  				var count = $(".single-check");
  				//console.log(count);
  				for(var i =0 ; i<count.length;i++){
  					if($(count[i]).prop("checked")){
  					  allPrice += res[i].num*res[i].price;
  					}
  					var pro = JSON.stringify(res);
			    	$.cookie("product",pro,{path:"/",expires:5});
  				}
  				$("#Price").html("商品金额：￥" + allPrice);
  				$(".addPrice span").html("(订单可得积分318)合计:￥" + allPrice);
			}
			$(".mock_select").click(function(){
				$(this).next().css({"display":"block"});
				var edits = $(this).next().children("p");
				var input = $(this).next().children("input");
				var button = $(this).next().children("button");
				//console.log(button);
				for(var i = 0; i < edits.length; i++){
					edits.eq(i).click(function(){
						$(this).parent().css({"display":"none"});
						$(this).parent().prev().html($(this).html());
					})
				}
				$(button).click(function(){
					$(this).parent().css({"display":"none"});
					$(this).parent().prev().html($(input).val());
				})
			})
			
				
				
	})
	
			var str = $.cookie("product");
			var res = JSON.parse(str);
			if(str === null || res.length === 0){
				$(".car_box").css({"display":"none"});
				$(".bigBox").css({"display":"block"});
				$(".cart-empty").css({"display":"block"});

			}
		

		new Promise(function(resolve,reject){
				$("footer").load("/html/component/footer.html",function(){
					resolve();
					footer.init();
			})
		})
	})
})