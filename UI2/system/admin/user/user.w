<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:379px;left:20px;"
    onModelConstructDone="modelModelConstructDone" onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="selectData" idColumn="fValue"> 
      <column label="值" name="fValue" type="String" xid="xid1"/>  
      <column label="显示名称" name="fName" type="String" xid="xid2"/>  
      <data xid="default5">[{"fValue":"2","fName":"电话"},{"fValue":"3","fName":"邮箱"}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="userData" idColumn="id" limit="20" onCustomDelete="userDataCustomDelete"
      onCustomRefresh="userDataCustomRefresh" confirmRefresh="false"> 
      <column label="ID" name="id" type="String" xid="xid8"></column>
  <column label="姓名" name="name" type="String" xid="xid9"></column>
  <column label="电话" name="phoneNumbers" type="String" xid="xid10"></column>
  <column label="状态" name="active" type="Boolean" xid="xid11"></column>
  <column label="邮箱" name="emails" type="String" xid="xid12"></column>
  <column label="分组" name="groups" type="String" xid="xid17"></column>
  <column label="是否被验证" name="verified" type="Boolean" xid="xid16"></column>
  <column name="check" type="Integer" xid="xid18"></column>
  <column name="userName" type="String" xid="xid3"></column>
  <column name="createTime" type="String" xid="xid4"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="sortData" idColumn="fVlaue"> 
      <column label="值" name="fVlaue" type="String" xid="xid6"/>  
      <column label="显示名称" name="fName" type="String" xid="xid7"/>  
      <data xid="default7">[{"fVlaue":"1","fName":"按创建时间降序"},{"fVlaue":"2","fName":"按姓名升序"},{"fVlaue":"3","fName":"按姓名降序"}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1" bind-click="panel1Click"> 
    <div class="x-panel-content" xid="content1"> 
      <div xid="div12" class="row"><a component="$UI/system/components/justep/button/button" class="btn btn-default pull-right btnbox blueBtn" label="群组管理" xid="groupBtn" onClick="groupBtnClick" icon="icon-ios7-keypad"> 
            <i xid="i3" class="icon-ios7-keypad" />  
            <span xid="span7">群组管理</span> 
          </a><a component="$UI/system/components/justep/button/button" class="btn btn-default pull-right btnbox blueBtn" label="新建用户" xid="newUserBtn" onClick="newUserBtnClick" icon="glyphicon glyphicon-plus"> 
            <i xid="i4" class="glyphicon glyphicon-plus"/>  
            <span xid="span8">新建用户</span> 
          </a><div xid="div23" class="col col-xs-1 pull-left"><select component="$UI/system/components/justep/select/select" class="form-control" xid="select" bind-optionsValue="fValue" bind-optionsLabel="fName" bind-options="selectData" bind-optionsCaption="姓名"/></div><div xid="div26" class="col col-xs-2 pull-left"><div class="input-group" xid="div4"> 
                    <input component="$UI/system/components/justep/input/input" class="form-control x-edit" style="border-right-style:none;" xid="searchInput" />  
                    <div class="input-group-addon" style="background-color:transparent;border-left-style:none;" xid="searchDiv" bind-click="searchDivClick"> 
                      <i class="icon-android-search" xid="i2" /> 
                    </div> 
                  </div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit" xid="labelEdit4" style="display:none;"> 
                <div class="x-edit" xid="div3"> 
                   
                </div> 
              </div></div>
  <div xid="div27" class="col col-xs-4 pull-left"><div xid="metaDiv" class="user-labelChoose" bind-click="metaDivClick"> 
            <div xid="div48" class="labelTitle">群组筛选：</div>  
            <div xid="labelSpanDiv" class="labelSpan" bind-foreach="$model.labelRows.get();"> 
              <span xid="span1" bind-text="name" bind-visible="$model.labelRows.get().length&gt;0" style="display:none;" /> 
            </div>  
            <div xid="div50" class="caret-style"> 
              <span xid="span63" class="caret" /> 
            </div>  
            <div xid="metaContent" class="spanContent"> 
              <div xid="div52" class="spanContentlabel" bind-foreach="$model.groups"> 
                <span xid="span66" bind-click="span66Click" bind-text="name" class="btn-block"><![CDATA[]]></span> 
              </div>  
              <div xid="div54" class="caretTitle">收起
                <span xid="span65" class="glyphicon" ></span> 
              </div> 
            </div> 
          </div></div>
  </div><div xid="div24" class="row o-tj"><span xid="span4" class="choseSpan">已选择</span>
  <span xid="span50" class="numberSpan" bind-text="$model.selectCount.get()"></span>
  <span xid="span51" class="numberSpan">/</span>
  <span xid="span6" class="numberSpan" bind-text="$model.userNum.get()"></span>
  <span xid="span5" class="choseSpan">位客户</span>
  <div xid="div28" class="col col-xs-2 pull-right"><select component="$UI/system/components/justep/select/select" class="form-control" xid="sortWaySelect" bind-optionsValue="fVlaue" bind-optionsLabel="fName" bind-options="sortData" bind-optionsCaption="按创建时间升序" onChange="sortWaySelectChange" /></div><div xid="div25" class="col col-xs-1 pull-right"><div class="dropdown btn-group o-operation" component="$UI/system/components/bootstrap/dropdown/dropdown" xid="dropdown1"> 
                <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-right dropdown-toggle" label="操作" icon="icon-arrow-down-b" xid="button5"> 
                  <i class="icon-arrow-down-b" xid="i6" />  
                  <span xid="span10">操作</span> 
                </a>  
                <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu" xid="menu1"> 
                  <li class="x-menu-item" xid="item1" style="display:none;"> 
                    <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="发送推送" xid="button6"> 
                      <i xid="i7" />  
                      <span xid="span11">发送推送</span> 
                    </a> 
                  </li>  
                  <li class="x-menu-item" xid="item3"> 
                    <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="群组设置" xid="setSelectedUserGroupBtn" onClick="setSelectedUserGroupBtnClick"> 
                      <i xid="i9" />  
                      <span xid="span13">群组设置</span> 
                    </a> 
                  </li>  
                  <li class="x-menu-item" xid="item4"> 
                    <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="删除联系人" xid="deleteSelectedUserBtn" onClick="deleteSelectedUserBtnClick"> 
                      <i xid="i10" />  
                      <span xid="span14">删除联系人</span> 
                    </a> 
                  </li> 
                </ul> 
              </div></div>
  </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="display:none;"> 
        <div class="x-col x-col-25 x-col-center" xid="col1"> 
          <div component="$UI/system/components/justep/row/row" class="x-row"
            xid="row2"> 
            <div class="x-col x-col-fixed x-col-center" xid="col4" style="padding-right:0px;width:auto;"> 
               
            </div>  
            <div class="x-col x-col-center" xid="col5" style="padding-left:0px;"> 
               
            </div> 
          </div> 
        </div>  
        <div class="x-col x-col-center  x-col-25" xid="col2"> 
           
        </div>  
        <div class="x-col x-col-center " xid="col10"> 
            
            
          </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3"
        style="display:none; background-color:#EEEEEE;"> 
        <div class="x-col x-col-center" xid="col7"> 
          </div>  
        <div class="x-col x-col-center" xid="col8"> 
          <div component="$UI/system/components/justep/row/row" class="x-row"
            xid="row4"> 
            <div class="x-col" xid="col11"> 
               
            </div>  
            <div class="x-col" xid="col12"> 
               
            </div> 
          </div> 
        </div> 
      </div>  
      <table component="$UI/system/components/justep/list/list" class="x-list table"
        xid="list1" data="userData" filter="$model.userFilter($row)"> 
        <thead xid="thead1"> 
          <tr xid="tr1"> 
            <th xid="default1" class="table-style"> 
              <div component="$UI/system/components/justep/button/checkboxPC"
                class="checkbox" xid="allCheckbox" onChange="allCheckboxChange" checkedValue="1"
                uncheckedValue="0" value="0"/> 
            </th>  
            <th xid="default1" class="table-style">姓名</th>  
            <th xid="default1" class="table-style">电话</th>  
            <th xid="default1" class="table-style">状态</th>  
            <th xid="default1" class="table-style">邮箱</th>  
            <th xid="default1" class="table-style">分组</th>  
            <th xid="default1" class="table-style">是否被验证</th>
             <th xid="default1" class="table-style">创建时间</th>  
            <th xid="default1" class="table-style">操作</th> 
          </tr> 
        </thead>  
        <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
          <tr xid="tr2" bind-css="{success: val(&quot;check&quot;)==1}"> 
            <td xid="td11" class="table-style"> 
              <div component="$UI/system/components/justep/button/checkboxPC"
                class="checkbox" xid="userCheckbox" checkedValue="1" uncheckedValue="0"
                bind-ref="ref(&quot;check&quot;)" onChange="userCheckboxChange"/> 
            </td>  
            <td xid="td2" class="table-style"> 
              <span xid="span19" bind-text="val(&quot;name&quot;)"/> 
            </td>  
            <td xid="td3" class="table-style"> 
              <span xid="span20" bind-text="val(&quot;phoneNumbers&quot;)"/> 
            </td>  
            <td xid="td4" class="table-style"> 
              <span xid="span21" bind-text="val(&quot;active&quot;)?&quot;正常&quot;:&quot;禁用&quot;"/> 
            </td>  
            <td xid="td5" class="table-style"> 
              <span xid="span22" bind-text="val(&quot;emails&quot;)"/> 
            </td>  
            <td xid="td7" class="table-style"> 
              <span xid="span24" bind-text="val(&quot;groups&quot;)"/> 
            </td>  
            <td xid="td1" class="table-style"> 
              <span xid="span45" bind-text="val(&quot;verified&quot;)?&quot;已验证&quot;:&quot;未验证&quot;"/> 
            </td>
             <td xid="td1" class="table-style"> 
              <span xid="span45" bind-text='val("createTime")'/> 
            </td>  
            <td xid="td10" class="table-style"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link text-blue"
                label="状态更新" xid="statusBtn" title="状态更新" onClick="statusBtnClick"
                icon="icon-compose"> 
                <i xid="i11" class="icon-compose"/>  
                <span xid="span16">状态更新</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn  btn-link text-blue"
                label="详细信息" xid="userBtn" title="详细信息" onClick="userBtnClick" icon="icon-ios7-eye"> 
                <i xid="i12" class="icon-ios7-eye"/>  
                <span xid="span17">详细信息</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn  btn-link text-red"
                label="删除" xid="delUserBtn" title="删除用户" onClick="delUserBtnClick"
                icon="glyphicon glyphicon-remove"> 
                <i xid="i13" class="glyphicon glyphicon-remove"/>  
                <span xid="span18">删除</span> 
              </a> 
            </td> 
          </tr> 
        </tbody> 
      </table>  
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
        xid="pagerBar2" data="userData"> 
        <div class="row" xid="div13"> 
          <div class="col-sm-3" xid="div14"> 
            <div class="x-pagerbar-length" xid="div15"> 
              <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                class="x-pagerlimitselect" xid="pagerLimitSelect2"> 
                <span xid="span27">显示</span>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control input-sm" xid="select2"> 
                  <option value="10" xid="default8">10</option>  
                  <option value="20" xid="default9">20</option>  
                  <option value="50" xid="default10">50</option>  
                  <option value="100" xid="default11">100</option> 
                </select>  
                <span xid="span28">条</span> 
              </label> 
            </div> 
          </div>  
          <div class="col-sm-3" xid="div16"> 
            <div class="x-pagerbar-info" xid="div20">当前显示0条，共0条</div> 
          </div>  
          <div class="col-sm-6" xid="div21"> 
            <div class="x-pagerbar-pagination" xid="div22"> 
              <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                xid="pagination2"> 
                <li class="prev" xid="li5"> 
                  <a href="#" xid="a5"> 
                    <span aria-hidden="true" xid="span29">«</span>  
                    <span class="sr-only" xid="span30">Previous</span> 
                  </a> 
                </li>  
                <li class="next" xid="li6"> 
                  <a href="#" xid="a6"> 
                    <span aria-hidden="true" xid="span31">»</span>  
                    <span class="sr-only" xid="span32">Next</span> 
                  </a> 
                </li> 
              </ul> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="newUserDialog"
    src="$UI/system/admin/user/newUser.w" title="新建用户" showTitle="true"
    status="normal" width="50%" height="60%" forceRefreshOnOpen="true" onReceive="newUserDialogReceive"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="userInfoDialog"
    src="$UI/system/admin/user/userInfo.w" title="用户信息" width="50%"
    height="60%" showTitle="true" status="normal" onReceived="userInfoDialogReceived"/>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver groupPopOver"
    direction="auto" xid="groupPopOver"> 
    <div class="x-popOver-overlay" xid="div1"/>  
    <div class="x-popOver-content" xid="div2"> 
      <div xid="div18" class="pop-title"> 
        <span><![CDATA[管理分组]]></span> 
      </div>  
      <div xid="div5" class="pop-center panel-body"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox redBtn" label="新增" xid="newGroupBtn" icon="icon-plus" onClick="newGroupBtnClick"> 
          <i xid="i23" class="icon-plus" />  
          <span xid="span36">新增</span> 
        </a><div xid="div19" bind-foreach="$model.groups" class="pull-left"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-right groupBtn" xid="button13" icon="icon-close"> 
            <i xid="i22" class="icon-close" style="display:none;" bind-visible="$model.delGroupIcon.get();" bind-click="i22Click" />  
            <span xid="span35" bind-text="name" /> 
          </a> 
        </div><div component="$UI/system/components/justep/row/row" class="x-row"
          xid="newGroupRow" style="display:none;"> 
          <div class="x-col" xid="col14"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="groupNameInput"/> 
          </div>  
          <div class="x-col" xid="col15"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox"
              label="保存" xid="saveGroupBtn" onClick="saveGroupBtnClick"> 
              <i xid="i24"/>  
              <span xid="span37">保存</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox"
              label="取消" xid="cancelCreateGroupBtn" onClick="cancelCreateGroupBtnClick"> 
              <i xid="i25"/>  
              <span xid="span38">取消</span> 
            </a> 
          </div> 
        </div>  
          
         
      </div>  
      <div xid="div17" class="pop-bottom panel-body text-right"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox blueBtn" label="管理" xid="groupManagementBtn" onClick="groupManagementBtnClick"> 
              <i xid="i14" />  
              <span xid="span15">管理</span> 
            </a><a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox granBtn" label="取消" xid="groupPopOverCancelBtn" onClick="groupPopOverCancelBtnClick"> 
              <i xid="i20" />  
              <span xid="span26">取消</span> 
            </a></div> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver groupPopOver"
    direction="auto" xid="selectGroupPopOver"> 
    <div class="x-popOver-overlay" xid="div11"/>  
    <div class="x-popOver-content" xid="div10" style="background-color:white;width:548px;height:348px;"> 
      <div xid="div7" class="pop-title"> 
        <span><![CDATA[保存到组]]></span> 
      </div>  
      <div xid="div9" class="pop-center panel-body"> 
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row6" style="display:none;"> 
          <div class="x-col" xid="col16"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="input"/> 
          </div>  
          <div class="x-col o-groutbtnList" xid="col3"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="保存" xid="button8" style="margin-left:20px;"> 
              <i xid="i15"/>  
              <span xid="span23">保存</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="取消" xid="button1" style="margin-left:20px;" onClick="cancelCreateGroupBtnClick"> 
              <i xid="i17"/>  
              <span xid="span12">取消</span> 
            </a> 
          </div> 
        </div>  
        <div xid="div8" bind-foreach="$model.groups" class="pull-left"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-right"
            xid="groupSeclected" icon="icon-close" onClick="groupSeclectedClick" bind-css="{&quot;groupSeclected&quot;:$model.groupSelected.get()==$object}"> 
            <i xid="i8" class="icon-close" style="display:none;" bind-visible="$model.delGroupIcon.get();"
              bind-click="i22Click"/>  
            <span xid="span9" bind-text="name"/> 
          </a> 
        </div> 
      </div>  
      <div xid="div6" class="pop-bottom panel-body text-right"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox blueBtn" label="确定" xid="saveUserToGroup" onClick="saveUserToGroup"> 
              <i xid="i18" />  
              <span xid="span33">确定</span> 
            </a><a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox blueBtn" label="新增" xid="button3" onClick="newGroupBtnClick" style="display:none;"> 
              <i xid="i16" />  
              <span xid="span3">新增</span> 
            </a><a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox granBtn" label="取消" xid="selectGroupPopOverCancel" onClick="selectGroupPopOverCancelClick"> 
              <i xid="i5" />  
              <span xid="span2">取消</span> 
            </a></div> 
    </div> 
  </div> 
</div>
