<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onParamsReceive="modelParamsReceive">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="tableData" idColumn="id" onCustomRefresh="tableDataCustomRefresh">
      <column name="id" dataType="String" label="id列" xid="xid3" />
      <column name="label" dataType="String" label="数据对象" xid="xid4" />
      <column name="name" dataType="String" label="名称" xid="xid5" />
      <column name="path" dataType="String" label="路径" xid="xid6" />
  </div>
  </div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1" style="overflow:hidden;">
  <div component="$UI/system/components/bootstrap/row/row" class="row" xid="row1">
   <div class="col col-xs-12" xid="col1"><div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="success" class="table table-hover table-striped" xid="dataTables1" data="tableData">
   <columns xid="columns2"><column name="label" xid="column2" label="数据对象" orderable="false"></column></columns></div><div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid" xid="pagerBar1" data="tableData">
   <div class="row" xid="div1">
    <div class="col-sm-3" xid="div2">
     <div class="x-pagerbar-length" xid="div3">
      <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect" class="x-pagerlimitselect" xid="pagerLimitSelect1">
       <span xid="span1">显示</span>
       <select component="$UI/system/components/justep/select/select" class="form-control input-sm" xid="select1">
        <option value="10" xid="default2">10</option>
        <option value="20" xid="default3">20</option>
        <option value="50" xid="default4">50</option>
        <option value="100" xid="default5">100</option></select> 
       <span xid="span2">条</span></label> </div> </div> 
    <div class="col-sm-4" xid="div4">
     <div class="x-pagerbar-info" xid="div5">当前显示0条，共0条</div></div> 
    <div class="col-sm-5" xid="div6">
     <div class="x-pagerbar-pagination" xid="div7">
      <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination" xid="pagination1">
       <li class="prev" xid="li1">
        <a href="#" xid="a1">
         <span aria-hidden="true" xid="span3">«</span>
         <span class="sr-only" xid="span6">Previous</span></a> </li> 
       <li class="next" xid="li2">
        <a href="#" xid="a2">
         <span aria-hidden="true" xid="span7">»</span>
         <span class="sr-only" xid="span8">Next</span></a> </li> </ul> </div> </div> </div> </div></div>
   </div>
  </div>
   <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button successBtn" label="取消" xid="cancelBtn" onClick="cancelBtnClick">
   <i xid="i5"></i>
   <span xid="span5">取消</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button successBtn" label="确认" xid="okBtn" onClick="okBtnClick">
   <i xid="i4"></i>
   <span xid="span4">确认</span></a></div></div></div>
