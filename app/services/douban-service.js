var request = require("request");
var iconv = require('iconv-lite');
var JSON5 = require('json5');
var debug = require('debug')('api:dangdang');


/**
 * 根据图书的isbn号码获取图书信息
 * @param isbn
 * @param callback
 */
function generateBook(isbn, callback) {
    var options = {
        url: 'https://api.douban.com/v2/book/isbn/' + isbn,
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
            if (err) return callack(err,res);

            var html = iconv.decode(res.body, "utf-8");

            var json5 = JSON5.parse(html);

            var item = {
                name: json5.title,
                url: json5.alt,
                image: json5.image.replace('/mpic/','/lpic/'),
                isbn10: json5.isbn10,
                isbn13: json5.isbn13,
                author: json5.author,
                authorIntro: json5.author_intro,
                publisher: json5.publisher,
                publishTime: json5.pubdate,
                subTitle: json5.subtitle,
                price: json5.price,
                abstract: json5.summary,
                catalog: json5.catalog,
                page: json5.pages,
                tags: json5.tags
            };

            callback(null, item);
        }
    );
}

module.exports = {
    generateBook: generateBook
};