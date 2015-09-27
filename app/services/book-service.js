'use strict';

var Book = require("../models/book-model");

function saveBook(book, callback) {
    Book.create(book, function (err, result) {
        console.log("save done");
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

function findByIsbn(isbn, callback) {
    var obj;
    if (isbn.length == 13) {
        obj = {isbn13: isbn};
    } else {
        obj = {isbn10: isbn};
    }
    Book.findOne(obj, function (err, doc) {
        callback(err, doc);
    });
}

function findByTitle(title, callback) {
    Book.find({
        $or: [
            {name: new RegExp(title, 'i')}, {subTitle: new RegExp(title, 'i')}
        ]
    }).limit(20).exec(function (err, res) {
        callback(err, res);
    });
}

function changeSrock(id, stock, callback) {
    Book.findById(id, function (err, found) {
            if (!err) {
                found.stock = stock;
                found.save(callback);
            }
        }
    );
}

function listLatestBooks(limit, callback) {
    Book.find({}, {"_id": 0, name: 1,images:1,isbn10:1,isbn13:1,author:1,page:1}).limit(limit).sort({_id: -1}).exec(callback);
}

module.exports = {
    save: saveBook,
    findByIsbn: findByIsbn,
    findByTitle: findByTitle,
    changeStock: changeSrock,
    listLatestBooks: listLatestBooks
};

