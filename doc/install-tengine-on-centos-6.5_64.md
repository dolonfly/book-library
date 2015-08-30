## Install Tengine on Centos 6.5_64

### Install latest Tngine:

	download latest Tengine from [official manual](http://tengine.taobao.org/download_cn.html) 
	# at the time we write this doc, Tnginx version is 2.1.1
	$ ./configure
    $ make
    $ sudo make install
    Tengine默认将安装在/usr/local/nginx目录。你可以用'--prefix'来指定你想要的安装目录。

To check if the nginx is running well, access the ip in browser, it will show the default nginx index page located in /usr/share/nginx/html.

### Paths

* 配置所在目录：/usr/local/nginx/conf/
* PID目录：/var/run/nginx.pid
* 错误日志：/var/log/nginx/error.log
* 访问日志：/var/log/nginx/access.log
* 默认站点目录：/usr/share/nginx/html

### 设置开机自启动

#### 编写启动脚本

    vim /etc/init.d/nginx
    
    #!/bin/bash
    # nginx Startup script for the Nginx HTTP Server
    # it is v.0.0.2 version.
    # chkconfig: - 85 15
    # description: Nginx is a high-performance web and proxy server.
    #              It has a lot of features, but it's not for everyone.
    # processname: nginx
    # pidfile: /var/run/nginx.pid
    # config: /usr/local/nginx/conf/nginx.conf
    nginxd=/usr/local/nginx/sbin/nginx
    nginx_config=/usr/local/nginx/conf/nginx.conf
    nginx_pid=/var/run/nginx.pid
    RETVAL=0
    prog="nginx"
    # Source function library.
    . /etc/rc.d/init.d/functions
    # Source networking configuration.
    . /etc/sysconfig/network
    # Check that networking is up.
    [ ${NETWORKING} = "no" ] && exit 0
    [ -x $nginxd ] || exit 0
    # Start nginx daemons functions.
    start() {
    if [ -e $nginx_pid ];then
       echo "nginx already running...."
       exit 1
    fi
       echo -n $"Starting $prog: "
       daemon $nginxd -c ${nginx_config}
       RETVAL=$?
       echo
       [ $RETVAL = 0 ] && touch /var/lock/subsys/nginx
       return $RETVAL
    }
    # Stop nginx daemons functions.
    stop() {
            echo -n $"Stopping $prog: "
            killproc $nginxd
            RETVAL=$?
            echo
            [ $RETVAL = 0 ] && rm -f /var/lock/subsys/nginx /var/run/nginx.pid
    }
    # reload nginx service functions.
    reload() {
        echo -n $"Reloading $prog: "
        #kill -HUP `cat ${nginx_pid}`
        killproc $nginxd -HUP
        RETVAL=$?
        echo
    }
    # See how we were called.
    case "$1" in
    start)
            start
            ;;
    stop)
            stop
            ;;
    reload)
            reload
            ;;
    restart)
            stop
            start
            ;;
    status)
            status $prog
            RETVAL=$?
            ;;
    *)
            echo $"Usage: $prog {start|stop|restart|reload|status|help}"
            exit 1
    esac
    exit $RETVAL
    
    
#### 赋予可以执行权限
     
     chmod 750 nginx
     
#### 测试

     [root@centos211 init.d]# service nginx stop
     停止 nginx：                                               [确定]
     [root@centos211 init.d]# ps -ef|grep nginx
     root      2448  2405  0 10:05 pts/3    00:00:00 grep nginx
     [root@centos211 init.d]# service nginx start
     正在启动 nginx：                                           [确定]
     [root@centos211 init.d]# ps -ef|grep nginx
     root      2459     1  0 10:05 ?        00:00:00 nginx: master process /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
     nobody    2460  2459  0 10:05 ?        00:00:00 nginx: worker process                                        
     root      2463  2405  0 10:05 pts/3    00:00:00 grep nginx

#### 加入开机启动

    [root@centos211 init.d]# chkconfig --list|grep nginx
    [root@centos211 init.d]# chkconfig --add nginx
    [root@centos211 init.d]# chkconfig --list|grep nginx
    nginx           0:关闭    1:关闭    2:关闭    3:关闭    4:关闭    5:关闭    6:关闭
    [root@centos211 init.d]# chkconfig --level 2345 nginx on
    [root@centos211 init.d]# chkconfig --list|grep nginx
    nginx           0:关闭    1:关闭    2:启用    3:启用    4:启用    5:启用    6:关闭

### Useful Commands

	sudo service nginx start|stop|restart|status
	
### useful link

[how to configure the nginx web server on a virtual private server](https://www.digitalocean.com/community/tutorials/how-to-configure-the-nginx-web-server-on-a-virtual-private-server)
	