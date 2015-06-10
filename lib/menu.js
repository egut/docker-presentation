'use strict';

var MENU = {
    'overview': '',
    'awesome_v0':'',
    'awesome_v1':'',
    'awesome_v2':'',
    'awesome_v3':'',
    'docker':'',
    'docker_dockerfile':'',
    'docker_docker':'',
    'docker_dockerv2':'',
    'docker_compose':'',
    'docker_compose_v2':''
};

function Menu(active_item) {

    var items = active_item.split('_');
    var current;

    //reset menu;
    for (var menu in MENU) {
        if (menu)
            MENU[menu] = '';
    }
    for (var i = 0; i < items.length; i++) {
        if (!current) {
            current = items[i];
        } else {
            current +=  "_" + items[i];
        }
        MENU[current] = 'active';
    }
    return MENU;
}

module.exports = Menu;