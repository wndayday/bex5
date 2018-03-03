<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.justep.com/model">
<action name="queryAppAction" global="false" procedure="queryAppProcedure"><label language="zh_CN">获取应用</label>
</action>
<action name="deleteAppAction" global="false" procedure="deleteAppProcedure"><label language="zh_CN">删除应用</label>
<public type="String" name="path"></public>
</action>
<action name="createAppAction" global="false" procedure="createAppProcedure"><label language="zh_CN">创建应用</label>
<public type="String" name="path"></public>
<public type="String" name="datasource"></public>
</action>
</model>