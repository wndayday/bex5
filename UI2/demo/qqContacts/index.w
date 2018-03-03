<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:102px;top:337px;"
    onModelConstructDone="modelModelConstructDone" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="groupData" idColumn="id"> 
      <column name="id" type="String" xid="xid1"/>  
      <column label="分组" name="groupName" type="String" xid="xid2"/>  
      <data xid="default1">[{"id":"1","groupName":"我的设备"},{"id":"2","groupName":"手机通讯录"},{"id":"3","groupName":"我的好友"},{"id":"4","groupName":"同事"}]</data>  
      <column label="人数" name="count" type="Integer" xid="xid10"/>  
      <column label="在线人数" name="lineCount" type="Integer" xid="xid11"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="contactData" idColumn="id"> 
      <column name="id" type="String" xid="xid3"/>  
      <column label="组ID" name="groupID" type="String" xid="xid4"/>  
      <column label="名称" name="name" type="String" xid="xid5"/>  
      <column label="备注" name="note" type="String" xid="xid8"/>  
      <column label="网络" name="network" type="String" xid="xid6"/>  
      <column label="状态" name="state" type="String" xid="xid7"/>  
      <column label="头像" name="img" type="String" xid="xid9"/>  
      <data xid="default2">[{&quot;id&quot;:&quot;1&quot;,&quot;groupID&quot;:&quot;1&quot;,&quot;name&quot;:&quot;我的电脑&quot;,&quot;note&quot;:&quot;无需数据线，手机轻松传文件到电脑&quot;,&quot;network&quot;:&quot;&quot;,&quot;state&quot;:&quot;在线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/1.jpg&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;groupID&quot;:&quot;1&quot;,&quot;name&quot;:&quot;我的打印机&quot;,&quot;note&quot;:&quot;将手机文件或照片发到电脑连接的打印机&quot;,&quot;state&quot;:&quot;离线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/2.jpg&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;groupID&quot;:&quot;1&quot;,&quot;name&quot;:&quot;发现新设备&quot;,&quot;note&quot;:&quot;搜索附近的设备，用QQ轻松连接设备。&quot;,&quot;state&quot;:&quot;离线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/3.jpg&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;groupID&quot;:&quot;2&quot;,&quot;name&quot;:&quot;Ciel&quot;,&quot;network&quot;:&quot;4G&quot;,&quot;state&quot;:&quot;在线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/4.jpg&quot;},{&quot;id&quot;:&quot;5&quot;,&quot;groupID&quot;:&quot;2&quot;,&quot;name&quot;:&quot;曾经拥有&quot;,&quot;note&quot;:&quot;&quot;,&quot;network&quot;:&quot;W&quot;,&quot;state&quot;:&quot;在线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/5.jpg&quot;},{&quot;id&quot;:&quot;6&quot;,&quot;groupID&quot;:&quot;2&quot;,&quot;name&quot;:&quot;华仔&quot;,&quot;note&quot;:&quot;想要改变命运，首先改变自己&quot;,&quot;network&quot;:&quot;W&quot;,&quot;state&quot;:&quot;在线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/6.jpg&quot;},{&quot;id&quot;:&quot;7&quot;,&quot;groupID&quot;:&quot;2&quot;,&quot;name&quot;:&quot;御光剑影&quot;,&quot;network&quot;:&quot;3G&quot;,&quot;state&quot;:&quot;在线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/7.jpg&quot;},{&quot;id&quot;:&quot;8&quot;,&quot;groupID&quot;:&quot;2&quot;,&quot;name&quot;:&quot;寒北&quot;,&quot;network&quot;:&quot;2G&quot;,&quot;state&quot;:&quot;在线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/8.jpg&quot;},{&quot;id&quot;:&quot;9&quot;,&quot;groupID&quot;:&quot;2&quot;,&quot;name&quot;:&quot;被遗忘的角落&quot;,&quot;note&quot;:&quot;新的人生，新的自己，一切从新开始！&quot;,&quot;network&quot;:&quot;&quot;,&quot;state&quot;:&quot;离线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/9.jpg&quot;},{&quot;id&quot;:&quot;10&quot;,&quot;groupID&quot;:&quot;3&quot;,&quot;name&quot;:&quot;泉哥&quot;,&quot;note&quot;:&quot;&quot;,&quot;network&quot;:&quot;3G&quot;,&quot;state&quot;:&quot;在线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/10.jpg&quot;},{&quot;id&quot;:&quot;11&quot;,&quot;groupID&quot;:&quot;3&quot;,&quot;name&quot;:&quot;JACKIE&quot;,&quot;note&quot;:&quot;游戏化思维、社会化学习、专业化生存&quot;,&quot;network&quot;:&quot;&quot;,&quot;state&quot;:&quot;离线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/11.jpg&quot;},{&quot;id&quot;:&quot;12&quot;,&quot;groupID&quot;:&quot;3&quot;,&quot;name&quot;:&quot;哈根达斯&quot;,&quot;note&quot;:&quot;&quot;,&quot;state&quot;:&quot;离线&quot;,&quot;img&quot;:&quot;../../demo/qqContacts/img/12.jpg&quot;}]</data></div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-cards"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1" height="48"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="联系人"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <img src="./img/4.jpg" alt="" xid="image2" class="img-circle o-headImg"/>
        </div>  
        <div class="x-titlebar-title">联系人</div>  
        <div class="x-titlebar-right reverse">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="添加" xid="button2"> 
            <i xid="i3"/>  
            <span xid="span15">添加</span>
          </a>
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel" xid="panel2">
   
   <div class="o-seach"><a component="$UI/system/components/justep/button/button" class="btn x-gray btn-sm btn-block" label="搜索" xid="button1" icon="icon-ios7-search-strong">
   <i xid="i1" class="icon-ios7-search-strong text-muted"></i>
   <span xid="span6" class="text-muted">搜索</span></a></div><div component="$UI/system/components/justep/row/row" class="x-row text-center o-types" xid="row2"> 
        <div class="x-col" xid="col4">
          <img src="./img/icon1.png" alt="" xid="image3" class="o-headImg" />  
          <p xid="p1" bind-text="'新朋友'" />
        </div>  
        <div class="x-col" xid="col5">
          <img src="./img/icon2.png" alt="" xid="image4" class="o-headImg" />  
          <p xid="p2" bind-text="'特别关心'" />
        </div>  
        <div class="x-col" xid="col6">
          <img src="./img/icon3.png" alt="" xid="image5" class="o-headImg" />  
          <p xid="p3" bind-text="'群组'" />
        </div>  
        <div class="x-col" xid="col7">
          <img src="./img/icon4.png" alt="" xid="image6" class="o-headImg" />  
          <p xid="p4" bind-text="'公众号'" />
        </div>
      </div></div>
      <ul component="$UI/system/components/justep/list/list" class="x-list x-list-template"
        xid="groupList" dataItemAlias="groupRow" data="groupData"> 
        <li xid="li1"> 
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group o-group" title="title" xid="controlGroup1" collapsible="true"
            collapsed="true"> 
            <div class="x-control-group-title o-groupTitle" xid="controlGroupTitle1"> 
              <div xid="div1" class="pull-right text-muted o-count">
                <span xid="span8" bind-text="ref(&quot;lineCount&quot;)"/>
                <span xid="span9"><![CDATA[/]]></span>  
                <span xid="span10" bind-text="ref(&quot;count&quot;)"/> 
              </div>
              <i class="icon-arrow-right-b"/>  
              <span xid="span5" bind-text="ref(&quot;groupName&quot;)">title</span>
            </div>  
            <div component="$UI/system/components/justep/list/list" class="x-list o-contactList"
              xid="contactList" data="contactData" filter="$row.val('groupID')==groupRow.val('id')"> 
              <ul class="x-list-template" xid="listTemplateUl1"> 
                <li xid="li3">
                  <div class="media" xid="media1"> 
                    <div class="media-left" xid="mediaLeft1"> 
                      <a href="#" xid="a1"> 
                        <img class="media-object img-circle o-headImg" alt="" xid="image1" bind-css="{'o-offline':val('state')=='离线'}" dir="rtl" bind-attr-src=' val("img")'/>
                      </a> 
                    </div>  
                    <div class="media-body" xid="mediaBody1"> 
                      <div xid="div2" class="pull-right text-muted">
                        <span xid="span13" bind-text="ref(&quot;network&quot;)" bind-visible="val(&quot;network&quot;)!='W'"/>  
                        <i xid="i2" class="icon-wifi" bind-visible="val(&quot;network&quot;)=='W'"/>
                      </div>
                      <h4 class="media-heading" xid="h41" bind-text="ref(&quot;name&quot;)">Media heading</h4>  
                      <span xid="span2" class="text-muted">[</span>  
                      <span xid="span3" bind-text="ref(&quot;state&quot;)" class="text-muted"/>  
                      <span xid="span4" class="text-muted">]</span>  
                      <span xid="span1" class="text-muted o-note" bind-text="ref(&quot;note&quot;)"/>
                    </div> 
                  </div>
                </li>
              </ul> 
            </div> 
          </div> 
        </li> 
      </ul> 
    </div> 
  </div> 
</div>
