var douban_service = require("../services/douban-service");
var book_service = require("../services/book-service");

function generateBookInfo(req, res, next) {
    var isbn = req.param('isbn');
    if (isbn == null) {

    }

    douban_service.generateBook(isbn, function (err, resout) {
        res.json(resout);
    });
}

function saveBookByIsbn(req, res, next) {
    var isbn = req.param('isbn');
    if (isbn == null) {
        res.json('{"success":false}');
    }
    douban_service.generateBook(isbn, function (err, resout) {
        if (err)
            res.json('{"success":false}');
        else {
            book_service.save(resout, function (err, res1) {
                if (err) {
                    res.json('{"success":false}');
                } else {
                    res.json(res1);
                }
            });
        }
    });
}

function find(req, res, next) {
    var isbn = req.param('isbn');
    var title = req.param('title');
    if (isbn != null) {
        book_service.findByIsbn(isbn, function (err, resout) {
            if (!err) {
                res.json(resout);
            }
        });
    } else if (title != null) {
        book_service.findByTitle(title, function (err, resout) {
            if (!err) {
                res.json(resout);
            }
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

function listNewBooks(req, res, next) {
    book_service.listLatestBooks(function (err, resout) {
        if (!err) {
            res.json(resout);
        } else {
            res.json('{"success":false}');
        }
    });
}

module.exports = {
    generateBookInfo: generateBookInfo,
    saveBook: saveBookByIsbn,
    find: find,
    delete: deleteBookById,
    newBooks: listNewBooks
};