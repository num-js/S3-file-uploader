const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

module.exports = { S3 };