'use strict';

var express = require('express'),
    router = express.Router(),
    menu = require('../menu'),
    redis = require('redis'),
    debug = require('debug')('app:awsome');

var port = process.env.REDIS_PORT || 6379;
var host = process.env.REDIS_HOST || 'localhost';
var redisCache = new redis.createClient(port,host);

router.get('/', function(req, res) {
    var data = {
        menu: menu('awsome_v3'),
        layout: "template"
        };

    res.render('awsome_v3',data);

});

router.get('/all', function(req, res) {

    var key = req.params.key;
    redisCache.hgetall("awsome_v3", function(err, data) {
        debug("Get key", key, err, data);
        if(err) {
            res.status(200).send({
                'status':'error',
                'error': err});
        } else {
            res.status(200).send({'data': data});
        }
    });
});

router.put('/:key/:value', function(req, res) {
    var key = req.params.key;
    var value = req.params.value;
    redisCache.hset('awsome_v3', key, value, function(err) {
        if(err) {
            res.status(200).send({
                'status':'error',
                'error': err});
        } else {
            res.status(200).send({
                'status':'ok',
                'value': value});
        }
    });
});


module.exports = router;