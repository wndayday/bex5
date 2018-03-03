<?xml version="1.0" encoding="UTF-8"?>
<model xmlns="http://www.justep.com/model">
<concept name="SA_PersonTask" default-value-expr="guid()"><has-relation relation="NONUM" data-type="Integer"></has-relation>
<label language="zh_CN">人员任务数</label>
<has-relation relation="PERSONNAME" data-type="String"></has-relation>
<has-relation relation="DEPTNAME" data-type="String"></has-relation>
<has-relation relation="TASKNUM" data-type="Integer"></has-relation>

</concept>
<relation name="PERSONNAME" data-type="String"><label language="zh_CN">人员名称</label>
</relation>
<relation name="DEPTNAME" data-type="String"><label language="zh_CN">部门名称</label>
</relation>
<relation name="TASKNUM" data-type="Integer"><label language="zh_CN">流程任务数</label>
</relation>
<relation name="NONUM" data-type="Integer"><label language="zh_CN">序号</label>
</relation>
</model>