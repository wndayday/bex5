<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:242px;left:79px;"
    onLoad="modelLoad" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" xid="listData"
      idColumn="xid" confirmDelete="false"> 
      <!-- label 变成 labelName -->  
      <rule xid="rule1"/>  
      <column label="xid" name="xid" type="String" xid="xid1"/>  
      <column label="序号" name="index" type="String" xid="index1"/>  
      <column label="数据项名称" name="name" type="String" xid="default1"/>  
      <column label="数据项类型" name="data-type" type="String" xid="default2"/>  
      <column label="列名" name="labelName" type="String" xid="default3"/>  
      <column label="列编辑器" name="colEditor" type="String" xid="default4"/>  
      <column label="是否显示" name="isVisible" type="String" xid="default5"/>  
      <column label="数据项别名" name="alias" type="String" xid="default6"/>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="87">
      <div class="row middle list-navbar1" xid="list-navbar1"> 
        <label for="text1" class="control-label col-xs-2" xid="control">列表页标题：</label>  
        <div class="col-xs-4" xid="title"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="titleInput" placeholder="请输入标题"/> 
        </div> 
      </div>
      
    <div class="row list-navbar"> 
        <ul class="nav navbar-nav"> 
          <li> 
            <a bind-click="addClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-plus" />新增
            </a> 
          </li>  
          <li> 
            <a bind-click="deleteClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-minus" />删除
            </a> 
          </li>  
          <li> 
            <a bind-click="upClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-arrow-up" />上移
            </a> 
          </li>  
          <li> 
            <a bind-click="downClick" href="#" role="button"> 
              <i class="glyphicon glyphicon-arrow-down" />下移
            </a> 
          </li> 
        </ul> 
      </div></div>  
    <div class="x-panel-content panel-body" xid="content1">
      <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true"
        responsive="true" rowActiveClass="active" class="table table-hover table-striped"
        xid="dataTables1" data="listData"> 
        <columns xid="columns1"> 
          <column name="labelName" xid="column2"/>  
<!--           <column name="data-type" xid="column1"/>
 -->        </columns> 
      </div>
    </div> 
  </div>
</div>
