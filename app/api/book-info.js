var douban_service = require("../services/douban-service");

function generateBookInfo(req, res, next) {
    var isbn = req.param('isbn');
    if (isbn == null) {

    }

    douban_service.generateBook(isbn, function (err, resout) {
        res.json(resout);
    });

    next();
}

module.exports = {
    generateBookInfo: generateBookInfo
};