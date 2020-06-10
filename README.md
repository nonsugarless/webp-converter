# @nonsugarless/webp-converter
[![Build Status](https://travis-ci.org/nonsugarless/webp-converter.svg?branch=master)](https://travis-ci.org/nonsugarless/webp-converter)

"@nonsugarless/webp-converter" is the wrapper of [webp-converter](https://www.npmjs.com/package/webp-converter) that allows you convert and delete WebP Images more easily.

# Features
You can convert images to WebP Images and delete unnecessary WebP Images automatically.

# Installation
```bash
yarn add -D @nonsugarless/webp-converter
```
or
```bash
npm install --save-dev @nonsugarless/webp-converter
```
# Usage
## Convert all images
```bash
$ webp-cli convert
```

## Start to watch images directory
 ```bash
$ webp-cli watch
```
WebP Images will be converted automatically when images are added, changed and deleted.

## Delete converted WebP Images
```bash
$ webp-cli clean
```
Delete converted WebP Images whose original one no longer exists in `originalDir`

```bash
$ webp-cli clean --all
```
Delete *all* WebP Images from `destDir`

# Default configuration

|Prop                     |Default                  |Description                                                                                                             |
|-------------------------|-------------------------|------------------------------------------------------------------------------------------------------------------------|
|`destDir`                |"./htdocs/img/"          |Path to output images directory from project root                                                                       |
|`originalDir`            |"./htdocs/img/"          |Path to input images directory from project root                                                                        |
|`targetExt`              |".+(jpg\|jpeg\|png\|gif)"|Extension of convert files                                                                                               |
|`excludeFileNames`       |["apple-touch-icon.png"] |Array of filenames that you don't want to convert                                                                        |
|`excludeDirNames`        |[]                       |Array of relative path from `originalDir` that you don't want to convert                                                |
|`webpConverterOption`    |"-q 85"                  |[WebP convert options](https://developers.google.com/speed/webp/docs/cwebp#options)                                     |
|`webpConverterGifOption` |"-q 85"                  |[Gif WebP convert options](https://developers.google.com/speed/webp/docs/gif2webp#options)                                 |

# Optional configuration
You can use an optional configuration `.webpconverterrc` file in JSON or YAML format or `webpconverter.config.js` file exporting a JS object by setting it project root directory. See [cosmiconfig](https://github.com/davidtheclark/cosmiconfig#readme) docs for more details.
```bash
{
	"destDir": "./dest/img/",
	"originalDir": "./src/img/",
	"targetExt": ".+(jpg|png|gif)",
	"excludeFileNames": ["apple-touch-icon.png", "og-image.png"],
	"excludeDirNames": ["foo/bar"], // ignore all files below ./dest/img/foo/bar/
	"webpConverterOption": "-q 75 -sharp_yuv -m 5 -mt",
	"webpConverterGifOption": "-q 90 -m 5 -mt"
}
```

# API

Also you can use this as Node.js functions.
 ```
import { convertAll, watch, clean, cleanAll } from '@nonsugarless/webp-converter';

convertAll();
```
It will be applied your configuration.

# License
[MIT](https://en.wikipedia.org/wiki/MIT_License)

