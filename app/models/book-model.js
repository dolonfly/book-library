"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connection = require('./mongo').defaultConnection();

var BookSchema = new Schema({
    name: String,
    url: String,
    image: String,
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
    tags: Schema.Types.Mixed,
    stock: {type: Number, default: 1}

}, {
    collection: 'books'
});

var Book = connection.model('Book', BookSchema);

module.exports = Book;