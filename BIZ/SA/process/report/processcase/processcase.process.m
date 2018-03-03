<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">
  <process name="processcaseProcess" >
    <static-activity name="groupActivity"/> 
    <static-activity name="pieActivity"/> 
    
    <has-action action="processExecuteAction" access-permission="public"/>
    <has-action action="processFinishedAction" access-permission="public"/>
    
    <has-action action="processTypePieChartAction" access-permission="public"/>
    <has-action action="processTypeBarVChartAction" access-permission="public"/>
    
    <has-action action="processLimitTimeAction" access-permission="public"/>
  </process>
</model>
