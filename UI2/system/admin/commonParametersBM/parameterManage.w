<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:453px;left:892px;height:auto;">
  <div component="$UI/system/components/justep/dataOperation/dataOperation" xid="dataOperation1"></div><div component="$UI/system/components/justep/data/restData" xid="parameterData" url="/postgrest" className="/parameter/parameter" limit="-1" auto="load" isMain="true"></div>
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="newParameteDialog" width="50%" height="60%" status="normal" showTitle="true" forceRefreshOnOpen="true" title="新增公共参数" src="./newParameter.w" onReceive="windowDialog1Receive"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="editParameteDialog" src="./editParameter.w" title="编辑公共参数" showTitle="true" status="normal" forceRefreshOnOpen="true" width="50%" height="60%"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1" > 
    <div class="x-panel-content" xid="content1"> 
      <div xid="div12" class="row"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default  btnbox blueBtn"
          label="新增文本参数" xid="newText" onClick="newTextClick" icon="glyphicon glyphicon-plus"> 
          <i xid="i3" class="glyphicon glyphicon-plus"/>  
          <span xid="span7">新增文本参数</span>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btnbox blueBtn"
          label="新增文件参数" xid="newFile" onClick="newFileClick" icon="glyphicon glyphicon-plus"> 
          <i xid="i4" class="glyphicon glyphicon-plus"/>  
          <span xid="span8">新增文件参数</span>
        </a> 
      </div>  
      <table component="$UI/system/components/justep/list/list" class="x-list table"
        xid="list1" data="parameterData"> 
        <thead xid="thead1"> 
          <tr xid="tr1">  
            <th xid="default1" class="table-style">参数名称</th>  
            <th xid="default1" class="table-style">参数值</th>  
            <th xid="default1" class="table-style">分类</th>  
            <th xid="default1" class="table-style">类型</th>  
            <th xid="default1" class="table-style">标签</th>  
            <th xid="default1" class="table-style">操作</th>
          </tr> 
        </thead>  
        <tbody class="x-list-template x-min-height" xid="listTemplate1"> 
          <tr xid="tr2" bind-css="{success: val(&quot;check&quot;)==1}"> 
            <td xid="td4" class="table-style"> 
              <span xid="span21" bind-text='val("name")'/>
            </td>  
            <td xid="td5" class="table-style"> 
              <span xid="span22" bind-text="val('value')" bind-visible="val('type') == &quot;文本&quot;"/>
              
                  
            <div xid="div1" bind-visible="val('type') !== &quot;文本&quot;"><div component="$UI/system/components/justep/attachment/attachmentSimple" actionUrl="/storage" xid="attachmentSimple2" preSignMode="true" bind-ref='ref("value")'>
     <div class="x-attachment" xid="div12">
      <div class="x-attachment-content x-card-border" xid="div13">
       <div class="x-doc-process" xid="div14">
        <div class="progress-bar x-doc-process-bar" role="progressbar" style="width:0%;" xid="progressBar2"></div></div> 
       <div data-bind="foreach:$attachmentItems" xid="div15">
        <div class="x-attachment-cell" xid="div16">
         <div class="x-attachment-item x-item-other" data-bind="click:$model.previewOrRemoveItem.bind($model),style:{backgroundImage:($model.previewPicture.bind($model,$object))()}" xid="div17">
          <a data-bind="visible:$model.$state.get() == 'remove'" class="x-remove-barget" xid="a2"></a></div> </div> </div> 
       <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload'" xid="div18">
        <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload'" xid="div19"></div></div> 
       <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0" xid="div20">
        <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove')" xid="div21"></div></div> 
       <div style="clear:both;" xid="div22"></div></div> </div> </div></div></td>  
            <td xid="td7" class="table-style"> 
              <span xid="span24" bind-text='val("classify")'/>
            </td>  
            <td xid="td1" class="table-style"> 
              <span xid="span45" bind-text='val("type")'/>
            </td>  
            <td xid="td1" class="table-style"> 
              <span xid="span45" bind-text='val("tag")'/>
            </td>  
            <td xid="td10" class="table-style"> 
              <a component="$UI/system/components/justep/button/button" class="btn  btn-link text-blue"
                label="编辑" xid="editBtn" title="详细信息" icon="icon-edit" onClick="{&quot;operation&quot;:&quot;dataOperation1.openWindowDialog&quot;,&quot;args&quot;:{&quot;url&quot;:&quot;js:require.toUrl('$UI/system/admin/commonParametersBM/editParameter.w')&quot;}}"> 
                <i xid="i12" class="icon-edit"/>  
                <span xid="span17">编辑</span>
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn  btn-link text-red"
                label="删除" xid="delBtn" title="删除用户" onClick="delBtnClick"
                icon="glyphicon glyphicon-remove" bind-visible="$object.val('tag') == &quot;用户&quot;"> 
                <i xid="i13" class="glyphicon glyphicon-remove"/>  
                <span xid="span18">删除</span>
              </a> 
            </td> 
          </tr> 
        </tbody> 
      </table>  
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
        xid="pagerBar2"> 
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
</div>
