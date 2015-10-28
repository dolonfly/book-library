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
        }
        res.json(result);
    });
}

module.exports = {
    generateBookInfo: generateBookInfo,
    find: find,
    delete: deleteBookById,
    newBooks: listNewBooks
};