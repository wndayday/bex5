define(function(require){
	var $ = require('jquery')
	var methods = [{zh_name:'查询',name:'get'},{zh_name:'增加',name:'post'},{zh_name:'修改',name:'put'},{zh_name:'删除',name:"delete"}]
	
	return {
		getRequestMethods:function (){
		  return methods;
		},
		getPresMethods: function(dataName,dataPath){
		  var arr = this.getRequestMethods();
		  newArr = [];
		  arr.forEach(function (item){
			newArr.push({
			  per_zh_name:dataName+":"+item.zh_name,
			  per_name:dataName+":"+item.zh_name+"("+dataPath+":"+item.name+")"
			})
		  })
		  return newArr
		}
	}
})