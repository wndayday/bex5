<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:538px;top:14px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="engineData" idColumn="ID"> 
      <column label="ID" name="ID" type="String" xid="xid1"/>  
      <column label="Value" name="Value" type="String" xid="xid2"/>  
      <data xid="default1">[{&quot;ID&quot;:&quot;auto&quot;,&quot;Value&quot;:&quot;自动选择：依据设备环境自动选择引擎。如果系统自带WebView&gt;=Chrome 39，将使用系统自带，否则使用腾讯引擎（需安装微信或QQ，如未安装，将使用系统自带） &quot;},{&quot;ID&quot;:&quot;system&quot;,&quot;Value&quot;:&quot;系统自带：使用系统自带WebView，适用于大部分高版本Android &quot;},{&quot;ID&quot;:&quot;tencent&quot;,&quot;Value&quot;:&quot;腾讯引擎：使用腾讯引擎，如果没有安装微信或者QQ，将使用系统自带WebView&quot;},{&quot;ID&quot;:&quot;crossWalk&quot;,&quot;Value&quot;:&quot;Crosswalk引擎：Crosswalk对渲染做了优化并统一了chrome版本，但App将会大18M &quot;}]</data></div> 
  </div>  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput2"> 
    <label class="x-label" xid="label2"><![CDATA[版本号：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="version" placeHolder="例：5.3.0，由点隔开的三部分构成"/>
  </div>  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput3"> 
    <label class="x-label" xid="label3"><![CDATA[应用包名：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="packageName" placeHolder="例：com.justep.x5，小写字母、数字和点构成，不能数字开头，ios与证书BundleID一致"/>
  </div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput4"> 
    <label class="x-label" xid="label4"><![CDATA[应用描述：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="description" placeHolder="例：这是一个用于演示WeX5特性的应用"/>
  </div>
  <div component="$UI/system/components/justep/output/output" class="x-label" xid="output2" dataType="String" bind-text='"选择 Android 的 WebView 引擎："'></div><div xid="div2" style="padding-left:20px;padding-top:8px">
    <span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group x-radio-group-vertical"
      xid="engineRadioGroup" bind-itemset="engineData" bind-itemsetValue="ref('ID')" bind-itemsetLabel="ref('Value')"/>
  </div>  
  <div xid="div1" style="padding-top:8px"> 
    <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
      xid="resEncryption" label="打包的资源进行加密。加密后应用运行将略多一点资源读取时间，但可以增强应用的安全性，使反编译无法直接获取资源"/>
  </div>  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput1" style="display:none"> 
    <label class="x-label" xid="label1"><![CDATA[推送服务地址：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="mqttServerURL" placeHolder="例：tcp://ip:port， android平台有效。注意需要选择推送插件"/>
  </div> 
</div>
