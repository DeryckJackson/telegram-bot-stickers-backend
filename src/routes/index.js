require('dotenv').config()
const express = require('express')
const router = express.Router()
const multer = require('multer')
const axios = require('axios')
const FormData = require('form-data')
const upload = multer()
const image = require('../image-resize.js')

axios.defaults.baseURL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('/getUpdates')
    res.status(200).send(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Oops, something went wrong')
  }
});

router.post('/pack', upload.single('photo'), async (req, res) => {
  try {
    const buffer = await image.resize(req.file.buffer)

    const user_id = process.env.USER_ID
    const name = req.body.name + '_by_pullups010_bot'
    const title = req.body.title
    const emojis = req.body.emojis

    let formData = new FormData()

    formData.append('user_id', user_id)
    formData.append('name', name)
    formData.append('title', title)
    formData.append('png_sticker', buffer, 'file.png')
    formData.append('emojis', emojis)

    const response = await axios.post(`/createNewStickerSet`, formData, {
      headers: formData.getHeaders()
    })
    res.status(202).send(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Oops, something went wrong.')
  }
})

router.post('/stickers', upload.single('photo'), async (req, res) => {
  try {
    const buffer = await image.resize(req.file.buffer)

    const user_id = process.env.USER_ID
    const name = req.body.name + '_by_pullups010_bot'
    const emojis = req.body.emojis

    let formData = new FormData()

    formData.append('user_id', user_id)
    formData.append('name', name)
    formData.append('png_sticker', buffer, 'file.png')
    formData.append('emojis', emojis)

    const response = await axios.post(`/addStickerToSet`, formData, {
      headers: formData.getHeaders()
    })

    res.status(202).send(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Oops, something went wrong.')
  }
})

module.exports = router
