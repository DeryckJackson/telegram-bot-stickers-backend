require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: process.env.ORIGIN_URL || 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
const port = process.env.PORT || 3000

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Telegram bot app listening at ${port}`)
});
