<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/system/designer/webIde/bex5Designer.w" 
  __id="id_1" 
  design="device:m;" 
  class="window" >

    <span component="$UI/system/components/justep/windowDialog/windowDialog" onReceive="processDialogReceive" showTitle="true" src="$UI/SA/OPM/dialogs/selectFunction/selectSingleFunction.w" status="normal" xid="processDialog" xui:before="panel3" xui:parent="window" xui:update-mode="insert" />
    <span component="$UI/system/components/justep/dialog/dialog" height="100px" status="normal" width="300px" xid="loadingDialog" xui:before="panel3" xui:parent="window" xui:update-mode="insert" >
<h3 class="text-center" >





正在复制新建...</h3>
</span>
    <div class="btn-group pull-right" component="$UI/system/components/justep/button/buttonGroup" tabbed="true" xid="buttonGroup1_2" xui:before="buttonGroup1" xui:parent="div13" xui:update-mode="insert" >
<a class="btn btn-link" component="$UI/system/components/justep/button/button" label="关闭" onClick="closeBtnClick" xid="closeBtn" xui:parent="buttonGroup1" xui:update-mode="insert" >
<i xid="i1_2" />
<span xid="span1_2" >










关闭</span>
</a>
</div>
   <h4 xid="h43"  xui:update-mode="merge-and-replace">






定制开发</h4>    <button bind-click="copyNewBtnClick" class="btn btn-link btn-icon-left " icon="icon-ios7-copy" label="复制新建" xid="copyNew" xui:before="new" xui:parent="toolBar2" xui:update-mode="insert" >
<i class="icon-ios7-copy" xid="i1_4" />
<span xid="span1_4" >


复制新建</span>
</button>

</div>