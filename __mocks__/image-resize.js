const resize = jest.fn().mockReturnThis()

module.exports = jest.fn(() => resize)
