<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">  
  
  <action name="deptPieChartAction" global="false" procedure="deptPieChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
  </action>
 
  <action name="deptBarVChartAction" global="false" procedure="deptBarVChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
  </action>
  
   <action name="personPieChartAction" global="false" procedure="personPieChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="deptName"/>
    <public type="String" required="false" name="personName"/>
  </action> 
  <action name="personBarVChartAction" global="false" procedure="personBarVChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="deptName"/>
    <public type="String" required="false" name="personName"/>
  </action>
   
   <action name="statePieChartAction" global="false" procedure="statePieChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
  </action>
  
  <action name="stateBarVChartAction" global="false" procedure="stateBarVChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
  </action>
  
</model>
