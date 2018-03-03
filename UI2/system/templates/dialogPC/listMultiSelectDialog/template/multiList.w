<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:463px;top:331px;">{{#each datas}} 
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="selectData" idColumn="{{data_concept}}" confirmDelete="false" confirmRefresh="false"> 
      <column label="id" name="{{data_concept}}" type="String" xid="default1"/>{{/each}}{{#each list}} 
      <column label="{{labellist_field1}}" name="{{list_field1}}" type="String"/>{{#if list_field2}}
      <column label="{{labellist_field2}}" name="{{list_field2}}" type="String"/>{{/if}}{{/each}}
    </div> {{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="dialogData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" columns="{{data_relations}}"
      isTree="false"> 
      <reader action="{{data_reader}}"/> 
    </div>{{/each}}
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver" style="top:2px;left:606px;" onReceive="windowReceiverReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top container-fluid" xid="top2"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row2" style="height:100%;"> 
        <div class="col col-xs-6 col-md-4" xid="col4" style="height:100%;padding-left: 0;"> 
          <div component="$UI/system/components/justep/smartFilter/smartFilter"
            xid="smartFilter1" filterData="dialogData" filterCols="{{list_columns}}"> 
            <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
              bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
              xid="input1"/> 
          </div> 
        </div>  
        <div class="col col-xs-6 col-md-8" xid="col3" style="height:100%;"> 
          <div class="pull-right"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              xid="preBtn" onClick="{&quot;operation&quot;:&quot;selectData.prevPage&quot;}" icon="icon-ios7-arrow-back"> 
              <i xid="i9" class="icon-ios7-arrow-back"/>  
              <span xid="span9">上页</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              xid="nextBtn" onClick="{&quot;operation&quot;:&quot;selectData.nextPage&quot;}" icon="icon-ios7-arrow-forward"> 
              <i xid="i8" class="icon-ios7-arrow-forward"/>  
              <span xid="span8">下页</span> 
            </a> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content container-fluid" xid="content1"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row1" style="height:100%;overflow: hidden;"> 
        <div class="col col-xs-6 col-sm-6 col-md-6 col-lg-6" xid="col1" style="height:100%;padding-left: 0;"> 
          <div class="x-bordered" style="height:100%;" xid="searchDiv"> 
            <div component="$UI/system/components/justep/dataTables/dataTables"
              flexibleWidth="true" data="dialogData" rowActiveClass="active" class="table"
              xid="searchGrid" scrollCollapse="false" ordering="false" onRowDblClick="searchGridRowDblClick"
              lengthMenu="20"> 
              <columns>{{#each list}} 
                <column label="{{labellist_field1}}" name="{{list_field1}}"/>{{#if list_field2}}
                <column label="{{labellist_field2}}" name="{{list_field2}}"/>{{/if}}{{/each}}
              </columns> 
            </div> 
          </div> 
        </div>  
        <div class="col col-xs-1 col-sm-1 col-md-1 col-lg-1" xid="col2" style="height:100%;padding:5% 0 0 0;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block"
            label="全选" xid="addAllBtn" onClick="addAllBtnClick" icon="icon-chevron-right"> 
            <i xid="i3" class="icon-chevron-right"/>  
            <span xid="span3">全选</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block"
            label="选择" xid="addBtn" onClick="addBtnClick" icon="icon-chevron-right"> 
            <i xid="i4" class="icon-chevron-right"/>  
            <span xid="span4">选择</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block"
            label="移除" xid="removeBtn" onClick="removeBtnClick" icon="icon-chevron-left"> 
            <i xid="i5" class="icon-chevron-left"/>  
            <span xid="span5">移除</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block"
            label="清空" xid="removeAllBtn" onClick="removeAllBtnClick" icon="icon-chevron-left"> 
            <i xid="i6" class="icon-chevron-left"/>  
            <span xid="span6">清空</span> 
          </a> 
        </div>  
        <div class="col col-xs-5 col-sm-5 col-md-5 col-lg-5" xid="col7" style="height:100%;padding-right: 0;"> 
          <div class="x-bordered" style="height:100%;"> 
            <div component="$UI/system/components/justep/dataTables/dataTables"
              flexibleWidth="true" data="selectData" rowActiveClass="active" class="table"
              xid="selectGrid" scrollCollapse="false" ordering="false" onRowDblClick="selectGridRowDblClick"> 
              <columns xid="columns1">{{#each list}} 
                <column label="{{labellist_field1}}" name="{{list_field1}}"/>{{#if list_field2}}
                <column label="{{labellist_field2}}" name="{{list_field2}}"/>{{/if}}{{/each}}
              </columns> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1" height="42"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button"
        label="取消" xid="cancelBtn" onClick="{&quot;operation&quot;:&quot;windowReceiver.windowCancel&quot;}"> 
        <i xid="i2"/>  
        <span xid="span2">取消</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button"
        label="确定" xid="OKBtn" onClick="OKBtnClick"> 
        <i xid="i1"/>  
        <span xid="span1">确定</span> 
      </a> 
    </div> 
  </div> 
</div>
