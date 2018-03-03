<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">
  <process name="processtimeProcess" >
    <static-activity name="groupActivity"/>
     
    <has-action action="processLongTimeAction" access-permission="public"/>
    
    <has-action action="processAvgTimeAction" access-permission="public"/>
    <has-action action="taskAvgTimeAction" access-permission="public"/>
  </process>
</model>
