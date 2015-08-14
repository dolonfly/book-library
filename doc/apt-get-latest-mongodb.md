# Install MongoDB from mongo repo

Followed [official manual](http://docs.mongodb.org/master/tutorial/install-mongodb-on-ubuntu/?_ga=1.213655892.1187379273.1427267915)

#### 1. Import the public key used by the package management system

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

#### 2. Create a list file for MongoDB.
Create the `/etc/apt/sources.list.d/mongodb-org-3.0.list' list file:

    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

#### 3. Reload local package database

    sudo apt-get update

#### 4. Install mongodb

* To install latest stable version

        sudo apt-get install -y mongodb-org

* To install specific version

        sudo apt-get install -y mongodb-org=3.0.1 mongodb-org-server=3.0.1 mongodb-org-shell=3.0.1 mongodb-org-mongos=3.0.1 mongodb-org-tools=3.0.1

#### 5. Pin a specific version of MongoDB

> Although you can specify any available version of MongoDB, apt-get will upgrade the packages when a newer version becomes available. To prevent unintended upgrades, pin the package. To pin the version of MongoDB at the currently installed version, issue the following command sequence:

    echo "mongodb-org hold" | sudo dpkg --set-selections
    echo "mongodb-org-server hold" | sudo dpkg --set-selections
    echo "mongodb-org-shell hold" | sudo dpkg --set-selections
    echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
    echo "mongodb-org-tools hold" | sudo dpkg --set-selections

#### 6. Default Settings
* port: 27017
* Log files under: `/var/log/mongodb`
* Config file: `/etc/mongod.conf`

#### 7. Mongodb Service

    sudo service mongod start
    sudo service mongod stop
    sudo service mongod restart