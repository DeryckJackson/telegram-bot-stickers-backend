require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, 'temp.png')
  }
})

const upload = multer({ storage: storage })

const app = express()
app.use(cors())
const port = 3000

axios.defaults.baseURL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('/getMe')
    res.status(200).send('Ok')
    console.log(response.data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Oops, something went wrong')
  }
});

app.post('/', upload.single('photo'), (req, res) => {
  res.status(202).send('Accepted')
})

app.listen(port, () => {
  console.log(`Telegram bot app listening at http://localhost:${port}`)
});
