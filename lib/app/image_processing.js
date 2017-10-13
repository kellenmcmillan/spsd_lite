var logger = require('logfmt');
var fs = require('fs');
var path = require('path');

var MAGIC_NUMBERS = {
    jpg: 'ffd8ffe0',
    jpg1: 'ffd8ffe1',
    png: '89504e47',
    gif: '47494638'
}

FileUploadController = function() {};

FileUploadController.prototype.uploadFile = function(req, res) {
    var buffer = req.files.file.buffer
    var magic = buffer.toString('hex', 0, 4);
    if (checkMagicNumbers(magic)) {
        /**
        * The following takes the blob uploaded to an arbitrary location with
        * a random file name and copies it to the specified file.path with the file.name.
        * Note that the file.name should come from your upload request on the client side
        * because when the file is selected it is paired with its name. The file.name is
        * not random nor is the file.path.
        */
        fs.readFile(req.files.file.path, function (err, data) {

            // set the correct path for the file not the temporary one from the API:
            file.path = "/app/lib/web/public/assets/uploads/" + file.name;

            // copy the data from the req.files.file.path and paste it to file.path
            fs.writeFile(file.path, data, function (err) {
                if (err) {
                    logger.log({ type: 'Image Upload', msg: 'Error Uploading', status: 'Fail' });
                    return console.warn(err);
                }
                logger.log({ type: 'Image Upload', msg: 'Upload Successful', status: 'Success' });
            });

        });
    } else {
        logger.log({ type: 'Image Upload', msg: 'Error Uploading - Malicious Content Suspected', status: 'Fail' });
        return null;
    }
}

module.exports = new FileUploadController();

