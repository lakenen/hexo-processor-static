var processor = hexo.extend.processor;
var copy_src, copy_dst;

var fs = require('hexo-fs');
var pathFn = require('path');

if (hexo.config.copy_md_src) {
    copy_src = hexo.config.copy_md_src;
} else {
    copy_src = '_static';
}

if (hexo.config.copy_dst) {
    copy_dst = hexo.config.copy_md_dst;
} else {
    copy_src = '';
}

var copy_dst = hexo.config.copy_md_dst;

if ( fs.exists(copy_src)) {
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
}
