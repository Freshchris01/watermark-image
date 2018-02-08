const Jimp = require('jimp');
const prompt = require('prompt');
const testFolder = './tests/';
const fs = require('fs');

// prompt User Input
prompt.start();
prompt.get(['relativeFolderPath', 'alignMethod'], function (err, result) {
    const align = result.alignMethod;
    const folderPath = result.relativeFolderPath;

    const watermarkPadding = { x: 20, y: 20 };

    // first read the watermark picture
    Jimp.read('watermark.png').then(watermark => {

        fs.readdir(folderPath, (err, files) => {

            // no files found
            if (files === undefined) {
                console.log('No files found at relative path');
                return;
            }
            files.forEach(file => {
                if (file.indexOf('watermarked') !== -1) {
                    return;
                }
                Jimp.read(folderPath + file).then(img => {

                    // set padding
                    let x = 0;
                    let y = 0;

                    if (align.charAt(0) === 'b') {
                        y = img.bitmap.height - watermark.bitmap.height - watermarkPadding.y;
                    } else if (align.charAt(0) === 't') {
                        y = watermarkPadding.y;
                    } else {
                        console.log('unknown align format');
                    }

                    if (align.charAt(1) === 'l') {
                        x = watermarkPadding.x;
                    } else if (align.charAt(1) === 'r') {
                        x = img.bitmap.width - watermark.bitmap.width - watermarkPadding.x;
                    } else {
                        console.log('unknown align format');
                    }

                    // place watermark above image
                    return img.composite(watermark, x, y).write(folderPath + `watermarked_${file.split('.')[0]}.${file.split('.')[1]}`, data => {
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
});

