"use strict";

var PreOrder = require('../models/pre-order-model');
var BookLibraryErr = require('../utils/book-library-err');

function addAPreOrderList(user, book, callback) {
    if (!book || !book.isbn)
        return callback(new BookLibraryErr.BadRequestError());
    if (!user)
        user = {userName: 'admin_', nickName: 'admin_'};

    PreOrder.create({user: user, book: book}, callback);
}

function listPreOrders(callback) {
    PreOrder.find(callback);
}

module.exports = {
    addAPreOrderList: addAPreOrderList,
    listPreOrders: listPreOrders
};