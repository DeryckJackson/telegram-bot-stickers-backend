const sharp = require('sharp');

exports.resize = (file) => {
  const image = sharp(file)
  const metadata = image.metadata()
  if (metadata.height > metadata.width) {
    image
      .resize({ height: 512 })
      .toFile('./temp/temp.png')
  } else {
    image
      .resize({ width: 512 })
      .toFile('./temp/temp.png')
  }
}
