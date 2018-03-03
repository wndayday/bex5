<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model" xmlns:m="http://www.justep.com/model">  

  <procedure name="processExecuteProcedure" code-model="/SA/process/report/logic/code" code="ProcessCaseProcedure.groupExecutingQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
  </procedure>
  
  <procedure name="processFinishedProcedure" code-model="/SA/process/report/logic/code" code="ProcessCaseProcedure.groupFinishedQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
  </procedure>
  
   <procedure name="processTypePieChartProcedure" code-model="/SA/process/report/logic/code" code="ProcessCaseProcedure.processTypePieQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
  </procedure>
  
  <procedure name="processTypeBarVChartProcedure" code-model="/SA/process/report/logic/code" code="ProcessCaseProcedure.processTypeBarVQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
  </procedure>
  
   <procedure name="processLimitTimeProcedure" code-model="/SA/process/report/logic/code" code="ProcessCaseProcedure.processLimitTimeQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/> 
  </procedure>
</model>
