const express = require('express');
const { registerEntry } = require('../controllers/entryController');
const router = express.Router();

router.post('/', registerEntry);

module.exports = router;