"use strict";

var PreOrderService = require('../services/pre-order-service');

function listPreOrders(req, res, next) {
    PreOrderService.listPreOrders(function (err, orders) {
        if (err)
            return next(err);
        res.json(orders);
    });
}

function addPreOrder(req, res, next) {
    console.log(req.body);
    PreOrderService.addAPreOrderList(req.body.user, req.body.book, function (err, order) {
        if (err)
            return next(err);
        res.json(order);
    });
}

module.exports = {
    listPreOrders: listPreOrders,
    addPreOrder: addPreOrder
};