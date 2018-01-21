# hexo-processor-static

Copies files from one folder to another without converting them to HTML files. This allows you to keep files at the destination in the original markdown format.

## Installation
``` bash
$ npm install hexo-processor-static --save
```
## Configuration
Add the following snippet in `_config.yml`.

Minimal config to enable filters for HTML, CSS, Js and images.
```yaml
copy_src: "_static" // name of the directory you want to copy from _static by default
copy_dst: "" //name of the directory you want to copy the files to '' by default
```
- **copy_src** - Name of the directory you want to copy from _static by default
- **copy_dst** - Name of the directory you want to copy the files to '' by default, which places the files in the root output directory

## License

MIT
