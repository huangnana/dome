var handle = {
	//通过id找到自己(数据中的{})
	getSelfById:function(data,id){
		var arr = data.find(function(value){
			return value.id==id;
		})
		return arr;
	},
	//历遍数组找到pid为指定id的所有元素(通过id找到子级)
	getChildsById:function(data,id){
		var arr = data.filter(function(value){
			return value.pid==id;
		})
		return arr;
	},
	//通过id，来寻找他的所有父级
	getPareById:function(data,id){
		var arr=[]; /*申明一个空数组存放所有的父级元素*/
		var obj = data.find(function(value){  /*在datas中通过id找到这个元素,id是唯一的，所以用find*/ 
			return value.id==id;
		})
		if( obj ){  /*如果obj存在，继续调用函数寻找它的父级*/
			arr.push(obj);
			arr = arr.concat(handle.getPareById(data,obj.pid));  /*把递归返回的值与原来的值连接，并返回新的数组*/ 
		}
		return arr;
	},
	getElementById:function(data,id){
		for(var i=0;i<data.length;i++){
			var Oid = data[i].dataset.id;
			if(Oid==id){
				return data[i];
			}
		}
	},
	//判断某个值是否在数组中
	getIndexById:function(data,id){
		num = data.findIndex(function(value){
			return value==id;
		})
		return num;
	},
	//删除选中文件夹及他的子级
	selChilds:function(Arr){ 
		Arr.forEach(function(value){  /*历遍被数组Arr，在datas里面删除数据id与Arr的每项的id相同的项*/
			for (var i=0;i<datas.length;i++) {
				if(datas[i].id==value.id){
					datas.splice(i,1);
					i--;
				}
			}
			var childArr=handle.getChildsById(datas,value.id)
			if(childArr.length>0){
			handle.selChilds(childArr);
			}
		})
	},
	//查找一个列表中(父id)的文件名跟传入的name是否有相同，如果有返回false，如果没有返还true
	//根据id找到子级
	isNameExist:function(data,name,id){
		var childs = handle.getChildsById(data,id);
		return childs.findIndex(function(value){
			return value.title===name;
		}) ==-1;
//		var num = childs.findIndex(function(value){
//			return value.title===name;
//		})
//		if(num===-1){
//			return true;
//		}else{
//			return false;
//		}
	},
	// 通过id找到所有的子级元素
	getChildsAll:function(data,id){
		var arr = [];
		var self = handle.getSelfById(data,id);
		arr.push(self);
		var childs = handle.getChildsById(data,self.id);
		childs.forEach(function (value){
			arr = arr.concat(handle.getChildsAll(data,value.id));
		})
		return arr;
	},
	//指定多个id，找到这些多个id的每一个数据的子孙数据
	/*
		idArr:[1,2,3,4]
		1的子孙数据[{},{}]
		2的子孙数据[{},{}]

		[{},{},{},{}]
	*/ 
	getChildsAllByIdarr:function(data,idArr){
		var arr = [];
		idArr.forEach(function (value){
			arr = arr.concat(handle.getChildsAll(data,value));
		})

		return arr;
	},

	//指定多个id，删除多个id下面的子孙数据
	delectChildsAll:function(data,idArr){
		//所有的子孙数据
		var childsAll = handle.getChildsAllByIdarr(data,idArr);
		//循环data，拿到data的每一项，跟childsAll每一项对比
		for( var i = 0; i < data.length; i++ ){
			for( var j = 0; j < childsAll.length; j++ ){
				if( data[i] === childsAll[j] ){
					data.splice(i,1);
					i--;
					break;
				}
			}
		}
	}
}
