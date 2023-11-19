const Alltask = require('../Schemas/alltasks');
const tasking = require('../Apis/TasksApi')
const router = require('express').Router();

router.post('/addtask',tasking.addtask)
router.get('/removetask/:taskid',tasking.deletetask)
router.get('/alltasks',tasking.gettasks)

module.exports = router