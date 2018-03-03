<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xu="http://www.xmldb.org/xupdate"
  xmlns:xui="http://www.justep.com/xui" __id="id_1" component="$UI/system/components/justep/window/window" extends="$UI/portal/base/base.w"
  sysParam="false" xid="window" class="window"> 
<div class="wrapper page-root" style="display:none;" 
  	xui:parent="window" xui:update-mode="insert">

  <header class="main-header">
    <!-- Logo -->
    <a class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>B</b>eX5</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">Justep <b> BeX5</b></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- 系统时间 -->
          <li class="dropdown">
            <a class="dropdown-toggle" title="系统时间">
              <i class="fa fa-clock-o x-datetime-icon"></i>
              <span class="hidden-xs x-portal-datetime"></span>
            </a>
          </li>
          <!-- Tasks: style can be found in dropdown.less -->
          <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle x-portal-task-wait" title="待办任务">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger" bind-text="waitTaskCount">0</span>
            </a>
          </li>
          
          <!-- 增加代理  -->
          <li class="dropdown x-portal-agent"> 
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                data-x5-hover="dropdown" data-close-others="true"> 
                <i class="icon-ios7-browsers"/>  
                <span class="username username-hide-on-mobile">代理</span>  
                <span class="caret"></span> 
              </a>  
              <ul class="dropdown-menu dropdown-menu-default"/> 
          </li>  
          
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img class="user-image x-person-avatar"/>
              <span class="hidden-xs x-portal-username"></span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img class="img-circle x-person-avatar"/>

                <p class="x-person-info">
                </p>
              </li>
              <!-- Menu Body -->
              <!-- 可以增加其他的功能菜单
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
              </li>
              -->
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a class="btn btn-default btn-flat x-portal-setPassWord">修改密码</a>
                </div>
                <div class="pull-right">
                  <a class="btn btn-default btn-flat x-portal-logout">注销</a>
                </div>
              </li>
            </ul>
          </li>
		  <li class="dropdown dropdown-user"> 
              <a id="portal-reload" class="dropdown-toggle x-portal-reload" style="display:none;"> 
                <i class="icon-refresh"/>  
                <span class="username username-hide-on-mobile">刷新</span> 
              </a> 
          </li> 
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar" title="设置"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img class="img-circle x-person-avatar"/>
        </div>
        <div class="pull-left info">
          <p class="x-portal-username">
          </p>
	      <a><i class="fa fa-circle text-success"></i><span class="x-login-datetime"></span></a>
        </div>
      </div>
      <!-- search form -->
      <!-- 
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search..."/>
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      -->
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
            <li class="active"> 
              <a class="x-portal-showMain"> 
                <i class="x-functree-icon icon-home"/>  
                <span class="title">主页</span>  
              </a> 
            </li> 
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>首页</h1>
      <!--增加关闭按钮 -->
      <ol class="breadcrumb">
        <li>            
        	<a component="$UI/system/components/justep/button/button" xid="closeFuncBtn" class="x-closeFuncBtn"
              onClick="closeFuncBtnClick"> 
              <i class="icon-close-round"/> 
            </a>
		</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
		<div active="0" class="x-contents x-portal-pages" component="$UI/system/components/justep/contents/contents" xid="contents"/> 
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright 2016 <a href="http://wex5.com" target="_blank">©Justep</a>.</strong> All rights
    reserved.
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Create the tabs -->
    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
      <li class="active"><a href="#control-sidebar-func-tab" data-toggle="tab"><i class="x-tabs-icon fa fa-clone"></i>已开功能</a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <!-- Home tab content -->
      <div class="tab-pane functionOpened active" id="control-sidebar-func-tab">
        <h3 class="control-sidebar-heading">已打开<span class="functionOpenedCount">0</span>个功能<a href="#" class="closeAll">全部关闭</a></h3>
        <ul class="control-sidebar-menu functionOpenedList">
        </ul>
        <!-- /.control-sidebar-menu -->
      </div>
    </div>
  </aside>
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

</div>