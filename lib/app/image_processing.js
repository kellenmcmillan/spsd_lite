var multer = require('multer');
var logger = require('logfmt');
var fs = require('fs');
var path = require('path');

var MAGIC_NUMBERS = {
    jpg: 'ffd8ffe0',
    jpg1: 'ffd8ffe1',
    png: '89504e47',
    gif: '47494638'
}

function process_media_files(data ,cb){
    function checkMagicNumbers(magic) {
        if (magic == MAGIC_NUMBERS.jpg || magic == MAGIC_NUMBERS.jpg1 || magic == MAGIC_NUMBERS.png || magic == MAGIC_NUMBERS.gif) return true
    }

    var upload = multer({
        storage: multer.memoryStorage()
    }).single('userFile')
    upload(data, res, function(err) {
        var buffer = data.file.buffer
        var magic = buffer.toString('hex', 0, 4);
        var filename = data.file.fieldname + '-hi-res-' + Date.now() + path.extname(data.file.originalname);
        if (checkMagicNumbers(magic)) {
            fs.writeFile('lib/web/public/assets/uploads/' + filename, buffer, 'binary', function(err) {
                if (err) throw err
                function cb(){ return filename; }
            })
        } else {
            logger.log({ type: 'Image Upload', msg: 'Error Uploading', status: 'Fail' });
            function cb(){ return null; }
        }
    });
}

module.exports = {process_media_files: process_media_files};

