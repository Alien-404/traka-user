const router = require('express').Router();
const { scheduleController } = require('../controllers');

// schedule
router.get('/schedule', scheduleController.index);
router.get('/schedule/ongoing', scheduleController.ongoing);

module.exports = router;
