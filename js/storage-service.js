'use strict';

function saveToStorage(key, val) {
    var json = JSON.stringify(val);
    localStorage.setItem(key, json);
}



function loadFromStorage(key) {
    var val = localStorage.getItem(key)  
    var json = JSON.parse(val);
    console.log('json: ',json);
    return json
}