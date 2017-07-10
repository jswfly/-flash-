window.onload = function(){
	var oDiv = document.getElementById('LunBo');
	var oOl = oDiv.getElementsByTagName('ol')[0];
	var aBtnLi = oOl.getElementsByTagName('li');
	
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aPLi = oUl.getElementsByTagName('li');
	
	var nowIndex = 0;
	for(var i=0; i<aBtnLi.length; i++){
		aBtnLi[i].index = i;
		aBtnLi[i].onclick = function(){
			nowIndex = this.index;
			tab();
		}
	}
	
	function tab(){
		for(var j=0; j<aBtnLi.length; j++){
			aBtnLi[j].className = '';
		}
		aBtnLi[nowIndex].className = 'active';
		
//			oUl.style.top = -300*nowIndex+'px';
		move(oUl, {top:-300*nowIndex});
	}
	
	//这里为了显示效果，设置轮播时间为1秒
	var timer = setInterval(next, 1000);
	
	oUl.onmouseover = function(){
		clearInterval(timer);
	};
	
	oUl.onmouseout = function(){
		timer = setInterval(next, 1000);
	};
	
	//自动轮换下一张图片函数
	function next(){
		nowIndex++;
		if(nowIndex==aBtnLi.length){
			nowIndex = 0;
		}
		tab();
	}
	
	
}


//运动框架，，，实例move(oDiv, {width:100, height:200, function (){move(oUl, {opacity:1})});
function move(obj,json, funEnd){
	//保证只有一个定时器
	clearInterval(obj.timer);
	
	obj.timer=setInterval(function(){
		var bStop = true;			//假设所有值都已经到了目标值
		for(var attr in json){
			var cur=0;         
			if(attr=='opacity'){
				//获取非行间样式css的透明度
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);   
			}else{
				cur=parseInt(getStyle(obj,attr));
			}
			
			//渐变缓冲，
			var speed=(json[attr]-cur)/7;
			//取整
			speed=speed>0?Math.ceil(speed):Math.floor(speed); 
			
			if(cur!=json[attr]){			//有一个值不相等就变成false
				bStop = false;        
			}
			
			
			if(attr=='opacity'){
	//				设置透明度
				obj.style.opacity=(cur+speed)/100; 
				var cur2 = cur+speed;
				obj.style.filter='alpha(opacity:'+cur2+')';    //兼容<ie8       
			}else{
				//这里用来设置left的
				obj.style[attr]=cur+speed+"px";             
			}      
		}
		
		if(bStop){
			clearInterval(obj.timer);
			if(funEnd){
				funEnd();
			}
				
		}
	},30); 
	
	
}; 


function getStyle(obj,name){
	if(obj.currentStyle){
//		runtimeStyle 运行时的样式！如果与style的属性重叠，将覆盖style的属性！
//		currentStyle 指 style 和 runtimeStyle 的结合！ 通过currentStyle就可以获取
//		到通过内联或外部引用的CSS样式的值了（仅限IE）
		return obj.currentStyle[name];     
	}else{       
		//要兼容FF，就得需要getComputedStyle 出马了
		return getComputedStyle(obj,false)[name];     
	} 
};