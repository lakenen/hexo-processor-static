var processor = hexo.extend.processor;

var fs = require('graceful-fs'),
  pathFn = require('path');

processor.register('_static/*path', function(data, callback){
  var Asset = hexo.model('Asset');
  var path = data.path,
    src = pathFn.join('source', path),
    doc = Asset.findOne({source: src});

  if (data.type === 'delete' && doc){
    hexo.route.remove(path);
    doc.remove();

    return callback();
  }

  doc.path = path;
  doc.save();

  Asset.updateStat(src, function(err, modified){
    if (err) {
      return callback(err);
    }

    var content = function(fn){
      fn(null, fs.createReadStream(data.source));
    };

    content.modified = modified;

    hexo.route.set(data.params.path, content);
    callback();
  });
});
