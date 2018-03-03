<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window container-fluid x-full-screen" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:646px;top:373px;"> 
    <div component="$UI/system/components/justep/data/bizData" autoLoad="true"
      xid="docNodeList" concept="SA_DocNode"> 
      <reader xid="default7" action="/system/logic/action/queryDocNodeAction"/>  
      <writer xid="default8" action="/system/logic/action/saveDocNodeAction"/>  
      <creator xid="default9" action="/system/logic/action/createDocNodeAction"/>  
      
      <calculateRelation relation="fullName" xid="calculateRelation1" label="被删除文档或目录"/>  
      <rule xid="rule1"> 
        <col name="fullName" xid="ruleCol1"> 
          <calculate xid="calculate1"> 
            <expr xid="default4">$row.val('sDocDisplayPath') + "/" + $row.val('sDocName')</expr>
          </calculate> 
        </col> 
      </rule>  
      <filter name="filter0" xid="filter1"><![CDATA[SA_DocNode.sFlag = 0]]></filter>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel"
    xid="panel1" style="height:100%;"> 
    <div class="x-panel-top" xid="top1" height="50"> 
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter"
        xid="toolBar1"> 
        <div class="x-control pull-right" component="$UI/system/components/justep/smartFilter/smartFilter"
          xid="smartFilter1" filterData="docNodeList" filterCols="sDocName,sDocDisplayPath"> 
          <!-- <input type="text" class="form-control" placeholder="搜索" xid="input1"/> -->  
          <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
            bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
            xid="input1"/> 
        </div>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          label="删除" xid="deleteBtn" icon="linear linear-cross" onClick="deleteBtnClick"
          bind-enable="$model.docNodeList.getCount()&gt;0"> 
          <i xid="i1" class="linear linear-cross"/>  
          <span xid="span3">删除</span>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          label="还原" xid="resetBtn" icon="dataControl dataControl-undo" onClick="resetBtnClick"
          bind-enable="$model.docNodeList.getCount()&gt;0"> 
          <i xid="i2" class="dataControl dataControl-undo"/>  
          <span xid="span5">还原</span>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          label="清除全部" xid="deleteAllBtn" icon="linear linear-crosscircle" onClick="deleteAllBtnClick"
          bind-enable="$model.docNodeList.getCount()&gt;0"> 
          <i xid="i3" class="linear linear-crosscircle"/>  
          <span xid="span6">清除全部</span>
        </a>
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" xid="refreshBtn" onClick='{"operation":"docNodeList.refresh"}'>
   <i xid="i4"></i>
   <span xid="span7"></span></a></div>
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true"
        rowActiveClass="active" class="table table-hover" xid="docListDataTables"
        data="docNodeList"> 
        <columns xid="columns3"> 
          <column name="fullName" xid="column5" label="被删除的文档"/>
        </columns> 
      </div>
    </div>  
    <div class="x-panel-bottom" xid="bottom1" height="60"> 
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
        xid="pagerBar1" data="docNodeList"> 
        <div class="row" xid="div1"> 
          <div class="col-sm-3" xid="div2"> 
            <div class="x-pagerbar-length" xid="div3" style="height:104px;width:456px;"> 
              <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                class="x-pagerlimitselect" xid="pagerLimitSelect1"> 
                <span xid="span1">显示</span>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control input-sm" xid="select1"> 
                  <option value="10" xid="default1">10</option>  
                  <option value="20" xid="default2">20</option>  
                  <option value="50" xid="default3">50</option>  
                  <option value="100" xid="default16">100</option> 
                </select>  
                <span xid="span2">条</span> 
              </label> 
            </div> 
          </div>  
          <div class="col-sm-3" xid="div4"> 
            <div class="x-pagerbar-info" xid="div5">当前显示0条，共0条</div> 
          </div>  
          <div class="col-sm-6" xid="div6"> 
            <div class="x-pagerbar-pagination" xid="div7"> 
              <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                xid="pagination1"> 
                <li class="prev" xid="li1"> 
                  <a href="#" xid="a1"> 
                    <span aria-hidden="true" xid="span4">«</span>  
                    <span class="sr-only" xid="span9">Previous</span> 
                  </a> 
                </li>  
                <li class="next" xid="li2"> 
                  <a href="#" xid="a2"> 
                    <span aria-hidden="true" xid="span18">»</span>  
                    <span class="sr-only" xid="span19">Next</span> 
                  </a> 
                </li> 
              </ul> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div>
</div>
