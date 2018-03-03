--文档服务器系统表初始化
    DROP TABLE ASYNCSERVERS
    DROP TABLE ACLS
    DROP TABLE ACL_ACCESSDETAIL
    DROP TABLE ACL_ENTRIES
    DROP TABLE ACL_OBJECTS
    DROP TABLE BRANCHES
    DROP TABLE BRANCH_SEQUENCE
    DROP TABLE COLLECTIONS
    DROP TABLE COLLECTION_SEQUENCE
    DROP TABLE COLLECTION_SUBSCRIPTIONS
    DROP TABLE COMMENTS
    DROP TABLE COMMENT_SEQUENCE
    DROP TABLE CUSTOMFIELDS
    DROP TABLE DAISY_NAMESPACES
    DROP TABLE DAISY_SYSTEM
    DROP TABLE DOCTYPES_FIELDTYPES
    DROP TABLE DOCTYPE_CONTENTMODEL
    DROP TABLE DOCUMENTS
    DROP TABLE DOCUMENTTYPE_SEQUENCE
    DROP TABLE DOCUMENT_COLLECTIONS
    DROP TABLE DOCUMENT_SEQUENCE
    DROP TABLE DOCUMENT_SUBSCRIPTIONS
    DROP TABLE DOCUMENT_TASKS
    DROP TABLE DOCUMENT_TYPES
    DROP TABLE DOCUMENT_VARIANTS
    DROP TABLE DOCUMENT_VERSIONS
    DROP TABLE EMAILNTFY_SUBSCRIPTIONS
    DROP TABLE EMAIL_QUEUE
    DROP TABLE EVENTS
    DROP TABLE EXTRACTED_LINKS
    DROP TABLE FIELDTYPE_SEQUENCE
    DROP TABLE FIELD_TYPES
    DROP TABLE EVENT_SEQUENCE
    DROP TABLE HIERQUERYSELLIST
    DROP TABLE HIERQUERYSELLIST_FIELDS
    DROP TABLE LANGUAGES
    DROP TABLE LANGUAGE_SEQUENCE
    DROP TABLE LINKQUERYSELLIST
    DROP TABLE LINKS
    DROP TABLE LOCALIZEDSTRING_SEQUENCE
    DROP TABLE LOCALIZED_STRINGS
    DROP TABLE LOCKS
    DROP TABLE NAMESPACE_SEQUENCE
    DROP TABLE PARENTLINKEDSELLIST
    DROP TABLE PARTS
    DROP TABLE PARTTYPE_SEQUENCE
    DROP TABLE PART_TYPES
    DROP TABLE QUERYSELLIST
    DROP TABLE ROLES
    DROP TABLE ROLE_SEQUENCE
    DROP TABLE SELECTIONLIST_DATA
    DROP TABLE SUMMARIES
    DROP TABLE TASK_DOC_DETAILS
    DROP TABLE TASK_SEQUENCE
    DROP TABLE THEFIELDS
    DROP TABLE USERS
    DROP TABLE USER_ROLES
    DROP TABLE USER_SEQUENCE
    DROP TABLE WFPOOL_SEQUENCE
    DROP TABLE WF_POOLS
    DROP TABLE WF_POOL_MEMBERS


create table ASYNCSERVERS
(
  SERVERTYPE   VARCHAR(50) not null,
  IPADDRESS    VARCHAR(50) not null,
  SERVERNAME   VARCHAR(200) not null,
  SERVERPATH   VARCHAR(500) not null,
  SERVERURL    VARCHAR(200),
  LASTSYNCTIME VARCHAR(1024)
)
;

create table ACLS
(
  ID            DOUBLE not null,
  NAME          VARCHAR(255),
  LAST_MODIFIED TIMESTAMP,
  LAST_MODIFIER DOUBLE,
  UPDATECOUNT   DOUBLE
)
;
alter table ACLS
  add constraint PRIMARYACLS1 primary key (ID);
create index IDX_LAST_MODIFIERACLS on ACLS (LAST_MODIFIER);


create table ACL_ACCESSDETAIL
(
  ACL_ID         DOUBLE,
  ACL_OBJECT_ID  DOUBLE,
  ACL_ENTRY_ID   DOUBLE,
  ACL_PERMISSION VARCHAR(1),
  AD_TYPE        VARCHAR(20),
  AD_DATA        VARCHAR(255)
)
;
create index IDX_ACL_ACCESSDETAIL_I_1ACL_AC on ACL_ACCESSDETAIL (ACL_ID, ACL_OBJECT_ID, ACL_ENTRY_ID);


