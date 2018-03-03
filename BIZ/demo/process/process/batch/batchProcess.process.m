<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.justep.com/model">
	<process name="batchProcess" start="start1" end="end1">
		<label language="zh_CN">流程中的批处理</label>
		<static-activity name="mainActivity">
			<label language="zh_CN">流程中的批处理</label>
		</static-activity>
	<place name="start1"><label language="zh_CN">开始</label>
<has-token token="init"></has-token>
</place>
<token name="init"></token>
<business-activity name="businessActivity1" condition="true"><label language="zh_CN">活动环节1</label>
<input name="x" unit="start1"></input>
<output name="x" unit="businessActivity2"></output>
</business-activity>
<business-activity name="businessActivity2" condition="true"><label language="zh_CN">活动环节2</label>
<input name="x" unit="businessActivity1"></input>
<output name="x" unit="businessActivity3"></output>
</business-activity>
<business-activity name="businessActivity3" condition="true"><label language="zh_CN">活动环节3</label>
<input name="x" unit="businessActivity2"></input>
<output name="x" unit="end1"></output>
</business-activity>
<place name="end1"><label language="zh_CN">结束</label>
</place>



















<has-action action="queryOrderAction" access-permission="public"></has-action>
<has-action action="createOrderAction" access-permission="public"></has-action>
<has-action action="saveOrderAction" access-permission="public"></has-action>
<has-action action="batchAdvanceProcessAction" access-permission="public"></has-action>
<has-action action="batchStartProcessAction" access-permission="public"></has-action>
</process>
</model>
