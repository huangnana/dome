function dialog(option){
	//参数可传可不传
	option = option||{};
	//最好不要改变原数据，所有复制一份参数为defaults，定义初始状态
	var defaults = {
		title:"这是一个弹框",
		content:"我是弹框",
		okFn:function(){}
	};	
	//复制option的数据
	for( var attr in option ){
		defaults[attr] = option[attr];
	}
	//遮罩层
	var mask = document.createElement("div");
	mask.id = "mask";
	mask.style.zIndex = 99;
	document.body.appendChild(mask);
	//弹窗
	var div = document.createElement("div");
	div.id = "tanBox";
	div.style.zIndex = 100;
	document.body.appendChild(div);
	//定义弹窗结构
	var tanBox = document.getElementById("tanBox");
	var tanHtml = "";	
	tanHtml+='<span class="close"></span><h3 class="title">'+defaults.title+'</h3><div class="content">'+defaults.content+
			'</div><span class="error"></span><div class="bntBox"><a class="confirm" href="javascript:;">确定</a ><a class="cancel" href="javascript:;">取消</a></div>';
	tanBox.innerHTML=tanHtml;
	//居中显示
	div.style.left = (document.documentElement.clientWidth - div.offsetWidth)/2 + "px";
	div.style.top = (document.documentElement.clientHeight - div.offsetHeight)/2 + "px";
	//屏幕自适应居中
	window.addEventListener("resize",function (){
		div.style.left = (document.documentElement.clientWidth - div.offsetWidth)/2 + "px";
		div.style.top = (document.documentElement.clientHeight - div.offsetHeight)/2 + "px";	
	},false);
	//弹窗事件
	var close = tanBox.getElementsByClassName("close")[0];
	var confirm = tanBox.getElementsByClassName("confirm")[0];
	var cancel = tanBox.getElementsByClassName("cancel")[0];
	close.addEventListener("click",function(){
		document.body.removeChild(div);
		document.body.removeChild(mask);
	})
	//定制点击确定按钮时执行的事件
	confirm.addEventListener("click",function(){
		//留一个接口，定制确定按钮的功能
		var bl = defaults.okFn();
		//defaults.okFn()不传时，bl 为underfind    执行默认关闭
		//defaults.okFn()返回值为false   执行默认关闭
		//defaults.okFn()返回值为true   不关闭
		if(!bl){
			document.body.removeChild(div);
			document.body.removeChild(mask);
		}
	})
	cancel.addEventListener("click",function(){
		document.body.removeChild(div);
		document.body.removeChild(mask);
	})
}