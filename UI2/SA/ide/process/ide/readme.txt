一. 实施布署开发服务器（以下配置都在是开发服务上进行配置）：
	1. 配置说明
	第一步：修改%JUSTEP_HOME%/conf/server.xml
	在config中添加子节点
<web-ide> 
    <prod-ui-server>正式服务上UIServer的地址</prod-ui-server>  
    <prod-home>C:\x5\BeX5_5454</prod-home>  
    <check-permission>true</check-permission> 
    <release-dir>/UI2/system,/UI2/SA,/UI2/portal,/UI2/portal2</release-dir>
</web-ide> 
	其中
	prod-ui-server: 正式服务中UIServer的地址，例如http://ip:port/x5, 允许写多个地址，使用","分隔
	prod-home: 正式运行环境的JUSTEP-HOME路径; 允许写多个路径, 使用","分隔
	check-permission: 表示定制开发时，验证用户的权限（当前主要是目录权限），用户的权限必须在开发服务上配置，具体参考定制权限配置
	release-dir: 配置UI2下哪些目录以发布模式运行（即不会多次编译）, 其它目录将以debug模式运行（每次都会重新编译）
	
	第二步：在开发服务中配置正式服务的数据源
	原理：正式服务数据源的名称规则为：原始数据源名 + "_prod"，例如system对应的是system_prod(使得system_prod指向正式服务的系统库)
	实现：在%JUSTEP_HOME%/apache-tomcat/conf/context.xml中添加正式服务的数据源(所有数据源都需要配置)
	
	第三步: 在JUSTEP_HOME/config下添加datasource.xml文件, 在里面配置开发服务器所有到的数据库连接, 格式如下：
<datasource>
  	<Resource name="system" auth="Container" type="javax.sql.DataSource" driverClassName="com.mysql.jdbc.Driver" url="jdbc:mysql://localhost:3307/x5sys" username="root" password="x5" maxActive="10" maxIdle="5"/>
    <Resource name="doc" auth="Container" type="javax.sql.DataSource" driverClassName="com.mysql.jdbc.Driver" url="jdbc:mysql://localhost:3307/x5doc" username="root" password="x5" maxActive="10" maxIdle="5"/>
  	<Resource name="demo" auth="Container" type="javax.sql.DataSource" driverClassName="com.mysql.jdbc.Driver" url="jdbc:mysql://localhost:3307/demo" username="root" password="x5" maxActive="10" maxIdle="5"/>
  	<Resource name="takeout" auth="Container" type="javax.sql.DataSource" driverClassName="com.mysql.jdbc.Driver" url="jdbc:mysql://localhost:3307/takeout" username="root" password="x5" maxActive="10" maxIdle="5"/>
  	<Resource name="account" auth="Container" type="javax.sql.DataSource" driverClassName="com.mysql.jdbc.Driver" url="jdbc:mysql://localhost:3307/account" username="root" password="x5" maxActive="10" maxIdle="5"/>
</datasource>				

	2. 系统管理员把定制开发功能权限分配给相应的开发者
	定制开发功能包括："/定制开发/定制开发" 和 "/定制开发/发布到服务器"
	实现：创建相应的角色，把角色分配相应的开发者 
	
	3. 开发用户定制权限配置(根据需要配置)
	目标：规定哪个开发用户可以操作哪个目录；
	实现原理：通过语义数据权限来实现，语义数据权限的标识是"ide.path.perm"
	实现：在开发服务的角色管理中，
	第一步："新建数据角色"，
	第二步：为此角色"分配数据权限"，在数据权限的定义中，相关的选项值如下：
功能：*
Process: *
Activity: *
	第三步：在数据权限中"新建业务策略"，相关的选项值如下：
业务标识：ide.path.perm
类型：自定义
值：每一项是应用的目录名，例如OA或HR，可以指定多个值	
	第四步：将此数据角色分配给相应的开发用户或组织
	
二. 简单使用说明
	1. 开发人员登录开发服务器, 使用"定制开发/定制开发"功能开发项目;
	注意：开发过程中，当项目资源修改后，需要重新刷新浏览器后才生效；
	
	2. 功能开发完后, 使用"定制开发/发布到服务器"功能将项目发布到正式服务器上
	主要包括两步:
	第一步：数据库发布: 将项目用到的数据库发布到正式服务器上；
	第二步：资源发布: 将项目的模型资源发布到正式服务器上；	
