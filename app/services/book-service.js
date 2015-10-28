'use strict';

var Book = require("../models/book-model");
var book_store_service = require('./book-store-service');

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

/**
 * 在本系统中搜索对应isbn的图书信息
 * 如果没有找到，则从其他系统抓取此图书信息，并存入本库中
 * 成功之后，返回对应图书信息
 * @param isbn
 * @param callback
 */
function findByIsbn(isbn, callback) {
    if (isbn.length == 10) {
        isbn = isbnSuite.convert.isbn10to13(isbn);
    }
    Book.findOne({isbn13: isbn}, function (err, doc) {
        if (err) {
            callback(err);
        } else {
            if (!doc) {
                book_store_service.generateBook(isbn, function (err, book) {
                    if (err) {
                        callback(err);
                    } else {
                        saveBook(book, function (err, res) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(err, book);
                            }
                        });

                    }
                });
            } else {
                callback(err, doc);
            }
        }
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

function changeBookStock(id, stock, callback) {
    Book.findById(id, function (err, found) {
            if (!err) {
                found.stock = stock;
                found.save(callback);
            }
        }
    );
}

function addBookStock(id, stockNum, callback) {
    Book.findById(id, function (err, found) {
            if (!err) {
                found.stock = stock + stockNum;
                found.save(callback);
            }
        }
    );
}

function listLatestBooks(limit, callback) {
    Book.find({}, {
        "_id": 0,
        name: 1,
        image: 1,
        isbn10: 1,
        isbn13: 1,
        author: 1,
        page: 1
    }).limit(limit).sort({_id: -1}).exec(callback);
}

module.exports = {
    save: saveBook,
    findByIsbn: findByIsbn,
    findByTitle: findByTitle,
    changeStock: changeBookStock,
    addStock:addBookStock,
    listLatestBooks: listLatestBooks
};

findByIsbn("9787304074951", function (err, res) {
    console.log(err);
    console.log(res);
});
