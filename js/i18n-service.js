'use strict';

var gTrans = {
    header: {
        en: 'My Book Shop',
        he: 'חנות הספרים שלי'
    },
    title: {
        en: 'title',
        he: 'כותר'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    rating: {
        en: 'Rating',
        he: 'דירוג'
    },
    actions: {
        en: 'actions',
        he: 'פעולות'
    },
    add: {
        en: 'Add To List',
        he: 'הוסף כותר לרשימה'
    },
    'insert-title': {
        en: 'Insert Book Name',
        he: 'הכנס כותר חדש'
    },
    'insert-price': {
        en: 'Insert Book Name',
        he: 'הכנס מחיר'
    },
    sure: {
        en: 'Are you sure?',
        he: 'בטוח נשמה?'
    },
    'set-rating': {
        en: 'Set Rating',
        ge: 'הכנס דירוג'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    'remove-all': {
        en: 'Remove All',
        he: 'הסר הכל'
    },
    read: {
        en: 'Read',
        he: 'תקציר'
    },
    update: {
        en: 'Update',
        he: 'עדכן מחיר'
    },
    delete: {
        en: 'Delete',
        he: 'הסר מהרשימה'
    },
    id: {
        en: 'Id',
        he: 'מספר סידורי'
    },
    currency:{
        en: '$',
        he:'ש"ח'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {    
    if (!transKey) return 'UNKNOWN';
    var transMap = gTrans[transKey];    
    var trans = transMap[gCurrLang];
    if (!trans) trans = transMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];        
        var transKey = el.dataset.trans;        
        var trans = getTrans(transKey);
        if (el.nodeName === 'INPUT') el.placeholder = trans;
        else el.innerText = trans;
    }
}

function setLang(lang) {
    gCurrLang = lang;
}

function getLang(){
    return gCurrLang;
}