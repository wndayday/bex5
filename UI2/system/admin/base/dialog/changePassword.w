<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:72px;left:52px;"> 
    </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <div xid="div2" class=""> 
        <div xid="div4" class="page-body"> 
          <div class="form-horizontal container-fluid " component="$UI/system/components/bootstrap/form/form"
            xid="form1"> 
            <div class="form-group" xid="formGroup4"> 
              <div class="col-sm-3" xid="col10"> 
                <label class="control-label" xid="controlLabel2"><![CDATA[旧密码]]></label> 
              </div>  
              <div class="col-sm-9" xid="col11"> 
                <input component="$UI/system/components/justep/input/password" class="form-control"
                  xid="oldPassword" placeHolder="请输入旧密码"/> 
              </div> 
            </div>  
            <div class="form-group" xid="formGroup1"> 
              <div class="col-sm-3" xid="col5"> 
                <label class="control-label" xid="controlLabel3"><![CDATA[新密码]]></label> 
              </div>  
              <div class="col-sm-9" xid="col6"> 
                <input component="$UI/system/components/justep/input/password"
                  class="form-control" xid="password1" 
                  placeHolder="请输入密码"/> 
              </div> 
            </div>  
            <div class="form-group" xid="formGroup2"> 
              <div class="col-sm-3" xid="col7"> 
                <label class="control-label" xid="controlLabel4"><![CDATA[确认密码]]></label> 
              </div>  
              <div class="col-sm-9" xid="col8"> 
                <input component="$UI/system/components/justep/input/password"
                  class="form-control" xid="password2" 
                  placeHolder="请输入确认密码"/> 
              </div> 
            </div>
            <div component="$UI/system/components/justep/button/buttonGroup"
                  class="btn-group btn-group-justified" tabbed="false" xid="buttonGroup1"> 
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-info btn-only-label btn-block" label="确定" xid="okBtn"
                    onClick="okBtnClick"> 
                    <i xid="i4"/>  
                    <span xid="span4">确定</span> 
                  </a>  
                  <a component="$UI/system/components/justep/button/button"
                    class="btn btn-default btn-only-label" label="取消" xid="cancelBtn"
                    onClick="cancelBtnClick"> 
                    <i xid="i6"/>  
                    <span xid="span6">取消</span> 
                  </a> 
                </div>  
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <resource xid="resource2"> 
    </resource> 
</div>
