 --清空数据
delete from DEMO_Custemor where $clientFilter(NULL);
delete from DEMO_Product where $clientFilter(NULL);
delete from DEMO_PubBase  where $clientFilter(NULL);


  
insert into DEMO_Custemor ($clientName, version, fCustomerName, fCustomerLevel, fID, fCustomerCode)
values ($clientValue, 0, '张三', '1', '21D5CB5A-E34B-4877-B17F-CA82F00EA89B', '001');
insert into DEMO_Custemor ($clientName, version, fCustomerName, fCustomerLevel, fID, fCustomerCode)
values ($clientValue, 0, '李四', '1', 'B7D7005D-EA44-49F6-A5FC-7E185BE733C5', '002');
insert into DEMO_Custemor ($clientName, version, fCustomerName, fCustomerLevel, fID, fCustomerCode)
values ($clientValue, 0, '刘燕', '2', '2019BCEE-F67A-4541-9759-E2317BF32AA5', '003');
insert into DEMO_Custemor ($clientName, version, fCustomerName, fCustomerLevel, fID, fCustomerCode)
values ($clientValue, 0, '张飞', '2', '7E660B8E-13BD-4716-9B1D-A125C3AE2FDE', '004');
insert into DEMO_Custemor ($clientName, version, fCustomerName, fCustomerLevel, fID, fCustomerCode)
values ($clientValue, 0, '赵兰', '1', '5', '006');


insert into DEMO_Product ($clientName, version, fProductName, fPpercModel, fUnitName, fUnitprice, fID, fProductCode, fDisCount)
values ($clientValue, 0, '主机', '001', '个', null, '9869ECFB-8CBC-4E62-A2DC-2E07E4203802', '001', null);
insert into DEMO_Product ($clientName, version, fProductName, fPpercModel, fUnitName, fUnitprice, fID, fProductCode, fDisCount)
values ($clientValue, 0, '笔记本', null, '台', null, 'AA91643D-300A-4CA4-B04D-53F29897BB54', '002', null);
insert into DEMO_Product ($clientName, version, fProductName, fPpercModel, fUnitName, fUnitprice, fID, fProductCode, fDisCount)
values ($clientValue, 0, '钢笔', null, '支', null, '7CCB25D6-5894-450D-9686-24160643C26E', '003', null);
insert into DEMO_Product ($clientName, version, fProductName, fPpercModel, fUnitName, fUnitprice, fID, fProductCode, fDisCount)
values ($clientValue, 0, '记事本', null, '本', null, 'B8D945BB-DFDD-474B-B856-B2D6998C7345', '004', null);
insert into DEMO_Product ($clientName, version, fProductName, fPpercModel, fUnitName, fUnitprice, fID, fProductCode, fDisCount)
values ($clientValue, 0, '键盘', null, null, null, '747828E6-76E8-44E6-BEC9-C317EDC874E8', '005', null);
insert into DEMO_Product ($clientName, version, fProductName, fPpercModel, fUnitName, fUnitprice, fID, fProductCode, fDisCount)
values ($clientValue, 0, '显示器', null, null, null, '0E789815-168A-4466-907B-F15A7E8C465A', '006', null);
insert into DEMO_Product ($clientName, version, fProductName, fPpercModel, fUnitName, fUnitprice, fID, fProductCode, fDisCount)
values ($clientValue, 0, '鼠标', null, null, 1, '5', '007', null);



insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '1E7C2283-4635-4943-87A2-C0A81BFF25CE', 0, 'nkLeaf', 'ghdh', 7, null, null, '未启用', 0, 'DEMO_AssetClass', '资产类别', '95A5EE31-338A-4380-9083-75CB63C67C8B', null, '3', '656', to_date('16-04-2010 10:43:20', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'E6BA63FF-4D65-4A9C-938D-9CD9744357EF', 0, 'nkLeaf', 'ghdh', null, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', 'A4B48F19-CB08-4F84-893C-70976124C183', null, '2', null, to_date('09-06-2010 14:08:38', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '946C8E1D-A154-436A-AC9C-B449D068AF68', 1, 'nkLeaf', 'dsgf', null, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', 'E4B981F6-0736-4C3A-93E3-6A949C8B7B61', null, '2', null, to_date('21-05-2010 13:47:37', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'B628B4A1-68CC-425E-8082-7F3A53CDA77E', 16, '006', '存档', 6, 'system', to_date('26-05-2010 15:46:54', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_DocKind', '行文设置', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'E5037DDA-15D7-4C0D-9524-D1FE2EB26730', 9, 'nkLeaf', '笔记本电脑', 1, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', null, null, '1', null, to_date('12-04-2010 16:38:13', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F09', 1, '001', '件', 1, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F10', 1, '002', '台', 2, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F11', 1, '003', '只', 3, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F12', 1, '004', '张', 4, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F13', 1, '005', '间', 5, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F14', 1, '006', '辆', 6, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F15', 1, '007', '个', 7, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F16', 1, '008', '部', 8, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F17', 1, '009', '本', 9, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F18', 1, '010', '盒', 10, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F19', 1, '011', '包', 11, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F20', 1, '012', '筒', 12, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F21', 1, '013', '根', 13, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F22', 1, '014', '块', 14, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F23', 1, '015', '片', 15, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F24', 1, '016', '瓶', 16, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '固定资产计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '4347B066-06B0-42EA-A1C2-7D8976CB3275', 0, '001', '较低', 1, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_ExigenceLevel', '公文紧急程度', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '4347B066-06B0-42EA-A1C2-7D8976CB3276', 0, '002', '一般', 2, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_ExigenceLevel', '公文紧急程度', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '4347B066-06B0-42EA-A1C2-7D8976CB3277', 0, '003', '较高', 3, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_ExigenceLevel', '公文紧急程度', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '4347B066-06B0-42EA-A1C2-7D8976CB3278', 0, '004', '紧急', 4, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_ExigenceLevel', '公文紧急程度', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'B7EDD6BC-428F-4405-91FD-E5B95F7A5044', 0, '001', '较低', 1, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SecretLevel', '公文密级', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'B7EDD6BC-428F-4405-91FD-E5B95F7A5045', 0, '002', '一般', 2, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SecretLevel', '公文密级', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'B7EDD6BC-428F-4405-91FD-E5B95F7A5046', 0, '003', '绝密', 3, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SecretLevel', '公文密级', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'B7EDD6BC-428F-4405-91FD-E5B95F7A5047', 0, '004', '较高', 4, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SecretLevel', '公文密级', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '6112452B-6DAC-4598-A96F-F0898F444C36', 7, 'nkLeaf', '无线上网卡', null, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', '171503FB-0B16-48E6-B488-73CF18B1AB4B', null, '2', null, to_date('29-04-2010 09:00:23', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '9AF7531A-9D59-42EB-BFAF-256713C32794', 8, 'nkLeaf', '人员a', null, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', 'BDC87A0C-063E-43C0-B9B7-013DAA6C3022', null, '3', null, to_date('29-04-2010 09:01:51', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '171503FB-0B16-48E6-B488-73CF18B1AB4B', 7, null, '办公设备', 1, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', null, null, null, '吐吐规划法规和', to_date('06-04-2010 16:07:45', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'A4167194-F785-4DD7-8103-023FDF04FCF2', 1, 'nkLeaf', '数码相机', null, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', '171503FB-0B16-48E6-B488-73CF18B1AB4B', null, '2', '热土又突然有', to_date('11-06-2010 11:53:07', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '0236029F-E2C1-4ADD-BB62-E051516F89F6', 3, 'nkLeaf', '上网本', null, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', null, null, '1', null, to_date('11-06-2010 11:54:38', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '5E144F7A-D168-4F10-81C2-DEECC8C9ED1A', 1, 'nkLeaf', '人员b', null, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', 'B581E449-8F0C-4A55-8627-BD4569F1A996', null, '3', null, to_date('19-05-2010 09:37:54', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '7A5C4451-B5A1-421D-BDEB-A1022D08273D', 15, '005', '报道', 5, 'system', to_date('20-05-2010 10:55:16', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_DocKind', '行文设置', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'BDF45E3C-CD60-40C3-9C98-5C9496B2E49A', 9, '004', '公示', 4, 'system', to_date('20-05-2010 10:54:38', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_DocKind', '行文设置', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'DDC494D2-9544-4016-A674-4E995902DA14', 7, '003', '文件', 3, 'system', to_date('20-05-2010 10:51:24', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_DocKind', '行文设置', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '9887B219-5647-4846-BAD9-FED9678811F8', 1, '002', '公告', 2, 'system', to_date('20-05-2010 10:51:11', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_DocKind', '行文设置', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '38BB19D6-6275-4EBD-94BD-4462B5C53AB1', 1, '001', '通知', 1, 'system', to_date('20-05-2010 10:51:00', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_DocKind', '行文设置', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'A018DB42-A3B3-40AF-91CD-0D2C3DC27E46', 0, '002', '吨', 2, 'system', to_date('26-03-2010 15:18:24', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_Unit', '计量单位', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '52057D6B-0D6F-4CC0-BCAE-9717741337CC', 6, 'nkLeaf', 'U盘', 2, null, null, '启用', 1, 'DEMO_AssetClass', '资产类别', '171503FB-0B16-48E6-B488-73CF18B1AB4B', null, '2', null, to_date('12-04-2010 09:50:51', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '3D542C44-04F2-408F-9E4B-42189BBD1F08', 1, '004', '上行文', 4, 'system', to_date('13-04-2010 11:02:25', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SendDirect', '行文方向', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, '6EB746CE-2729-4D90-BD79-3B9A5DD1A67A', 1, '003', '下行文', 3, 'system', to_date('13-04-2010 10:54:42', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SendDirect', '行文方向', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'E14124D8-B9B3-4BFB-8BEA-11C5F848EA1E', 1, '005', '乱行文', 5, 'system', to_date('13-04-2010 11:02:46', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SendDirect', '行文方向', null, null, null, null, null, null);
insert into DEMO_PubBase ($clientName, fID, version, fCode, fName, fSequence, fUpdatePerName, fUpdateTime, fUseStatusName, fUseStatus, fScode, fScodeName, fParentID, fChildren, fLevel, fDescription, fCreateTime, fDisUseTime)
values ($clientValue, 'A354F64B-8B72-42F9-B981-6EF0D19B933D', 1, '006', '平行文', 6, 'system', to_date('13-04-2010 11:03:05', 'dd-mm-yyyy hh24:mi:ss'), '启用', 1, 'DEMO_SendDirect', '行文方向', null, null, null, null, null, null);