create table ACL_ENTRIES
(
  ACL_ID          DOUBLE not null,
  ACL_OBJECT_ID   DOUBLE not null,
  ID              DOUBLE not null,
  SUBJECT_USER_ID DOUBLE,
  SUBJECT_ROLE_ID DOUBLE,
  SUBJECT_TYPE    VARCHAR(1),
  PERM_READ       VARCHAR(1),
  PERM_WRITE      VARCHAR(1),
  PERM_PUBLISH    VARCHAR(1),
  PERM_DELETE     VARCHAR(1),
  READ_DETAIL     VARCHAR(1),
  WRITE_DETAIL    VARCHAR(1)
)
;
alter table ACL_ENTRIES
  add constraint IDX_P_ENTRIES1 primary key (ACL_ID, ACL_OBJECT_ID, ID);
create index IDX_ACL_E_I_1ACL_E on ACL_ENTRIES (SUBJECT_USER_ID);
create index IDX_ACL_E_I_2ACL_E on ACL_ENTRIES (SUBJECT_ROLE_ID);


create table BRANCHES
(
  ID            DOUBLE not null,
  NAME          VARCHAR(50),
  DESCRIPTION   VARCHAR(255),
  LAST_MODIFIED TIMESTAMP,
  LAST_MODIFIER DOUBLE,
  UPDATECOUNT   DOUBLE
)
;
alter table BRANCHES
  add constraint PRIMARYBRANCHES1 primary key (ID);
create index IDX_BRANCHES_I_1BRANCHES on BRANCHES (LAST_MODIFIER);
create index IDX_NAMEBRANCHES on BRANCHES (NAME);


create table BRANCH_SEQUENCE
(
  MAXID DOUBLE
)
;


create table COLLECTIONS
(
  ID            DOUBLE not null,
  NAME          VARCHAR(50),
  LAST_MODIFIED TIMESTAMP,
  LAST_MODIFIER DOUBLE,
  UPDATECOUNT   DOUBLE
)
;
alter table COLLECTIONS
  add constraint IDX_PCOLLECTIONS1 primary key (ID);
create index IDX_LAST_MCS on COLLECTIONS (LAST_MODIFIER);
create index IDX_NAMECS on COLLECTIONS (NAME);


create table COLLECTION_SEQUENCE
(
  MAXID DOUBLE
)
;


create table COLLECTION_SUBSCRIPTIONS
(
  USER_ID       DOUBLE not null,
  COLLECTION_ID DOUBLE not null,
  BRANCH_ID     DOUBLE not null,
  LANG_ID       DOUBLE not null
)
;
alter table COLLECTION_SUBSCRIPTIONS
  add constraint IDX_PC_SN primary key (USER_ID, COLLECTION_ID, BRANCH_ID, LANG_ID);
create index IDX_C_SUBSS_I on COLLECTION_SUBSCRIPTIONS (COLLECTION_ID);


create table COMMENT_SEQUENCE
(
  MAXID DOUBLE
)
;


create table CUSTOMFIELDS
(
  DOC_ID    DOUBLE not null,
  NS_ID     DOUBLE not null,
  BRANCH_ID DOUBLE not null,
  LANG_ID   DOUBLE not null,
  NAME      VARCHAR(255) not null,
  VALUE     VARCHAR(2048)
)
;
alter table CUSTOMFIELDS
  add constraint IDX_PCFIELDS1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID, NAME);


create table DAISY_NAMESPACES
(
  ID            DOUBLE not null,
  NAME_         VARCHAR(200),
  FINGERPRINT   VARCHAR(255),
  REGISTERED_BY DOUBLE,
  REGISTERED_ON TIMESTAMP
)
;
alter table DAISY_NAMESPACES
  add constraint IDX_PD_NSPACES1 primary key (ID);
create index IDX_FPDAISY_NAMESPACE on DAISY_NAMESPACES (FINGERPRINT);
create index IDX_ND_NSPACES on DAISY_NAMESPACES (NAME_);
create index IDX_R_B_NAMESPA on DAISY_NAMESPACES (REGISTERED_BY);


create table DAISY_SYSTEM
(
  PROPNAME  VARCHAR(100) not null,
  PROPVALUE VARCHAR(255)
)
;
alter table DAISY_SYSTEM
  add constraint IDX_PD_SYSTEM1 primary key (PROPNAME);


