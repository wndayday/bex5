<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model" xmlns:m="http://www.justep.com/model">  
  <procedure name="queryAppProcedure" code-model="/SA/ide/logic/code" code="Ide.queryApp"/>  
  <procedure name="deleteAppProcedure" code-model="/SA/ide/logic/code" code="Ide.deleteApp"> 
    <parameter name="path" type="String"/> 
  </procedure>  
  <procedure name="createAppProcedure" code-model="/SA/ide/logic/code" code="Ide.createApp">
    <parameter name="path" type="String"/>
    <parameter name="datasource" type="String"/>
  </procedure>
</model>
