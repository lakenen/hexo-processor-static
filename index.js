var processor = hexo.extend.processor;
var pathFn = require('path');
processor.register('_static/*path', function static_processor(data) {
  var Asset = hexo.model('Asset');
  var path = data.path,
  src = pathFn.join('source', path),
  doc = Asset.findOne({source: src});

  if (data.type === 'delete'){
      if (doc) {
          return doc.remove();
      }

      return;
  }

  var id = data.source.substring(hexo.base_dir.length).replace(/\\/g, '/');
  return Asset.save({
      _id: id,
      path: path.replace('_static',''),
      modified: data.type !== 'skip',
      renderable: false
  })
});
