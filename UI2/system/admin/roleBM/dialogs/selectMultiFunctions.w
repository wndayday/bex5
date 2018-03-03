<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="treeData" idColumn="id" onCustomRefresh="treeDataCustomRefresh" isTree="true"> 
      <treeOption xid="xid13" parentRelation="parent" nodeKindRelation="nodeKind"/>
      <column name="id" type="String" label="ID列" xid="xid6"/>  
      <column name="label" type="String" label="权限名称" xid="xid7"/>
      <column name="code" type="String" label="权限url" xid="xid9"/> 
      <column name="isFolder" type="String" label="是否存在子集" xid="xid10"/>
      <column name="path" type="String" label="中文路径" xid="xid24"/>  
      <column name="parent" type="String" label="父的id" xid="xid11"/>  
      <column name="nodeKind" type="String" xid="xid12"/>  
      <rule xid="rule1"> 
        <col name="nodeKind" xid="ruleCol1"> 
          <calculate xid="calculate1"> 
            <expr xid="xid15">$row.val("isFolder") ? '' : 'nkLeaf'</expr> 
          </calculate> 
        </col> 
      </rule>  
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content x-bordered" xid="content1"> 
      <div component="$UI/system/components/justep/smartContainer/smartContainer"
        class="x-smartcontainer" xid="smartContainer1"> 
        <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
          altRows="false" class="x-grid-no-bordered" xid="treeGrid" data="treeData"
          multiselect="true" width="100%" height="auto" appearance="tree" expandColumn="label" cascade="true"> 
          <columns xid="columns1"> 
            <column width="100" name="label" xid="column2"></column></columns> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button" label="取消" xid="cancelBtn" onClick="cancelBtnClick">
   <i xid="i2"></i>
   <span xid="span5">取消</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-only-label x-dialog-button" label="确定" xid="OkBtn" onClick="OkBtnClick">
   <i xid="i1"></i>
   <span xid="span4">确定</span></a></div> 
  </div> 
</div>
