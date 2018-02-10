const Jimp = require('jimp');
const fs = require('fs');
const config = require('./config');


// first read the watermark picture
Jimp.read(config.folderPath + config.watermarkName).then(watermark => {

    fs.readdir(config.folderPath, (err, files) => {

        // no files found
        if (files === undefined) {
            console.log('No files found at relative path');
            return;
        }
        files.forEach(file => {
            // exclude watermark and already watermarked images
            if (file.indexOf(config.watermarkIdentifier) !== -1 || file.indexOf(config.watermarkName) !== -1) {
                return;
            }
            Jimp.read(config.folderPath + file).then(img => {

                // set padding
                let x = 0;
                let y = 0;
                let align = config.align;

                if (align.charAt(0) === 'b') {
                    y = img.bitmap.height - watermark.bitmap.height - config.watermarkPadding.y;
                } else if (align.charAt(0) === 't') {
                    y = config.watermarkPadding.y;
                } else {
                    console.log('unknown align format');
                }

                if (align.charAt(1) === 'l') {
                    x = config.watermarkPadding.x;
                } else if (align.charAt(1) === 'r') {
                    x = img.bitmap.width - watermark.bitmap.width - config.watermarkPadding.x;
                } else {
                    console.log('unknown align format');
                }

                // place watermark above image
                return img.composite(watermark, x, y).write(`${config.folderPath + config.watermarkIdentifier}_${file.split('.')[0]}.${file.split('.')[1]}`, data => {
                    console.log('Success!');
                });
            }).catch(err => {
                console.log(err);
            });
        });
    });
}).catch(err => {
    console.error(err);
});

