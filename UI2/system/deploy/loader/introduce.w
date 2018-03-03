<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:457px;left:133px;"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="apploader"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            </div>  
          <div class="x-titlebar-title">apploader</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1" style="padding:15px"><div xid="div1" style="height:5%;"></div><div xid="div10" style="padding:15px"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="扫描二维码实现跳转" xid="scanBtn" style="width:100%;" onClick="scanBtnClick">
   <i xid="i3"></i>
   <span xid="span3">扫描二维码实现跳转</span></a></div><div xid="div2"><p xid="p1" style="text-align:center;"><![CDATA[apploader使用说明]]>
  </p><p xid="p2"></p></div>
  <p xid="p3"><![CDATA[在studio中的.w文件右击选择“在apploader中运行”，该app会自动跳转至点击的.w页面，即可开发调试。]]></p>
  <div xid="div3">
  <div xid="div8"></div><label xid="label1"><![CDATA[① 如果已经点击“apploader中运行“，但是该应用并未跳转至调试页面，则可点击右上角扫描studio中对应的二维码进行跳转，或者可以在输入框中手动输入服务器ip实现跳转。]]></label></div>
  <div xid="div4"><label xid="label2"><![CDATA[② navtive下的apploader工程不可删除。]]></label></div>
  <div xid="div5"><label xid="label3"><![CDATA[③ 暂时不可调式插件 com.justep.cordova.plugin.weixin.v3、com.justep.cordova.plugin.weixin.v2、com.justep.cordova.plugin.push]]></label></div>
  
  
  <div xid="div6"><label xid="label4"><![CDATA[④ Android为开发包，可调式；iOS由于机制限制，必须为发布包，暂时不可调试js。]]></label></div>
  <div xid="div9"><label xid="label6"><![CDATA[⑤ 在开始调试之前，请先启动服务器tomcat。]]></label></div><div xid="div7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label5"><![CDATA[服务器地址：]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="ipInput" placeHolder="例如：192.168.1.105"></input></div></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="确定" xid="ipBtn" style="width:100%;" onClick="ipBtnClick">
   <i xid="i1"></i>
   <span xid="span1">确定</span></a>
  </div>
  </div> 
</div>