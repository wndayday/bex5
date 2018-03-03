<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model" xmlns:m="http://www.justep.com/model">  

  <procedure name="processLongTimeProcedure" code-model="/SA/process/report/logic/code" code="ProcessTimeProcedure.processLongTimeQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/> 
  </procedure>
  
  <procedure name="processAvgTimeProcedure" code-model="/SA/process/report/logic/code" code="ProcessTimeProcedure.avgProcessTimeQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/>
  </procedure>
  
  <procedure name="taskAvgTimeProcedure" code-model="/SA/process/report/logic/code" code="ProcessTimeProcedure.avgTaskTimeQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/>
  </procedure>

</model>
