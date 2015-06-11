'use strict';

var express = require('express'),
    router = express.Router(),
    menu = require('../menu'),
    debug = require('debug')('app:awesome');

var storage = {};

router.get('/', function(req, res) {
    var data = {
        menu: menu('awesome_v0'),
        layout: "template"
        };

    res.render('awesome_v0',data);

});

router.get('/all', function(req, res) {
    res.status(200).send({
        'data': storage});
});

router.put('/:key/:value', function(req, res) {
    var key = req.params.key;
    var value = req.params.value;
    storage[key] = value;
    res.status(200).send({'status':'ok'});
});


module.exports = router;