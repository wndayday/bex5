<?xml version="1.0" encoding="utf-8"?>

<model xmlns="http://www.justep.com/model">
  <process name="processrankProcess" >
    <static-activity name="groupActivity"/> 
    
    <has-action action="processRankAction" access-permission="public"/>
    <has-action action="longTimeRankAction" access-permission="public"/>
    <has-action action="shortTimeRankAction" access-permission="public"/>
    
    <has-action action="taskLimitRankAction" access-permission="public"/>
    <has-action action="personLimitRankAction" access-permission="public"/>
  </process>
</model>
