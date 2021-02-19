
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3001
const routes = require('./routes')
const path = require('path')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/gambar',(req,res) => {
  try {
    
    res.sendFile(path.join(__dirname,'./assets','logo192.png'))
  } catch (err) {
    console.log(err);
  }
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})
