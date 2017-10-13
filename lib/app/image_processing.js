var logger = require('logfmt');
var fs = require('fs');
var path = require('path');

FileUploadController = function() {};

FileUploadController.prototype.uploadFile = function(req, res) {

    

        /**
        * The following takes the blob uploaded to an arbitrary location with
        * a random file name and copies it to the specified file.path with the file.name.
        * Note that the file.name should come from your upload request on the client side
        * because when the file is selected it is paired with its name. The file.name is
        * not random nor is the file.path.
        */
        fs.readFile(req.files.file.path, function (err, data) {

            var validFilename = /^[a-z0-9_.@()-]+\.[^.]+$/i.test(file.name);
            var validExtension = /\.jpg$/i.test(file.name);

            // copy the data from the req.files.file.path and paste it to file.path
            if (validFilename && validExtension){

                // set the correct path for the file not the temporary one from the API:
                file.path = "/app/lib/web/public/assets/uploads/" + file.name;

                fs.writeFile(file.path, data, function (err) {

                    if (err) {
                        logger.log({ type: 'Image Upload', msg: 'Error Uploading', status: 'Fail' });
                        return console.warn(err);
                    }
                    logger.log({ type: 'Image Upload', msg: 'Upload Successful', status: 'Success' });

                });

            } else {

                logger.log({ type: 'Image Upload', msg: 'Upload Unsuccessful', status: 'Fail' });
                return;

            }
            

        });

}

module.exports = new FileUploadController();

