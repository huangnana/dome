var create = {
		//页面渲染函数
	render:function(obj,fn){
		obj.innerHTML=fn;
	},
	//根据数组内容(元素的id)生成html页面的结构
	createLeftHtml:function(id){
		var arr =handle.getChildsById(datas,id);
		var str="<ul>";
		for (var i= 0;i<arr.length;i++) {
			var j = handle.getPareById(datas,arr[i].pid).length
			if(handle.getChildsById(datas,arr[i].id).length>0){
				str+="<li><div  data-id='"+arr[i].id+"' class='rank"+j+" leftDiv'><span class='closeIco'></span><i></i>"+arr[i].title+"</div>";
			}else{
				str+="<li><div  data-id='"+arr[i].id+"' class='rank"+j+" leftDiv'><span></span><i></i>"+arr[i].title+"</div>";
			}
			str+=create.createLeftHtml(arr[i].id);
		}
		str+="</ul>";
		return str;
	},
	//根据id生成nav导航区html结构
	 createNavHtml:function(id){
		var arr=handle.getPareById(datas,id).reverse();
		arr.shift();
		var str='<div data-id="0" class="floatL navDiv">微云</div>';
		arr.forEach(function(value){
			str+='<span class="floatL"></span><div data-id="'+value.id+'" class="floatL  navDiv">'+value.title+'</div>';
		})
		return str;
	},
	//根据点击的文件夹(的id)生成内容区右边的内容-列表形式
	createRListHtml:function(id){
		var str='';
		var arr = handle.getChildsById(datas,id);
		for (var i=0;i<arr.length;i++) {
			str+='<li data-id="'+arr[i].id+'" class="list">'+
				'<div class="LCheak floatL"></div>'+
				'<div class="tname floatL">'+arr[i].title+'</div>'+
				'<div class="tool floatL">'+
					'<a href="javascript:;"></a>'+
					'<a href="javascript:;"></a>'+
					'<a href="javascript:;"></a>'+
					'<a href="javascript:;"></a>'+
					'<a href="javascript:;"></a>'+
				'</div>'+
				'<time class="floatR">'+arr[i].time+'</time></li>';
		}
		return str;
	},
	//生成内容分区右边内容-缩略图形式（根据点击文件夹的id）
	createRPicHtml:function(id){
		var str='';
		var arr = handle.getChildsById(datas,id);
		arr.forEach(function(value){
			str+='<li data-id="'+value.id+'" class="text floatL">'+
				'<div class="tCheak"></div>'+
				'<span>'+value.title+'</span><input type="text" value=""/></li>'
		})
		return str;
	}
}
