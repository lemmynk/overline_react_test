const express = require('express');
const User = require('../../models/User');
const crudController = require('../../controllers/crudController');

const router = express.Router();

const userCrudCtrl = crudController(User);
router.get('/', userCrudCtrl.allByVersion);

module.exports = router;
