const express = require('express');
const router = express.Router();
const { fileUpload } = require('../controllers/fileUploadController');

router.post('/file-upload', fileUpload);

module.exports = router;