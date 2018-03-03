<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:463px;top:331px;">{{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="dialogData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" columns="{{data_relations}}"
      isTree="false"> 
      <reader action="{{data_reader}}"/>
    </div>{{/each}}
    <div component="$UI/system/components/justep/dataOperation/dataOperation"
      xid="dataOperation"/> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top2"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row1"> 
        <div class="col col-xs-6 col-md-8" xid="col1"> 
          <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group" tabbed="true" xid="buttonGroup2"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn" xid="preBtn" onClick="{&quot;operation&quot;:&quot;dialogData.prevPage&quot;}" icon="icon-ios7-arrow-back"> 
              <i xid="i5" class="icon-ios7-arrow-back" />  
              <span xid="span5">上页</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn" xid="nextBtn" onClick="{&quot;operation&quot;:&quot;dialogData.nextPage&quot;}" icon="icon-ios7-arrow-forward"> 
              <i xid="i6" class="icon-ios7-arrow-forward" />  
              <span xid="span6">下页</span> 
            </a> 
          </div> 
        </div>  
        <div class="col col-xs-6 col-md-4" xid="col3"> 
           
        <div component="$UI/system/components/justep/smartFilter/smartFilter" xid="smartFilter1" filterData="dialogData" filterCols="{{list_columns}}"> 
            <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']" bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))" xid="input1" /> 
          </div></div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div style="height:100%;" xid="searchDiv" class="x-bordered"> 
        <div component="$UI/system/components/justep/dataTables/dataTables"
          flexibleWidth="true" {{#if col_more}}scrollX="1"{{/if}} data="dialogData" rowActiveClass="active" class="table"
          xid="dataTables" scrollCollapse="false" ordering="false" > 
          <columns>{{#each list}}
            <column name="{{list_field1}}"/>{{#if list_field2}}
            <column name="{{list_field2}}"/>{{/if}}{{/each}}
          </columns> 
        </div> 
      </div> 
    </div>  
    
    <div class="x-panel-bottom" xid="bottom1" height="42"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button"
        label="取消" xid="cancelBtn" onClick="{&quot;operation&quot;:&quot;window.close&quot;}"> 
        <i xid="i2"/>  
        <span xid="span2">取消</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button"
        label="确定" xid="OKBtn" onClick="{&quot;operation&quot;:&quot;dataOperation.saveReturn&quot;,&quot;args&quot;:{&quot;data&quot;:&quot;dialogData&quot;,&quot;filter&quot;:&quot;getID()==$model.dialogData.getCurrentRowID()&quot;}}"> 
        <i xid="i1"/>  
        <span xid="span1">确定</span> 
      </a> 
    </div>
  </div> 
</div>
