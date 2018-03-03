<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="position:absolute;;left:248px;top:63px"
    onLoad="modelLoad"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="32">
      <label xid="label1"><![CDATA[BaaS模型编译]]></label>
    </div>  
    <div class="x-panel-content" xid="content1">
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel2"> 
        <div class="x-panel-top" xid="top2" height="32" style="font-size: 18px;padding-left: 8px;">
          <i class="icon-loading-b" bind-css="{'icon-loading-b':state.get()==='','icon-alert':state.get()!=='','error':state.get()==='error'}"/><label xid="label2" bind-css="{'error':state.get()==='error'}" bind-text="info"><![CDATA[Baas模型资源编译中,请稍后......]]></label>
        </div>  
        <div class="x-panel-content" xid="content2">
          <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control"
            xid="textarea2" style="height:100%;" readonly="true" bind-value="compileText"/>
        </div>  
        <div class="x-panel-bottom" xid="bottom2"> 
          <a class="btn btn-primary btn-only-label x-dialog-button" component="$UI/system/components/justep/button/button"
            label="关闭" xid="closeBtn" onClick="{&quot;operation&quot;:&quot;window.close&quot;}" bind-enable="canClose"> 
            <i xid="i1"/>  
            <span xid="span1">关闭</span> 
          </a> 
        </div>
      </div>
    </div> 
  </div>
</div>
