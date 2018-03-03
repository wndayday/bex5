<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model" xmlns:m="http://www.justep.com/model">  

  <procedure name="deptPieChartProcedure" code-model="/SA/process/report/logic/code" code="TaskNumProcedure.deptPieQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
  </procedure>
  <procedure name="deptBarVChartProcedure" code-model="/SA/process/report/logic/code" code="TaskNumProcedure.deptBarVQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
  </procedure>
  
  <procedure name="personPieChartProcedure" code-model="/SA/process/report/logic/code" code="TaskNumProcedure.personPieQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="deptName" type="String"/>
    <parameter name="personName" type="String"/> 
  </procedure>   
  <procedure name="personBarVChartProcedure" code-model="/SA/process/report/logic/code" code="TaskNumProcedure.personBarVQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="deptName" type="String"/> 
    <parameter name="personName" type="String"/>
  </procedure>
  
  <procedure name="statePieChartProcedure" code-model="/SA/process/report/logic/code" code="TaskNumProcedure.statusPieQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
  </procedure>   
  <procedure name="stateBarVChartProcedure" code-model="/SA/process/report/logic/code" code="TaskNumProcedure.statusBarVQuery">
    <parameter name="startDate" type="String"/>  
    <parameter name="endDate" type="String"/> 
    <parameter name="processName" type="String"/> 
  </procedure>
</model>
