var processor = hexo.extend.processor;
var copy_src, copy_dst;

var fs = require('hexo-fs');
var pathFn = require('path');
var config = hexo.config;

if (config.copy_src) {
    copy_src = config.copy_src;
} else {
    copy_src = '_static';
}

if (config.copy_dst) {
    copy_dst = config.copy_dst;
} else {
    copy_dst = '';
}

processor.register( copy_src + '/*path', function static_processor(data) {
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
        path: path.replace( copy_src, copy_dst),
        modified: data.type !== 'skip',
        renderable: false
    })
});
