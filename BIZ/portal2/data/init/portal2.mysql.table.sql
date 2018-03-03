drop table  SA_Portal2Profiles;
  create table SA_Portal2Profiles
(
  $clientDefine,
  sID            VARCHAR(100) not null,
  version        INT,
  sPersonID      VARCHAR(100),
  sFunctree      TEXT,
  sPortal        TEXT,
  sOther         TEXT,
  sPublishType   VARCHAR(100),
  sThemeName     VARCHAR(100),
  sThemeActivity VARCHAR(100)
);
alter table SA_Portal2Profiles
  add primary key ($clientName,sID);

drop table  SA_Portal2ProfileManager;

  create table SA_Portal2ProfileManager
(
  $clientDefine,
  sID            VARCHAR(100) not null,
  version        INT,
  sThemeID       VARCHAR(100),
  sOrgID         VARCHAR(100),
  sPublishType   VARCHAR(100),
  sThemeActivity VARCHAR(100)
);
alter table SA_Portal2ProfileManager
  add primary key ($clientName,sID);
