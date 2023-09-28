const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1/shopApp')
    .then((result) => {
    console.log(result)
    
})
    .catch((err) => {

    console.log(err)
});

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.listen(3000, ()=>{
    console.log('shop app running on http://127.0.0.1:3000!')
})