create table DOCTYPES_FIELDTYPES
(
  DOCTYPE_ID DOUBLE not null,
  FIELD_ID   DOUBLE not null,
  REQUIRED   VARCHAR(1),
  EDITABLE   VARCHAR(1),
  SEQUENCENR DOUBLE
)
;
alter table DOCTYPES_FIELDTYPES
  add constraint IDX_PD_FDTYPES1 primary key (DOCTYPE_ID, FIELD_ID);
create index IDX_DT_FDTYPES_I_1DOC on DOCTYPES_FIELDTYPES (FIELD_ID);


create table DOCTYPE_CONTENTMODEL
(
  DOCTYPE_ID DOUBLE not null,
  PART_ID    DOUBLE not null,
  REQUIRED   VARCHAR(1),
  EDITABLE   VARCHAR(1),
  SEQUENCENR DOUBLE
)
;
alter table DOCTYPE_CONTENTMODEL
  add constraint PD_CONTENTMODEL1 primary key (DOCTYPE_ID, PART_ID);
create index IDX_D_CMODEL_I_1DO on DOCTYPE_CONTENTMODEL (PART_ID);


create table DOCUMENTS
(
  ID                DOUBLE not null,
  NS_ID             DOUBLE not null,
  ID_SEARCH         VARCHAR(50),
  CREATED           TIMESTAMP,
  OWNER             DOUBLE,
  PRIVATE           VARCHAR(1),
  REFERENCE_LANG_ID DOUBLE,
  LAST_MODIFIED     TIMESTAMP,
  LAST_MODIFIER     DOUBLE,
  UPDATECOUNT       DOUBLE
)
;
alter table DOCUMENTS
  add constraint PRIMARYDOCUMENTS1 primary key (ID, NS_ID);
create index IDX_D_I_1DNTS on DOCUMENTS (ID_SEARCH);
create index IDX_D_I_2DUMENTS on DOCUMENTS (OWNER);
create index IDX_D_I_3DUMENTS on DOCUMENTS (LAST_MODIFIER);
create index IDX_NS_IDDNTS on DOCUMENTS (NS_ID);
create index IDX_R_L_IDDMENTS on DOCUMENTS (REFERENCE_LANG_ID);


create table DOCUMENTTYPE_SEQUENCE
(
  MAXID DOUBLE
)
;


create table DOCUMENT_COLLECTIONS
(
  DOCUMENT_ID   DOUBLE not null,
  NS_ID         DOUBLE not null,
  BRANCH_ID     DOUBLE not null,
  LANG_ID       DOUBLE not null,
  COLLECTION_ID DOUBLE not null
)
;
alter table DOCUMENT_COLLECTIONS
  add constraint PD_COLLECTIONS1 primary key (DOCUMENT_ID, NS_ID, BRANCH_ID, LANG_ID, COLLECTION_ID);
create index IDX_C_IDD_COLL on DOCUMENT_COLLECTIONS (COLLECTION_ID);


create table DOCUMENT_SEQUENCE
(
  MAXID DOUBLE,
  NS_ID DOUBLE
)
;
create index IDX_NS_IDD_SEQUENCE on DOCUMENT_SEQUENCE (NS_ID);


create table DOCUMENT_SUBSCRIPTIONS
(
  USER_ID   DOUBLE not null,
  DOC_ID    VARCHAR(255) not null,
  BRANCH_ID DOUBLE not null,
  LANG_ID   DOUBLE not null
)
;
alter table DOCUMENT_SUBSCRIPTIONS
  add constraint PD_SUBSCRIPTIONS1 primary key (USER_ID, DOC_ID, BRANCH_ID, LANG_ID);
create index IDX_D_SIONS_I_1 on DOCUMENT_SUBSCRIPTIONS (DOC_ID);


create table DOCUMENT_TYPES
(
  ID             DOUBLE not null,
  NAME           VARCHAR(50),
  LABEL_ID       DOUBLE,
  DESCRIPTION_ID DOUBLE,
  DEPRECATED     VARCHAR(1),
  LAST_MODIFIED  TIMESTAMP,
  LAST_MODIFIER  DOUBLE,
  UPDATECOUNT    DOUBLE
)
;
alter table DOCUMENT_TYPES
  add constraint PDOCUMENT_TYPES1 primary key (ID);
create index IDX_L_M_TYPE on DOCUMENT_TYPES (LAST_MODIFIER);
create index IDX_ND_TYPES on DOCUMENT_TYPES (NAME);


