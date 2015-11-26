"use strict";

var PreOrder = require('../models/pre-order-model');
var BookLibraryErr = require('../utils/book-library-err');

function addAPreOrderList(userName, book, callback) {
    if (!book || !book.isbn)
        return callback(new BookLibraryErr.BadRequestError());
    userName = userName ? userName : 'admin_';

    PreOrder.findOneAndUpdate({userName: userName}, {$addToSet: {books: book}}, {new: true, upsert: true}, callback);
}

function listPreOrders(callback) {
    PreOrder.find(callback);
}

module.exports = {
    addAPreOrderList: addAPreOrderList,
    listPreOrders: listPreOrders
};