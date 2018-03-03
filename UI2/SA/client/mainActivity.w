<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc"
  xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:309px;top:56px;"> 
    <div component="$UI/system/components/justep/data/bizData" xid="mainData"
      directDelete="true" autoLoad="true" concept="SA_Client" orderBy="" columns=""
      autoNew="false" onSaveCommit="dataSaveCommit" limit="20"> 
      <reader action="/system/logic/action/querySA_ClientAction"/>  
      <writer action="/system/logic/action/saveSA_ClientAction"/>  
      <creator action="/system/logic/action/createSA_ClientAction"/>  
      <calculateRelation relation="calcCheckBox"/> 
    </div>  
    <div component="$UI/system/components/justep/data/bizData" xid="detailData"
      directDelete="true" autoLoad="true" concept="SA_ClientApp" columns="" autoNew="false" limit="20"> 
      <reader action="/system/logic/action/querySA_ClientAppAction"/>  
      <writer action="/system/logic/action/saveSA_ClientAppAction"/>  
      <creator action="/system/logic/action/createSA_ClientAppAction"/>  
      <master xid="default1" data="mainData" relation="sClientID"/> 
    <rule xid="rule1">
   <col name="sRentStartTime" xid="ruleCol1">
    <required xid="required1">
     <expr xid="default16"><![CDATA[true]]></expr>
     <message xid="default17">租用开始时间不允许为空</message></required> </col> </rule></div> 
  </div>  
  <div xid="view"> 
    <div component="$UI/system/components/justep/controlGroup/controlGroup"
      class="x-control-group" title="租户" xid="mainControlGroup" collapsible="true"> 
      <div class="x-control-group-title" xid="controlGroupTitle1"> 
        <span xid="span2"/> 
      </div>  
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline"
        xid="mainBar"> 
        <div component="$UI/system/components/justep/smartFilter/smartFilter"
          xid="smartFilter" filterData="mainData" filterCols="sName,sLongName,sCode,sContact,sPhone,sEmployeesSize"
          class="pull-right"> 
          <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
            bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
            xid="input1"/> 
        </div>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-icon-left"
          xid="newBtn" label="新建租户" onClick="{operation:&quot;mainData.new&quot;}"> 
          <i xid="i8"/>  
          <span xid="span8">新建租户</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="saveBtn" onClick="{&quot;operation&quot;:&quot;mainData.save&quot;}" label="保存"> 
          <i xid="i7"/>  
          <span xid="span7">保存</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="button1" onClick="{&quot;operation&quot;:&quot;mainData.delete&quot;}"> 
          <i xid="i2"/>  
          <span xid="span3"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="refreshBtn" onClick="{operation:'mainData.refresh'}"> 
          <i xid="i1"/>  
          <span xid="span1"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          label="" xid="filterBtn" icon="icon-search" onClick="{operation:'bizFilter.menu'}"> 
          <i xid="i4" class="icon-search"/>  
          <span xid="span5"/> 
        </a> 
      </div>  
      <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
        xid="mainGrid" data="mainData" height="auto" class="x-grid-no-bordered" width="100%"> 
        <columns xid="column"> 
          <column name="sName" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sName')"/> 
            </editor> 
          </column>  
          <column name="sLongName" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sLongName')"/> 
            </editor> 
          </column>  
          <column name="sCode" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sCode')"/> 
            </editor> 
          </column>  
          <column name="sContact" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sContact')"/> 
            </editor> 
          </column>  
          <column name="sPhone" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sPhone')"/> 
            </editor> 
          </column>  
          <column name="sEmployeesSize" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sEmployeesSize')"/> 
            </editor> 
          </column> 
        </columns> 
      </div>  
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
        xid="bar" data="mainData"> 
        <div class="row" xid="div11"> 
          <div class="col-sm-3" xid="div12"> 
            <div class="x-pagerbar-length" xid="div13"> 
              <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                class="x-pagerlimitselect" xid="pagerLimitSelect2"> 
                <span xid="span411">显示</span>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control input-sm" xid="select11"> 
                  <option value="10" xid="default9">10</option>  
                  <option value="20" xid="default10">20</option>  
                  <option value="50" xid="default14">50</option>  
                  <option value="100" xid="default15">100</option> 
                </select>  
                <span xid="span61">条</span> 
              </label> 
            </div> 
          </div>  
          <div class="col-sm-3" xid="div14"> 
            <div class="x-pagerbar-info" xid="div15">当前显示0条，共0条</div> 
          </div>  
          <div class="col-sm-6" xid="div16"> 
            <div class="x-pagerbar-pagination" xid="div17"> 
              <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                xid="pagination11"> 
                <li class="prev" xid="li11"> 
                  <a href="#" xid="a11"> 
                    <span aria-hidden="true" xid="span114">«</span>  
                    <span class="sr-only" xid="span115">Previous</span> 
                  </a> 
                </li>  
                <li class="next" xid="li21"> 
                  <a href="#" xid="a21"> 
                    <span aria-hidden="true" xid="span161">»</span>  
                    <span class="sr-only" xid="span171">Next</span> 
                  </a> 
                </li> 
              </ul> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div component="$UI/system/components/justep/controlGroup/controlGroup"
      class="x-control-group" title="租用的应用" xid="detailControlGroup" collapsible="true"> 
      <div class="x-control-group-title" xid="controlGroupTitle12"> 
        <span xid="span12"/> 
      </div>  
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter"
        xid="detailBar"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-primary btn-icon-left"
          xid="addBtn" icon="icon-plus" label="添加应用" onClick="addBtnClick"> 
          <i xid="i6" class="icon-plus"/>  
          <span xid="span10">添加应用</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" onClick="{'operation':'detailData.save'}" xid="button4">
   <i xid="i9"></i>
   <span xid="span9"></span></a><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="deleteBtn" onClick="{operation:'detailData.delete'}"> 
          <i xid="i17"/>  
          <span xid="span11">删除</span> 
        </a> 
      </div>  
      <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
        xid="detailGrid" data="detailData" height="auto" class="x-grid-no-bordered" width="100%"> 
        <columns xid="columns"> 
          <column name="sAppName" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sAppName')"/> 
            </editor> 
          </column>  
          <column name="sAppModel" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sAppModel')"/> 
            </editor> 
          </column>  
          <column name="sAppVersion" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sAppVersion')"/> 
            </editor> 
          </column>  
          <column name="sVendorName" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sVendorName')"/> 
            </editor> 
          </column>  
          <column name="sRentStartTime" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sRentStartTime')"/> 
            </editor> 
          </column>  
          <column name="sRentEndTime" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sRentEndTime')"/> 
            </editor> 
          </column> 
          <column name="sRentNumber" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sRentNumber')"/> 
            </editor> 
          </column>  
          <column name="sValidState" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('sValidState')"/> 
            </editor> 
          </column>  
        </columns> 
      </div>  
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
        xid="pagerBar1" data="detailData"> 
        <div class="row" xid="div122"> 
          <div class="col-sm-3" xid="div222"> 
            <div class="x-pagerbar-length" xid="div322"> 
              <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                class="x-pagerlimitselect" xid="pagerLimitSelect"> 
                <span xid="span41">显示</span>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control input-sm" xid="sele"> 
                  <option value="10" xid="default9">10</option>  
                  <option value="20" xid="default10">20</option>  
                  <option value="50" xid="default14">50</option>  
                  <option value="100" xid="default15">100</option> 
                </select>  
                <span xid="span116">条</span> 
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
                    <span aria-hidden="true" xid="span14">«</span>  
                    <span class="sr-only" xid="span15">Previous</span> 
                  </a> 
                </li>  
                <li class="next" xid="li2"> 
                  <a href="#" xid="a2"> 
                    <span aria-hidden="true" xid="span16">»</span>  
                    <span class="sr-only" xid="span17">Next</span> 
                  </a> 
                </li> 
              </ul> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/bizFilter/bizFilter" xid="bizFilter"
    filterData="mainData" style="top:289px;left:91px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="selectAppDialog"
    src="$UI/SA/client/selectAppDialog.w" status="normal" showTitle="true" title="选择应用"> 
    
  <result concept="detailData" operation="edit" origin="dialogData" xid="default18">
   <mapping from="sName" to="sAppName" xid="default19"></mapping>
   <mapping from="sModel" to="sAppModel" xid="default20"></mapping>
   <mapping from="sAppVersion" to="sAppVersion" xid="default21"></mapping>
   <mapping from="sVendorName" to="sVendorName" xid="default22"></mapping>
   <mapping from="sVendorID" to="sVendorID" xid="default23"></mapping>
   <mapping from="SA_App" to="sAppID" locator="true" xid="default24"></mapping></result></span> 
</div>
