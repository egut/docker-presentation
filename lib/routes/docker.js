'use strict';

var express = require('express'),
    router = express.Router(),
    menu = require('../menu'),
    debug = require('debug')('app:awesome');


router.get('/dockerfile', function(req, res) {
    var data = {
        menu: menu('docker_dockerfile'),
        layout: "template"
        };

    res.render('dockerfile', data);

});

router.get('/docker', function(req, res) {
    var data = {
        menu: menu('docker_docker'),
        layout: "template"
        };

    res.render('docker', data);

});

router.get('/docker_v2', function(req, res) {
    var data = {
        menu: menu('docker_dockerv2'),
        layout: "template"
        };

    res.render('docker_v2', data);

});

router.get('/docker_compose', function(req, res) {
    var data = {
        menu: menu('docker_compose'),
        layout: "template"
        };

    res.render('docker_compose', data);

});

router.get('/docker_compose_v2', function(req, res) {
    var data = {
        menu: menu('docker_composev2'),
        layout: "template"
        };

    res.render('docker_compose_v2', data);

});



module.exports = router;