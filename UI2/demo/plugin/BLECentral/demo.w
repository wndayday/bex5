<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/demo/plugin/template/demo.w" 
  __id="id_1" 
  design="device:m;" 
  class="window" >

  
  <div xid="div2" xui:update-mode="delete"/>
  <div xid="div3" xui:update-mode="delete"/>
  <div xid="div6" xui:update-mode="delete"/>
  <div xid="div7" xui:update-mode="delete"/>
   <div xid="model" onModelConstructDone="modelModelConstructDone" style="height:auto;top:433px;left:349px;"  xui:update-mode="merge"/>
   <div xid="titleBar" title="BLECentral"  xui:update-mode="merge"/>
    <p xid="p1_3" xui:parent="infoContent" xui:update-mode="insert" >
<![CDATA[注意：要使用此插件，手机设备必须是低功耗蓝牙设备，而且需要一个低功耗蓝牙外设才可以与手机进行数据交互。]]>
</p>
   <p xid="p1"  xui:update-mode="merge-and-replace">

ID：cordova-plugin-ble-central</p>   <p xid="introduceP"  xui:update-mode="merge-and-replace">

低功耗蓝牙插件，将手机作为低功耗蓝牙中心设备，提供手机设备与低功耗蓝牙设备进行信息传输的能力。</p>   <p xid="platformP"  xui:update-mode="merge-and-replace">

iOS,Android</p>    <div style="height:20px;" xid="div1_3" xui:parent="demoContent" xui:update-mode="insert" />
    <div style="padding:20px;" xid="div2_3" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p1_1" >
