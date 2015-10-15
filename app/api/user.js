"use strict"

var User = require("../models/user-model");
var user_service = require("../services/user-service");

function login(req, res, next) {
    var userName = req.query.u;
    var password = req.query.p;
    if (!userName || !password) {
        res.status(400).send({
            message: 'username and password must be exist'
        });
        return;
    }
    user_service.login(userName, password, function (err, user) {
            if (err) {
                res.status(400).send({
                    message: err.message || "user not exist"
                });
            } else {
                console.log("user:" + user);
                if (!user) {
                    res.json({
                        message: 'user not found'
                    });
                    return;
                } else {
                    res.json({
                        id: user._id,
                        userName: user.userName,
                        token: user.authority.token,
                        permission: user.permission
                    });
                }

            }
        }
    )
    ;
}

function logon(req, res, next) {
    var userName = req.query.u;
    var password = req.query.p;
    if (!userName || !password) {
        res.status(400).send({
            message: 'username and password must be exist'
        });
        return;
    }
    user_service.register(userName, password, function (err, user) {
        if (err) {
            res.status(400).send({
                message: err.message || 'service make some err,please try again later'
            });
            return;
        } else {
            res.json({
                id: user._id,
                userName: user.userName,
                token: user.authority.token,
                permission: user.permission
            });
        }

    });
}

module.exports = {
    login: login,
    logon: logon
};
