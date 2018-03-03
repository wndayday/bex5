<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate" xid="window" component="$UI/system/components/justep/window/window" extends="../base/base.w"
  __id="id_1" design="device:pc" sysParam="false" class="page-header-fixed page-quick-sidebar-over-content page-footer-fixed window body page-sidebar-fixed page-sidebar-closed-hide-logo">  
  <div class="page-root" style="display: none;" xui:parent="window" xui:update-mode="insert"> 
    <div class="page-header navbar navbar-fixed-top" style="height:60px;"> 
      <div class="page-header-inner"> 
        <div class="page-logo"> 
          <a> 
            <img alt="logo" class="logo-default" src="../base/img/logo.png"/> 
          </a> 
        </div>  
        <div class="top-menu"> 
          <ul class="nav navbar-nav pull-right"> 
            <li class="dropdown dropdown-user" id="portal-opened" style="display:none;"> 
              <a class="dropdown-toggle" data-close-others="true" data-toggle="dropdown"
                data-x5-hover="dropdown" href="#"> 
                <i class="icon-ios7-browsers"/>  
                <span class="username username-hide-on-mobile">已打开功能</span>  
                <i class="fa fa-angle-down"/>  
                <i class="glyphicon glyphicon-menu-down"/> 
              </a>  
              <ul class="dropdown-menu dropdown-menu-default"> 
                <li class="external"> 
                  <h3> 
                    <span class="bold">12</span> 个打开的功能
                  </h3>  
                  <a class="closeAll" href="#">全部关闭</a> 
                </li>  
                <li> 
                  <ul class="dropdown-menu-content scroller" data-height="160px"/> 
                </li> 
              </ul> 
            </li>  
            <li class="dropdown dropdown-user" style="display:none;"> 
              <a class="dropdown-toggle x-portal-reload" id="portal-reload"> 
                <i class="icon-refresh"/>  
                <span class="username username-hide-on-mobile">刷新</span> 
              </a> 
            </li>  
            <li class="dropdown dropdown-user" style="display:none;"> 
              <a class="dropdown-toggle x-portal-changeOrg" data-close-others="true"
                data-toggle="dropdown" data-x5-hover="dropdown" href="#"> 
                <i class="icon-user"/>  
                <span class="username username-hide-on-mobile x-portal-tenantname"
                  id="tenantname"/>  
                <i class="glyphicon glyphicon-menu-down"/> 
              </a>  
            </li>  
            <li class="dropdown dropdown-user x-user" style="display:none;"> 
              <a class="dropdown-toggle" data-close-others="true" data-toggle="dropdown"
                data-x5-hover="dropdown" href="#"> 
                <i class="linear linear-chevronrightcircle"/>  
                <span class="username username-hide-on-mobile x-portal-username"
                  id="username"/>  
                <i class="glyphicon glyphicon-menu-down"/> 
              </a>  
              <ul class="dropdown-menu dropdown-menu-default"> 
                <!-- 
                <li> 
                  <a class="x-portal-userinfo" component="$UI/system/components/justep/button/button"
                    label="个人信息"> 
                    <i class="icon-settings"/>  
                    <span>个人信息</span> 
                  </a> 
                </li>  
                -->
                <li class="divider"/>  
                <li> 
                  <a class="x-portal-changePassWd" component="$UI/system/components/justep/button/button"
                    label="修改密码"> 
                    <i class="icon-settings"/>  
                    <span>修改密码</span> 
                  </a> 
                </li>  
                <li class="divider"/>  
                <li> 
                  <a class="x-portal-logout" component="$UI/system/components/justep/button/button"
                    icon="icon-power" label="注销" xid="logoutBtn"> 
                    <i class="icon-power" xid="i1"/>  
                    <span xid="span1">注销</span> 
                  </a> 
                </li> 
              </ul> 
            </li> 
          </ul> 
        </div> 
      </div> 
    </div>  
    <div class="clearfix"/>  
    <div class="page-container"> 
      <div class="page-sidebar-wrapper"> 
        <div class="page-sidebar navbar-collapse collapse"> 
          <ul class="page-sidebar-menu" data-auto-scroll="true" data-keep-expanded="false"
            data-slide-speed="200"> 
            <li class="sidebar-search-wrapper" style="display:none;"> 
              <form action="extra_search.html" class="sidebar-search sidebar-search-bordered sidebar-search-solid"
                method="POST"> 
                <a class="remove" href="javascript:;"> 
                  <i class="icon-close"/> 
                </a>  
                <div class="input-group"> 
                  <input class="form-control" placeholder="Search..." type="text"/>  
                  <span class="input-group-btn"> 
                    <a class="btn submit" href="javascript:;"> 
                      <i class="icon-magnifier"/> 
                    </a> 
                  </span> 
                </div> 
              </form> 
            </li>  
            <li class="start active open"> 
              <a class="ajaxify" isMain="true"> 
                <i class="icon-home"/>  
                <span class="title">主页</span> 
              </a> 
            </li> 
          </ul> 
        </div> 
      </div>  
      <div class="page-content-wrapper"> 
        <div class="page-content"> 
          <div class="page-content-close"> 
            <a component="$UI/system/components/justep/button/button" onClick="closeFuncBtnClick"
              xid="closeFuncBtn"> 
              <i class="icon-close-round"/> 
            </a> 
          </div>  
          <h3 class="page-title">caidan</h3>  
          <div active="0" class="x-contents x-portal-pages" component="$UI/system/components/justep/contents/contents"
            routable="true" swipe="false" wrap="false" xid="pages"/> 
        </div> 
      </div>  
      <div class="page-quick-sidebar-wrapper"> 
        <div class="page-quick-sidebar"> 
          <div class="nav-justified"/> 
        </div> 
      </div> 
    </div> 
  </div>  
  <div style="background-color:red;" xui:parent="window" xui:update-mode="insert"/>  
  <resource xid="resource2_4" xui:parent="window" xui:update-mode="insert"> 
    <require url="css!$UI/system/admin/base/css/default"
      xid="require1_4"/> 
  </resource> 
</div>
