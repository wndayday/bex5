<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:334px;top:318px;"> 
    <div component="$UI/system/components/justep/data/bizData" xid="taskData"
      directDelete="true" autoLoad="true" concept="SA_WorkTask" orderBy="sCreateTime:desc"
      onSaveCommit="saveCommit" limit="20"> 
      <reader action="/SA/task/logic/action/queryWorkTaskAction"/>  
      <writer action="/SA/task/logic/action/saveWorkTaskAction"/>  
      <creator action="/SA/task/logic/action/createWorkTaskAction"/>  
      <calculateRelation relation="calcCheckBox"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter"> 
    <div component="$UI/system/components/justep/smartFilter/smartFilter" xid="smartFilter1"
      filterData="taskData" filterCols="sName,sContent" class="pull-right"> 
      <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
        bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
        xid="input1"/>
    </div>
    <a component="$UI/system/components/justep/button/button" label=" 新建"
      class="btn btn-link btn-icon-left" icon="icon-plus" onClick="{&quot;operation&quot;:&quot;taskData.new&quot;, args:{index:'js:0'}}"
      xid="newBtn"> 
      <i class="icon-plus"/>  
      <span>新建</span> 
    </a>
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
      label="保存" xid="saveBtn" onClick="{&quot;operation&quot;:&quot;taskData.save&quot;}"> 
      <i xid="i3"/>  
      <span xid="label7">保存</span> 
    </a>
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
      label="删除" xid="deleteBtn" onClick="{&quot;operation&quot;:&quot;taskData.delete&quot;}"> 
      <i xid="i4"/>  
      <span xid="span7">删除</span> 
    </a>
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
      xid="refreshBtn" onClick="{&quot;operation&quot;:&quot;taskData.refresh&quot;}" label="刷新"> 
      <i xid="i2"/>  
      <span xid="span2">刷新</span> 
    </a>
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
      label="查询" xid="filterBtn" icon="icon-android-search" onClick="{operation:'dataFilter.menu'}"> 
      <i xid="i5" class="icon-android-search"/>  
      <span xid="span8">查询</span> 
    </a>  
  </div>  
  <div component="$UI/system/components/justep/grid/grid" xid="mainGrid" data="taskData"
    width="100%" hiddenCaptionbar="true" altRows="true" class="x-grid-no-bordered"
    height="auto"> 
    <columns xid="columns9"> 
      <column width="200" name="sName" xid="column31" editable="true"> 
        <editor xid="editor2"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="input2" bind-ref="ref('sName')"/> 
        </editor> 
      </column>  
      <column name="sContent" xid="column32" editable="true"> 
        <editor xid="editor3"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="input3" bind-ref="ref('sContent')"/> 
        </editor> 
      </column>  
      <column width="100" name="sTypeName" xid="column33" editable="true"/>  
      <column width="150" name="sLastModifyTime" xid="column34" editable="true"
        formatter="date"> 
        <editor xid="editor4"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="input4" bind-ref="ref('sLastModifyTime')"/> 
        </editor>  
        <formatoptions xid="default1" newformat="Y-m-d H:i"/> 
      </column> 
    </columns> 
  </div>  
  <span component="$UI/system/components/justep/bizFilter/bizFilter" xid="dataFilter"
    filterData="taskData" style="left:28px;top:290px;"/>  
  <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
    xid="pagerBar1" data="taskData"> 
    <div class="row" xid="div1"> 
      <div class="col-sm-3" xid="div2"> 
        <div class="x-pagerbar-length" xid="div3"> 
          <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
            class="x-pagerlimitselect" xid="pagerLimitSelect1"> 
            <span xid="span1">显示</span>  
            <select component="$UI/system/components/justep/select/select" class="form-control input-sm"
              xid="select1"> 
              <option value="10" xid="default2">10</option>  
              <option value="20" xid="default3">20</option>  
              <option value="50" xid="default4">50</option>  
              <option value="100" xid="default5">100</option>
            </select>  
            <span xid="span3">条</span>
          </label> 
        </div> 
      </div>  
      <div class="col-sm-3" xid="div4"> 
        <div class="x-pagerbar-info" xid="div5">当前显示1-10条，共16条</div>
      </div>  
      <div class="col-sm-6" xid="div6"> 
        <div class="x-pagerbar-pagination" xid="div7"> 
          <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
            xid="pagination1"> 
            <li class="prev" xid="li1"> 
              <a href="#" xid="a1"> 
                <span aria-hidden="true" xid="span4">«</span>  
                <span class="sr-only" xid="span5">Previous</span>
              </a> 
            </li>  
            <li class="next" xid="li2"> 
              <a href="#" xid="a2"> 
                <span aria-hidden="true" xid="span6">»</span>  
                <span class="sr-only" xid="span9">Next</span>
              </a> 
            </li> 
          </ul> 
        </div> 
      </div> 
    </div> 
  </div>
</div>
