
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3001
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})
