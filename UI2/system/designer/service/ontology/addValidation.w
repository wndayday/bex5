<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:-5px;left:376px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="asserttrueData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid2"/>  
      <column label="提示" name="message" type="String" xid="xid1"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="assertfalseData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="column2"/>  
      <column label="提示" name="message" type="String" xid="column1"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="digitsData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid3"/>  
      <column label="整数位数" name="integer" type="Integer" xid="xid4"/>  
      <column label="小数位数" name="fraction" type="Float" xid="xid5"/>  
      <column label="提示" name="message" type="String" xid="xid6"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="sizeData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid7"/>  
      <column label="最小长度" name="min" type="Integer" xid="xid8"/>  
      <column label="最大长度" name="max" type="Integer" xid="xid9"/>  
      <column label="提示" name="message" type="String" xid="xid10"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="maxData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid11"/>  
      <column label="最大值" name="value" type="Integer" xid="xid12"/>  
      <column label="提示" name="message" type="String" xid="xid13"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="minData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="column5"/>  
      <column label="最小值" name="value" type="Integer" xid="column3"/>  
      <column label="提示" name="message" type="String" xid="column4"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="urlData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid14"/>  
      <column label="协议" name="protocol" type="String" xid="xid15"/>  
      <column label="域名" name="host" type="String" xid="xid16"/>  
      <column label="端口" name="port" type="String" xid="xid17"/>  
      <column label="正则" name="regexp" type="String" xid="xid18"/>  
      <column label="提示" name="message" type="String" xid="xid19"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="emailData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid20"/>  
      <column label="校验表达式" name="regexp" type="String" xid="xid21"/>  
      <column label="提示" name="message" type="String" xid="xid22"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="patternData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid23"/>  
      <column label="校验表达式" name="regexp" type="String" xid="xid24"/>  
      <column label="提示" name="message" type="String" xid="xid25"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="notnullData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid26"/>  
      <column label="提示" name="message" type="String" xid="xid27"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="notemptyData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid28"/>  
      <column label="提示" name="message" type="String" xid="xid29"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="notblankData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid30"/>  
      <column label="提示" name="message" type="String" xid="xid31"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="safehtmlData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid32"></column>
  <column label="白名单" name="whitelistType" type="String" xid="xid33"></column>
  <column label="标签" name="additionalTags" type="String" xid="xid34"></column>
  <column label="标签和属性" name="additionalTagsWithAttributes" type="String" xid="xid35"></column>
  <column label="提示" name="message" type="String" xid="xid36"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="pastData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid37"/>  
      <column label="提示" name="message" type="String" xid="xid38"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="futureData" idColumn="name"> 
      <column label="规则名称" name="name" type="String" xid="xid39"/>  
      <column label="提示" name="message" type="String" xid="xid40"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30"
        xid="labelEdit1"> 
        <label class="x-label" xid="label1"><![CDATA[实体字段名称：]]></label>  
        <div component="$UI/system/components/justep/output/output" class=" x-output form-control  "
          xid="output2" bind-ref="fieldName"/> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1"> 
        <div class="x-col" xid="col1"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list1" data="asserttrueData"> 
            <thead xid="thead3"> 
              <tr xid="tr5" > 
                <th xid="default1"> 
                  <div component="$UI/system/components/justep/row/row" class="x-row"
                    xid="row16"> 
                    <div class="x-col x-col-20 x-col-center" xid="col26">
                      <span xid="span3"><![CDATA[true 值校验]]></span>
                    </div>  
                    <div class="x-col x-col-fixed" xid="col27">
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link btn-only-icon" label="button" xid="addBtn"
                        icon="linear linear-bus" onClick="addBtnClick" bind-disable=" $model.asserttrueData.count()==1"> 
                        <i xid="i3" class="linear linear-bus"/>  
                        <span xid="span4"/>
                      </a>  
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-link btn-icon-right btn-only-icon" label="button"
                        xid="deleteBtn" icon="linear linear-fileadd" onClick="deleteBtnClick"
                        bind-disable=" $model.asserttrueData.count()==0"> 
                        <i xid="i4" class="linear linear-fileadd"/>  
                        <span xid="span5"/>
                      </a>
                    </div> 
                  </div> 
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate3"> 
              <tr xid="tr6"> 
                <td xid="td17"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit2"> 
                    <label class="x-label" xid="label2" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input18" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2"> 
        <div class="x-col" xid="col12"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list2" data="assertfalseData"> 
            <thead xid="thead4"> 
              <tr xid="tr7"> 
                <th xid="default1">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">false 值校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addFalse"
                      icon="linear linear-bus" onClick="addFalseClick" bind-disable="$model.assertfalseData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delFalse" icon="linear linear-fileadd" onClick="delFalseClick"
                      bind-disable="$model.assertfalseData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th>  
                
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate4"> 
              <tr xid="tr8"> 
                <td xid="td39"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit4"> 
                    <label class="x-label" xid="label4" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input20" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3"> 
        <div class="x-col" xid="col13"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list3" data="digitsData"> 
            <thead xid="thead5"> 
              <tr xid="tr9"> 
                <th xid="default5">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">数字 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addNum"
                      icon="linear linear-bus" onClick="addNumClick" bind-disable="$model.digitsData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delNum" icon="linear linear-fileadd" onClick="delNumClick"
                      bind-disable=" $model.asserttrueData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate5"> 
              <tr xid="tr10"> 
                <td xid="td40"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit5"> 
                    <label class="x-label" xid="label5" bind-text="label(&quot;integer&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input21" bind-ref="ref(&quot;integer&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td41"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit6"> 
                    <label class="x-label" xid="label6" bind-text="label(&quot;fraction&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input22" bind-ref="ref(&quot;fraction&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td42"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit7"> 
                    <label class="x-label" xid="label7" bind-text="$model.asserttrueData.label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input23" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4"> 
        <div class="x-col" xid="col14"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list4" data="sizeData"> 
            <thead xid="thead6"> 
              <tr xid="tr12" > 
                <th xid="default11" colspan="3">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">集合 类大小 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addSize"
                      icon="linear linear-bus" onClick="addSizeClick" bind-disable="$model.sizeData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delSize" icon="linear linear-fileadd" onClick="delSizeClick"
                      bind-disable="$model.sizeData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate6"> 
              <tr xid="tr11"> 
                <td xid="td43"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit8"> 
                    <label class="x-label" xid="label8" bind-text="label(&quot;min&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input24" bind-ref="ref(&quot;min&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td44"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit9"> 
                    <label class="x-label" xid="label9" bind-text="label(&quot;max&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input25" bind-ref="ref(&quot;max&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td45"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit10"> 
                    <label class="x-label" xid="label10" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input26" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5"> 
        <div class="x-col" xid="col15"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list5" data="maxData"> 
            <thead xid="thead7"> 
              <tr xid="tr14"> 
                <th xid="default14">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">校验最大值</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addMax"
                      icon="linear linear-bus" onClick="addMaxClick" bind-disable="$model.maxData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delMax" icon="linear linear-fileadd" onClick="delMaxClick"
                      bind-disable="$model.maxData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate7"> 
              <tr xid="tr13"> 
                <td xid="td46"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit11"> 
                    <label class="x-label" xid="label11" bind-text="label(&quot;value&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input27" bind-ref="ref(&quot;value&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td47"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit12"> 
                    <label class="x-label" xid="label12" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input28" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6"> 
        <div class="x-col" xid="col16"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list6" data="minData"> 
            <thead xid="thead8"> 
              <tr xid="tr16"> 
                <th xid="default19">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">校验最小值</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addMin"
                      icon="linear linear-bus" onClick="addMinClick" bind-disable="$model.minData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delMin" icon="linear linear-fileadd" onClick="delMinClick"
                      bind-disable="$model.minData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate8"> 
              <tr xid="tr15"> 
                <td xid="td48"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit13"> 
                    <label class="x-label" xid="label13" bind-text="label(&quot;value&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input29" bind-ref="ref(&quot;value&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td49"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit14"> 
                    <label class="x-label" xid="label14" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input30" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row7"> 
        <div class="x-col" xid="col17"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list7" data="urlData"> 
            <thead xid="thead9"> 
              <tr xid="tr18" > 
                <th xid="default21" colspan="5">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6"> URL 地址校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addUrl"
                      icon="linear linear-bus" bind-disable="$model.urlData.count()==1" onClick="addUrlClick"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delUrl" icon="linear linear-fileadd" bind-disable="$model.urlData.count()==0" onClick="delUrlClick"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate9"> 
              <tr xid="tr17"> 
                <td xid="td50"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit15"> 
                    <label class="x-label" xid="label15" bind-text="label(&quot;protocol&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input31" bind-ref="ref(&quot;protocol&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td51"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit16"> 
                    <label class="x-label" xid="label16" bind-text="label(&quot;host&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input32" bind-ref="ref(&quot;host&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td52"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit17"> 
                    <label class="x-label" xid="label17" bind-text="label(&quot;port&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input33" bind-ref="ref(&quot;port&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td53"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit18"> 
                    <label class="x-label" xid="label18" bind-text="label(&quot;regexp&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input34" bind-ref="ref(&quot;regexp&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td54"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit19"> 
                    <label class="x-label" xid="label19" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input35" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row8"> 
        <div class="x-col" xid="col18"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list8" data="emailData"> 
            <thead xid="thead10"> 
              <tr xid="tr20" > 
                <th xid="default24" colspan="2">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">EMAIL 地址 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addEmail"
                      icon="linear linear-bus" onClick="addEmailClick" bind-disable="$model.emailData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delEmail" icon="linear linear-fileadd" onClick="delEmailClick"
                      bind-disable="$model.emailData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate10"> 
              <tr xid="tr19"> 
                <td xid="td57"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit21"> 
                    <label class="x-label" xid="label21" bind-text="label(&quot;regexp&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input36" bind-ref="ref(&quot;regexp&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td55"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit20"> 
                    <label class="x-label" xid="label22" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input37" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row9"> 
        <div class="x-col" xid="col19"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list9" data="patternData"> 
            <thead xid="thead11"> 
              <tr xid="tr21"> 
                <th xid="default25">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">正则表达式 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addRegexp"
                      icon="linear linear-bus" onClick="addRegexpClick" bind-disable="$model.patternData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delRegexp" icon="linear linear-fileadd" onClick="delRegexpClick"
                      bind-disable="$model.patternData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate11"> 
              <tr xid="tr22"> 
                <td xid="td58"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit24"> 
                    <label class="x-label" xid="label23" bind-text="label(&quot;regexp&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input39" bind-ref="ref(&quot;regexp&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td59"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit23"> 
                    <label class="x-label" xid="label24" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input40" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row10"> 
        <div class="x-col" xid="col20"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list10" data="notnullData"> 
            <thead xid="thead12"> 
              <tr xid="tr23"> 
                <th xid="default26">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">NOLL值 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addNoll"
                      icon="linear linear-bus" onClick="addNollClick" bind-disable="$model.notnullData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delNoll" icon="linear linear-fileadd" onClick="delNollClick"
                      bind-disable="$model.notnullData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate12"> 
              <tr xid="tr24"> 
                <td xid="td60"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit25"> 
                    <label class="x-label" xid="label25" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input41" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row11"> 
        <div class="x-col" xid="col21"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list11" data="notemptyData"> 
            <thead xid="thead13"> 
              <tr xid="tr25"> 
                <th xid="default27">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">空值 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addEmpty"
                      icon="linear linear-bus" onClick="addEmptyClick" bind-disable="$model.notemptyData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delEmpty" icon="linear linear-fileadd" onClick="delEmptyClick"
                      bind-disable="$model.notemptyData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate13"> 
              <tr xid="tr26"> 
                <td xid="td61"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit26"> 
                    <label class="x-label" xid="label26" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input42" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row12"> 
        <div class="x-col" xid="col22"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list12" data="notblankData"> 
            <thead xid="thead14"> 
              <tr xid="tr27"> 
                <th xid="default28">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">空白 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addBlank"
                      icon="linear linear-bus" onClick="addBlankClick" bind-disable="$model.notblankData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delBlank" icon="linear linear-fileadd" onClick="delBlankClick"
                      bind-disable="$model.notblankData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate14"> 
              <tr xid="tr28"> 
                <td xid="td62"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit27"> 
                    <label class="x-label" xid="label27" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input43" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row13" style="display:none;"> 
        <div class="x-col" xid="col23"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list13" data="safehtmlData"> 
            <thead xid="thead15"> 
              <tr xid="tr30"> 
                <th xid="default29" colspan="4">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">安全HTML 文本 校验</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addSafeHtml"
                      icon="linear linear-bus" onClick="addSafeHtmlClick" bind-disable="$model.safehtmlData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delSafeHtml" icon="linear linear-fileadd" onClick="delSafeHtmlClick"
                      bind-disable="$model.safehtmlData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate15"> 
              <tr xid="tr29"> 
                <td xid="td67"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit28"> 
                    <label class="x-label" xid="label31" bind-text="label(&quot;whitelistType&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input45" bind-ref="ref(&quot;whitelistType&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td65"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit29"> 
                    <label class="x-label" xid="label30" bind-text="label(&quot;additionalTags&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input46" bind-ref="ref(&quot;additionalTags&quot;)"/> 
                  </div> 
                </td>  
                <td xid="td66"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit31"> 
                    <label class="x-label" xid="label29" bind-text='label("additionalTagsWithAttributes")'/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input47" bind-ref='ref("additionalTagsWithAttributes")'/> 
                  </div> 
                </td>  
                <td xid="td63"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit32"> 
                    <label class="x-label" xid="label28" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input48" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row14" style="display:none;"> 
        <div class="x-col" xid="col24"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list14" data="pastData"> 
            <thead xid="thead16"> 
              <tr xid="tr32"> 
                <th xid="default30">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6">校验 过去</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addPast"
                      icon="linear linear-bus" onClick="addPastClick" bind-disable="$model.pastData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delPast" icon="linear linear-fileadd" onClick="delPastClick"
                      bind-disable="$model.pastData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate16"> 
              <tr xid="tr31"> 
                <td xid="td68"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit33"> 
                    <label class="x-label" xid="label33" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input49" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row15" style="display:none;"> 
        <div class="x-col" xid="col25"> 
          <table component="$UI/system/components/justep/list/list" class="x-list table  table-hover table-striped"
            xid="list15" data="futureData"> 
            <thead xid="thead17"> 
              <tr xid="tr34"> 
                <th xid="default31">
                	<div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row17"> 
                  <div class="x-col x-col-20 x-col-center" xid="col30"> 
                    <span xid="span6"> 校验 未来</span>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col29"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="addFuture"
                      icon="linear linear-bus" onClick="addFutureClick" bind-disable="$model.futureData.count()==1"> 
                      <i xid="i5" class="linear linear-bus"/>  
                      <span xid="span7"/>
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-icon-right btn-only-icon" label="button"
                      xid="delFuture" icon="linear linear-fileadd" onClick="delFutureClick"
                      bind-disable="$model.futureData.count()==0"> 
                      <i xid="i6" class="linear linear-fileadd"/>  
                      <span xid="span8"/>
                    </a> 
                  </div> 
                </div>
                </th> 
              </tr> 
            </thead>  
            <tbody class="x-list-template x-min-height" xid="listTemplate17"> 
              <tr xid="tr33"> 
                <td xid="td69"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label30" xid="labelEdit34"> 
                    <label class="x-label" xid="label34" bind-text="label(&quot;message&quot;)"/>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input50" bind-ref="ref(&quot;message&quot;)"/> 
                  </div> 
                </td> 
              </tr> 
            </tbody> 
          </table> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link pull-right"
        label="取消" style="margin-right:12%" xid="NOBtn" onClick="NOBtnClick"> 
        <i xid="i1"/>  
        <span xid="span1">取消</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default pull-right"
        label="确定" style="margin-right:20px;" xid="OkBtn" onClick="OkBtnClick"> 
        <i xid="i2"/>  
        <span xid="span2">确定</span> 
      </a> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver1" onReceive="windowReceiver1Receive" style="top:226px;left:90px;"/> 
</div>
