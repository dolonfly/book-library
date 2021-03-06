var douban_service = require("../services/douban-service");
var book_service = require("../services/book-service");
var Resout = require("../models/result");

function generateBookInfo(req, res, next) {
    var isbn = req.param('isbn');
    if (isbn == null || (isbn.length != 10 && isbn.length != 13)) {
        res.state(400).send({
            message: 'isbn is not a valid value'
        });
        return;
    }
    book_service.findByIsbn(isbn, function (err, data) {
        if (err) {
            res.send({
                code: 400,
                msg: "search book by isbn err"
            });
        } else {
            if (data) {
                res.json({code: 200, data: data});
            } else {
                res.status(404).send({
                    message: 'the book not found'
                });
                return;
            }
        }
    });
}

function addBook(req, res, next) {
    var isbn = req.query.isbn;
    if (isbn == null || (isbn.length != 10 && isbn.length != 13)) {
        res.state(400).send({
            message: 'isbn is not a valid value'
        });
        return;
    }
    book_service.addStock(isbn, 1, function (err, resout) {
        if (err) {
            res.state(500).send({
                message: 'service seems make some err'
            });
            return;
        } else {
            res.json({
                code: 200,
                data: {
                    stock: resout.stock
                }
            });
        }
    });
}


/**
 * 通过isbn或者图书名称进行查找，如果存在isbn，则返回结果为1个，如果为title，返回结果为多个
 * @param req
 * @param res
 * @param next
 */
function find(req, res, next) {
    var isbn = req.param('isbn');
    var title = req.param('title');
    var result = new Resout(0, null);
    if (isbn == null && title == null) {
        result.message = "参数不符合要求或者为null，需要isbn或title";
        res.json(result);
        return;
    }
    if (isbn != null) {
        book_service.findByIsbn(isbn, function (err, data) {
            if (!err) {
                result.code = 200;
                result.data = data;
            }
            res.json(result);
        });
    } else if (title != null) {
        book_service.findByTitle(title, function (err, data) {
            if (!err) {
                result.code = 200;
                result.data = data;
            }
            res.json(result);
        });
    }
}

function deleteBookById(req, res, next) {
    var id = req.param('id');
    if (id != null) {
        console.log("id" + id);
        book_service.changeStock(id, 0, function (err, resout) {
            if (!err) {
                res.json('{"success":true}');
                return;
            }
        })
    } else
        res.json('{"success":false}');
}

/**
 * 列出最新的20个图书
 * @param req
 * @param res
 * @param next
 */
function listNewBooks(req, res, next) {
    book_service.listLatestBooks(20, function (err, data) {
        var result = new Resout(0, null);
        if (!err) {
            result.code = 200;
            result.data = data;
            res.json(result);
        } else {
            res.status(400).send({
                code: 400,
                message: 'it seems some err in service,please try again'
            });
        }
    });
}

function listBooks(req, res, next) {
    var cursor = req.query.cursor;
    var date = new Date();
    if (cursor) {
        date.setTime(cursor);
    }
    console.log("date:" + date);
    console.log(cursor);
    book_service.listBooks(date, 20, function (err, books) {
        if (err) {
            return next(err);
        }
        cursor = books.length > 0 ? books[books.length - 1].createDate.getTime() : cursor;
        res.json({
            cursor: cursor,
            data: books
        });
    });
}

function count(req, res, next) {
    book_service.listCount(function (err, data) {
        if (err) {
            res.status(400).send({
                code: 400,
                message: 'it seems some err in service,please try again'
            });
        } else {
            res.json({code: 200, count: data});
        }
    });
}

module.exports = {
    generateBookInfo: generateBookInfo,
    addBook: addBook,
    find: find,
    delete: deleteBookById,
    newBooks: listNewBooks,
    count: count,
    listBooks: listBooks
};