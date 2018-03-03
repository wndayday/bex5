<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">  
  
  <action name="processLongTimeAction" global="false" procedure="processLongTimeProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
    <public type="String" required="false" name="orderValue"/> 
  </action>

 <action name="processAvgTimeAction" global="false" procedure="processAvgTimeProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/> 
    <public type="String" required="false" name="orderValue"/> 
  </action>
  
   <action name="taskAvgTimeAction" global="false" procedure="taskAvgTimeProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
    <public type="String" required="false" name="orderValue"/>
  </action>
  
</model>
