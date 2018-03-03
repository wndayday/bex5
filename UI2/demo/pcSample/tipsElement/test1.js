define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.tips_pop=function(event){
	  var MsgPop=this.getElementByXid("winpop");//获取窗口这个对象,即ID为winpop的对象
	  debugger
	  var popH=parseInt(MsgPop.style.height);//用parseInt将对象的高度转化为数字,以方便下面比较
	   if (popH==0){         //如果窗口的高度是0
	   MsgPop.style.display="block";//那么将隐藏的窗口显示出来
	  this.show=setInterval(this.changeH("up"),2);//开始以每0.002秒调用函数changeH("up"),即每0.002秒向上移动一次
	   }
	  else {         //否则
		  //开始以每0.002秒调用函数changeH("down"),即每0.002秒向下移动一次
	   this.hide=setInterval(this.changeH("down"), 2);
	  }
	}
	Model.prototype.changeH=function(str) {
	 var MsgPop=this.getElementByXid("winpop");
	 var popH=parseInt(MsgPop.style.height);
	 if(str=="up"){     //如果这个参数是UP
	  if (popH<=100){    //如果转化为数值的高度小于等于100
	  MsgPop.style.height=(popH+4).toString()+"px";//高度增加4个象素
	  }
	  else{  
	  clearInterval(this.show);//否则就取消这个函数调用,意思就是如果高度超过100象度了,就不再增长了
	  }
	 }
	 if(str=="down"){ 
	  if (popH>=4){       //如果这个参数是down
	  MsgPop.style.height=(popH-4).toString()+"px";//那么窗口的高度减少4个象素
	  }
	  else{        //否则
	  clearInterval(this.hide);    //否则就取消这个函数调用,意思就是如果高度小于4个象度的时候,就不再减了
	  MsgPop.style.display="none";  //因为窗口有边框,所以还是可以看见1~2象素没缩进去,这时候就把DIV隐藏掉
	  }
	 }
	}

	Model.prototype.modelLoad = function(event){
		this.getElementByXid('winpop').style.height='0px';//我不知道为什么要初始化这个高度,CSS里不是已经初始化了吗,知道的告诉我一下
		setTimeout(this.tips_pop(),800); 
	};


	return Model;
});