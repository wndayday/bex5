<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" component="$UI/system/components/justep/window/window" design="device:pc;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:320px;left:137px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="userData" idColumn="id" limit="20"> 
      <column label="ID" name="id" type="String" xid="xid8"/>  
      <column label="姓名" name="name" type="String" xid="xid9"/>  
      <column label="电话" name="phoneNumbers" type="String" xid="xid10"/>  
      <column label="状态" name="active" type="Boolean" xid="xid11"/>  
      <column label="邮箱" name="emails" type="String" xid="xid12"/>  
      <column label="分组" name="groups" type="String" xid="xid17"/>  
      <column label="是否被验证" name="verified" type="Boolean" xid="xid16"/>  
      <column name="check" type="Integer" xid="xid18"/>  
      <column name="userName" type="String" xid="xid3"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="groupData" idColumn="id"> 
      <column name="id" type="String" xid="xid3"/>  
      <column name="name" type="String" xid="xid4"/>  
      <column name="check" type="Integer" xid="xid1"/>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit1"> 
        <label class="x-label label-style" xid="label1"><![CDATA[姓名：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="nameInput" bind-ref="$model.userData.ref(&quot;name&quot;)"/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit4"> 
        <label class="x-label label-style" xid="label4"><![CDATA[邮箱：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="emailinput" bind-ref="$model.userData.ref(&quot;emails&quot;)"/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit7"> 
        <label class="x-label label-style" xid="label7"><![CDATA[手机：]]></label>  
        <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
          xid="output3" bind-ref="$model.userData.ref(&quot;phoneNumbers&quot;)"/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit5"> 
        <label class="x-label label-style" xid="label5"><![CDATA[群组：]]></label>  
        <div xid="div1" class="x-edit"> 
          <div xid="div2" style="display:none;"/>  
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="list1" data="$model.groupData"> 
            <ul class="x-list-template" xid="listTemplateUl1"> 
              <li xid="li1" style="float:left;margin-right:5px;"> 
                <span component="$UI/system/components/justep/button/checkbox"
                  class="x-checkbox" xid="checkbox1" checkedValue="1" uncheckedValue="0"
                  bind-ref="ref(&quot;check&quot;)"/>  
                <span xid="span3" class="x-checkbox" bind-text="val(&quot;name&quot;)"><![CDATA[]]></span> 
              </li> 
            </ul> 
          </div> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit5"> 
        <label class="x-label label-style" xid="label5"><![CDATA[状态：]]></label>  
        <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
          xid="output2" bind-text=" $model.userData.val(&quot;active&quot;)?&quot;正常&quot;:&quot;禁用&quot;"/> 
      </div>  
       
    </div> 
  <div class="x-panel-bottom text-right" xid="bottom1" height="38"><a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox blueBtn" label="保存" xid="saveBtn" onClick="saveBtnClick"> 
            <i xid="i2" />  
            <span xid="span2">保存</span> 
          </a><a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox granBtn" label="取消" xid="cancel" onClick="cancelClick"> 
            <i xid="i3" />  
            <span xid="span3">取消</span> 
          </a></div></div> 
</div>
