const express = require('express');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
require('dotenv/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(expressFileUpload());

app.use('/file', require('./routes/fileUploadRoute'))

app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Welcome to File-Upload-S3, use this route for file Upload - /file/file-upload'
    });
});

module.exports = app;