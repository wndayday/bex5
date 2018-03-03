<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window grid91" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:107px;top:54px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="funData" idColumn="url"> 
      <column label="路径" name="url" type="String" xid="xid1"/>  
      <column label="图标" name="icon" type="String" xid="xid2"/>  
      <column label="标题" name="label" type="String" xid="xid3"/>  
      <column label="岗位数" name="psmCount" type="Integer" xid="xid6"/>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1"
    data="funData" dataItemAlias="item"> 
    <div component="$UI/system/components/bootstrap/row/row" class="row grid x-list-template"
      xid="listTemplateUl1">
      <div class="col cell col-xs-3 col-sm-2 col-md-2 col-lg-1" bind-click="col1Click"> 
        <div class="card"> 
          <i class="icon-clipboard" style="color: rgb(153, 196, 18);"/>  
          <span class="title" bind-text="item.val(&quot;label&quot;)"><![CDATA[]]></span> 
        </div> 
      </div> 
    </div> 
  </div>  
</div>
