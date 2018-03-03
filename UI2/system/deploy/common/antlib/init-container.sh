#!/bin/bash

DIST_URL=http://console.console:8080/workspace/$1/$2
JUSTEP_HOME=/usr/local/x5
INDEX_URL=$3
#DBUSER=$4
#DBPWD=$5
#PGHOST=$6
#PGPORT=$7
#DBNAME=$4
postgresUrl=$4
PORT=3000
SCHEMA=public
ANONYMOUS=postgres
DBPOOL=200
INDEX_FILE="/usr/local/tomcat/webapps/ROOT/index.jsp"

pkill -9 postgrest

#postgrest $postgresUrl --port $PORT --schema $SCHEMA --anonymous $ANONYMOUS --pool $DBPOOL

echo "<!DOCTYPE HTML>" > $INDEX_FILE     
echo "<html><head><script type="text/javascript">window.location=\"$INDEX_URL\";</script></head></html>" >> $INDEX_FILE
cd $JUSTEP_HOME
download_tar(){ 
	# download_tar ��������������$DIST_URL/home/filename.tar.gz����ǰ�ļ���
	# $1: ����·�� $2: Դ�ļ�����Ҳ����ΪĿ���ļ�������������չ��tar.gz $3: �Ƿ���Բ����ڵ���Դ $4: �Ƿ��ѹ $5: ��ɾ����ѹĿ¼��Ĭ��ɾ�� 
	rm -rf $2.tar.gz 
	if [ "$5"x != "true"x ]; then 
		rm -rf $2 
	fi 
	echo " ���ڸ��� $2..." 
	curl -s -f $1/$2.tar.gz -o $2.tar.gz 
	ERROR=$? 
	if [ "$ERROR" -eq "0" ]; then 
		if [ "$4"x = "true"x ]; then 
			mkdir -p $2 
			tar -xf $2.tar.gz -C ./$2 
		fi 
		echo " $2 �������" 
	else 
		if [ "$3"x = "true"x ]; then 
		echo " $2 �����ڣ����Ը���" 
	 else 
		error " [$ERROR]���� $2 ʧ��" 1 
	  fi 
	fi 
}
download_tar $DIST_URL model true true true