//document.oncontextmenu=function(){
//	return false;
//}
//组织浏览器选中的默认行为
document.onselectstart=function(){
	return false;
}
//让weiyun-content自适应
var hear =document.getElementById("head");
var Content=document.getElementById("content");
var topBar=document.getElementById("topBar"); /*获取工具栏区域*/
//function resize(){
//	var clientH = tool.view().h;
//	Content.style.height = clientH - hear.offsetHeight -topBar.offsetHeight  + "px";
//}
//window.onresize = resize;
//resize();
//操作元素
var leftList=Content.getElementsByClassName("con_left")[0];
var rightBottom=Content.getElementsByClassName("rightBottom")[0];
var topBox=content.getElementsByClassName("topBox")[0];/*调用页面渲染函数生成初始状态下导航区*/
var toolRight=topBar.getElementsByClassName("top_right")[0];/*获取工具栏区域右侧区域*/
var changBnt=toolRight.getElementsByTagName("div")[0];/*获取工具栏区域右侧区域转换显示形式按钮*/
var datas = data.files;
//初始状态
changBnt.onoff=true;/*定义开关，初始为缩略图形式*/
changRb(0);
var last = 0;
create.render(leftList,create.createLeftHtml(-1));  /*调用页面渲染函数生成初始状态下内容区左边列表*/
create.render(topBox,create.createNavHtml(0));
getleftDivById(last).classList.add("active");
getleftDivById(last).classList.add("active"); 
//。。。。。。。。。。。。。。。。。。。三大区域交互效果---点击相互影响渲染页面。。。。。。。。。。。。。。。。。。。
//属性菜单打开闭合状态切换
var leftDiv = leftList.getElementsByClassName("leftDiv");/*获取到所有生成的div*/
for (var i=0;i<leftDiv.length;i++) {
	leftDiv[i].onoff = false;/*定义开关，初始状态下所有ul为关闭状态*/
}
leftList.addEventListener("dblclick",function(ev){
	var tage = ev.target;
	if(tage.nodeName==="DIV"){
		fnopen(tage);
	}
},false)
leftList.addEventListener("click",function(ev){
	var tage = ev.target;
	if(tool.parent(tage,".leftDiv")&&tage.nodeName=="SPAN"||tool.parent(tage,".leftDiv")&&tage.nodeName=="I"){
		tage = tool.parent(tage,".leftDiv");
		fnopen(tage);
		return;
	}
	if(tool.parent(tage,".leftDiv")&&tage.nodeName!=="SPAN"){
		tage = tool.parent(tage,".leftDiv");
		var Oid=tage.dataset.id;
		ori(Oid);
	}
},false)
topBox.addEventListener("click",function(ev){  /*给右侧侧导航区添加点击处理 完成改变内容展示区的功能*/
	var tage = ev.target;
	if(tage.nodeName==="DIV"){
		var Oid = tage.dataset.id;
		ori(Oid);
		tool.removeClass(getNavDivById(last),"active"); /*清除上一个 */
		tool.addClass(getNavDivById(Oid),"active");  /*操作自己 */
	}
	ev.stopPropagation();
},false)
//.....................................文件夹单选......................................
var filets = rightBottom.getElementsByTagName("li");/*获取到所有生成的div*/
var topCheck = content.getElementsByClassName("checkbox")[0];
var selArr = [];
rightBottom.addEventListener("click",function(ev){ /*给右侧内容区的文件夹添加单击处理完成选中文件夹的功能 */
	var tage = ev.target;
	if(tool.parent(tage,".tCheak")){
		tage = tool.parent(tage,".tCheak");
		tool.toggleClass(tage.parentNode,"active");
		selFiles();/*判断全选按钮是否打开*/
	}
},false)
///.....................*给右侧内容区的文件夹添加点击处理完成打开文件夹的功能 */点击进入..................
rightBottom.addEventListener("click",function(ev){  
	var tage = ev.target;
	if(tool.parent(tage,".tCheak")) return;
	if(tage.nodeName==="SPAN"||tage.nodeName==="INPUT") return;
	if(tool.parent(tage,".text")){
		tage = tool.parent(tage,".text");
		var Oid = tage.dataset.id;
		ori(Oid);
	}
},false)
//阻止点击input时冒泡出发document的mousedown事件
rightBottom.addEventListener("mousedown",function(ev){  
	var tage = ev.target;
	if(tool.parent(tage,".text")){
		ev.stopPropagation();
	}
},false)
//.......................................选中//全选...............................
topCheck.onoff = true;/*未被选中状态*/
topCheck.onclick=function(){
	var textArr = Array.from(filets);
	if(topCheck.onoff){
		this.innerHTML="✔";
		textArr.forEach(function(value){
			tool.addClass(value,"active");
		})
	}else{
		this.innerHTML="";
		textArr.forEach(function(value){
			tool.removeClass(value,"active");
		})
	}
	topCheck.onoff = !topCheck.onoff;
}
//....................................删除功能.......................................
var sel = topBar.getElementsByClassName("sel")[0];
var seTan=head.getElementsByClassName("deTan")[0];
var selTan=head.getElementsByClassName("selTan")[0];
sel.onmouseup=function(){
	whoSel();
//	var selArr = whoSel();
	var selArr = whoSel().map(function(value){
		return value.dataset.id;
	})
	if(selArr.length>0){
		dialog({
			title:"删除该文件夹",
			content:"<div class='deleBox'><i>确定要删除这个文件夹吗？</i><i>已删除的文件可以在回收站找到</i></div>",
			okFn:function(){
				handle.delectChildsAll(datas,selArr)
				topCheck.onoff = true;
				topCheck.innerHTML="";
				create.render(leftList,create.createLeftHtml(-1));  /*重新渲染页面*/
				create.render(rightBottom,create.createRPicHtml(last));
				setBg(datas,last);
				tanSet(seTan,"删除成功");
			}
		});
	}else{
		tanSet(selTan,"请选择文件夹");
	}
}
//..................................新建功能......................................
var add = topBar.getElementsByClassName("add")[0];
add.onmouseup=function(){
	add.isCreaten = true;
	var textOne=rightBottom.getElementsByClassName("text")[0];
	var div = document.createElement("div");
	div.className="text";
	var inp=document.createElement("input");
	div.appendChild(inp);
	rightBottom.insertBefore(div,textOne);
	tool.addClass(div,"reName");
	var inp = rightBottom.getElementsByTagName("input")[0];
	inp.focus();
	var childs = handle.getChildsById(datas,last);
	if(!childs.length ){
		tool.removeClass(rightBottom,"gEmpty");
	}
}
document.addEventListener("mousedown",function(){
	if(add.isCreaten){
		enterCreaten();
	}
	setBg(datas,last);
	add.isCreaten=false;
},false)
document.addEventListener("keydown",function(ev){
	if(ev.keyCode===13){
		if(add.isCreaten){
			enterCreaten();
		}
		setBg(datas,last);
		add.isCreaten=false;
	}
},false)
//...............................重命名功能.....................................
var rename=topBar.getElementsByClassName("rename")[0];
var reNmu = null;
rename.onmouseup=function(){
	whoSel();
	reNum = whoSel()[0];
	if(whoSel().length===1){
		var inp = reNum.getElementsByTagName("input")[0];
		var span = reNum.getElementsByTagName("span")[0];
		rename.isCreaten = true;
		tool.addClass(reNum,"reName")
		inp.value = span.innerHTML;
		inp.select();
	}else if(whoSel().length>1){
		tanSet(selTan,"只能重命名一个文件夹");
	}else{
		tanSet(selTan,"请选择文件夹");
	}
}
rightBottom.addEventListener("click",function(ev){
	var tage = ev.target;
	if(tage.nodeName==="SPAN"){
		reNum = tage.parentNode;
		var inp = reNum.getElementsByTagName("input")[0];
		var span = reNum.getElementsByTagName("span")[0];
		rename.isCreaten = true;
		Array.from(filets).forEach(function(value){
			tool.removeClass(value,"reName");
			tool.removeClass(value,"active");
		})
		topCheck.onoff = true;
		topCheck.innerHTML="";
		tool.addClass(reNum,"reName")
		inp.value = span.innerHTML;
		inp.select();
	}
},false)
document.addEventListener("mousedown",function(){
	if(rename.isCreaten){
		enterRename(reNum);
	}
	rename.isCreaten=false;
},false)
document.addEventListener("keydown",function(ev){
	if(ev.keyCode===13){
		if(rename.isCreaten){
			enterRename(reNum);
		}
		rename.isCreaten=false;
	}
},false)
function enterRename(obj){
		var inp = obj.getElementsByTagName("input")[0];
		var span = reNum.getElementsByTagName("span")[0];
		if(inp.value.trim()&&inp.value!==span.innerHTML){  /*名字不为空时*/
			if(handle.isNameExist(datas,inp.value,last)){  /*所在文件夹中没有重复的名字*/
				var reNameOne = handle.getSelfById(datas,obj.dataset.id);
				reNameOne.title=inp.value;
				create.render(leftList,create.createLeftHtml(-1)); 
				create.render(rightBottom,create.createRPicHtml(last));
				tanSet(seTan,"重命名成功");
				topCheck.onoff = true;
				topCheck.innerHTML="";
			}else{
				create.render(rightBottom,create.createRPicHtml(last));
				tanSet(selTan,"文件夹已存在");
			}
		}else{
			topCheck.onoff = true;
			topCheck.innerHTML="";
			create.render(leftList,create.createLeftHtml(-1)); 
			create.render(rightBottom,create.createRPicHtml(last));
		}
}

