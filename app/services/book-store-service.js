var request = require("request");
var iconv = require('iconv-lite');
var JSON5 = require('json5');


/**
 * 根据图书的isbn号码获取图书信息
 * @param isbn
 * @param callback
 */
function generateBook(isbn, callback) {
    var options = {
        url: 'http://isbn.itfengzi.com/api/v1/isbn/search?isbn=' + isbn,
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
            if (err) return callack(err, res);

            var html = iconv.decode(res.body, "utf-8");

            var json5 = JSON5.parse(html);

            if (json5.code != 200) {
                return callback(json5);
            }
            json5 = json5.data;
            callback(null, json5);
        }
    );
}

module.exports = {
    generateBook: generateBook
};