<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/demo/plugin/template/demo.w" 
  __id="id_1" 
  design="device:m;" 
  class="window" >

  <div xid="div6" xui:update-mode="delete"/>
  <div xid="div7" xui:update-mode="delete"/>
  <div xid="accountP" xui:update-mode="delete"/>
   <div xid="model" onModelConstructDone="modelModelConstructDone"  xui:update-mode="merge"/>
   <div xid="titleBar" title="webintent"  xui:update-mode="merge"/>
   <p xid="p1"  xui:update-mode="merge-and-replace">

ID：com.borismus.webintent</p>   <p xid="introduceP"  xui:update-mode="merge-and-replace">
打开某个应用的activity、获取extra、发送广播等功能</p>   <p xid="platformP"  xui:update-mode="merge-and-replace">
Android</p>    <div style="height:50px;padding:10px" xid="div91_4" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="startActivity" onClick="startActivityClick" style="width:100%;" xid="startActivity" >
<i xid="i91_4" />
<span xid="span91_4" >






startActivity</span>
</a>
</div>
    <div style="height:50px;padding:10px" xid="div41_4" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="hasExtra" onClick="hasExtraClick" style="width:100%;" xid="hasExtra" >
<i xid="i41_4" />
<span xid="span41_4" >






hasExtra</span>
</a>
</div>
    <div style="height:50px;padding:10px" xid="div51_4" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="getExtra" onClick="getExtraClick" style="width:100%;" xid="getExtra" >
<i xid="i51_4" />
<span xid="span51_4" >






getExtra</span>
</a>
</div>
    <div style="height:50px;padding:10px" xid="div61_4" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="getUri" onClick="getUriClick" style="width:100%;" xid="getUri" >
<i xid="i61_4" />
<span xid="span61_4" >






getUri</span>
</a>
</div>
    <div style="height:50px;padding:10px" xid="div71_4" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="onNewIntent" onClick="onNewIntentClick" style="width:100%;" xid="onNewIntent" >
<i xid="i71_4" />
<span xid="span71_4" >






onNewIntent</span>
</a>
</div>
    <div style="height:50px;padding:10px" xid="div81_4" xui:parent="demoContent" xui:update-mode="insert" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="sendBroadcast" onClick="sendBroadcastClick" style="width:100%;" xid="sendBroadcast" >
<i xid="i81_4" />
<span xid="span81_4" >






sendBroadcast</span>
</a>
</div>
    <div class="x-contents-content" style="padding:10px" xid="content11_1" xui:parent="codeContent" xui:update-mode="insert" >
<p xid="p11111_1" xui:parent="content11_1" xui:update-mode="insert" >
get请求</p>
<div xid="getClick" xui:parent="content11_1" xui:update-mode="insert" />
<p xid="p111_1" xui:parent="content11_1" xui:update-mode="insert" >
head请求</p>
<div xid="headClick" xui:parent="content11_1" xui:update-mode="insert" />
<p xid="p211_1" xui:parent="content11_1" xui:update-mode="insert" >
post请求</p>
<div xid="postClick" xui:parent="content11_1" xui:update-mode="insert" />
<p xid="p311_1" xui:parent="content11_1" xui:update-mode="insert" >
SSLPinning协议开关</p>
<div xid="enableSSLPinningClick" xui:parent="content11_1" xui:update-mode="insert" />
<p xid="p411_1" xui:parent="content11_1" xui:update-mode="insert" >
证书开关</p>
<div xid="acceptAllCertsClick" xui:parent="content11_1" xui:update-mode="insert" />
<p xid="p511_1" xui:parent="content11_1" xui:update-mode="insert" >
域名开关</p>
<div xid="validateDomainNameClick" xui:parent="content11_1" xui:update-mode="insert" />
<p xid="p611_1" xui:parent="content11_1" xui:update-mode="insert" >
下载文件</p>
<div xid="downloadFileClick" xui:parent="content11_1" xui:update-mode="insert" />
<p xid="p121_1" xui:parent="content11_1" xui:update-mode="insert" >
上传文件</p>
<div xid="uploadFileClick" xui:parent="content11_1" xui:update-mode="insert" />
</div>
    <p xid="p11112_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[startActivityClick]]>
</p>
    <div xid="startActivityClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p11_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[hasExtraClick]]>
</p>
    <div xid="hasExtraClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p21_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[getExtraClick]]>
</p>
    <div xid="getExtraClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p31_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[getUriClick]]>
</p>
    <div xid="getUriClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p41_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[onNewIntentClick]]>
</p>
    <div xid="onNewIntentClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p51_1" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[sendBroadcastClick]]>
</p>
    <div xid="sendBroadcastClick" xui:parent="codeContent" xui:update-mode="insert" />

</div>