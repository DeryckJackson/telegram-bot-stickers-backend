require('dotenv').config()
const fs = require('fs')

const express = require('express')
const cors = require('cors')
const multer = require('multer')

const axios = require('axios')
const resize = require('./image-resize.js')
const { dir } = require('console')

const upload = multer()

const app = express()

app.use(cors())
const port = 3000

axios.defaults.baseURL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('/getUpdates')
    res.status(200).send(response.data)
    console.log(response.data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Oops, something went wrong')
  }
});

app.post('/', upload.single('photo'), (req, res) => {
  res.status(202).send('Accepted')
  resize.resize(req.file.buffer)
})

app.get('/stickers/:name', async (req, res) => {
  try {
    const response = await axios.get(`/getStickerset?name=${req.params.name}`)
    res.status(200).send(response.data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Oops, something went wrong')
  }
})

app.post('/stickers/:name/:emojis', upload.single('photo') , (req, res) => {
  

  const userId = process.env.USER_ID
  const name = req.params.name
  const emojis = req.params.emojis

  const tmpDir = fs.mkdtemp('foo-', (err, directory) => {
    if (err) throw err
    
    resize.resize(directory, req.file.buffer)
    
    return directory
  })

  console.log(tmpDir)

  // fs.rmdir(directory, (err) => {
  //   if (err) throw err
  // })

  // try {
  //   const response = await axios.post(`/addStickerToSet?name=${name}&user_id=${userId}emojis=${emojis}`, formData)


  // } catch (err) {
  //   console.log(err)
  // }

  res.status(202).send('Accepted')
})

app.listen(port, () => {
  console.log(`Telegram bot app listening at http://localhost:${port}`)
});
