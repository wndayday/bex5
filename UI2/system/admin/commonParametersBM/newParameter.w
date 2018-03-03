<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:431px;left:29px;" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="classifyData" idColumn="value">
   <column name="value" type="String" xid="xid1"></column>
   <data xid="default2">[{&quot;value&quot;:&quot;微信&quot;},{&quot;value&quot;:&quot;支付宝&quot;},{&quot;value&quot;:&quot;其他&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="parameterData" idColumn="id" autoNew="true">
   <column name="id" type="String" xid="xid2"></column>
  <column name="name" type="String" xid="xid3"></column>
  <column name="value" type="String" xid="xid4"></column>
  <column name="classify" type="String" xid="xid5"></column>
  <column name="flag" type="String" xid="xid6"></column>
  <rule xid="rule1">
   <col name="id" xid="ruleCol1">
    <defaultValue xid="default1">
     <expr xid="default3">justep.UUID.createUUID()</expr></defaultValue> </col> </rule></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content panel-body" xid="content1"> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit1"> 
        <label class="x-label label-style" xid="label1"><![CDATA[参数名称：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="nameInput" bind-ref='$model.parameterData.ref("name")'/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit3" bind-ifnot="isOrNotShow"> 
        <label class="x-label label-style" xid="label3"><![CDATA[参数值：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="valueInput" bind-disable="isOrNotShow" bind-ref='$model.parameterData.ref("value")'/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4" bind-if="isOrNotShow">
   <label class="x-label label-style" xid="label4">参数值：</label>
   <div class="x-edit" xid="div1">
    <div component="$UI/system/components/justep/attachment/attachmentSimple" actionUrl="/storage" xid="attachmentSimple2" bind-ref='$model.parameterData.ref("value")' preSignMode="true">
     <div class="x-attachment" xid="div12">
      <div class="x-attachment-content x-card-border" xid="div13">
       <div class="x-doc-process" xid="div14">
        <div class="progress-bar x-doc-process-bar" role="progressbar" style="width:0%;" xid="progressBar2"></div></div> 
       <div data-bind="foreach:$attachmentItems" xid="div15">
        <div class="x-attachment-cell" xid="div16">
         <div class="x-attachment-item x-item-other" data-bind="click:$model.previewOrRemoveItem.bind($model),style:{backgroundImage:($model.previewPicture.bind($model,$object))()}" xid="div17">
          <a data-bind="visible:$model.$state.get() == 'remove'" class="x-remove-barget" xid="a2"></a></div> </div> </div> 
       <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload'" xid="div18">
        <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload'" xid="div19"></div></div> 
       <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0" xid="div20">
        <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove')" xid="div21"></div></div> 
       <div style="clear:both;" xid="div22"></div></div> </div> </div> </div> </div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit2"> 
        <label class="x-label label-style" xid="label2"><![CDATA[分类：]]></label>  

      <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="classifySelect" bind-options="classifyData" bind-optionsValue="value" bind-optionsLabel="value" bind-ref='$model.parameterData.ref("classify")'></select></div>  
      
<!--   <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label label-style" xid="label4"><![CDATA[参数值：]]></label>
   <div class="x-edit" xid="div1"><form class="img-upload" xid="uploadForm">
   <input type="button" class="btn btnbox redBtn" value="上传文件" xid="input1"></input>
   <input type="file" xid="uploadFile" name="file" class="file" size="28" bind-change="input1Change" onchange="document.getElementById('textfield').value=this.value">
    <input type="text" name="textfield" id="textfield" class="txt" readonly="true" value="未选择文件" xid="fielinput" style="visibility:hidden;"></input></input> </form></div></div> -->
    
    
    </div> 
  <div class="x-panel-bottom text-right" xid="bottom1" height="38"><a component="$UI/system/components/justep/button/button" class="btn btn-link btnbox blueBtn" label="确定" xid="okBtn" onClick="okBtnClick"> 
            <i xid="i1" />  
            <span xid="span1">确定</span> 
          </a><a component="$UI/system/components/justep/button/button" class="btn btn-link btnbox granBtn" label="取消" xid="cancelBtn" onClick="cancelBtnClick"> 
            <i xid="i2" />  
            <span xid="span2">取消</span> 
          </a></div></div> 
</div>
