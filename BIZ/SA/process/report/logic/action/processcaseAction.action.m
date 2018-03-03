<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">  
  
  <action name="processExecuteAction" global="false" procedure="processExecuteProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
  </action>
  
  <action name="processFinishedAction" global="false" procedure="processFinishedProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
  </action>
  
  <action name="processTypePieChartAction" global="false" procedure="processTypePieChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
  </action>
  
  <action name="processTypeBarVChartAction" global="false" procedure="processTypeBarVChartProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
  </action>
  
   <action name="processLimitTimeAction" global="false" procedure="processLimitTimeProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/> 
    <public type="String" required="false" name="orderValue"/> 
  </action>
</model>
