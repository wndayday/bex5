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
	# download_tar 公共函数，下载$DIST_URL/home/filename.tar.gz到当前文件夹
	# $1: 下载路径 $2: 源文件名，也将作为目标文件名，不包含扩展名tar.gz $3: 是否忽略不存在的资源 $4: 是否解压 $5: 不删除解压目录，默认删除 
	rm -rf $2.tar.gz 
	if [ "$5"x != "true"x ]; then 
		rm -rf $2 
	fi 
	echo " 正在更新 $2..." 
	curl -s -f $1/$2.tar.gz -o $2.tar.gz 
	ERROR=$? 
	if [ "$ERROR" -eq "0" ]; then 
		if [ "$4"x = "true"x ]; then 
			mkdir -p $2 
			tar -xf $2.tar.gz -C ./$2 
		fi 
		echo " $2 更新完毕" 
	else 
		if [ "$3"x = "true"x ]; then 
		echo " $2 不存在，忽略更新" 
	 else 
		error " [$ERROR]更新 $2 失败" 1 
	  fi 
	fi 
}
download_tar $DIST_URL model true true true