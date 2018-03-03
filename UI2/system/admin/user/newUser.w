<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:431px;left:29px;"
    onModelConstructDone="modelModelConstructDone" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="checkData" idColumn="fName"> 
      <column name="fName" type="String" xid="xid1"/>  
      <column name="fValue" type="String" xid="xid2"/>  
      <data xid="default1">[{"fName":"正常","fValue":"1"},{"fName":"禁用","fValue":"0"}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="groupData" idColumn="id"> 
      <column name="id" type="String" xid="xid3"/>  
      <column name="name" type="String" xid="xid4"/>  
      <column name="check" type="Integer" xid="xid6"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="statusData" idColumn="status"> 
      <column name="status" type="String" xid="xid5"/>  
      <data xid="default3">[{"status":"1"}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="subjectData" idColumn="id">
      <column name="id" type="String" xid="xid5"/> 
      <column name="code" type="String" xid="xid5"/> 
      <column name="role" type="String" xid="xid5"/> 
      
      </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content panel-body" xid="content1"> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit1"> 
        <label class="x-label label-style" xid="label1"><![CDATA[姓名：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="nameInput"/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit3"> 
        <label class="x-label label-style" xid="label3"><![CDATA[密码：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="passwordInput" bind-ref="password"/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit2"> 
        <label class="x-label label-style" xid="label2"><![CDATA[手机：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="phoneInput"/> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit4"> 
        <label class="x-label label-style" xid="label4"><![CDATA[邮箱：]]></label>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
          xid="emailInput"/> 
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
        xid="labelEdit7"> 
        <label class="x-label label-style" xid="label7"><![CDATA[状态：]]></label>  
        <span component="$UI/system/components/justep/select/radioGroup" class="x-radios x-edit"
          xid="radioGroup" bind-itemsetValue="ref(&quot;fValue&quot;)" bind-itemsetLabel="ref(&quot;fName&quot;)"
          bind-itemset="checkData" bind-ref="$model.statusData.ref(&quot;status&quot;)"/> 
      </div> 
    </div>  
    <div class="x-panel-bottom text-right" xid="bottom1" height="38">
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btnbox blueBtn"
        label="确定" xid="okBtn" onClick="okBtnClick"> 
        <i xid="i1"/>  
        <span xid="span1">确定</span> 
      </a>
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btnbox granBtn"
        label="取消" xid="cancelBtn" onClick="cancelBtnClick"> 
        <i xid="i2"/>  
        <span xid="span2">取消</span> 
      </a>
    </div>
  </div> 
</div>
