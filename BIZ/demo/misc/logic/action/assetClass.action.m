<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.justep.com/model">
  <action name="queryAssetClassAction" procedure="bizQueryProcedure"> 
    <public name="concept" type="String" value="DEMO_AssetClass"/>   
    <public name="idColumn" type="String" value="DEMO_AssetClass"/>  
    <private name="select" type="String" value="DEMO_AssetClass.*"/>  
    <private name="from" type="String" value="DEMO_AssetClass DEMO_AssetClass"/>        
    <protected name="condition" type="String" value=""/>  
    <permission name="range" type="List"/>  
    <public name="filter" type="String"/>  
    <public name="distinct" type="Boolean" value="false"/>  
    <public name="offset" type="Integer"/>  
    <public name="limit" type="Integer"/>  
    <public name="columns" type="String"/>          
    <public name="orderBy" type="String"/>  
    <private name="aggregate" type="String"/>  
    <public name="aggregateColumns" type="String"/>  
    <public name="variables" type="Map"/>       
    <private name="dataModel" type="String" value="/demo/misc/data"/>  
    <private name="fnModel" type="String" value="/system/logic/fn"/> 
  </action>

  <action name="createAssetClassAction" procedure="bizCreateProcedure">
     <public name="concept" type="String" value="DEMO_AssetClass"/>   
     <private name="fnModel" type="String" value="/system/logic/fn"/>
	<public name="table" type="Table"/>
	<public name="defaultValues" type="Map"/>
  </action>
  
  <action name="saveAssetClassAction" procedure="bizSaveProcedure">
    <public name="concept" type="String" value="DEMO_AssetClass"/>  
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