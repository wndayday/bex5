<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/SA/OPM/role/mainActivity.w" 
  __id="id_1" 
  class="x-full-screen container-fluid window" >

    <div component="$UI/system/components/justep/data/bizData" concept="SA_OPRoleManagement" xid="roleManagementData" xui:parent="model" xui:update-mode="insert" >
<reader action="/SA/OPM/logic/action/queryOPRoleManagementAction" xid="default11_1" />
</div>
   <reader xid="default1" action="/SA/OPM/logic/action/queryCustomerOPRoleAction"  xui:update-mode="merge"/>

</div>