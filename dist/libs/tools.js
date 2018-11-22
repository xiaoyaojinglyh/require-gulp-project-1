define(function(){
		var tools = {
		/*
		 返回dom对象或者dom集合
		 *@params selector string 选择器
		 *@params [parent] DOMObject 父级对象
		 *@params DOMObject || DOMCollection
		 *
		 * */
		$: function(selector,parent){
			parent = parent || document;
			/*if(selector.charAt(0) === "#"){
				return parent.getElementById(selector.slice(1));
			}*/
			
			switch(selector.charAt(0)){
				case "#":
				return parent.getElementById(selector.slice(1));
				
				case ".":
				return parent.getElementsByClassName(selector.slice(1));
				
				default:
					return parent.getElementsByTagName(selector);
			}
		},
		
		/*
		 获取内部或者外部样式
		 *@params obj DOMObject 获取样式的元素对象
		 *@params attr string 属性名称
		 *@return string 属性值
		 * 
		 * */
		
		getStyle: function(obj,attr){
			/*if(obj.currentStyle){
				return obj.currentStyle[attr];
			}
			return obj.getComputedStyle(obj,false)[attr];*/
			
			try{
				return  getComputedStyle(obj,false)[attr];
			}catch(e){
				return obj.currentStyle[attr];
			}
		},
		
		/*
		 使元素绝对居中
		 *@params obj DOMObject  要居中的元素对象
		 * */
		
		showCenter:function(obj){
	//		留住this
			var  _this = this;
			obj.style.display = "block";
			obj.style.Position = "absolute";
	//		计算left和top
			function calc(){
				var left = (_this.getBody().width - obj.offsetWidth)/2;
				var top = (_this.getBody().height - obj.offsetHeight)/2;
				obj.style.left = left + "px";
				obj.style.top = top + "px";
			}
			calc();window.onresize = calc();
		},
		
		/*
		 得到浏览器的宽高
		 *@params object {width，height}
		 * */
		
		getBody:function(){
			return {
				width:document.documentElement.clientWidth || document.body.clientWidth,
				height:document.documentElement.clientHeight || document.body.clientHeight
			}
		},
		
		/*
		 事件监听
		 *
		 *@params obj DOMObject   事件监听对象
		 *@params event 事件句柄
		 *@params fn 事件处理函数
		 * */
		on:function(obj,event,fn){
			//IE的兼容
			if(obj.attachEvent){
				obj.attachEvent("on" + event, fn);
			}else{
			//W3C
				obj.addEventListener(event, fn, false);
			}
		},
		
		
		/*
		 移出事件监听
		 *
		 *@params obj DOMObject   事件监听对象
		 *@params event 事件句柄
		 *@params fn 事件处理函数
		 * */
		
		off:function(obj,event,fn){
			//IE
			if(obj.detachEvent){
				obj.detachEvent("on" + event, fn);
			}else{
			//W3C
				obj.removeEventListener(event,fn);
			}
		},
		
		/*
		 实现cookie的创建，删除，获取
		 * @params key string cookie 名称（如果只传这一个参数，执行获取操作）
		 * @params [value] string cookie值
		 * @params [expires] string 定义过期时间和path
		 * */
		
		cookie: function(key,value,expires){
			if(value !== undefined){
				value = encodeURIComponent(value);
				if(expires !== undefined){
					document.cookie = key + "=" + value + ";"+expires;
				}else{
					document.cookie = key + "=" + value;
				}
			}else{
				var str = document.cookie;
				var obj = {};
				var arr = str.split("; ");
				for(var i in arr){
					var item = arr[i].split("=");
					obj[item[0]] = item[1];
				}
				
				if(obj[key]){
					return decodeURIComponent(obj[key]);
				}else{
					return undefined;
				}
			}
		},

		getposition: function(obj){
			var position = {
				left:0,
				top:0
			}
			//判断当前元素是否存在父级
			while(obj.offsetParent){
				//把上面对象里面的属性先赋值为当前元素的坐标，如果有父级就在原来的基础上再加上父级到浏览器边缘的
				//宽度，直到找到body为止，停止计算
				position.left += obj.offsetLeft;
				position.top += obj.offsetTop;
				//层级往上查找，如果有父级就把父级的左边缘加上子元素的左边缘，最终到body停止
				obj = obj.offsetParent;


			}
			return position;
		},

		/*
		@发送get方式的ajax请求
		@param url string 请求的地址
		@param param  object  请求携带的参数对象
		@param fn Function  请求成功之后的回调函数
		 */
		ajaxGet: function(url,garam,fn){
			if(param){
				//如果有参数，那么就在url后面来拼接key1 = value1 & key2 = value2这样的形式
				url += "?";
				for(var key in param){
					url += key + "=" + param[key] + "&";
				}
				uel = url.slice(0,-1);
			}
			//1，创建核心对象
			var ajax = new XMLHttpRequest();
			//2,准备请求
			ajax.open("GET",url);
			//3，发送请求
			ajax.send(null);
			//4,监听状态的变化
			ajax.onreadystatechange = function(){
				if(ajax.readyState === 4 && ajax.status === 200){
					//请求成功返回了
					var data = JSON.parse(ajax.responseText);
					fn(data);
				}
			}
		},

		/*
			发送post方式的ajax请求
			@param  url string 请求地址
			@param param object 请求携带的参数对象
			@param fn  Function 请求成功之后的回调函数

		 */
		ajaxPost: function(url,param,fn){
			var ajax = new XMLHttpRequest();
			ajax.open("POST",url);
			//如果有参数，那么就拼接参数字符串，如果没有，那就send  null
			var str = "";
			if(param){
				for(var key in param){
					str += key + "=" + param[key] + "&";
				}
				str = str.slice(0,-1);
			}else{
				str = null;
			}

			ajax.setResquestHeader("Content-type","application/x-www-form-urlencoded")

			ajax.send(str);
			ajax.onreadystatechange = function(){
				if(ajax.readyState === 4 && ajax.status === 200){
					fn(ajax.reponseText);
				}
			}
		},

		/*
			能够支持post和get方式的ajax（完美ajax）
			@param  method string 请求方式
			@param  url string  请求地址
			@param  param object 请求参数
			@param fn  Function  请求成功之后的回调函数
			@param isJson  Boolean 返回是否是json格式的数据

		 */
		ajax: function(method, url, param, fn, isJson=true){
			if(param){
				//拼接参数字符串
				var str = "";
				for(var key in param){
					str += key+"="+param[key]+"&";
				}
				str = str.slice(0, -1);
			}
			
			
			var ajax = new XMLHttpRequest();
			//根据不同的请求方式发送不同类型的请求
			if(method.toUpperCase() === "GET"){
				//url后买你拼接参数
				ajax.open("GET",param? url+"?"+str : url);
				ajax.send(null);
			}else if(method.toUpperCase() === "POST"){
				//先open，再设置头
				ajax.open("POST",url);
				ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				//send参数字符串
				ajax.send(param ? str : null);
			}

			ajax.onreadystatechange = function(){
				if(ajax.readyState === 4 && ajax.status === 200){
					//是否转换为json
					var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
					fn(res);
				}
			}

		},

		 /*实现跨域ajax请求
		@param url string   请求地址
		@param fnName string  回调函数的函数名
		@param  param object 其他请求参数的对象
		 */
		
		ajaxJsonp: function(url,fnName,param){
			var script = document.creatElement("script");
			//url后面的callback就是前端
			url += "?callback=" + fnName;
			if(param){
				for(var key in param){
					url += "&" + key + "=" + param[key];
				}
				//把请求完整url给src
				script.src = url;
				//script添加到页面上
				document.body.appendClid(script);
				//一旦请求发出了，script留着也没有用了  然后就把他删除了
				document.body.removeChild(script);
			}
		}
	}

	return tools;
})
