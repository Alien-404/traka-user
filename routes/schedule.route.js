const router = require('express').Router();
const scheduleController = require('../controllers/schedule.controller');

router.get('/', scheduleController.index);

module.exports = router;
