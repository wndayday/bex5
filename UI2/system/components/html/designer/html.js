define(function(require){
	var $ = require("jquery"),
	ViewComponent = require("$UI/system/lib/base/viewComponent");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	
	var Label = ViewComponent.extend({
		
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			
			if(xuiDoc.getLabel){
				this.$domNode.text(xuiDoc.getLabel(this.$domNode.attr("d_id"),this.$domNode.attr('bind-text')));
			}else{
				this.$domNode.text(this.$domNode.attr('bind-text'));				
			}
		},
		
        set: function(values){
        	var bindText;
        	if('bind-text' in values){
        		var text = xuiDoc.get(this,'text');
        		bindText = values['bind-text'];
        		if(bindText && xuiDoc.getLabel){
        			bindText = xuiDoc.getLabel(this.$domNode.attr("d_id"),bindText);
    			}
        		this.$domNode.text(bindText?bindText:text);
        	}else if('text' in values){
        		bindText = xuiDoc.get(this,'bind-text');
        		if(!bindText) this.$domNode.text(values['text']);
        	}
        }
		
	});
 
	var Image = ViewComponent.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			if(this.$domNode.attr('src')){
				this.$domNode.attr('src',this.buildSrc(this.$domNode.attr('src')));				
			}else{
				var src = this.$domNode.attr('bind-attr-src');
				if(src && src.indexOf("require.") !=-1){
					var idx1 = src.indexOf("(");
					var idx2 = src.indexOf(")");
					src = src.substring(idx1+2, idx2-1);
					//src = require.toUrl(src);
					this.$domNode.attr('src',src);	
				}
			}
		},
		
		buildSrc:function(src){
			if(src){
				if(src.indexOf("$UI") !=-1){
					src = require.toUrl(src);
				}
			}
			return src||"";
		},
		
        set: function(values){
        	if('src' in values){
    			this.$domNode.attr('src',this.buildSrc(values['src']));
        	}
        }

	});
 
	var quickIdeEx = {
			"input(button)":{
				//
				xdoc:"<b>使用场景:</b>页面普通按钮;<br/><b>使用方法:</b>添加标签后，自定义操作",
				properties:["xid","value","disabled",{name:"bind-value",text:"动态值",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
					        designer.getCommonStyleItem('font'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position') 
						];
				}
			},
			"reset(html)":{
				xdoc:"<b>使用场景:</b>重置页面输入的所有内容;<br/><b>使用方法:</b>添加标签后，可以对页面输入的内容进行重置，或者自定义事件",
				properties:["xid","value","disabled","name",{name:"title",text:"提示信息"},{name:"bind-value",text:"动态值",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position') 
						];
				}
			},
			"submit(html)":{
				xdoc:"<b>使用场景:</b>向指定地址提交表单内容;<br/><b>使用方法:</b>添加标签后，可以对页面表单输入的内容进行向指定地址的提交，或者自定义事件",
				properties:["xid","value","disabled","name",{name:"title",text:"提示信息"},{name:"bind-value",text:"动态值",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position') 
						];
				}
			},
			"input(html)":{
				/*"xid","bind-value","value","accept","accessKey","align","alt","checked","dir","disabled","lang","maxlength","name","readonly",
				            "size","src","tabindex","title","xml:lang"*/
				xdoc:"<b>使用场景:</b>需要输入框时，比如商品数量选择;<br/><b>使用方法:</b>添加input(html)标签，绑定选定值的存储字段",
				properties:["xid","value","disabled","name","readonly",{name:"title",text:"提示信息"},{name:"bind-value",text:"动态文本",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-change",text:"值改变事件",editor:"eventEditor",noLabel:true},{name:"bind-focus",text:"获取焦点事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position')
						];
				}
			},
			"file(html)":{
				xdoc:"<b>使用场景:</b>需要上传文件、图片，例如附件上传;<br/><b>使用方法:</b>添加file(html)标签，绑定上传文件的存储字段，可以设置文件类型",
				properties:["xid","value",{name:"accept",text:"可接受文件类型"},"alt","disabled","name",
				            {name:"title",text:"提示信息"},{name:"bind-value",text:"动态文本",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-change",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position')
						];
				}
			},
			"password(html)":{
				xdoc:"<b>使用场景:</b>密码输入框，不显示密码显示小点;<br/><b>使用方法:</b>添加password(html)标签，绑定输入值的存储字段",
				properties:["xid","value","align","alt","checked","disabled","maxlength","name",
				            {name:"title",text:"提示信息"},{name:"bind-value",text:"动态文本",editor:"jSExpressionEditor",noLabel:false}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position')
						];
				}
			},
			"checkbox(html)":{
				properties:["xid","value","checked","disabled","name",
				            {name:"title",text:"提示信息"},{name:"bind-value",text:"动态文本",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-change",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position')
						];
				}
			},
			"radio(html)":{
				properties:["xid","value","checked","disabled","name",
				            {name:"title",text:"提示信息"},{name:"bind-value",text:"动态文本",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-change",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position')
						];
				}
			},
			"image(html)":{
				text:'静态图片',
				xdoc:"<b>使用场景:</b>所有需要使用图片来展示的场景都需要图像组件，如头像，Logo等;<br/><b>使用方法:</b>拖入设计器中，配置图像URL，也可动态绑定数据对象中的图像；可配置点击事件",
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position') 
						];
				},
				templateContent:'<img src="$UI/system/designer/webIde/img/default.png" ></img>',
				properties:[{name:'src',editor:'imgSelector'},{name:"bind-attr-src",text:"动态URL"}],
				events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}]
			},
			"textarea(html)":{
				xdoc:"<b>使用场景:</b>输入多行文本;<br/><b>使用方法:</b>添加textarea(html)标签，绑定输入值的存储字段，可以设置默认高度",
				properties:["xid","accessKey","cols","rows","disabled","name","readonly","text","tabindex",{name:"title",text:"提示信息"},{name:"bind-text",text:"动态文本",editor:"jSExpressionEditor",noLabel:false}],
				events:[{name:"bind-change",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position')
						];
				}
			},
			"select(html)":{
				xdoc:"<b>使用场景:</b>下拉列表，例如选择所在省;<br/><b>使用方法:</b>添加select标签，并设置其属性bind-ref和下拉选择数据来源的data",
				properties:["xid","disabled","multiple","name","size",{name:"title",text:"提示信息"}],
				events:[{name:"bind-change",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('param'),
							designer.getCommonStyleItem('position')
						];
				}
			},
			
			"div(html)":{
				xdoc:"<b>使用场景:</b>块状布局;<br/><b>使用方法:</b>添加div标签，做成想要的布局，把布局中的内容放到div下",
				properties:[],
				styleConfig:function(designer){ 
					return[
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				    ];
				}
			},
			
			"span(html)":{
				xdoc:"<b>使用场景:</b>文本组件常用于大篇幅的文章;<br/><b>使用方法:</b>拖入设计器中，配置文本内容，也可绑定数据库内容；可配置显示的样式风格",
				properties:["text",{ name:'bind',text:'动态绑定',
					properties:[{name:"bind-text",editor:'dataRef'},
					            {name:"bind-visible",text:"动态显示",editor:"jSExpressionEditor"},
					             {name:"bind-html",text:"动态展现",editor:"jSExpressionEditor"},
					             {name:"bind-css",text:"动态Class",editor:"bindCssClassSelector"},
					             {name:"bind-style",text:"动态样式",editor:"bindStyleSelector"}]
						      }],
				styleConfig:function(designer){
					return[
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				    ];
					
				}
			},
			
			"p(html)":{
				xdoc:"<b>使用场景:</b>段落标签，和前后的元素有一定的间距;<br/><b>使用方法:</b>添加p标签，指定p要展示的内容",
				properties:["xid","text"],
				styleConfig:function(designer){
					return[
							designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				    ];
					
				}
			},
			"i(html)":{
				xdoc:"<b>使用场景:</b>文字内容斜体展示，例如模仿注释文本;<br/><b>使用方法:</b>添加i标签，指定i要展示的内容",
				properties:["xid",{name:"class",text:"图标",editor:"selectIcon"}],
				styleConfig:function(designer){
					return[
					       designer.getCommonStyleItem('baseStyle'),
					       designer.getCommonStyleItem('font'),
					       designer.getCommonStyleItem('border'),
					       designer.getCommonStyleItem('position'),
					       ];
				}
			},
			"label(html)":{
				xdoc:"<b>使用场景:</b>一般配合表单项作为文字说明使用;<br/><b>使用方法:</b>拖入设计器中，配置文本内容，也可以配置动态文本",
				properties:["text","for",{name:"title",text:"提示信息"}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"ul(html)":{
				xdoc:"<b>使用场景:</b>无序列表，适用于有规则的级联展示;<br/><b>使用方法:</b>添加ul标签，再添加li来进行列表展示",
				properties:["xid",{name:"title",text:"提示信息"}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"li(html)":{
				xdoc:"<b>使用场景:</b>无序列表内容展示项;<br/><b>使用方法:</b>添加ul标签，再添加li来进行列表展示",
				properties:["xid","text",{name:"title",text:"提示信息"}],
				events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"h1(html)":{
				xdoc:"<b>使用场景:</b>标题标签，定义字体为2em;<br/><b>使用方法:</b>添加h1标签，指定h1要展示的内容",
				properties:["xid","text"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"h2(html)":{
				xdoc:"<b>使用场景:</b>标题标签，定义字体为1.5em;<br/><b>使用方法:</b>添加h2标签，指定h2要展示的内容",
				properties:["xid","text"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"h3(html)":{
				xdoc:"<b>使用场景:</b>标题标签，定义字体为1.17em;<br/><b>使用方法:</b>添加h3标签，指定h3要展示的内容",
				properties:["xid","text"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"h4(html)":{
				xdoc:"<b>使用场景:</b>标题标签，定义字体为1em;<br/><b>使用方法:</b>添加h4标签，指定h4要展示的内容",
				properties:["xid","text"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"h5(html)":{
				xdoc:"<b>使用场景:</b>标题标签，定义字体为0.83em;<br/><b>使用方法:</b>添加h5标签，指定h5要展示的内容",
				properties:["xid","text"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
							designer.getCommonStyleItem('border'),
							designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"a(html)":{
				xdoc:"<b>使用场景:</b>跳转链接或锚点等;<br/><b>使用方法:</b>添加a(html)标签，指定a(html)要跳转的页面或锚点，以及页面的打开方式",
				properties:["xid","href","target","text",{name:"title",text:"提示信息"}],
				events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
				        designer.getCommonStyleItem('baseStyle'),
						designer.getCommonStyleItem('font'),
						designer.getCommonStyleItem('border'),
						designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"fieldset(html)":{
				xdoc:"<b>使用场景:</b>表单内的相关元素分组;<br/><b>使用方法:</b>添加fieldset标签，在fieldset分组下放入该分组的表单元素",
				properties:["xid","legend","align",{name:"title",text:"提示信息"}],
				styleConfig:function(designer){
					return [
				        designer.getCommonStyleItem('baseStyle'),
						designer.getCommonStyleItem('font'),
						designer.getCommonStyleItem('border'),
						designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"button(html)":{
				xdoc:"<b>使用场景:</b>页面需要按钮时;<br/><b>使用方法:</b>添加button(html)标签，添加按钮的事件",
				properties:["xid","text","type",{name:"title",text:"提示信息"},"name","value","disabled","tabindex"],
				events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
					    designer.getCommonStyleItem('pull'),
				        designer.getCommonStyleItem('baseStyle'),
						designer.getCommonStyleItem('font'),
						designer.getCommonStyleItem('border'),
						designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"iframe(html)":{
				xdoc:"<b>使用场景:</b>嵌入一个外部页面或同一片段重用;<br/><b>使用方法:</b>添加iframe(html)标签，指定要嵌入的页面路径",
				properties:["xid",{name:"src",text:"内嵌URL"},{name:"srcdoc",text:"html内容"},
				            {name:"longdesc",text:"描述URL"},
				            "name",{name:"scrolling",text:"显示滚动条"},
				            {name:"frameborder",text:"显示边框"}],
				events:[{name:"bind-load",text:"加载成功时",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
				        designer.getCommonStyleItem('baseStyle'),
				        designer.getCommonStyleItem('border'),
						designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"form(html)":{
				xdoc:"<b>使用场景:</b>向服务器提交内容，登录、注册;<br/><b>使用方法:</b>添加from标签，在form下添加要向服务器传送的内容",
				properties:["xid",{name:"action",text:"提交表单至"},{name:"method",text:"提交方式"},{name:"target",text:"打开页面方式"},
				            {name:"name",text:"表单名称"},{name:"enctype",text:"编码方式"},{name:"autocomplete",text:"自动填充"},{name:"novalidate",text:"是否验证"}],
				styleConfig:function(designer){
					return [
				        designer.getCommonStyleItem('baseStyle'),
						designer.getCommonStyleItem('font'),
						designer.getCommonStyleItem('border'),
						designer.getCommonStyleItem('position')
				     ];
					
				}
			},
			"hr(html)":{
				xdoc:"<b>使用场景:</b>上下的元素需要有分割线时;<br/><b>使用方法:</b>把hr(html)标签添加在上下两个元素中间",
				properties:["xid"],
				styleConfig:function(designer){
					return [
				        designer.getCommonStyleItem('baseStyle')
				     ];
					
				}
			}
	};
	
	return {
		'label(html)':Label,
		'image(html)':Image,
		quickIdeEx:quickIdeEx
	};
});