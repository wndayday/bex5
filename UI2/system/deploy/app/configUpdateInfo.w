<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:573px;top:186px;" onLoad="modelLoad"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="updateMode" idColumn="fID"><column label="类型" name="fID" type="String" xid="xid1"></column>
  <column label="描述" name="Value" type="String" xid="xid2"></column>
  <data xid="default1">[{&quot;fID&quot;:&quot;version&quot;,&quot;Value&quot;:&quot;版本号方式：设备上的资源版本号与服务端不同时，设备资源全部更新&quot;},{&quot;fID&quot;:&quot;md5&quot;,&quot;Value&quot;:&quot;Hash方式：每个资源文件都有一个md5值，可根据内容变化增量更新&quot;}]</data></div></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelEdit7">
   <label class="x-label" xid="label11"><![CDATA[资源更新模式：]]></label>
   <span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group x-radio-group-vertical x-radios x-edit" xid="updateModeGroup" bind-itemsetLabel='ref("Value")' bind-itemsetValue='ref("fID")' bind-itemset="updateMode" onChange="updateModeGroupChange"></span></div>  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput1"> 
    <label class="x-label" xid="label1"><![CDATA[资源版本号：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="resourceVersion" placeHolder="例：version1，合法的url字符（不允许包含‘-’）构成，为空则编译UI资源时自动生成"/>
  </div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput2"> 
    <label class="x-label" xid="label2"><![CDATA[资源下载链接：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="resourceDownloadURL" placeHolder="例：http://myserver/webPath/www.zip，默认部署可为空"/>
  </div>
  
  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20 hide" xid="labelEdit3">
   <label class="x-label" xid="label3"><![CDATA[资源依赖App版本：]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="resourceAppVersion" placeHolder="例：&gt;=5.3.3"></input></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput6"> 
    <label class="x-label" xid="label6"><![CDATA[android下载地址：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="androidDownloadURL" placeHolder="例：http://myserver/webPath/app.apk，默认部署可为空"/>
  </div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
    xid="labelInput7"> 
    <label class="x-label" xid="label7"><![CDATA[ios下载地址：]]></label>  
    <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
      xid="iosDownloadURL" placeHolder="例：http://myserver/webPath/app.ipa，默认部署可为空"/>
  </div>  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelEdit1">
   <label class="x-label" xid="label4"><![CDATA[android更新说明：]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="androidChangeLog" placeHolder="在这里填写android的app做了哪些更新" style="height:60px;"></textarea></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelEdit2">
   <label class="x-label" xid="label8"><![CDATA[ios更新说明：]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="iosChangeLog" placeHolder="在这里填写ios的app做了哪些更新" style="height:60px;"></textarea></div>
  </div>
