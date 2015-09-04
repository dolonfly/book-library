"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name: String,
    url: String,
    pics: [String],
    orderId: Number,
    isbn10: String,
    isbn13: String,
    author: String,
    authorIntro: String,
    publisher: String,
    publishTime: String,
    category: String,
    subTitle: String,
    price: String,
    abstract: String,
    catalog: String,
    page: Number,
    tags: [String]

}, {
    collection: 'books'
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;