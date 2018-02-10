let config = {};
config.watermarkName = 'watermark.png';

// padding of the watermark
config.watermarkPadding = { x: 20, y: 20 };
config.folderPath = 'images/';

/*possible values: bl, br, tl, tr
b = bottom
t = top
l = left
r = right
*/
config.align = 'bl'
config.watermarkIdentifier = 'watermarked';

module.exports = config;