create table DOCUMENT_VARIANTS
(
  DOC_ID                       DOUBLE not null,
  NS_ID                        DOUBLE not null,
  BRANCH_ID                    DOUBLE not null,
  LANG_ID                      DOUBLE not null,
  LINK_SEARCH                  VARCHAR(100),
  VARIANT_SEARCH               VARCHAR(100),
  DOCTYPE_ID                   DOUBLE,
  RETIRED                      VARCHAR(1),
  LASTVERSION_ID               DOUBLE,
  LIVEVERSION_ID               DOUBLE,
  LAST_MAJOR_CHANGE_VERSION_ID DOUBLE,
  LIVE_MAJOR_CHANGE_VERSION_ID DOUBLE,
  LAST_MODIFIED                TIMESTAMP,
  LAST_MODIFIER                DOUBLE,
  UPDATECOUNT                  DOUBLE,
  CREATED_FROM_BRANCH_ID       DOUBLE,
  CREATED_FROM_LANG_ID         DOUBLE,
  CREATED_FROM_VERSION_ID      DOUBLE
)
;
alter table DOCUMENT_VARIANTS
  add constraint PD_VARIANTS1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID);
create index IDX_D_V_I_1DOCUM on DOCUMENT_VARIANTS (DOCTYPE_ID);
create index IDX_D_V_I_2DOCUM on DOCUMENT_VARIANTS (LAST_MODIFIER);
create index IDX_D_V_I_3DOCUM on DOCUMENT_VARIANTS (BRANCH_ID);
create index IDX_D_V_I_4DOCUM on DOCUMENT_VARIANTS (LANG_ID);
create index IDX_D_V_I_5DOCUM on DOCUMENT_VARIANTS (LINK_SEARCH);
create index IDX_V_S_VAR on DOCUMENT_VARIANTS (VARIANT_SEARCH);


create table EMAILNTFY_SUBSCRIPTIONS
(
  USER_ID           DOUBLE not null,
  DOCUMENT_EVENTS   VARCHAR(1),
  SCHEMA_EVENTS     VARCHAR(1),
  USER_EVENTS       VARCHAR(1),
  COLLECTION_EVENTS VARCHAR(1),
  ACL_EVENTS        VARCHAR(1),
  COMMENT_EVENTS    VARCHAR(1),
  LOCALE            VARCHAR(20)
)
;
alter table EMAILNTFY_SUBSCRIPTIONS
  add constraint PE_SUBSCRIPTIONS primary key (USER_ID);


create table EVENT_SEQUENCE
(
  MAXID DOUBLE
)
;


create table EXTRACTED_LINKS
(
  SOURCE_DOC_ID      DOUBLE,
  SOURCE_NS_ID       DOUBLE,
  SOURCE_BRANCH_ID   DOUBLE,
  SOURCE_LANG_ID     DOUBLE,
  SOURCE_PARTTYPE_ID DOUBLE,
  TARGET_DOC_ID      DOUBLE,
  TARGET_NS_ID       DOUBLE,
  TARGET_BRANCH_ID   DOUBLE,
  TARGET_LANG_ID     DOUBLE,
  TARGET_VERSION_ID  DOUBLE,
  LINKTYPE           VARCHAR(1),
  IN_LAST_VERSION    VARCHAR(1),
  IN_LIVE_VERSION    VARCHAR(1)
)
;
create index IDX_E_L_I_1ERACT on EXTRACTED_LINKS (SOURCE_DOC_ID, SOURCE_NS_ID);
create index IDX_E_L_I_2ERACT on EXTRACTED_LINKS (TARGET_DOC_ID, TARGET_NS_ID);
create index IDX_T_NS_IDE_LINK on EXTRACTED_LINKS (TARGET_NS_ID);


create table FIELDTYPE_SEQUENCE
(
  MAXID DOUBLE
)
;


create table FIELD_TYPES
(
  ID                    DOUBLE not null,
  NAME                  VARCHAR(50),
  LABEL_ID              DOUBLE,
  DESCRIPTION_ID        DOUBLE,
  "SIZE"                  DOUBLE,
  VALUETYPE             DOUBLE,
  DEPRECATED            VARCHAR(1),
  ACL_ALLOWED           VARCHAR(1),
  MULTIVALUE            VARCHAR(1),
  HIERARCHICAL          VARCHAR(1),
  SELECTIONLIST_TYPE    VARCHAR(1),
  SELECTLIST_FREE_ENTRY VARCHAR(1),
  SELECTLIST_LOAD_ASYNC VARCHAR(1),
  LAST_MODIFIED         TIMESTAMP,
  LAST_MODIFIER         DOUBLE,
  UPDATECOUNT           DOUBLE
)
;
alter table FIELD_TYPES
  add constraint PFIELD_TYPES1 primary key (ID);
