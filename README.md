# Watermark-Image

Small tool to watermark all images in a folder and saving them.
You also can configure the corner which the watermark will be added to and additional paddings.


## Getting Started

* Clone the project
* ```npm install``` install dependencies
* ```npm start```   run the app with example images
* Edit the configuration file according to your needs
* Watermark all your images!


### Configuration File [config.js](config.js)

* **folderPath**: relative path to the images to process and watermark
* **watermarkName**: name of the watermark image file (inside the images folder)
* **watermarkPadding**: padding x and y values relative to the image borders
* **align**:  position of the watermark inside the image? Possible values: bl, br, tl, tr (b = bottom, t = top, l = left, r = right)
* **watermarkIdentifier**: this identifier will be appended to the watermarked image

## Example

* Clone the project
* Edit the configuration file according to your needs

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.