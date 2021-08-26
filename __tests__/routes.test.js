const server = require('../src/index');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const axios = require('axios')

jest.mock('axios')
jest.mock('../src/image-resize')

describe('express routes', () => {
  test('should make a get request to / and return data', async () => {
    const response = {
      data: 'someData'
    }
    axios.get.mockResolvedValue(response)

    const res = await requestWithSupertest.get('/')

    expect(res.status).toEqual(200)
    expect(res.text).toEqual(response.data)
  })

  test('should make a get request to / and throw error', async () => {
    const err = {
      text: 'Error'
    }
    axios.get.mockRejectedValue(err)

    const res = await requestWithSupertest.get('/')

    expect(res.status).toEqual(500)
    expect(res.text).toEqual('Oops, something went wrong')
  })
})