create index IDX_L_MFIELD_TYPES on FIELD_TYPES (LAST_MODIFIER);
create index IDX_NFIELD_TYPES on FIELD_TYPES (NAME);


create table HIERQUERYSELLIST_FIELDS
(
  FIELDTYPE_ID DOUBLE,
  SEQUENCENR   DOUBLE,
  FIELDNAME    VARCHAR(50)
)
;


create table LANGUAGES
(
  ID            DOUBLE not null,
  NAME          VARCHAR(50),
  DESCRIPTION   VARCHAR(255),
  LAST_MODIFIED TIMESTAMP,
  LAST_MODIFIER DOUBLE,
  UPDATECOUNT   DOUBLE
)
;
alter table LANGUAGES
  add constraint PLANGUAGES1 primary key (ID);
create index IDX_L_I_1LANGUAGES on LANGUAGES (LAST_MODIFIER);
create index IDX_NLANGUAGES on LANGUAGES (NAME);


create table LANGUAGE_SEQUENCE
(
  MAXID DOUBLE
)
;


create table LOCALIZEDSTRING_SEQUENCE
(
  MAXID DOUBLE
)
;


create table LOCALIZED_STRINGS
(
  ID     DOUBLE not null,
  LOCALE VARCHAR(20) not null,
  VALUE  VARCHAR(255)
)
;
alter table LOCALIZED_STRINGS
  add constraint PLCALIZED_STRINGS1 primary key (ID, LOCALE);


create table LOCKS
(
  DOC_ID        DOUBLE not null,
  NS_ID         DOUBLE not null,
  BRANCH_ID     DOUBLE not null,
  LANG_ID       DOUBLE not null,
  USER_ID       DOUBLE,
  LOCKTYPE      VARCHAR(1),
  TIME_ACQUIRED TIMESTAMP,
  DURATION      DOUBLE,
  TIME_EXPIRES  TIMESTAMP
)
;
alter table LOCKS
  add constraint PRIMARYLOCKS1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID);
create index IDX_LOCKS_I_1LOCKS on LOCKS (USER_ID);


create table NAMESPACE_SEQUENCE
(
  MAXID DOUBLE
)
;


create table PARTS
(
  DOC_ID             DOUBLE not null,
  NS_ID              DOUBLE not null,
  BRANCH_ID          DOUBLE not null,
  LANG_ID            DOUBLE not null,
  VERSION_ID         DOUBLE not null,
  PARTTYPE_ID        DOUBLE not null,
  BLOB_ID            VARCHAR(255),
  MIMETYPE           VARCHAR(255),
  FILENAME           VARCHAR(255),
  BLOB_SIZE          DOUBLE,
  CHANGED_IN_VERSION DOUBLE
)
;
alter table PARTS
  add constraint PRIMARYPARTS1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID, VERSION_ID, PARTTYPE_ID);
create index IDX_PARTS_I_1PARTS on PARTS (PARTTYPE_ID);
create index IDX_PARTS_I_2PARTS on PARTS (BLOB_ID);


create table PARTTYPE_SEQUENCE
(
  MAXID DOUBLE
)
;


create table PART_TYPES
(
  PART_ID        DOUBLE not null,
  NAME           VARCHAR(50),
  LABEL_ID       DOUBLE,
  DESCRIPTION_ID DOUBLE,
  MIMETYPE       VARCHAR(100),
  DAISY_HTML     VARCHAR(1),
  LINKEXTRACTOR  VARCHAR(50),
  DEPRECATED     VARCHAR(1),
  LAST_MODIFIED  TIMESTAMP,
  LAST_MODIFIER  DOUBLE,
  UPDATECOUNT    DOUBLE
)
;
alter table PART_TYPES
  add constraint PPART_TYPES1 primary key (PART_ID);
create index IDX_L_MP_TYPES on PART_TYPES (LAST_MODIFIER);
create index IDX_NP_TYPES on PART_TYPES (NAME);


