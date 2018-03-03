<?xml version="1.0" encoding="utf-8"?>

<!-- 
	一. 多租户功能的开启与关闭
	多租户开启：
	第一步：修改/system/config/client.config.m，将以下注释放开
		<config name="clientName" value="client_id"/>
	第二步：	修改/BIZ/system/config/interceptor.config.m，将以下注释放开
		<item name="initClient" value="/system/logic/code/interceptor,com.justep.system.interceptor.InitClient,before"/>
		<item name="checkClientPermission" value="/system/logic/code/interceptor,com.justep.system.interceptor.CheckClientPermission,before"/>
	
	多租户功能关闭:
	第一步：修改/system/config/client.config.m，注释以下内容
		<config name="clientName" value="client_id"/>
	第二步：	修改/BIZ/system/config/interceptor.config.m，将以下注释
		<item name="initClient" value="/system/logic/code/interceptor,com.justep.system.interceptor.InitClient,before"/>
		<item name="checkClientPermission" value="/system/logic/code/interceptor,com.justep.system.interceptor.CheckClientPermission,before"/>
	

	二. 多租户系统库的初始化
	启动X5服务之后，访问http://localhost:8080/x5/UI2/SA/init/init.w，点击
其中的"点击初始化"按钮即可。

	三. 多租户系统的登录
	在登录的url中添加client参数，表示租户标识，例如租户abc登录的url是
		http://localhost:8080/x5?client=abc
		
	四. 多租户环境下，如果功能中用到本地sql，特殊的规则如下：
	SQL特殊写法：
	1. where中的隔离字段过虑：$clientFilter(表别名, [表别名])
	例如: 
		select * from SA_Task t where $clientFilter(t) 
			== select * from SA_Task t where t.client_id='xx'
		
		select * from SA_Task where $clientFilter(NULL)  
			== select * from SA_Task where client_id='xx'
	
	2. insert中的隔离字段：$clientName, insert中的隔离字段值：$clientValue
	例如：
		insert into SA_Task (sID, sName, $clientName) values('task1', '任务1', $clientValue)
			== insert into SA_Task (sID, sName, client_id) values('task1', '任务1', 'xx')
		
		insert into SA_Task (sID, $clientName, sName) values('task2', $clientValue, '任务2')
			==	insert into SA_Task (sID, client_id, sName) values('task2', 'xx', '任务2')

		insert into SA_Task ($clientName, sID,  sName) values($clientValue, 'task3', '任务3')
			==	insert into SA_Task (client_id, sID,  sName) values('xx', 'task3', '任务3')


	3, select中隔离字段：$clientName(表别名, 列别名)
	例如：
		select sID, $clientName(NULL, NULL), sName from SA_Task 
			== select sID, client_id, sName from SA_Task 
	
		select t.sID as sID, $clientName(t, field1), t.sName as sName from SA_Task t 
			== select t.sID as sID, t.client_id as field1, t.sName as sName from SA_Task t 

		select t.sID as sID, $clientName(t, NULL), t.sName as sName from SA_Task t 
			== select t.sID as sID, t.client_id, t.sName as sName from SA_Task t 
			
		select sID, $clientName(NULL, field1), sName from SA_Task 
			== select sID, client_id as field1, sName from SA_Task
			
	4. create中的隔离字段: $clientDefine
		CREATE TABLE SA_Code (sID nvarchar(32) NOT NULL , sCode nvarchar(64)  NOT NULL,	$clientDefine)
			==
			CREATE TABLE SA_Code (sID nvarchar(32) NOT NULL,sCode nvarchar(64)  NOT NULL ,client_id nvarchar(32) not NULL)

		CREATE TABLE SA_Code (sID nvarchar(32) NOT NULL , $clientDefine, sCode nvarchar(64)  NOT NULL)
			==
			CREATE TABLE SA_Code (sID nvarchar(32) NOT NULL,client_id nvarchar(32) not NULL,sCode nvarchar(64)  NOT NULL )
		CREATE TABLE SA_Code ($clientDefine, sID nvarchar(32) NOT NULL , sCode nvarchar(64)  NOT NULL)
			==
			CREATE TABLE SA_Code (client_id nvarchar(32) not NULL,sID nvarchar(32) NOT NULL,sCode nvarchar(64)  NOT NULL )
	
	5. 创建索引中的隔离字段: $clientIndex(表名)
		$clientIndex(SA_Code)
			== create index SA_Code_client_id on SA_Code(client_id)
			
		create index index2 on SA_Code($clientName, sCode)
			== create index2 on SA_Code(client_id, sCode)
			
	五. 应用初始化配置
	应用初始化分两个阶段：
	第一阶段：创建表和初始化全局数据
	1. 创建表
	规范：主体通过概念来自动生成，同时辅助写本地sql创建物理表或视图；
	文件存储：本地sql的放在data模块下的init目录下；
	文件命名：文件的扩展名必须是".[数据库类型].table.sql"，例如：
		/system/data/init/system.db2.table.sql
		/system/data/init/system.mysql.table.sql
	建表语句要保证允许多次重复执行，即要有相应的drop语句；
	本地sql在符合"四"中的规则；

	2. 初始化全局数据	
	在创建表之后，支持写KSQL和sql插入全局数据，
	文件存储：data模块下的init目录；
	文件命名：
		KSQL文件的扩展名必须是".global.data.ksql"，例如：
			/system/data/init/system.data.ksql
		
		本地sql文件的扩展名必须是".[数据库类型].global.data.sql"，例如：
			/system/data/init/system.db2.global.data.sql
			/system/data/init/system.mysql.globa.data.sql
	本地sql在符合"四"中的规则；
	
	3. 调用data/init模块中的initGlobalProcedure
	
	
	
	第二阶段：初始化租户级别数据
	执行时机：给租户分配应用时执行
	1. KSQL或sql脚本
	规范：以KSQL为主，同时支持本地sql；
	文件存储：data模块下的init目录；
	文件命名：
		KSQL文件的扩展名必须是".data.ksql"，例如：
			/system/data/init/system.data.ksql
		
		本地sql文件的扩展名必须是".[数据库类型].data.sql"，例如：
			/system/data/init/system.db2.data.sql
			/system/data/init/system.mysql.data.sql
	本地sql在符合"四"中的规则；
	

	2. 调用data/init模块中的initProcedure
	
				
-->

<model xmlns="http://www.justep.com/model">
	<!-- 
	<config name="clientName" value="client_id"/>
	 -->
</model>	