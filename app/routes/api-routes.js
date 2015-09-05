var express = require('express');
var router = express.Router();
var book_info = require('../api/book-info');

router.get('/book', book_info.generateBookInfo);
router.get('/book_save', book_info.saveBook);
router.get('/book_find', book_info.find);

module.exports = router;