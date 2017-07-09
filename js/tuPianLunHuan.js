window.onload=function(){     
	var oPlay=document.getElementById('playImages');     
	var uBig=getClass(oPlay,'big_pic')[0];     
	var uSmall=getClass(oPlay,'small_pic')[0];     
	var oPrev=getClass(oPlay,'prev')[0];     
	var oNext=getClass(oPlay,'next')[0];     
	var aLeft=getClass(oPlay,'mark_left')[0];     
	var aRight=getClass(oPlay,'mark_right')[0];     
	var oUlSmall=uSmall.getElementsByTagName('ul')[0];     
	var oSli=uSmall.getElementsByTagName('li');     
	var oBli=uBig.getElementsByTagName('li');     
	oUlSmall.style.width=oSli[0].offsetWidth*oSli.length+'px';
	
	//移动到左按钮时，或者移入图片左边的区域时， 慢慢显示左边的按钮
	oPrev.onmouseover=aLeft.onmouseover=function(){         
		move(oPrev,100,'opacity');   
//		move(aLeft,100,'opacity');    
	};     
	
	//移动到左按钮时，或者移出图片左边的区域时， 慢慢显示左边的按钮
	/*oPrev.onmouserout=*/aLeft.onmouseout=function(){         
		move(oPrev,0,'opacity');
//		move(aLeft,0,'opacity'); 
	};     
	
	oNext.onmouseover=aRight.onmouseover=function(){         
		move(oNext,100,'opacity'); 
//		move(aRight,100,'opacity'); 
	};     
	
	/*oNext.onmouseout=*/aRight.onmouseout=function(){         
		move(oNext,0,'opacity');  
//		move(aRight,0,'opacity'); 
	};
	
	//第几张图片
	var index=0; 
	//图片的优先级
	var newZIndex=2;
	
	//添加所有下面小图片的点击事件和移入移出事件
	for (var i=0;i<oSli.length;i++){         
		oSli[i].num=i;         
		oSli[i].onclick=function(){             
			if(this.num==index) {                 
				return;             
			} else{                 
				index=this.num;                 
				tab();             
			}         
		}; 
		
		oSli[i].onmouseover=function(){             
			move(this,100,'opacity');         
		};
		
		oSli[i].onmouseout=function(){
			if(this.num!=index){                 
				move(this,60,'opacity');            
			}         
		};     
	}  
//	左按钮的点击事件,当最左边的时候将调到最右边
	oPrev.onclick=function(){         
		index--;         
		if(index==-1){             
			index=oSli.length-1;         
		}         
		tab();
	};   

//	右按钮的点击事件,当最左边的时候将调到最左边
	oNext.onclick=function(){         
		index++;         
		if(index==oBli.length){             
			index=0;         
		}         
		tab();     
	}; 
	
	function tab() { 
//		图片下拉显示效果
		oBli[index].style.height = 0;  
		//把要显示的图片优先级变成最高，这样就可以覆盖之前的图片（当然这里会有一点小问题，也不想改了）
		oBli[index].style.zIndex = newZIndex++;         
		move(oBli[index], 400, 'height');  
		//其他所有的small预览图片编程0.6的透明度
		for (var i = 0; i < oSli.length; i++) {             
			move(oSli[i], 60, 'opacity');         
		}
		//选中小图片的变成1的透明度
		move(oSli[index], 100, 'opacity'); 
		
		//选中后让线面的small预览图片，移动到中间（到边界时除外）
		if (index == 0) {             
			move(oUlSmall, 0, 'left');         
		} else if (index == oSli.length - 1) {             
			move(oUlSmall, -(index - 2) * oSli[0].offsetWidth, 'left');         
		} else {             
			move(oUlSmall, -(index - 1) * oSli[0].offsetWidth, 'left');         
		}     
	};
	
	//定时器轮播
	var timer=setInterval(oNext.onclick,3000);   
//	移入的时候停止轮播
	oPlay.onmouseover=function(){         
		clearInterval(timer);
	};
	
//	移出的时候开启定时器,开始轮播
	oPlay.onmouseout=function(){
		timer=setInterval(oNext.onclick,3000);     
	}; 
}; 



function move(obj,iTarget,name){
	//保证只有一个定时器
	clearInterval(obj.timer);     
	obj.timer=setInterval(function(){    
		var cur=0;         
		if(name=='opacity'){          
			//获取非行间样式css的透明度
			cur=Math.round(parseFloat(getStyle(obj,name))*100);         
		}else{
			
			cur=parseInt(getStyle(obj,name));
		}
//		alert(name+cur);
		
		//渐变缓冲，
		var speed=(iTarget-cur)/30;
		//取整
		speed=speed>0?Math.ceil(speed):Math.floor(speed);         
		if(cur==iTarget){
			//消除定时器
			clearInterval(obj.timer);         
		}else{             
			if(name=='opacity'){
//				设置透明度
				obj.style.opacity=(cur+speed)/100;                 
				obj.style.filter='alpha(opacity:'+cur+speed+')';             
			}else{
				//这里用来设置left的
				obj.style[name]=cur+speed+"px";             
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

//获取class
function getClass(oParent,name){     
	var oArray=[];    
	//获取所有的标签名
	var oBj=oParent.getElementsByTagName('*');     
	for(var i=0;i<oBj.length;i++){     
		//找到目标的class名
		if(oBj[i].className==name){      
			//推到数组里面去
			oArray.push(oBj[i]);         
		}
	}     
	//返回数组
	return oArray; 
}