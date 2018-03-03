<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:264px;top:676px;">{{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="treeData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" columns="{{data_relations}}"
      isTree="true"> 
      <writer xid="default1" action="{{data_writer}}"/>  
      <creator xid="default2" action="{{data_creator}}"/>
      <reader action="{{data_reader}}"/>{{/each}}{{#each tree}}
      <treeOption parentRelation="{{parent_relation}}" nodeKindRelation="{{node_kindRelation}}"
        rootFilter="{{root_filter}}"/>{{/each}}
    </div> 
    <div component="$UI/system/components/justep/dataOperation/dataOperation"
      xid="dataOperation"/> 
  </div>  
  <div class="container-fluid" xid="view"> 
    <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
      xid="toolBar1"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn"
        onClick="{'operation':'treeData.new'}" xid="button3"> 
        <i xid="i3"/>  
        <span xid="span3"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn"
        onClick="{'operation':'treeData.save'}" xid="button1"> 
        <i xid="i1"/>  
        <span xid="span1"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn"
        onClick="{'operation':'treeData.delete'}" xid="button2"> 
        <i xid="i2"/>  
        <span xid="span2"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn"
        onClick="{'operation':'treeData.newChild'}" xid="button4"> 
        <i xid="i4"/>  
        <span xid="span4"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn"
        onClick="{'operation':'treeData.newBrother'}" xid="button5"> 
        <i xid="i5"/>  
        <span xid="span5"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left blackBtn"
        onClick="{'operation':'treeData.refresh'}" xid="button7"> 
        <i xid="i7"/>  
        <span xid="span7"/> 
      </a> 
    </div>  
{{#each tree}}
        <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
          altRows="true" class="x-grid-no-bordered" xid="grid2" data="treeData" directEdit="false"
          height="auto" width="100%" appearance="treeGrid" expandColumn="{{tree_nodeName}}"> 
          {{/each}}<columns xid="column">{{#each list}}
            <column name="{{list_field1}}" editor="input" editable="true"/> {{#if list_field2}}
            <column name="{{list_field2}}" editor="input" editable="true"/> {{/if}}{{/each}}
          </columns> 
        </div>

  </div> 
</div>
