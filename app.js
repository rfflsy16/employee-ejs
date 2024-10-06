const express = require('express')
const app = express()
const router = require('./routers/index.js')
const port = 3001

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(port, () => {
    console.log(`KelazzzZzzzZZZzz ${port}`)
})