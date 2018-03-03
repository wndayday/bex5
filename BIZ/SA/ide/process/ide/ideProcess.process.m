<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.justep.com/model">
	<process name="ideProcess">
		<label language="zh_CN">定制开发</label>
		<static-activity name="devActivity">
			<label language="zh_CN">定制开发</label>
		</static-activity>
	<static-activity name="deployActivity"><label language="zh_CN">发布到服务器</label>
</static-activity>





<has-action action="queryAppAction" access-permission="public"></has-action>
<has-action action="deleteAppAction" access-permission="public"></has-action>
<has-action action="createAppAction" access-permission="public"></has-action>
</process>
</model>
