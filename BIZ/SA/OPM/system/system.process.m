<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model" xmlns:m="http://www.justep.com/model">  
  <process name="systemProcess" kind="system"> 
    <label language="zh_CN">系统调用</label>  
      
    
    
      
     
    <static-activity name="mainActivity">

<label language="zh_CN">系统</label>
</static-activity>  
  











































































































































<has-action action="loginAction" access-permission="public"></has-action>
<has-action action="ntLoginAction" access-permission="public"></has-action>
<has-action action="logoutAction" access-permission="public"></has-action>
<has-action action="getProcessAction" access-permission="public"></has-action>
<has-action action="getAgentListAction" access-permission="public"></has-action>
<has-action action="changePasswordAction" access-permission="public"></has-action>
<has-action action="queryIdByNameAction" access-permission="public"></has-action>
<has-action action="queryAllBusinessActivity2Action" access-permission="public"></has-action>
<has-action action="queryDataTestAction" access-permission="public"></has-action>
<has-action action="opmLogAction" access-permission="public"></has-action>
<has-action action="getClientAppsAction" access-permission="public"></has-action>
<has-action action="initSysDbAction" access-permission="public"></has-action>
</process> 
</model>
