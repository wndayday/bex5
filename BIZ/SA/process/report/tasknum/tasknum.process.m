<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">
  <process name="tasknumProcess" >
    <static-activity name="pieActivity"/> 
    <static-activity name="barVActivity"/>
     
    <has-action action="deptPieChartAction" access-permission="public"/>
    <has-action action="deptBarVChartAction" access-permission="public"/>
       
    <has-action action="personPieChartAction" access-permission="public"/>
    <has-action action="personBarVChartAction" access-permission="public"/>
    <has-action action="queryTaskNumAction" access-permission="public"/>
        
    <has-action action="statePieChartAction" access-permission="public"/>
    <has-action action="stateBarVChartAction" access-permission="public"/>
  </process>
</model>