create table ROLES
(
  ID            DOUBLE not null,
  NAME          VARCHAR(50),
  DESCRIPTION   VARCHAR(100),
  LAST_MODIFIED TIMESTAMP,
  LAST_MODIFIER DOUBLE,
  UPDATECOUNT   DOUBLE
)
;
alter table ROLES
  add constraint PRIMARYROLES1 primary key (ID);
create index IDX_L_MROLES on ROLES (LAST_MODIFIER);
create index IDX_NAMEROLES on ROLES (NAME);


create table ROLE_SEQUENCE
(
  MAXID DOUBLE
)
;


create table SELECTIONLIST_DATA
(
  FIELDTYPE_ID  DOUBLE,
  SEQUENCENR    DOUBLE,
  DEPTH         DOUBLE,
  STRINGVALUE   VARCHAR(255),
  DATEVALUE     TIMESTAMP,
  DATETIMEVALUE TIMESTAMP,
  INTEGERVALUE  DOUBLE,
  FLOATVALUE    DOUBLE,
  DECIMALVALUE  DOUBLE,
  BOOLEANVALUE  VARCHAR(1),
  LINK_DOCID    DOUBLE,
  LINK_NSID     DOUBLE,
  LINK_BRANCHID DOUBLE,
  LINK_LANGID   DOUBLE,
  LABEL_ID      DOUBLE
)
;
create index IDX_FD_IDSLIST_ on SELECTIONLIST_DATA (FIELDTYPE_ID);
create index IDX_L_NSSLIST_DAT on SELECTIONLIST_DATA (LINK_NSID);


create table TASK_SEQUENCE
(
  MAXID DOUBLE
)
;


create table THEFIELDS
(
  DOC_ID              DOUBLE not null,
  NS_ID               DOUBLE not null,
  BRANCH_ID           DOUBLE not null,
  LANG_ID             DOUBLE not null,
  VERSION_ID          DOUBLE not null,
  FIELDTYPE_ID        DOUBLE not null,
  VALUE_SEQ           DOUBLE not null,
  HIER_SEQ            DOUBLE not null,
  VALUE_COUNT         DOUBLE,
  HIER_COUNT          DOUBLE,
  STRINGVALUE         VARCHAR(255),
  DATEVALUE           TIMESTAMP,
  DATETIMEVALUE       TIMESTAMP,
  INTEGERVALUE        DOUBLE,
  FLOATVALUE          DOUBLE,
  DECIMALVALUE        DOUBLE,
  BOOLEANVALUE        VARCHAR(1),
  LINK_DOCID          DOUBLE,
  LINK_NSID           DOUBLE,
  LINK_SEARCHDOCID    VARCHAR(50),
  LINK_BRANCHID       DOUBLE,
  LINK_SEARCHBRANCHID DOUBLE,
  LINK_LANGID         DOUBLE,
  LINK_SEARCHLANGID   DOUBLE,
  LINK_SEARCH         VARCHAR(100)
)
;
alter table THEFIELDS
  add constraint PTHEFIELDS1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID, VERSION_ID, FIELDTYPE_ID, VALUE_SEQ, HIER_SEQ);
create index IDX_L_NSIDTHEFIELDS on THEFIELDS (LINK_NSID);
create index IDX_T_I_10THEFIELDS on THEFIELDS (LINK_SEARCHLANGID);
create index IDX_T_I_11THEFIELDS on THEFIELDS (LINK_SEARCH);
create index IDX_T_I_12THEFIELDS on THEFIELDS (FIELDTYPE_ID);
create index IDX_T_I_1THEFIELDS on THEFIELDS (STRINGVALUE);
create index IDX_T_I_2THEFIELDS on THEFIELDS (DATEVALUE);
create index IDX_T_I_3THEFIELDS on THEFIELDS (DATETIMEVALUE);
create index IDX_T_I_4THEFIELDS on THEFIELDS (INTEGERVALUE);
create index IDX_T_I_5THEFIELDS on THEFIELDS (FLOATVALUE);
create index IDX_T_I_6THEFIELDS on THEFIELDS (DECIMALVALUE);
create index IDX_T_I_7THEFIELDS on THEFIELDS (BOOLEANVALUE);
create index IDX_T_I_8THEFIELDS on THEFIELDS (LINK_SEARCHDOCID);
create index IDX_T_I_9THEFIELDS on THEFIELDS (LINK_SEARCHBRANCHID);


