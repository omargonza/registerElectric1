const express = require('express');
const taskController = require('../controllers/taskController');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/list',taskController.getTasksall);

module.exports = router;