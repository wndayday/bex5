define(function(require){
	localResizeImage = require('./dist/lrz.bundle');
	return {
		/**
		 * 
		 * 挂uploader的onPlugin事件
		 * 在事件中 push 或者unshift 需要使用的插件 
		 * {
		 * 		name:"pluginName",
		 * 		params:"params"
		 * }
		 * pluginName
		 *       按照name查找uploader目录下的plugins目录下的相应插件
		 *       如果name为 $UI/的路径 则按照路径指定的模块加载
		 * 
		 * params 插件执行时候对应的参数
		 * 
		 * 插件规范 :
		 *     插件必须实现exec方法 参数为 file options
		 *     file为处理前的file
		 *     options为插件自身需要的参数
		 *     返回值必须为promise对象
		 *     处理成功后 resolve的必须是blob对象
		 *     如果需要从base64转blob 参考uploader-html5.js的 dataURItoBlob
		 */
		exec:function(file,options){
			var dfd = $.Deferred(); 
			localResizeImage(file, options).then(function(result){
				dfd.resolve(result.file);
		    }).catch(function(){
				dfd.resolve(file);
		    });
			return dfd.promise();
		}
	}
});