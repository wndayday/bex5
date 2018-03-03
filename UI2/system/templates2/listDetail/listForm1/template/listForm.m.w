<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:26px;height:auto;left:378px;">{{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="mainData"
      directDelete="true" autoLoad="true" concept="{{data_concept}}" orderBy="{{data_orderBy}}"
      columns="{{data_relations}}" onSaveCommit="saveCommit"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <calculateRelation relation="calcCheckBox"/> 
    </div>{{/each}}
    <div component="$UI/system/components/justep/data/data" xid="controlData"
      idColumn="edit" autoLoad="true"> 
      <column name="edit" type="Integer"/>  
      <data><![CDATA[
      [{edit:0}]
      ]]></data> 
    </div> 
    <div component="$UI/system/components/justep/dataOperation/dataOperation"
      xid="dataOperation"/> 
  </div>  
  <div> 
    <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
      active="0" slidable="true" xid="contents"> 
      <div class="x-contents-content active" xid="list"> 
        <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
          <div class="x-panel-top"> 
            <div component="$UI/system/components/justep/titleBar/titleBar"
              class="x-titlebar"> 
              <div class="x-titlebar-left"> 
                <a component="$UI/system/components/justep/button/button"
                  label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
                  onClick="{operation:'window.close'}" xid="backBtn"> 
                  <i class="icon-chevron-left"/>  
                  <span/> 
                </a> 
              </div>  
              <div class="x-titlebar-title">{{list_title}}</div>  
              <div class="x-titlebar-right reverse"> 
                <a component="$UI/system/components/justep/button/button"
                  label="" class="btn btn-link btn-only-icon" icon="icon-plus" onClick='[{"operation":"mainData.new"},{"operation":"contents.to","args":{"xid":"detail"}}]'
                  xid="addBtn"> 
                  <i class="icon-plus"/>  
                  <span/> 
                </a>  
                <a component="$UI/system/components/justep/button/button"
                  label="" class="btn btn-link btn-only-icon blackBtn" icon="icon-edit" onClick='[{"operation":"dataOperation.allSetValue","args":{"data":"mainData","col":"calcCheckBox","value":"0"}},{"operation":"dataOperation.setValue","args":{"data":"controlData","col":"edit","value":"js:$model.controlData.val(\"edit\") == 1?0:1"}}]'
                  xid="editBtn"> 
                  <i class="icon-edit"/>  
                  <span/> 
                </a> 
              </div> 
            </div> 
          </div>  
          <div class="x-panel-content" refresh="true" load="true"> 
             
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   <div class="x-content-center x-pull-down container" xid="div1">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i1"></i>
    <span class="x-pull-down-label" xid="span1">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div2"><div xid="mainList" class="x-list  x-scroll-view" component="$UI/system/components/justep/list/list" data="{{list_data}}" limit="6"> 
              <div class="x-list-head" />  
              <ul class="x-list-template"> 
                <li> 
                  <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"> 
                    <div class="x-col" style="text-align: left;" bind-visible="$model.controlData.val('edit')==1"> 
                      <span component="$UI/system/components/justep/button/checkbox" bind-ref="ref('calcCheckBox')" class="x-checkbox" checkedValue="1" uncheckedValue="0" /> 
                    </div>  
                    <div component="$UI/system/components/justep/row/row" class="x-col x-col-90" bind-click="showDetailClick">{{#each list}} 
                      <div class="x-row" component="$UI/system/components/justep/row/row"> 
                        <div class="x-col"> 
                          <span class="font-bold x-output" component="$UI/system/components/justep/output/output" data="{{list_data}}" bind-ref="ref('{{list_field1}}')" /> 
                        </div> {{#if list_field2}}
                        <div class="x-col" style="text-align:right;color:gray"> 
                          <span class="x-output" component="$UI/system/components/justep/output/output" data="{{list_data}}" bind-ref="ref('{{list_field2}}')" /> 
                        </div>{{/if}}
                      </div>{{/each}}
                    </div>  
                    <div class="x-col" bind-click="showDetailClick" style="text-align: right"> 
                      <a component="$UI/system/components/justep/button/button" label="" class="btn btn-only-icon" icon="icon-chevron-right font-gray" xid="editBtn"> 
                        <i class="icon-chevron-right font-gray" />  
                        <span /> 
                      </a> 
                    </div> 
                  </div> 
                </li> 
              </ul> 
            </div></div>
   <div class="x-content-center x-pull-up" xid="div3">
    <span class="x-pull-up-label" xid="span2">加载更多...</span></div> </div></div>  
          <div class="x-panel-bottom" bind-visible="$model.controlData.val('edit')==1"> 
            <div class="btn-group-lg btn-group-justified" component="$UI/system/components/justep/button/buttonGroup"> 
              <a component="$UI/system/components/justep/button/button" label="删除"
                class="btn btn-default x-dialog-button" xid="delBtn" onClick="[{&quot;operation&quot;:&quot;dataOperation.deleteData&quot;,&quot;args&quot;:{&quot;data&quot;:&quot;mainData&quot;,&quot;filter&quot;:&quot;val('calcCheckBox')==1&quot;}},{&quot;operation&quot;:&quot;dataOperation.setValue&quot;,&quot;args&quot;:{&quot;data&quot;:&quot;controlData&quot;,&quot;col&quot;:&quot;edit&quot;,&quot;value&quot;:&quot;0&quot;}}]"> 
                <i/>  
                <span>删除</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" label="取消"
                class="btn btn-default x-dialog-button" onClick='[{"operation":"dataOperation.allSetValue","args":{"data":"mainData","col":"calcCheckBox","value":"0"}},{"operation":"dataOperation.setValue","args":{"data":"controlData","col":"edit","value":"0"}}]' xid="cancelBtn"> 
                <i/>  
                <span>取消</span> 
              </a> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="x-contents-content" xid="detail"> 
        <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
          <div class="x-panel-top"> 
            <div component="$UI/system/components/justep/titleBar/titleBar"
              class="x-titlebar"> 
              <div class="x-titlebar-left"> 
                <a component="$UI/system/components/justep/button/button"
                  label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
                  onClick='{"operation":"contents.to","args":{"xid":"list"}}' xid="listBtn"> 
                  <i class="icon-chevron-left"/>  
                  <span/> 
                </a> 
              </div>  
              <div class="x-titlebar-title">{{form_title}}</div>  
              <div class="x-titlebar-right reverse"> 
                <a component="$UI/system/components/justep/button/button"
                  label="" class="btn btn-link btn-only-icon" icon="icon-plus" onClick='{"operation":"mainData.new"}'
                  xid="addBtn"> 
                  <i class="icon-plus"/>  
                  <span/> 
                </a>  
                <a component="$UI/system/components/justep/button/button"
                  label="" class="btn btn-link btn-only-icon" onClick="{operation:'{{form_data}}.save'}"
                  xid="saveBtn"> 
                  <i/>  
                  <span/> 
                </a> 
              </div> 
            </div> 
          </div>  
          <div class="x-panel-content"> 
            <div component="$UI/system/components/justep/controlGroup/controlGroup"
              class="x-control-group" title="详细信息"> 
              <div class="x-control-group-title">详细信息</div> {{#each form}} 
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label25"> 
                <label class="x-label left" bind-text="{{form_data}}.label('{{form_field}}')"/>  
                <div class="x-edit">{{#if form_selectDataID}} 
                  <select class="form-control" component="$UI/system/components/justep/select/select"
                    bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{form_field}}')"
                    bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
                    bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if form_password}}
                  <input component="$UI/system/components/justep/input/password"
                    class="form-control x-edit" data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_range}}
                  <input component="$UI/system/components/justep/input/range"
                    class="x-edit" bind-ref="{{form_data}}.ref('{{form_field}}')"
                    min="-10000" max="10000"/>{{/if}}{{#if form_output}}
                  <span class="x-output" component="$UI/system/components/justep/output/output"
                    data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_textarea}}
                  <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
                    data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/> {{/if}}{{#if form_input}}
                  <input class="form-control" component="$UI/system/components/justep/input/input"
                    data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{/if}}
                </div> 
              </div>{{/each}}
            </div> 
          </div>  
          <div class="x-panel-bottom" bind-visible="false"/> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
