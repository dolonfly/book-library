"use strict";

var User = require("../models/user-model");
var Random = require("../utils/random");

function register(userName, password, callback) {
    var user = {
        userName: userName,
        password: password
    };
    User.findOne({
        userName: userName,
        password: password
    }, function (err, user) {
        if (err) {
            callback(err);
        } else {
            if (user) {
                callback({message: 'user already exist'})
            } else {
                User.create(user, callback);
            }

        }
    });
}

function login(userName, password, callback) {
    User.findOne({
        userName: userName,
        password: password
    }, function (err, user) {
        if (err) {
            callback(err);
        } else {
            if (user) {
                reFlushToken(user._id, callback);
            } else {
                callback({message: 'user not exist'})
            }

        }
    });
}

function reFlushToken(id, callback) {
    var random = Random.random(32);
    findById(id, function (err, user) {
        if (!err) {
            user.authority.token = random,
                user.save(callback);
        } else {
            callback(err);
        }
    });
}

function findById(id, callback) {
    User.findById(id, callback);
}

module.exports = {
    register: register,
    login: login
};
