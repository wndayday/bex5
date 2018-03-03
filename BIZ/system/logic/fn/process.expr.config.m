<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.justep.com/model" filepath="BIZ/system/logic/fn/process.expr.config.m">
	<config name="process.executor.expr" value="">
		<item name="流程发起人" value="findActivityCreator('START')">
			<label language="zh_CN">获取指定环节的创建者('START')</label>
			<item name="editorValue" value="findActivityCreator('START'"/>
		</item>
		<item name="部门领导" value="findOrgUnitsHasCActivity(currentDeptID(),true)">
			<label language="zh_CN">获取拥有当前环节权限的组织单元(当前部门ID(),true)</label>
			<item name="editorValue" value="findOrgUnitsHasCActivity(currentDeptID(),true)"/>
		</item>
	</config>
</model>