//........................................框选功能.....................................
rightBottom.onmousedown=function(ev){
	var tage = ev.target;
	var isSel = false;/*默认文件夹都是未选中状态*/
	if(ev.which!==1) return;
	if(tool.hasClass(tage,"active")){
		isSel = true; /*文件夹是选中状态*/
	}
	var div = null,
		copyDiv = null,
		smallDiv = null,
		isGetMove = null;
	var selArr = whoSel();
	var pW = rightBottom.getBoundingClientRect().left;
	var pH = rightBottom.getBoundingClientRect().top;
	var oriX = ev.clientX ;
	var oriY = ev.clientY ;
	document.onmousemove = function(ev){
		if(isSel){  /*进项移动到操作*/
			if(Math.abs( ev.clientX - oriX )>3||Math.abs( ev.clientY - oriY )>3){
				if(!copyDiv){
					//生成文件夹缩影，进行移动
					copyDiv = document.createElement("div");
					copyDiv.innerHTML = '<span>'+selArr.length+'</span>';
					copyDiv.className = "copyText";
					rightBottom.appendChild(copyDiv);
					//生成鼠标底下的小区域，防止鼠标抬起时在文件夹身上触发点击事件，碰撞时可用小区域进行检测
					smallDiv = document.createElement("div");
					smallDiv.className = "smallDiv";
					rightBottom.appendChild(smallDiv);
				}
				copyDiv.style.left = ev.clientX-pW + "px";
				copyDiv.style.top = ev.clientY-pH + "px";
				//让小区域的位置略偏一点，使得鼠标抬起时在小区域上，这样就不会触发文件夹的点击事件
				smallDiv.style.left = ev.clientX-2-pW + "px";
				smallDiv.style.top = ev.clientY-2-pH + "px";
				//碰撞检测
				isGetMove = null; /*在移动的过程中，接受的文件夹都是null*/
				a:for(var i=0;i<filets.length;i++){
						//在碰撞时先要排除已经被选中的文件夹
					for(var j=0;j<selArr.length;j++){
						//如果文件夹是被选中的，那么就跳出这次for（a这个for循环）循环；
						if(selArr[j]===filets[i]){
							continue a;  
						}
					}
					if( peng(smallDiv,filets[i]) ){//碰到
						tool.addClass(filets[i],"active");
						isGetMove = filets[i]; /*碰撞到之后，接受的文件夹*/
					}else{
						tool.removeClass(filets[i],"active");
					}
				}
			}
			return;
		}
		if(Math.abs( ev.clientX - oriX )>20||Math.abs( ev.clientY - oriY )>20){
			if(!div){
				div = document.createElement("div");
				div.className = "box";
				rightBottom.appendChild(div);
			}
			div.style.width = Math.abs( ev.clientX - oriX ) + "px";
			div.style.height = Math.abs( ev.clientY - oriY ) + "px";
			//让选框的位置略偏一点，使得鼠标抬起时在选框上，这样就不会触发文件夹的点击事件
			div.style.left = Math.min( ev.clientX-2,oriX+2 )-pW + "px";
			div.style.top = Math.min( ev.clientY-2,oriY+2 )-pH + "px";
			for (var i = 0; i < filets.length; i++) {//让div和每一个li进行碰撞检测
				if( peng(div,filets[i]) ){//碰到
					tool.addClass(filets[i],"active")
				}else{
					tool.removeClass(filets[i],"active")
				}
			}
			selFiles();
		}
	}
	document.onmouseup = function(ev){
			document.onmousemove = null;
			if(div){
				rightBottom.removeChild( div );
				div = null;
			}
			if(copyDiv){
				rightBottom.removeChild( copyDiv );
				copyDiv = null;
				rightBottom.removeChild( smallDiv );
				smallDiv = null;
			}
			//当有接受的文件夹时，鼠标抬起时改变被选中文件夹的pid，完成移动
			if(isGetMove){
				var onoff = false;/*定义是否提醒移动失败,默认不提醒*/
				var selDataArr = selArr.map(function(value){
					return handle.getSelfById(datas,value.dataset.id)
				})
				for(var i = 0;i<selArr.length;i++){
					//如果没有重名的文件
					var isName = handle.isNameExist(datas,selDataArr[i].title,isGetMove.dataset.id)
//					console.log(isGetMove.dataset.id);
					if(isName){
						selDataArr[i].pid = isGetMove.dataset.id;
						rightBottom.removeChild(selArr[i]);
					}else{
						onoff = true;
					}
				}
				if(onoff){
					tanSet(selTan,"部分文件移动失败");
				}
				tool.removeClass(isGetMove,"active");
				//释放变量，防止其他document的up事件触发
				isGetMove = null;
				create.render(leftList,create.createLeftHtml(-1));  /*重新渲染页面*/
			}
	}
	return false; /*组织默认行为*/
}
//。。。。。。。。。。。。。。。。。。。。。。。。。。移动到功能。。。。。。。。。。。。。。。。。。。。。。。。。。。
var move = topBar.getElementsByClassName("move")[0];
move.onclick=function(){
	//存储被选中文件夹的id
	var who = whoSel();/* 被选中的文件夹（元素）*/
	var selArr = who.map(function(value){
		return value.dataset.id;
	})
	//存储被选中文件夹的数据
	var selDataArr = selArr.map(function(value){
		return handle.getSelfById(datas,value)
	})
	var Oid = null;
	var okIs = false;/*控制点击确定弹窗能否被关闭，默认false，可以被关闭*/
	if(selDataArr.length<1){
		tanSet(selTan,"请选择需要移动的文件");
	}else{
		dialog({
			title:"删除该文件夹",
			content:"<div class='con_left'>"+create.createLeftHtml(-1)+"</div>",
			okFn:function(){
				if(okIs){
					return true;
				}else{
					var onoff = false;/*定义是否提醒移动失败，默认不提醒*/
					for(var i = 0;i<selDataArr.length;i++){
						//如果没有重名的文件
						var isName = handle.isNameExist(datas,selDataArr[i].title,Oid)
						if(isName){
							selDataArr[i].pid = Oid;
							rightBottom.removeChild(who[i]);
						}else{
							onoff = true;
						}
					}
					if(onoff){
						tanSet(selTan,"部分文件移动失败");
					}
					topCheck.onoff = true;
					topCheck.innerHTML="";
					create.render(leftList,create.createLeftHtml(-1));  /*重新渲染页面*/
				}
			}
		});
		//给弹框列表添加点击和hover样式
		var oneElement = document.querySelectorAll("#tanBox .leftDiv")[0];
		tool.addClass(oneElement,"active");
		var lastOne = oneElement;
		var moveFilet = document.querySelector("#tanBox .con_left");
		var error = document.querySelector("#tanBox .error");
		moveFilet.addEventListener("click",function(ev){
			var tage = ev.target;
			var errorIs = false; /*控制是否提示错误，默认false，不提示有错误*/
			var Pid = selDataArr[0].pid;
			if(tool.parent(tage,".leftDiv")){
				tage = tool.parent(tage,".leftDiv");
				tool.addClass(tage,"active");
				tool.removeClass(lastOne,"active")
				lastOne = tage;
				Oid = tage.dataset.id;
				if(Oid==Pid){
					error.innerHTML="文件已存在该文件夹下";
					return;
				}
				//循环完以后再提醒,两种思路去写
//				for(var i=0;i<selArr.length;i++){
//					if(selArr[i]===Oid){
//						error.innerHTML="不能存储在自身及子文件夹下";
//						break;
//					}else{
//						error.innerHTML="";
//					}
//				}
			//找到被选中文件夹的所有子孙级
				var selChildArr = handle.getChildsAllByIdarr(datas,selArr);
				for(var i=0;i<selChildArr.length;i++){
					if(selChildArr[i].id==Oid){
						errorIs = true;
						break;
					}
				}
				if(errorIs){
					error.innerHTML="不能存储在自身及子文件夹下";
					okIs = true; /*不能关闭弹窗*/
				}else{
					error.innerHTML="";
					okIs = false; /*能关闭弹窗*/
				}
			}
		},false)
	}
}
//........................................功能函数区域..................................
//通过id获取到三大部分的元素
function getleftDivById(id){
	var leftDiv = leftList.getElementsByClassName("leftDiv");/*获取到所有生成的div*/
	return handle.getElementById(leftDiv,id);
}
function getNavDivById(id){
	var navDiv = topBox.getElementsByClassName("navDiv");/*获取到所有生成的div*/
	return handle.getElementById(navDiv,id);
}
function getRightTextById(id){
	var rightText = rightBottom.getElementsByClassName("text");/*获取到所有生成的div*/
	return handle.getElementById(rightText,id);
}
//每次渲染页面都需要去执行的程序
function ori(id){
	create.render(topBox,create.createNavHtml(id)); /*根据点击的文件夹id改变导航区的路径显示 */
	tool.removeClass(getleftDivById(last),"active"); /*清除上一个 */
	tool.addClass(getleftDivById(id),"active");  /*操作自己 */
//	fnopen(getleftDivById(id));
	changRb(id);
	setBg(datas,id)
	last = id;
	topCheck.onoff = true;
	topCheck.innerHTML="";
	selArr = [];
}
//文件夹显示区为空时背景设置
function setBg(datas,id){
	var childs = handle.getChildsById(datas,id);
	if( childs.length ){
		tool.removeClass(rightBottom,"gEmpty");
	}else{
		tool.addClass(rightBottom,"gEmpty");
	}
}
/*根据changBnt的开关控制rightBottom内容区的表现形式*/
function changRb(id){  
	changBnt.onclick=function(){
		this.onoff=!this.onoff;
		if(this.onoff){
			this.classList.add("active");
			create.render(rightBottom,create.createRPicHtml(id));
		}else{
			this.classList.toggle("active");
			create.render(rightBottom,create.createRListHtml(id));
		}
	}
	if(changBnt.onoff){
		create.render(rightBottom,create.createRPicHtml(id));
	}else{
		create.render(rightBottom,create.createRListHtml(id));
	}
}
//判断列表中的文件夹是否都被选中，若果都被选中cheakALL选中，否则不选中
function selFiles(){  
	if(!filets.length){
		return;
	}
	var bl = Array.from(filets).every(function(value){
			return tool.hasClass(value,"active");
	});
	if(bl){
		topCheck.innerHTML="✔";
		topCheck.onoff=false;
	}else{
		topCheck.innerHTML="";
		topCheck.onoff=true;
	}
}
//找到被选中的文件夹，并放在一个数组中
function whoSel(){
	return Array.from(filets).filter(function (value){
		return tool.hasClass(value,"active");	
	})
}
//新建文件夹，鼠标任意位置按下以及按下键盘enter的操作
function enterCreaten(){
	var obj={};
	var inp = rightBottom.getElementsByTagName("input")[0];
	if(inp.value.trim()){  /*名字不为空时*/
		if(handle.isNameExist(datas,inp.value,last)){  /*所在文件夹中没有重复的名字*/
			inp.blur();
			obj.id=Math.random();
			obj.pid=last;
			obj.title=inp.value;
			obj.time= new Date();
			datas.unshift(obj)
			create.render(leftList,create.createLeftHtml(-1)); 
			create.render(rightBottom,create.createRPicHtml(last));
			tanSet(seTan,"新建成功");
			topCheck.onoff = true;
			topCheck.innerHTML="";
		}else{
			rightBottom.removeChild(rightBottom.firstElementChild);
			tanSet(selTan,"文件夹已存在");
		}
	}else{
		rightBottom.removeChild(rightBottom.firstElementChild);
		tanSet(selTan,"请输入文件名");
	}
}
//新建、删除、重命名操作弹窗设置
function tanSet(obj,inner){
	var timer;
	obj.style.transition="none";
	obj.style.top="-40px";
	obj.innerHTML=inner;
	setTimeout(function(){  /* 弹窗显示*/
		obj.style.transition="0.5s";
		obj.style.top="22px";
	},1)
	clearTimeout(timer);
	timer=setTimeout(function(){
		obj.style.top="-40px";
	},2000)
}
//碰撞检测函数
function peng(obj1,obj2){
	var pos1=obj1.getBoundingClientRect();
	var pos2=obj2.getBoundingClientRect();
	if(pos1.right>pos2.left&&pos1.left<pos2.right&&pos1.bottom>pos2.top&&pos1.top<pos2.bottom){
		return true;
	}else{
		return false;
	}
}

function fnopen(obj){  /*左侧树形菜单子级文件展示隐藏函数*/
	if(obj.onoff){
		obj.nextElementSibling.style.display="none";
		if(obj.nextElementSibling){
			var uls = obj.nextElementSibling.getElementsByTagName("ul");
			for(var i=0;i<uls.length;i++){
				uls[i].style.display="none";
				uls[i].previousElementSibling.onoff=false;
				uls[i].previousElementSibling.children[1].className="close";
				if(uls[i].previousElementSibling.children[0].className){
					uls[i].previousElementSibling.children[0].className="closeIco";
				}
			}
		}
		obj.children[1].className="close";
		if(obj.children[0].className){
			obj.children[0].className="closeIco";
		}
	}else{
		obj.nextElementSibling.style.display="block";
		obj.children[1].className="open";
		if(obj.children[0].className){
			obj.children[0].className="openIco";
		}
	}
	obj.onoff=!obj.onoff;
}