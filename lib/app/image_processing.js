var logger = require('logfmt');
var fs = require('fs');
var path = require('path');

FileUploadController = function() {};

FileUploadController.prototype.uploadFile = function(req, res) {
    logger.log({ type: 'Image Upload Request Data', msg: req.data, status: 'informative' });
  /**
   * The following takes the blob uploaded to an arbitrary location with
   * a random file name and copies it to the specified file.path with the file.name.
   * Note that the file.name should come from your upload request on the client side
   * because when the file is selected it is paired with its name. The file.name is
   * not random nor is the file.path.
   */
  fs.readFile(req.data.file.path, function (err, data) {
    // set the correct path for the file not the temporary one from the API:
    var file = "/app/lib/web/public/assets/uploads/" + req.data.file.name;

    // copy the data from the req.files.file.path and paste it to file.path
    fs.writeFile(file, data, function (err) {
      if (err) {
        return console.warn(err);
      }
        logger.log({ type: 'Image Upload', msg: 'Image Uploaded Successfully', status: 'Success' });
    });
  });
}

module.exports = new FileUploadController();

