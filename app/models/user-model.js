"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var connecton = require("./mongo").defaultConnection();

var UserSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    nickName: String,
    social: {WeChat: String},
    authority: {token: String, expire: Date},
    permission: {addBook: {type: Boolean, default: false}}
}, {
    collection: 'users'
});

var User = connecton.model('User', UserSchema);

module.exports = User;