<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.justep.com/model">
  <action name="querySendDocAction" procedure="bizQueryProcedure">
  	<public name="concept" type="String" value="DEMO_SendDoc"/>
    <public name="idColumn" type="String" value="doc"/>
    <private name="select" type="String" value="doc.*"/>
    <private name="from" type="String" value="DEMO_SendDoc doc"/>
    <protected name="condition" type="String" value=""/>
    <permission name="range" type="List"/>
    <public name="filter" type="String" value=""/>
    <public name="distinct" type="Boolean" value="FALSE"/>
    <public name="offset" type="Integer"/>
    <public name="limit" type="Integer" value="1"/>
    <public name="columns" type="String" value=""/>
    <public name="orderBy" type="String" value=""/>
    <private name="aggregate" type="String" value=""/>
    <public name="aggregateColumns" type="String" value=""/>
    <public name="variables" type="Map"/>
    <private name="dataModel" type="String" value="/demo/misc/data"/>
    <private name="fnModel" type="String" value="/system/logic/fn"/>
  </action>
 
  <action name="createSendDocAction" procedure="bizCreateProcedure">
  	<public name="concept" type="String" value="DEMO_SendDoc"/>
    <private name="fnModel" type="String" value="/system/logic/fn"/>
	<public name="table" type="Table"/>
	<public name="defaultValues" type="Map"/>
  </action>
 
  <action name="saveSendDocAction" procedure="bizSaveProcedure">
  	<public name="concept" type="String" value="DEMO_SendDoc"/>
    <private name="dataModel" type="String" value="/demo/misc/data"/>
	<protected name="readOnly" type="String"/>
	<protected name="notNull" type="String"/>
	<public name="table" type="Table"/>
    <permission name="insertRange" type="List"/>
    <permission name="deleteRange" type="List"/>
    <permission name="updateRange" type="List"/>
    <private name="fnModel" type="String" value="/system/logic/fn"/>
  </action>
</model>