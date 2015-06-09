'use strict';

var express = require('express'),
    router = express.Router(),
    redis = require('redis'),
    menu = require('../menu'),
    debug = require('debug')('app:awsome');

var port = process.env.REDIS_PORT || 6379;
var host = process.env.REDIS_HOST || 'localhost';
var redisCache = new redis.createClient(port,host, {'max_attempts':3});
redisCache.on("error", function (err) {
        console.error("Awsome v2 Error " + err);
        redisCache = null;
    });
router.get('/', function(req, res) {
    var data = {
        menu: menu('awsome_v2'),
        layout: "template"
        };

    res.render('awsome_v2',data);

});

router.get('/all', function(req, res) {

    var key = req.params.key;
    if(!redisCache) {
        res.status(500).send({'error': "No REDIS connection!"});
        return;
    } 
    redisCache.hgetall("awsome_v2", function(err, data) {
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
    if(!redisCache) {
        res.status(500).send({'error': "No REDIS connection!"});
        return;
    } 
    redisCache.hset('awsome_v2', key, value, function(err) {
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