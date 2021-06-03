const sharp = require('sharp');

exports.resize = async (tmpDir, file) => {
  const image = sharp(file)
  const metadata = await image.metadata()

  if (metadata.height > metadata.width) {
    return image
      .resize({ height: 512 })
      .toFile(`./${tmpDir}/temp.png`)
  } else {
    return image
      .resize({ width: 512 })
      .toFile(`./${tmpDir}/temp.png`)
  }
}
