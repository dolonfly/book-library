"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var connection = require("./mongo").defaultConnection();

var PreOrderSchema = new Schema({
    userName: String,
    books: []
}, {
    collection: 'pre_orders'
});

var PreOrder = connection.model('PreOrder', PreOrderSchema);

module.exports = PreOrder;