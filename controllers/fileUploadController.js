const { S3 } = require('./S3Setup');

/**
 * File Upload into S3 Bucket
 * @param {object} req - Request
 * @param {object} res - Responce
 */
const fileUpload = async (req, res) => {
    if (req.files) {
        //File Upload to S3
        const file = req.files.file;

        let dirName = getDirName(req.body.upload_type);
        var uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: dirName + file.name,
            ContentType: file.mimetype,
            ACL: 'public-read',
            Body: file.data,
        };

        const uploadRes = await new Promise((resolve, reject) => {
            S3.upload(uploadParams, (err, data) => {
                if (err) {
                    reject(err);
                } if (data) {
                    resolve(data)
                }
            })
        });

        //Send response to front-end
        res.status(200).json({
            msg: 'File Uploaded',
            data: {
                upload_type: req.body.upload_type
            },
            file: {
                file_link: uploadRes.Location,
                file_key: uploadRes.key,
            }
        })
    } else {
        res.status(422).json({
            msg: 'File is missing, please choose a file first'
        })
    }
}

/**
 * Return S3 Bucket's Directory Name based on the file upload type
 * @param {string} upload_type 
 * @returns S3 Bucket's Directory Name
 */
const getDirName = (upload_type) => {
    let dirName;
    switch (upload_type) {
        case 'file':
            dirName = 'dashboard-files/';
            break;

        case 'profile':
            dirName = 'user-profile/'
            break;

        case 'company_logo':
            dirName = 'company-logo/'
            break;

        case 'company_video':
            dirName = 'company-promo-video/'
            break;

        case 'meeting_logo':
            dirName = 'meeting-logo/'
            break;

        case 'meeting_video':
            dirName = 'meeting-promo-video/'
            break;

        default:
            dirName = 'dashboard-files/';
    }
    return dirName;
}

module.exports = { fileUpload };