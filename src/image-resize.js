const sharp = require('sharp');

exports.resize = async (file) => {
  const image = sharp(file)
  const metadata = await image.metadata()

  if (metadata.height > metadata.width) {
    return image
      .resize({ height: 512 })
      .toFormat('png')
      .toBuffer()
  } else {
    return image
      .resize({ width: 512 })
      .toFormat('png')
      .toBuffer()
  }
}
