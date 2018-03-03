<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:463px;top:331px;">{{#each tree}}
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="selectData" idColumn="{{data_concept}}" confirmDelete="false" confirmRefresh="false"> 
      <column label="id" name="{{data_concept}}" type="String" xid="default1"/>  
      <column label="{{tree_nodeLabel}}" name="{{tree_nodeName}}" type="String"/> 
    </div>{{/each}}{{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="dialogData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" columns="{{data_relations}}"
      isTree="true"> 
      <reader action="{{data_reader}}"/>{{/each}}{{#each tree}}
      <treeOption parentRelation="{{parent_relation}}" nodeKindRelation="{{node_kindRelation}}"
        rootFilter="{{root_filter}}"/>{{/each}}
    </div> {{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="searchData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" isTree="false"> 
      <reader action="{{data_reader}}"/> 
    </div>{{/each}}
    <div component="$UI/system/components/justep/dataOperation/dataOperation"
      xid="dataOperation"/> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top container-fluid" xid="top2"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row2" style="height:100%;"> 
        <div class="col col-xs-6 col-md-8" xid="col4" style="height:100%;padding-left: 0;"> {{#each tree}}
          <div> 
              
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn" xid="preBtn" onClick="{&quot;operation&quot;:&quot;selectData.prevPage&quot;}" icon="icon-ios7-arrow-back"> 
              <i xid="i9" class="icon-ios7-arrow-back"/>  
              <span xid="span9">上页</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn" xid="nextBtn" onClick="{&quot;operation&quot;:&quot;selectData.nextPage&quot;}" icon="icon-ios7-arrow-forward"> 
              <i xid="i8" class="icon-ios7-arrow-forward"/>  
              <span xid="span8">下页</span> 
            </a> 
          <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="cbCascade" label="级联选择" /></div> {{/each}}
        </div>  
        <div class="col col-xs-6 col-md-4" xid="col3" style="height:100%;"> 
           
        <div component="$UI/system/components/justep/smartFilter/smartFilter" xid="smartFilter1" filterData="dialogData" filterCols="{{tree_nodeName}}"> 
            <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']" bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))" xid="input1" /> 
          </div></div> 
      </div> 
    </div>  
    <div class="x-panel-content container-fluid" xid="content1"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row1" style="height:100%;overflow: hidden;"> 
        <div class="col col-xs-6 col-sm-6 col-md-6 col-lg-6" xid="col1" style="height:100%;padding-left: 0;"> 
          <div style="height:100%;overflow-x: hidden;" bind-visible="!$model.comp(&quot;smartFilter1&quot;).searchText.get()" class="x-bordered">{{#each tree}} 
            <div component="$UI/system/components/justep/grid/grid" appearance="tree"
              data="dialogData" expandColumn="{{tree_nodeName}}" useVirtualRoot="true"
              virtualRootLabel="{{root_nodeLable}}" xid="treeGrid" onRowDblClick="treeGridRowDblClick"
              class="x-grid-no-bordered" height="auto" width="100%"> 
              <columns xid="columns2"> 
                <column name="{{tree_nodeName}}" xid="column2"/> 
              </columns> 
            </div>{{/each}}
          </div>  
          <div style="display:none;height:100%;" bind-visible="$model.comp(&quot;smartFilter1&quot;).searchText.get()"
            xid="searchDiv" class="x-bordered"> 
            <div component="$UI/system/components/justep/dataTables/dataTables"
              flexibleWidth="true" data="searchData" rowActiveClass="active" class="table"
              xid="searchGrid" scrollCollapse="false" ordering="false" onRowDblClick="treeGridRowDblClick"> 
              <columns>{{#each tree}}
                <column name="{{tree_nodeName}}"/>{{/each}}
              </columns> 
            </div> 
          </div> 
        </div>  
        <div class="col col-xs-1 col-sm-1 col-md-1 col-lg-1" xid="col2" style="height:100%;padding:5% 0 0 0;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block blackBtn"
            label="全选" xid="addAllBtn" onClick="addAllBtnClick" icon="icon-chevron-right"> 
            <i xid="i3" class="icon-chevron-right"/>  
            <span xid="span3">全选</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block blackBtn"
            label="选择" xid="addBtn" onClick="addBtnClick" icon="linear linear-bus"> 
            <i xid="i4" class="icon-chevron-right linear linear-bus"/>  
            <span xid="span4">选择</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block blackBtn"
            label="移除" xid="removeBtn" onClick="{&quot;operation&quot;:&quot;dataOperation.deleteData&quot;,&quot;args&quot;:{&quot;data&quot;:&quot;selectData&quot;}}" icon="linear linear-volumemedium"> 
            <i xid="i5" class="icon-chevron-left linear linear-volumemedium"/>  
            <span xid="span5">移除</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-block blackBtn"
            label="清空" xid="removeAllBtn" onClick="removeAllBtnClick" icon="linear linear-trash"> 
            <i xid="i6" class="icon-chevron-left linear linear-trash"/>  
            <span xid="span6">清空</span> 
          </a> 
        </div>  
        <div class="col col-xs-5 col-sm-5 col-md-5 col-lg-5" xid="col7" style="height:100%;padding-right: 0;"> 
          <div style="height:100%;" class="x-bordered"> 
            <div component="$UI/system/components/justep/dataTables/dataTables"
              flexibleWidth="true" data="selectData" rowActiveClass="active" class="table"
              xid="selectGrid" scrollCollapse="false" ordering="false" onRowDblClick="{&quot;operation&quot;:&quot;dataOperation.deleteData&quot;,&quot;args&quot;:{&quot;data&quot;:&quot;selectData&quot;}}"> 
              <columns xid="columns1">{{#each tree}}
                <column name="{{tree_nodeName}}"/>{{/each}}
              </columns> 
            </div> 
          </div> 
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
        label="确定" xid="OKBtn" onClick="{&quot;operation&quot;:&quot;dataOperation.saveReturn&quot;,&quot;args&quot;:{&quot;data&quot;:&quot;selectData&quot;}}"> 
        <i xid="i1"/>  
        <span xid="span1">确定</span> 
      </a> 
    </div> 
  </div> 
</div>
