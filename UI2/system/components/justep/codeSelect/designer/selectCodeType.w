<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:157px;left:107px;height:auto;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="typeData" idColumn="sType"> 
      <column label="编码类型" name="sType" type="String" xid="default17"/></div>  
  </div>  
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true"
    responsive="true" rowActiveClass="active" class="table table-hover table-striped"
    xid="dataTables1" data="typeData"> 
    <columns xid="columns1"> 
      <column name="sType" xid="column1"/> 
    </columns> 
  </div>  
  </div>
