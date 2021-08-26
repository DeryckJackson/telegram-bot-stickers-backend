const result = {
  metadata: jest.fn().mockReturnThis(),
  resize: jest.fn().mockReturnThis(),
  toFormat: jest.fn().mockReturnThis(),
  toBuffer: jest.fn().mockReturnThis()
}

module.exports = jest.fn(() => result)
