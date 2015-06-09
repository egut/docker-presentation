'use strict';

var express = require('express'),
    router = express.Router(),
    menu = require('../menu'),
    debug = require('debug')('app:awsome');


router.get('/', function(req, res) {
    var data = {
        menu: menu('overview'),
        layout: "template"
        };

    res.render('overview', data);

});

module.exports = router;