create table USERS
(
  ID                 DOUBLE not null,
  LOGIN              VARCHAR(50),
  PASSWORD           VARCHAR(50),
  DEFAULT_ROLE       DOUBLE,
  FIRST_NAME         VARCHAR(50),
  LAST_NAME          VARCHAR(50),
  EMAIL              VARCHAR(100),
  UPDATEABLE_BY_USER VARCHAR(1),
  CONFIRMED          VARCHAR(1),
  CONFIRMKEY         VARCHAR(50),
  AUTH_SCHEME        VARCHAR(50),
  LAST_MODIFIED      TIMESTAMP,
  LAST_MODIFIER      DOUBLE,
  UPDATECOUNT        DOUBLE
)
;
alter table USERS
  add constraint PUSERS1 primary key (ID);
create index IDX_L_MRUSERS on USERS (LAST_MODIFIER);
create index IDX_LOGINUSERS on USERS (LOGIN);


create table USER_ROLES
(
  USER_ID DOUBLE not null,
  ROLE_ID DOUBLE not null
)
;
alter table USER_ROLES
  add constraint PUSER_ROLES1 primary key (USER_ID, ROLE_ID);
create index IDX_R_IDU_ROLES on USER_ROLES (ROLE_ID);


create table USER_SEQUENCE
(
  MAXID DOUBLE
)
;


create table WFPOOL_SEQUENCE
(
  MAXID DOUBLE
)
;


create table WF_POOLS
(
  ID            DOUBLE not null,
  NAME_         VARCHAR(100),
  DESCRIPTION   VARCHAR(255),
  LAST_MODIFIED TIMESTAMP,
  LAST_MODIFIER DOUBLE,
  UPDATECOUNT   DOUBLE
)
;
alter table WF_POOLS
  add constraint PWF_POOLS1 primary key (ID);
create index IDX_N_WF_POOLS on WF_POOLS (NAME_);


create table WF_POOL_MEMBERS
(
  POOL_ID DOUBLE not null,
  USER_ID DOUBLE not null,
  ADDED   TIMESTAMP,
  ADDER   DOUBLE
)
;
alter table WF_POOL_MEMBERS
  add constraint PWF_P_MEMBERS1 primary key (POOL_ID, USER_ID);
create index IDX_WF_P_M_I_1WF_P on WF_POOL_MEMBERS (USER_ID);

-- Created 含有clob字段的表
create table ACL_OBJECTS
(
  ACL_ID     DOUBLE not null,
  ID         DOUBLE not null,
  OBJECTSPEC CLOB
);
alter table ACL_OBJECTS
  add constraint PACL_OBJECTS1 primary key (ACL_ID, ID);


create table COMMENTS
(
  ID           DOUBLE not null,
  DOC_ID       DOUBLE,
  NS_ID        DOUBLE,
  BRANCH_ID    DOUBLE,
  LANG_ID      DOUBLE,
  CREATED_BY   DOUBLE,
  CREATED_ON   TIMESTAMP,
  VISIBILITY   VARCHAR(1),
  COMMENT_TEXT CLOB
);  
alter table COMMENTS
  add constraint PCOMMENTS1 primary key (ID);
create index IDX_C_I_1COMMENTS on COMMENTS (DOC_ID);
create index IDX_C_I_2COMMENTS on COMMENTS (CREATED_BY);


create table DOCUMENT_TASKS
(
  ID                DOUBLE not null,
  ACTION_TYPE       VARCHAR(100),
  OWNER             DOUBLE,
  STARTED_AT        TIMESTAMP,
  FINISHED_AT       TIMESTAMP,
  STATE             VARCHAR(1),
  PROGRESS          VARCHAR(255),
  DESCRIPTION       CLOB,
  ACTION_PARAMETERS CLOB,
  DETAILS           CLOB
);

alter table DOCUMENT_TASKS
  add constraint PDOCUMENT_TASKS1 primary key (ID);
create index IDX_D_T_I_1DCUMENT on DOCUMENT_TASKS (STARTED_AT);
create index IDX_D_T_I_2DCUMENT on DOCUMENT_TASKS (OWNER);
create index IDX_D_T_I_3DCUMENT on DOCUMENT_TASKS (STATE);  


