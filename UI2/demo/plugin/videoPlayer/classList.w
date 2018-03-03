<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:270px;left:43px;height:auto;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="listData" idColumn="id" onCustomRefresh="listDataCustomRefresh">
      <column label="ID" name="id" type="String" xid="xid1"/>  
      <column label="时间" name="time" type="String" xid="xid2"/>  
      <column label="标题" name="title" type="String" xid="xid3"/>  
      <column label="分类" name="class" type="String" xid="xid4"/>  
      <column label="图片" name="img" type="String" xid="xid5"/>  
      <column label="描述" name="describe" type="String" xid="xid6"/>
    </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="综艺"
        class="x-titlebar" style="background-color:white;"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn" style="color:#5D5D5D;"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" style="color:#5D5D5D;">综艺</div>  
        <div class="x-titlebar-right reverse"></div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1">
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified hw-topBtn"
        tabbed="true" xid="buttonGroup1" style="border-width:0px 0px 0px 0px;">
        <a component="$UI/system/components/justep/button/button" class="btn btn-default topBtn"
          label="全部" xid="button1" target="content"> 
          <i xid="i1"/>  
          <span xid="span1">全部</span>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default topBtn"
          label="最热" xid="button2" target="content3"> 
          <i xid="i2"/>  
          <span xid="span2">最热</span>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default topBtn"
          label="最新" xid="button3" target="content4"> 
          <i xid="i3"/>  
          <span xid="span3">最新</span>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default topBtn"
          label="好评" xid="button4" target="content5"> 
          <i xid="i4"/>  
          <span xid="span4">好评</span>
        </a>
      </div>  
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents1" style="top:50px;"> 
        <div class="x-contents-content" xid="content"/>  
        <div class="x-contents-content" xid="content3">
          <div component="$UI/system/components/justep/button/buttonGroup"
            class="btn-group x-card btn-group-lg btn-group-vertical hw-sideBtn" tabbed="true"
            xid="buttonGroup2" style="width:80px;" >
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="所有" xid="button5" target="content2"> 
              <i xid="i5"/>  
              <span xid="span5">所有</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="偶像" xid="button6" target="content6"> 
              <i xid="i6"/>  
              <span xid="span6">偶像</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="喜剧" xid="button7" style="padding:20% 20% 20% 20%;" target="content7"> 
              <i xid="i7"/>  
              <span xid="span7">喜剧</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="爱情" xid="button8" style="padding:20% 20% 20% 20%;" target="content8"> 
              <i xid="i8"/>  
              <span xid="span8">爱情</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="都市" xid="button9" style="padding:20% 20% 20% 20%;"> 
              <i xid="i9"/>  
              <span xid="span9">都市</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="古装" xid="button10" style="padding:20% 20% 20% 20%;"> 
              <i xid="i10"/>  
              <span xid="span10">古装</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="历史" xid="button11" style="padding:20% 20% 20% 20%;"> 
              <i xid="i11"/>  
              <span xid="span11">历史</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="家庭" xid="button12" style="padding:20% 20% 20% 20%;"> 
              <i xid="i12"/>  
              <span xid="span12">家庭</span>
            </a>
          </div>  
          <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
            active="0" xid="contents2" style="left:80px;height:100%;width:80%;"> 
            <div class="x-contents-content" xid="content2">
              <div component="$UI/system/components/justep/list/list" class="x-list"
                xid="list" data="listData" > 
                <ul class="x-list-template" xid="listTemplateUl1"> 
                  <li xid="li1" class="col-xs-6 hw-noPadding" bind-click="liClick">
                    <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding"
                      xid="row1"> 
                      <div class="x-col" xid="col3" style="position:relative;">
                        <img src="" alt="" xid="image1" bind-attr-src=" val(&quot;img&quot;)"
                          class="hw-image"/>  
                        <span xid="span13" bind-text="val(&quot;time&quot;)" class="hw-time"/>
                      </div>
                    </div>  
                    <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding"
                      xid="row2"> 
                      <div class="x-col" xid="col4">
                        <span xid="span14" bind-text="val(&quot;title&quot;)" style="font-weight:bold;"
                          class="hw-txtTitle"/>
                      </div>
                    </div>  
                    <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding"
                      xid="row3"> 
                      <div class="x-col" xid="col5">
                        <span xid="span15" bind-text=" val(&quot;describe&quot;)" class="hw-describe"
                          style="font-size:xx-small;"/>
                      </div>
                    </div>
                  </li>
                </ul> 
              </div>
            </div>
          <div class="x-contents-content" xid="content6"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="listData" filter=" $row.val(&quot;class&quot;) == '偶像'">
   <ul class="x-list-template" xid="listTemplateUl2">
    <li xid="li2" class="col-xs-6 hw-noPadding" bind-click="liClick">
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row4">
      <div class="x-col" xid="col8" style="position:relative;">
       <img src="" alt="" xid="image2" bind-attr-src=' val("img")' class="hw-image"></img>
       <span xid="span17" bind-text='val("time")' class="hw-time"></span></div> </div> 
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row6">
      <div class="x-col" xid="col6">
       <span xid="span16" bind-text='val("title")' style="font-weight:bold;" class="hw-txtTitle"></span></div> </div> 
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row5">
      <div class="x-col" xid="col7">
       <span xid="span18" bind-text=' val("describe")' class="hw-describe" style="font-size:xx-small;"></span></div> </div> </li> </ul> </div></div>
  <div class="x-contents-content" xid="content7"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list3" data="listData" filter=" $row.val(&quot;class&quot;) == '喜剧'">
   <ul class="x-list-template" xid="listTemplateUl3">
    <li xid="li3" class="col-xs-6 hw-noPadding" bind-click="liClick">
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row9">
      <div class="x-col" xid="col9" style="position:relative;">
       <img src="" alt="" xid="image3" bind-attr-src=' val("img")' class="hw-image"></img>
       <span xid="span20" bind-text='val("time")' class="hw-time"></span></div> </div> 
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row7">
      <div class="x-col" xid="col10">
       <span xid="span21" bind-text='val("title")' style="font-weight:bold;" class="hw-txtTitle"></span></div> </div> 
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row8">
      <div class="x-col" xid="col11">
       <span xid="span19" bind-text=' val("describe")' class="hw-describe" style="font-size:xx-small;"></span></div> </div> </li> </ul> </div></div>
  <div class="x-contents-content" xid="content8"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list4" data="listData" filter=" $row.val(&quot;class&quot;) == '爱情'">
   <ul class="x-list-template" xid="listTemplateUl4">
    <li xid="li4" class="col-xs-6 hw-noPadding" bind-click="liClick">
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row11">
      <div class="x-col" xid="col13" style="position:relative;">
       <img src="" alt="" xid="image4" bind-attr-src=' val("img")' class="hw-image"></img>
       <span xid="span24" bind-text='val("time")' class="hw-time"></span></div> </div> 
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row10">
      <div class="x-col" xid="col14">
       <span xid="span23" bind-text='val("title")' style="font-weight:bold;" class="hw-txtTitle"></span></div> </div> 
     <div component="$UI/system/components/justep/row/row" class="x-row hw-noPadding" xid="row12">
      <div class="x-col" xid="col12">
       <span xid="span22" bind-text=' val("describe")' class="hw-describe" style="font-size:xx-small;"></span></div> </div> </li> </ul> </div></div></div>
        </div>  
        <div class="x-contents-content" xid="content4"/>  
        <div class="x-contents-content" xid="content5"/>
      </div>
    </div> 
  </div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog" src="$UI/demo/plugin/videoPlayer/videoPlay.w"></span></div>