<![CDATA[扫描一段时间自动停止]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="scan" onClick="scanClick" style="width:100%;" xid="scan" >
<i xid="i1_4" />
<span xid="span1_4" >










scan</span>
</a>
</div>
    <div style="padding:20px;" xid="div3_3" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p2_1" >
<![CDATA[开启持续扫描]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="startScan" onClick="startScanClick" style="width:100%;" xid="startScan" >
<i xid="i2_4" />
<span xid="span2_4" >










startScan</span>
</a>
</div>
    <div style="padding:20px;" xid="div4_3" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p3_1" >
<![CDATA[停止扫描]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="stopScan" onClick="stopScanClick" style="width:100%;" xid="stopScan" >
<i xid="i3_4" />
<span xid="span3_4" >










stopScan</span>
</a>
</div>
    <div style="padding:20px;" xid="div5_3" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p4_1" >
<![CDATA[连接外设]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="connect" onClick="connectClick" style="width:100%;" xid="connect" >
<i xid="i4_4" />
<span xid="span4_4" >










connect</span>
</a>
</div>
    <div style="padding:20px;" xid="div6_4" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p5_1" >
<![CDATA[断开连接]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="disconnect" onClick="disconnectClick" style="width:100%;" xid="disconnect" >
<i xid="i5_4" />
<span xid="span5_4" >










disconnect</span>
</a>
</div>
    <div style="padding:20px;" xid="div1_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p6_1" >
<![CDATA[读取特征信息]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="read" onClick="readClick" style="width:100%;" xid="read" >
<i xid="i1_2" />
<span xid="span1_2" >








read</span>
</a>
</div>
    <div style="padding:20px;" xid="div2_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p7_1" >
<![CDATA[往特征信息中写入值]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="write" onClick="writeClick" style="width:100%;" xid="write" >
<i xid="i2_2" />
<span xid="span2_2" >








write</span>
</a>
</div>
    <div style="padding:20px;" xid="div3_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p9_1" >
<![CDATA[往特征信息写入值（不关心是否成功）]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="writeWithoutResponse" onClick="writeWithoutResponseClick" style="width:100%;" xid="writeWithoutResponse" >
<i xid="i3_2" />
<span xid="span3_2" >






writeWithoutResponse</span>
</a>
</div>
    <div style="padding:20px;" xid="div4_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p8_1" >
<![CDATA[开启通知，当特征值发生改变会回调]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="startNotification" onClick="startNotificationClick" style="width:100%;" xid="startNotification" >
<i xid="i4_2" />
<span xid="span4_2" >






startNotification</span>
</a>
</div>
    <div style="padding:20px;" xid="div5_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p11_1" >
<![CDATA[取消通知]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="stopNotification" onClick="stopNotificationClick" style="width:100%;" xid="stopNotification" >
<i xid="i5_2" />
<span xid="span5_2" >






stopNotification</span>
</a>
</div>
    <div style="padding:20px;" xid="div6_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p18_1" >
<![CDATA[判断是否连接]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="isConnected" onClick="isConnectedClick" style="width:100%;" xid="isConnected" >
<i xid="i6_2" />
<span xid="span6_2" >






isConnected</span>
</a>
</div>
    <div style="padding:20px;" xid="div7_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p12_1" >
<![CDATA[判断蓝牙是否可用]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="isEnabled" onClick="isEnabledClick" style="width:100%;" xid="isEnabled" >
<i xid="i7_2" />
<span xid="span7_2" >






isEnabled</span>
</a>
</div>
    <div style="padding:20px;" xid="div10_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p15_1" >
<![CDATA[显示蓝牙设置只支持Android]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="showBluetoothSettings" onClick="showBluetoothSettingsClick" style="width:100%;" xid="showBluetoothSettings" >
<i xid="i10_2" />
<span xid="span10_2" >






showBluetoothSettings</span>
</a>
</div>
    <div style="padding:20px;" xid="div11_1" xui:parent="demoContent" xui:update-mode="insert" >
<p xid="p16_1" >
<![CDATA[启用蓝牙（只支持Android）]]>
</p>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="enable" onClick="enableClick" style="width:100%;" xid="enable" >
<i xid="i11_2" />
<span xid="span11_2" >






enable</span>
</a>
</div>
   <div xid="codeContent" style="padding:10px"  xui:update-mode="merge"/>
    <div style="height:10px;" xid="div6_3" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p2_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[扫描一段时间自动停止，如果第一个参数不传入的话就会默认扫描所有的设备，每扫描到一个设备就会调用成功回调将设备的信息返回。在此demo中，每发现一个可用设备就会记录设备id，但只会保留最后一个被发现设备的id，如果第一个参数传入，则会根据传入数组中的id去扫描设备。]]>
</p>
    <div xid="scanClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p3_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[开启持续扫描，效果同scan，只是会持续扫描，直到调用stopScan 接口]]>
</p>
    <div xid="startScanClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p4_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[停止扫描]]>
</p>
    <div xid="stopScanClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p5_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[连接外设，需要传入设备id，本demo中保存的设备id是最后一个被发现的设备id,所以连接的设备是最后一个被发现的设备]]>
</p>
    <div xid="connectClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p6_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[断开连接]]>
</p>
    <div xid="disconnectClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p7_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[读取特征信息，每个蓝牙有多个可读写的服务，在此只是选择了第一个只读的服务，并且读取其特征信息，需要传入设备的id，要读取的服务的id，以及特征的id，并且返回值为ArrayBuffer类型，在此demo，转换为字符串显示]]>
</p>
    <div xid="readClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p8_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[往特征信息中写入数据，在此只是选取第一个可写服务，并且写入数据，数据的类型同样为ArrayBuffer]]>
</p>
    <div xid="writeClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p9_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[往特征信息中写入数据（不关心是否写入成功）]]>
</p>
    <div xid="writeWithoutResponseClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p10_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[监听特征值的改变]]>
</p>
    <div xid="startNotificationClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p11_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[取消监听特征值]]>
</p>
    <div xid="stopNotificationClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p12_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[判断是否连接]]>
</p>
    <div xid="isConnectedClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p13_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[判断蓝牙是否可用]]>
</p>
    <div xid="isEnabledClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p16_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[显示蓝牙设置（支持Android）]]>
</p>
    <div xid="showBluetoothSettingsClick" xui:parent="codeContent" xui:update-mode="insert" />
    <p xid="p17_3" xui:parent="codeContent" xui:update-mode="insert" >
<![CDATA[启动蓝牙（支持android）]]>
</p>
    <div xid="enableClick" xui:parent="codeContent" xui:update-mode="insert" />

</div>