const image = require('../src/image-resize')
const sharp = require('sharp')
jest.mock('sharp')

describe('image-resize', () => {
  test('should call resize and return an image resized by height', async () => {
    const someImage = {
      height: 512,
      width: 256
    }
    sharp().metadata.mockResolvedValue(someImage)

    await image.resize(someImage)

    expect(sharp).toHaveBeenCalled()
    expect(sharp().resize).toHaveBeenCalledWith({ height: 512 })
    expect(sharp().toFormat).toHaveBeenCalledWith('png')
    expect(sharp().toBuffer).toHaveBeenCalled()
  })

  test('should call resize and return an image resized by width', async () => {
    const someImage = {
      height: 256,
      width: 512
    }
    sharp().metadata.mockResolvedValue(someImage)

    await image.resize(someImage)

    expect(sharp).toHaveBeenCalled()
    expect(sharp().resize).toHaveBeenCalledWith({ width: 512 })
    expect(sharp().toFormat).toHaveBeenCalledWith('png')
    expect(sharp().toBuffer).toHaveBeenCalled()
  })
})
