<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:186px;top:5px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="familyData" idColumn="family"> 
      <column label="民族：" name="family" type="String" xid="xid1"></column>
  <data xid="default2">[{&quot;family&quot;:&quot;汉族&quot;},{&quot;family&quot;:&quot;回族&quot;},{&quot;family&quot;:&quot;彝族&quot;},{&quot;family&quot;:&quot;维吾尔族&quot;},{&quot;family&quot;:&quot;哈尼族&quot;}]</data></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="userData" idColumn="userName"> 
      <column label="用户名：" name="userName" type="String" xid="xid2"></column>
  <column label="密码：" name="password" type="String" xid="xid3"></column>
  <column label="民族：" name="family" type="String" xid="xid4"></column>
  <column label="常住地址：" name="address" type="String" xid="xid5"></column>
  <data xid="default1">[{&quot;userName&quot;:&quot;张三&quot;,&quot;password&quot;:&quot;123&quot;,&quot;family&quot;:&quot;回族&quot;,&quot;address&quot;:&quot;北京&quot;}]</data></div> 
  </div>  
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group"
    title="1、表单的禁用" xid="controlGroup"> 
    <div class="x-control-group-title" xid="controlGroupTitle4" style="background-color:white;"/>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-link"
      label="js" xid="showJs" onClick="showJsSource" style="margin-left:15px;"> 
      <i xid="i7"/>  
      <span xid="span7">js</span> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-link"
      label="源码" xid="sourceBtn" onClick="sourceBtnClick"> 
      <i xid="i6"/>  
      <span xid="span6">源码</span> 
    </a>  
    <a style="position:absolute;z-index:100;margin-left:350px;margin-top:-50px;color:#000000;"
      component="$UI/system/components/justep/button/button" class="btn btn-link"
      label="禁用表单" xid="showBtn" onClick="showBtnClick"> 
      <i xid="i5"/>  
      <span xid="span5">禁用表单</span> 
    </a>  
    <form action="post" method="" xid="form1" class="form" style="margin-left:25px;width:500px"> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="label6" bind-text='$model.userData.label("userName")'></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input4" bind-enable="flag" bind-ref='$model.userData.ref("userName")'></input></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label7" bind-text='$model.userData.label("password")'></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input5" bind-enable="flag" bind-ref='$model.userData.ref("password")'></input></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label8" bind-text='$model.userData.label("family")'></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select1" bind-enable="flag" bind-ref='$model.userData.ref("family")' bind-options="familyData" bind-optionsValue="family" bind-optionsLabel="family"></select></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label9" bind-text='$model.userData.label("address")'></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="textarea1" bind-enable="flag" bind-ref='$model.userData.ref("address")'></textarea></div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2"> 
        <div class="x-col" xid="col3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link pull-right"
            label="提交" xid="subBtn" onClick="subBtnClick" bind-enable="flag"> 
            <i xid="i2"/>  
            <span xid="span2">提交</span> 
          </a> 
        </div>  
        <div class="x-col" xid="col4"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="重置" xid="clearBtn" onClick="clearBtnClick" bind-enable="flag"> 
            <i xid="i3"/>  
            <span xid="span3">重置</span> 
          </a> 
        </div> 
      </div> 
    </form> 
  </div>  
  </div>
