<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  xid="window" 
  component="$UI/system/components/justep/window/window" 
  extends="$UI/portal/base/login/login.w" 
  __id="id_1" 
  sysParam="false" 
  class="login-page portal-login-page window" >

   <div xid="pageLogin" class="login-box"  xui:update-mode="merge"/>
   <div xid="pageHeader" class="login-logo"  xui:update-mode="merge"/>
   <div xid="pageBody" class="login-box-body"  xui:update-mode="merge"/>
   <a xid="login" class="btn btn-primary btn-block btn-flat"  xui:update-mode="merge"/>
   <div xid="col1" class="col-xs-4"  xui:update-mode="merge"/>
   <div xid="col2" class="col-xs-4"  xui:update-mode="merge"/>
<xu:modifications>
  <xu:remove select="//*[@xid='pageHeader']/@style"/>
  <xu:remove select="//*[@xid='pageBody']/@style"/>
</xu:modifications>

</div>