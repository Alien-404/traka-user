const router = require('express').Router();
const { scheduleController, notifController } = require('../controllers');
const trakaController = require('../controllers/traka.controller');
const { authHandler } = require('../middleware');

// schedule
router.get('/schedule', scheduleController.index);
router.get('/schedule/ongoing', scheduleController.ongoing);
router.get('/schedule/:route', scheduleController.trakaRoute);

// notifications
router.get('/notification', notifController.index);
router.post('/notification', authHandler, notifController.create);

// traka
router.get('/traka', trakaController.info);
router.put('/traka/status', authHandler, trakaController.trakaStatus);

module.exports = router;
