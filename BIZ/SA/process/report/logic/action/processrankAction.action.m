<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">  
  
  <action name="processRankAction" global="false" procedure="processRankProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>  
    <public type="String" required="false" name="orderValue"/>  
  </action>
  
  <action name="longTimeRankAction" global="false" procedure="longTimeRankProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/> 
    <public type="String" required="false" name="orderValue"/> 
  </action>
  
  <action name="shortTimeRankAction" global="false" procedure="shortTimeRankProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>
    <public type="String" required="false" name="orderValue"/>  
  </action>
  
   <action name="taskLimitRankAction" global="false" procedure="taskLimitRankProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>
    <public type="String" required="false" name="orderValue"/>  
  </action>
  
    <action name="personLimitRankAction" global="false" procedure="personLimitRankProcedure"> 
    <public type="String" required="false" name="startDate"/>  
    <public type="String" required="false" name="endDate"/> 
    <public type="String" required="false" name="processName"/>
    <public type="String" required="false" name="orderValue"/>  
  </action>
  
</model>
