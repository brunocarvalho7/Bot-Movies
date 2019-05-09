const express = require('express');
const router = express.Router();
const controller = require('./../controllers/botController')

router.get('/', controller.get);
router.get('/media', controller.getMedia);

module.exports = router;