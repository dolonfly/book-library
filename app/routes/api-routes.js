var express = require('express');
var router = express.Router();
var book_info = require('../api/book-info');
var user_api = require('../api/user');

router.get('/book', book_info.generateBookInfo);
router.get('/book/save', book_info.saveBook);
router.get('/book/find', book_info.find);
router.get('/book/delete', book_info.delete);
router.get('/book/news', book_info.newBooks);

router.get('/user/login', user_api.login);
router.get('/user/logon', user_api.logon);

module.exports = router;