var tool={
	//获得可视区宽高
	view:function(){
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	},
	//查找className是否存在
	hasClass:function(element,className){
		var classArr = element.className.split(" ");
		for (var i = 0;i<classArr.length;i++ ) {
			if(classArr[i]===className){
				return true;
			}
		}
		return false;
	},
	//增加className
	addClass:function(element,className){
		if(!tool.hasClass(element,className)){
			element.className+=" "+className;
		}
	},
	//删除className
	removeClass:function(element,className){
		if(tool.hasClass(element,className)){
			var classArr = element.className.split(" ");
			for (var i=0;i<classArr.length;i++) {
				if(classArr[i]===className){
					classArr.splice(i,1);
					i--;
				}
			}
			element.className = classArr.join(" ");
		}
	},
	//判断是否存在class，如果有去掉，如果没有就加上
	//加上class以后为true，删除掉class以后为false
	toggleClass:function(element,className){
		if(tool.hasClass(element,className)){
			tool.removeClass(element,className);
			return false;
		}else{
			tool.addClass(element,className);
			return true;
		}
	},
	//根据元素找到指定class名或者id名或者元素属性名的父级元素
	parent:function(element,attr){
			//先找到attr的第一个字符
			var firstChar = attr.charAt(0);
			if( firstChar === "." ){

				while(element.nodeType !== 9 && !tool.hasClass(element,attr.slice(1))){
					//element没有指定的class，那么element就为父级，继续向上找
					element = element.parentNode;
				}
			}else if(firstChar === "#"){
				while(element.nodeType !== 9 && element.id !== attr.slice(1)){
					//element没有指定的class，那么element就为父级，继续向上找
					element = element.parentNode;
				}
			}else{
				while(element.nodeType !== 9 && element.nodeName !== attr.toUpperCase()){
					//element没有指定的class，那么element就为父级，继续向上找
					element = element.parentNode;
				}
			}

			return element.nodeType === 9 ? null : element;

		}
}
