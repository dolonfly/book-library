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
        res.json('{"sucess":false}');
    }
    douban_service.generateBook(isbn, function (err, resout) {
        if (err)
            res.json('{"sucess":false}');
        else {
            book_service.save(resout, function (err, res1) {
                if (err) {
                    res.json('{"sucess":false}');
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

module.exports = {
    generateBookInfo: generateBookInfo,
    saveBook: saveBookByIsbn,
    find: find
};