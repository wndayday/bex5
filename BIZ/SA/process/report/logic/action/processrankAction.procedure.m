<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model" xmlns:m="http://www.justep.com/model">  

  <procedure name="processRankProcedure" code-model="/SA/process/report/logic/code" code="ProcessRankProcedure.processRankQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/> 
  </procedure>
  
  <procedure name="longTimeRankProcedure" code-model="/SA/process/report/logic/code" code="ProcessRankProcedure.longTimeRankQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/> 
  </procedure>
  
   <procedure name="shortTimeRankProcedure" code-model="/SA/process/report/logic/code" code="ProcessRankProcedure.shortTimeRankQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/> 
  </procedure>
  
   <procedure name="taskLimitRankProcedure" code-model="/SA/process/report/logic/code" code="ProcessRankProcedure.taskLimitRankQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/> 
  </procedure>
  
  <procedure name="personLimitRankProcedure" code-model="/SA/process/report/logic/code" code="ProcessRankProcedure.personLimitRankQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
    <parameter name="orderValue" type="String"/> 
  </procedure>
</model>
