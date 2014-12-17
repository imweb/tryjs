var map = require('map-stream')
  , tpl = require('micro-tpl')
  , stripJsonComments = require('strip-json-comments')
  , fs = require('fs')
  , path = require('path')
  , config = JSON.parse(
    stripJsonComments(
      fs.readFileSync(path.join(__dirname, '../config.json'), 'utf-8')
    )
  );

function build(file, cb) {
  file.contents = new Buffer(tpl(file.contents.toString(), { 
    ret: 'function', 
    path: file.path,
    type: 'javascript' 
  })(config));
  cb(file);
}

module.exports = function () {
  return map(function (file, cb) {
    if (file.isNull()) {
      cb(null, file);
    }

    if (file.isBuffer()) {
      var self = this;
      build(file, function (file) {
        cb(null, file);
      });
      return;
    }

    if (file.isStream()) {
      return cb(new Error('Streams are not supported!'));
    }
  })
}