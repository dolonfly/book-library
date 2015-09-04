var express = require('express');
var router = express.Router();
var book_info = require('../api/book-info');

router.get('/book', book_info.generateBookInfo);

module.exports = router;