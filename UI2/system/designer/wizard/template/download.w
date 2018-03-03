<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:10px;left:282px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="catalogData" idColumn="id" confirmDelete="false" onCustomRefresh="catalogDataCustomRefresh"
      limit="10" confirmRefresh="false"> 
      <column label="id" name="id" type="String" xid="column2"></column>
  <column label="模板名称" name="title" type="String" xid="column2"></column>
  <column label="模板路径" name="path" type="String" xid="column3"></column>
  <column label="类型" name="category" type="Integer" xid="column4"></column>
  <column label="类型名称" name="categoryName" type="String" xid="column5"></column>
  <column label="描述" name="description" type="String" xid="column6"></column>
  <column label="上传时间" name="createAt" type="String" xid="column7"></column>
  <column name="id" type="String" xid="column8"></column>
  <column name="type" type="String" xid="xid9"></column>
  <column name="typeName" type="String" xid="xid10"></column>
  <column name="remark" type="String" xid="xid14"></column>
  <column name="version" type="String" xid="xid16"></column>
  <column name="tempId" type="String" xid="xid17"></column>
  <column name="price" type="Integer" xid="xid18"></column>
  <column name="viewCount" type="String" xid="xid19"></column>
  <column name="isSellSource" type="String" xid="xid20"></column>
  <column name="projectId" type="String" xid="xid21"></column>
  <column name="createBy" type="String" xid="xid22"></column>
  <column name="updateAt" type="String" xid="xid23"></column>
  <column name="updateBy" type="String" xid="xid24"></column>
  <column label="模板封面" name="coverUrl" type="String" xid="xid25"></column>
  <column isCalculate="true" name="edit" type="String" xid="xid28"></column>
  <column name="locked" type="Integer" xid="xid26"></column>
  <column isCalculate="true" label="模板封面" name="cover" type="String" xid="xid30"></column>
  <column label="模板路径" name="tempPath" type="String" xid="xid31"></column>
  <column name="tempId" type="String" xid="xid1"></column>
  <column name="indexUrl" type="String" xid="xid4"></column>
  <column name="project" type="String" xid="xid2"></column>
  <column name="operationType" type="Integer" xid="xid5"></column>
  <column name="usableStatus" type="String" xid="xid3"></column>
  <column name="npmName" type="String" xid="xid6"></column>
  <column name="isOrNotChoose" type="String" xid="xid7"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="category" idColumn="code" onCustomRefresh="categoryCustomRefresh"> 
      <column name="code" type="Integer" xid="xid15"/>  
      <column name="name" type="String" xid="xid27"/>  
      <master xid="default33"/>  
      <column name="id" type="String" xid="xid29"/>  
      <data xid="default32">[{"code":{"value":""}},{"code":{"value":""}},{},{},{},{}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1"><div xid="modelContainer" class="model-body-container"> 
    <div xid="modelTitle" class="model-title"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link active allkind pull-left" label="全部" xid="allBtn" bind-click="allBtnClick"> 
        <i xid="i9" />  
        <span xid="span9">全部</span> 
      </a>  
      <div component="$UI/system/components/justep/list/list" class="x-list btn-group pull-left" xid="sortsButtonGroup" data="category"> 
        <ul class="x-list-template x-min-height" xid="listTemplateUl2" componentname="$UI/system/components/justep/list/list#listTemplateUl"> 
          <li xid="li2" class="pull-left x-min-height" componentname="li(html)" style="padding:6px 12px"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link" xid="catagoryBtn" style="padding:0px 10px;" bind-click="catagoryBtnClick"> 
              <i xid="i8" />  
              <span xid="span8" bind-text="val(&quot;name&quot;)" /> 
            </a> 
          </li> 
        </ul> 
      </div>  
      <div xid="div24" class="clearfix"></div>
    </div>  
    <div xid="modelDetail" class="model-detail"> 
      <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" id="templist" style="overflow:hidden;display:inline-block;width:100%;" data="catalogData" limit="-1"> 
        <ul class="x-list-template" xid="listTemplateUl1"> 
          <li xid="li1" class="applist02"> 
            <div xid="div21" class="appContent">
              <img alt="" xid="image2" align="middle" bind-attr-src='val("coverUrl")?val("coverUrl"):$model.getUrl("./img/defaultcover.jpg")' class="bg" />
              <a component="$UI/system/components/justep/button/button" xid="selectBtn" bind-click="selectBtnClick" class="slectTemp" bind-disable=" "> 
                <i xid="i2" />  
                <span xid="span2"><![CDATA[]]></span>
              </a>
              <i xid="i6" class="linear linear-bubble slectState text-center" />
              <div xid="release" class="submitBox" bind-visible="val(&quot;price&quot;)!=undefined&amp;&amp;val(&quot;price&quot;)!=0"> 
                <span xid="inner" class="inner" bind-text="&quot;￥&quot;+val(&quot;price&quot;)" />
              </div>
            </div>
            <div xid="div22" class="appTitle">
              <span xid="span14" class="text-center" bind-text='$model.getTitle( val("title"), val("isOrNotChoose"))'/>
            <span xid="span3" style="color:#FF0000;" bind-visible='val("isOrNotChoose") == "true"'><![CDATA[（已引入）]]></span></div>
          </li> 
        </ul> 
      </div> 
    </div>  
    <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid" xid="pagerBar1" data="catalogData"> 
      <div class="row" xid="div1"> 
        <div class="col-sm-3" xid="div2"> 
          <div class="x-pagerbar-length" xid="div3"> 
            <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect" class="x-pagerlimitselect" xid="pagerLimitSelect1" defaultValue="10"> 
              <span xid="span4">显示</span>  
              <select component="$UI/system/components/justep/select/select" class="form-control input-sm" xid="select1"> 
                <option value="10" xid="default3">10</option>  
                <option value="20" xid="default4">20</option>  
                <option value="30" xid="default5">30</option>  
                <option value="50" xid="default34">50</option>
              </select>  
              <span xid="span5">条</span>
            </label> 
          </div> 
        </div>  
        <div class="col-sm-3" xid="div4"> 
          <div class="x-pagerbar-info" xid="div6">当前显示0条，共0条</div>
        </div>  
        <div class="col-sm-6" xid="div7"> 
          <div class="x-pagerbar-pagination" xid="div8"> 
            <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination" xid="pagination1"> 
              <li class="prev" xid="li3"> 
                <a href="#" xid="a1"> 
                  <span aria-hidden="true" xid="span6">«</span>  
                  <span class="sr-only" xid="span7">Previous</span>
                </a> 
              </li>  
              <li class="next" xid="li4"> 
                <a href="#" xid="a2"> 
                  <span aria-hidden="true" xid="span11">»</span>  
                  <span class="sr-only" xid="span12">Next</span>
                </a> 
              </li> 
            </ul> 
          </div> 
        </div> 
      </div> 
    </div>
  </div></div>
   <div class="x-panel-bottom" xid="bottom1"><a class="btn btn-link btn-only-label x-dialog-button" component="$UI/system/components/justep/button/button" label="取消" onClick='{"operation":"window.close"}' xid="cancelBtn">
   <i xid="i1"></i>
   <span xid="span1">取消</span></a>
  <a class="btn btn-primary x-dialog-button" component="$UI/system/components/justep/button/button" label="确定" onClick="OKBtnClick" xid="OKBtn">
   <i xid="i1"></i>
   <span xid="span1">确定</span></a></div></div>
</div>
