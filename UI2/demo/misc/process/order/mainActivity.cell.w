<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" 
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:67px;left:928px;" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/bizData" xid="orderData"
      concept="DEMO_Order" limit="1" autoNew="true"> 
      <reader xid="default1" action="/demo/misc/logic/action/queryOrderAction"/>  
      <writer xid="default2" action="/demo/misc/logic/action/saveOrderAction"/>  
      <creator xid="default3" action="/demo/misc/logic/action/createOrderAction"/>  
      <rule xid="rule5"> 
        <col name="fAuditorID" xid="ruleCol5"> 
          <readonly xid="readonly1"> 
            <expr xid="default15">true</expr> 
          </readonly> 
        </col>  
        <col name="fAuditorIsArgee" xid="ruleCol6"> 
          <readonly xid="readonly2"> 
            <expr xid="default16">true</expr> 
          </readonly> 
        </col>  
        <col name="fAuditor" xid="ruleCol7"> 
          <readonly xid="readonly3"> 
            <expr xid="default17">true</expr> 
          </readonly> 
        </col>  
        <col name="fAuditorDate" xid="ruleCol8"> 
          <readonly xid="readonly4"> 
            <expr xid="default18">true</expr> 
          </readonly> 
        </col>  
        <col name="fExamineID" xid="ruleCol9"> 
          <readonly xid="readonly5"> 
            <expr xid="default19">true</expr> 
          </readonly> 
        </col>  
        <col name="fExamine" xid="ruleCol10"> 
          <readonly xid="readonly6"> 
            <expr xid="default20">true</expr> 
          </readonly> 
        </col>  
        <col name="fExamineDate" xid="ruleCol11"> 
          <readonly xid="readonly7"> 
            <expr xid="default21">true</expr> 
          </readonly> 
        </col>  
        <col name="fExamineIsArgee" xid="ruleCol12"> 
          <readonly xid="readonly8"> 
            <expr xid="default22">true</expr> 
          </readonly> 
        </col>  
        <col name="fTolotalAmt" xid="ruleCol13"> 
          <calculate xid="calculate4"> 
            <expr xid="default23">$model.orderDetailData.sum("fFactAmt")</expr> 
          </calculate> 
        </col>  
        <col name="fAuditorName" xid="ruleCol14"> 
          <readonly xid="readonly9"> 
            <expr xid="default24">true</expr> 
          </readonly> 
        </col>  
        <col name="fExamineName" xid="ruleCol15"> 
          <readonly xid="readonly10"> 
            <expr xid="default25">true</expr> 
          </readonly> 
        </col> 
      </rule> 
    </div>  
    <div component="$UI/system/components/justep/data/bizData" xid="orderDetailData"
      concept="DEMO_OrderDetail" autoLoad="true"> 
      <reader xid="default4" action="/demo/misc/logic/action/queryOrder_DAction"/>  
      <writer xid="default5" action="/demo/misc/logic/action/saveOrder_DAction"/>  
      <creator xid="default6" action="/demo/misc/logic/action/createOrder_DAction"/>  
      <master xid="default7" data="orderData" relation="fOrderID"/> 
    </div>  
    <div component="$UI/system/components/justep/data/bizData" xid="customerData"
      concept="DEMO_Custemor" confirmDelete="true"> 
      <reader xid="default8" action="/demo/misc/logic/action/queryCustemorAction"/> 
    </div>  
    <div component="$UI/system/components/justep/data/bizData" xid="personData"
      concept="SA_OPPerson"> 
      <reader xid="default9" action="/demo/misc/logic/action/queryOPPersonAction"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/process/process" xid="process"
    data="orderData" style="top:15px;left:230px;width:24px;height:24px;"/>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="moreMenu" opacity="0" anchor="moreBtn" direction="left-bottom"> 
    <div class="x-popMenu-overlay" xid="moreMenuOverlay"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="moreContent"> 
      <li class="x-menu-item" xid="backItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="backBtn" onClick="{operation:'process.back'}"> 
          <i xid="i8"/>  
          <span xid="span6"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="suspendItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="suspendBtn" onClick="{operation:'process.suspend'}"> 
          <i xid="i3"/>  
          <span xid="span3"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="abortItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="abortBtn" onClick="{operation:'process.abort'}"> 
          <i xid="i4"/>  
          <span xid="span4"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="chartItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="chartBtn" onClick="{operation:'process.showChart'}"> 
          <i xid="i5"/>  
          <span xid="span5"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="recordItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="recordBtn" onClick="{operation:'process.processRecord'}"> 
          <i xid="i55"/>  
          <span xid="span55"/> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="productDialog"
    style="left:100px;top:86px;" src="$UI/demo/misc/process/order/prdocutDialog.w"
    title="产品详细" onReceive="productDialogReceive" status="normal" showTitle="true"
    height="400px" width="80%"/>  
  <div xid="view"> 
    <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline" xid="mainBar"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        xid="advanceBtn" onClick="{operation:'process.advance'}"> 
        <i xid="i2"/>  
        <span xid="span2">流转</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        xid="saveBtn" onClick="{operation:'orderData.save'}"> 
        <i xid="i1"/>  
        <span xid="span1"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="更多" xid="moreBtn" onClick="{operation:'moreMenu.show'}"> 
        <i xid="i15"/>  
        <span xid="span15">更多</span> 
      </a> 
    </div>  
    <div xid="content"> 
      <div class="x-cell-layout" component="$UI/system/components/justep/cellLayout/cellLayout" style=" height: 100%;width:1024px;margin:auto" xid="cellLayout1" column-width="150" row-height="33"><layout-content xid="default10"><![CDATA[
  <table cellspacing="0" cellpadding="0" rowHeight="33" columnWidth="150" style="border-collapse:collapse;table-layout:fixed;width:1px;">
     <tr><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td><td ></td></tr>
     <tr><td ></td><td  colSpan="7" style="height: 19px;" componentId="h12"></td></tr>
     <tr><td ></td><td  style="height: 19px; border-bottom-width: 1px; border-bottom-color: rgb(1, 1, 1); border-bottom-style: solid;"></td><td  style="height: 19px; border-bottom-width: 1px; border-bottom-color: rgb(1, 1, 1); border-bottom-style: solid;"></td><td  style="height: 19px;"></td><td  style="height: 19px; border-bottom-width: 1px; border-bottom-color: rgb(1, 1, 1); border-bottom-style: solid;"></td><td  style="height: 19px; border-bottom-width: 1px; border-bottom-color: rgb(1, 1, 1); border-bottom-style: solid;"></td><td  style="height: 19px; border-bottom-width: 1px; border-bottom-color: rgb(1, 1, 1); border-bottom-style: solid;"></td><td  style="height: 19px;"></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">订单编号</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="code"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">订购日期</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="orderDate"></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">客户名称</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="customer"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">申请人</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="report"></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">雇员名称</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="emplouee"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">申请日期</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="reportDate"></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">发货日期</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="shippedDate"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">到货日期</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="requiredDate"></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">金额</td><td  colSpan="6" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="totalAmt"></td></tr>
     <tr><td ></td><td  colSpan="7" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="h41"></td></tr>
     <tr><td ></td><td  colSpan="7" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="detailBar"></td></tr>
     <tr><td ></td><td  colSpan="7" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="detailTable"></td></tr>
     <tr><td ></td><td  colSpan="7" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="h42"></td></tr>
     <tr><td ></td><td  rowSpan="3" style="height: 57px; border: 1px solid rgb(1, 1, 1);">主管审核意见</td><td  colSpan="6" rowSpan="3" style="height: 57px; border: 1px solid rgb(1, 1, 1);" componentId="auditor"></td></tr>
     <tr><td ></td></tr>
     <tr><td ></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">是否同意</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="auditorIsArgee"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">审核日期</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="auditorDate"></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">主管审核</td><td  colSpan="6" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="auditorPerson"></td></tr>
     <tr><td ></td><td  colSpan="7" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="h43"></td></tr>
     <tr><td ></td><td  rowSpan="3" style="height: 57px; border: 1px solid rgb(1, 1, 1);">领导审核意见</td><td  colSpan="6" rowSpan="3" style="height: 57px; border: 1px solid rgb(1, 1, 1);" componentId="examine"></td></tr>
     <tr><td ></td></tr>
     <tr><td ></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">是否同意</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="examineIsArgee"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);"></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">审核日期</td><td  colSpan="2" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="examineDate"></td></tr>
     <tr><td ></td><td  style="height: 19px; border: 1px solid rgb(1, 1, 1);">领导审核</td><td  colSpan="6" style="height: 19px; border: 1px solid rgb(1, 1, 1);" componentId="examinePerson"></td></tr>
     <tr><td ></td><td  colSpan="7" style="height: 19px;"></td></tr>
  </table>
]]></layout-content>
  <output component="$UI/system/components/justep/output/output" class="form-control x-output" xid="code" bind-ref="orderData.ref('fOrderCode')"></output>
  <input component="$UI/system/components/justep/input/input" class="form-control x-input" xid="orderDate" bind-ref="orderData.ref('fOrderDate')"></input>
  <h1 xid="h12" class="text-center"><![CDATA[阳光集团销售订单]]></h1>
  <div class="x-gridSelect x-cell-control" component="$UI/system/components/justep/gridSelect/gridSelect" xid="customer" bind-ref="orderData.ref('fCustomerID')" bind-labelRef="orderData.ref('fCustomerName')">
   <option xid="customerOption" data="customerData" value="DEMO_Custemor" label="fCustomerName"></option></div>
  <output component="$UI/system/components/justep/output/output" class="form-control x-output" bind-ref="orderData.ref('fReportID')" xid="report"></output>
  <div class="x-gridSelect  x-cell-control" component="$UI/system/components/justep/gridSelect/gridSelect" xid="emplouee" bind-ref="orderData.ref('fEmploueeID')" bind-labelRef="orderData.ref('fEmploueeName')">
   <option xid="emploueeOption" data="personData" value="SA_OPPerson" label="sName"></option></div>
  <input component="$UI/system/components/justep/input/input" class="form-control x-input" bind-ref="orderData.ref('fReporedDate')" xid="reportDate"></input>
  <input component="$UI/system/components/justep/input/input" class="form-control x-input" bind-ref="orderData.ref('fShippedDate')" xid="shippedDate"></input>
  <input component="$UI/system/components/justep/input/input" class="form-control x-input" bind-ref="orderData.ref('fRequiredDate')" xid="requiredDate"></input>
  <output component="$UI/system/components/justep/output/output" class="form-control x-output" bind-ref="orderData.ref('fTolotalAmt')" xid="totalAmt"></output>
  <h4 xid="h41" class="text"><![CDATA[产品信息]]></h4>
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline x-cell-control" xid="detailBar">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" xid="addProductBtn" icon="icon-plus" label="添加产品" onClick="addProductBtnClick">
    <i xid="i6" class="icon-plus"></i>
    <span xid="span10">添加产品</span></a> 
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" label="编辑" xid="editProductBtn" icon="icon-edit" onClick="editProductBtnClick" bind-enable="$model.hasOrderDetail()">
    <i xid="i9" class="icon-edit"></i>
    <span xid="span13">编辑</span></a> 
   <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" xid="deleteBtn" onClick="{operation:'orderDetailData.delete'}">
    <i xid="i7"></i>
    <span xid="span11">删除</span></a> </div>
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" class="table table-striped table-bordered table-hover x-cell-control" xid="detailTable" data="orderDetailData" pagingType="simple" rowActiveClass="active" style="width:100%;height:100px;">
   <columns xid="columns1">
    <column name="fProductName" xid="column5" label="产品名称"></column>
    <column name="fUnitprice" xid="column1" label="单价（元）"></column>
    <column name="fQuantity" xid="column2" label="数量"></column>
    <column name="fDisCount" xid="column3" label="折扣率（0.00）"></column>
    <column name="fFactAmt" xid="column4" label="实际金额（元）"></column></columns> </div>
  <h4 xid="h42" class="text"><![CDATA[主管审核信息]]></h4>
  <textarea component="$UI/system/components/justep/textarea/textarea" class="x-textarea x-cell-control form-control" rows="3" bind-ref="orderData.ref('fAuditor')" xid="auditor"></textarea>
  <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="auditorIsArgee" bind-ref="orderData.ref('fAuditorIsArgee')" checkedValue="1"></span>
  <input component="$UI/system/components/justep/input/input" class="form-control x-input" xid="auditorDate" bind-ref="orderData.ref('fAuditorDate')"></input>
  <div class="x-gridSelect x-cell-control" component="$UI/system/components/justep/gridSelect/gridSelect" xid="auditorPerson" bind-ref="orderData.ref('fAuditorID')" bind-labelRef="orderData.ref('fAuditorName')">
   <option xid="aduditorOption" data="personData" value="SA_OPPerson" label="sName"></option></div>
  <h4 xid="h43" class="text"><![CDATA[领导审核信息]]></h4>
  <textarea component="$UI/system/components/justep/textarea/textarea" class="x-textarea x-cell-control form-control" rows="3" xid="examine" bind-ref="orderData.ref('fExamine')"></textarea>
  <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox " xid="examineIsArgee" bind-ref="orderData.ref('fExamineIsArgee')" checkedValue="1"></span>
  <input component="$UI/system/components/justep/input/input" class="form-control x-input" xid="examineDate" bind-ref="orderData.ref('fExamineDate')"></input>
  <div class="x-gridSelect   x-cell-control" component="$UI/system/components/justep/gridSelect/gridSelect" xid="examinePerson" bind-ref="orderData.ref('fExamineID')" bind-labelRef="orderData.ref('fExamineName')">
   <option xid="examineOption" data="personData" value="SA_OPPerson" label="sName"></option></div></div></div> 
  </div> 
</div>