create table DOCUMENT_VERSIONS
(
  DOC_ID                 DOUBLE not null,
  NS_ID                  DOUBLE not null,
  BRANCH_ID              DOUBLE not null,
  LANG_ID                DOUBLE not null,
  ID                     DOUBLE not null,
  NAME                   VARCHAR(255),
  CREATED_ON             TIMESTAMP,
  CREATED_BY             DOUBLE,
  STATE                  VARCHAR(1),
  SYNCED_WITH_LANG_ID    DOUBLE,
  SYNCED_WITH_VERSION_ID DOUBLE,
  SYNCED_WITH_SEARCH     VARCHAR(100),
  CHANGE_TYPE            VARCHAR(1),
  CHANGE_COMMENT         CLOB,
  LAST_MODIFIED          TIMESTAMP,
  LAST_MODIFIER          DOUBLE,
  TOTAL_SIZE_OF_PARTS    DOUBLE
);

alter table DOCUMENT_VERSIONS
  add constraint PD_VERSIONS1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID, ID);
create index IDX_C_B_VERSION on DOCUMENT_VERSIONS (CREATED_BY);
create index IDX_L_MD_VERS on DOCUMENT_VERSIONS (LAST_MODIFIER);  


create table EMAIL_QUEUE
(
  FROM_ADDRESS  VARCHAR(255),
  TO_ADDRESS    VARCHAR(255),
  SUBJECT       VARCHAR(255),
  MESSAGE       CLOB,
  RETRY_COUNT   DOUBLE,
  LAST_TRY_TIME TIMESTAMP,
  CREATED       TIMESTAMP,
  ID            DOUBLE not null,
  ERROR         VARCHAR(255)
);

alter table EMAIL_QUEUE
  add constraint PEMAIL_QUEUE1 primary key (ID);
  

create table EVENTS
(
  SEQNR        DOUBLE not null,
  MESSAGE_TYPE VARCHAR(50),
  MESSAGE      CLOB
);

alter table EVENTS
  add constraint PRIMARYEVENTS1 primary key (SEQNR);
  
  
create table HIERQUERYSELLIST
(
  FIELDTYPE_ID   DOUBLE,
  WHERECLAUSE    CLOB,
  FILTERVARIANTS VARCHAR(1)
);
create index IDX_FD_IDHQSELLI on HIERQUERYSELLIST (FIELDTYPE_ID);


create table LINKQUERYSELLIST
(
  FIELDTYPE_ID   DOUBLE,
  WHERECLAUSE    CLOB,
  FILTERVARIANTS VARCHAR(1)
);
create index IDX_FD_IDLQSELLI on LINKQUERYSELLIST (FIELDTYPE_ID);

create table LINKS
(
  DOC_ID     DOUBLE not null,
  NS_ID      DOUBLE not null,
  BRANCH_ID  DOUBLE not null,
  LANG_ID    DOUBLE not null,
  VERSION_ID DOUBLE not null,
  ID         DOUBLE not null,
  TITLE      CLOB,
  TARGET     CLOB
);

alter table LINKS
  add constraint PRIMARYLINKS1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID, VERSION_ID, ID);
 
  
create table PARENTLINKEDSELLIST
(
  FIELDTYPE_ID   DOUBLE,
  WHERECLAUSE    CLOB,
  FILTERVARIANTS VARCHAR(1),
  LINKFIELD      VARCHAR(50)
);  
create index IDX_FD_IDPLINKEDSE on PARENTLINKEDSELLIST (FIELDTYPE_ID);


create table QUERYSELLIST
(
  FIELDTYPE_ID   DOUBLE,
  QUERY          CLOB,
  FILTERVARIANTS VARCHAR(1),
  SORT_ORDER     VARCHAR(1)
);
create index IDX_FD_IDQSELLIST on QUERYSELLIST (FIELDTYPE_ID);

create table SUMMARIES
(
  DOC_ID    DOUBLE not null,
  NS_ID     DOUBLE not null,
  BRANCH_ID DOUBLE not null,
  LANG_ID   DOUBLE not null,
  SUMMARY   CLOB
);

alter table SUMMARIES
  add constraint IDX_PSUMMARIES1 primary key (DOC_ID, NS_ID, BRANCH_ID, LANG_ID);


create table TASK_DOC_DETAILS
(
  TASK_ID   DOUBLE not null,
  DOC_ID    VARCHAR(255) not null,
  BRANCH_ID DOUBLE not null,
  LANG_ID   DOUBLE not null,
  SEQNR     DOUBLE,
  STATE     VARCHAR(1),
  DETAILS   CLOB
);
alter table TASK_DOC_DETAILS
  add constraint PT_DOC_DETAILS1 primary key (TASK_ID, DOC_ID, BRANCH_ID, LANG_ID);
