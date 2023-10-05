const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()

/* Models */
const Product = require('./model/product')

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1/shopApp')
//     .then((result) => {
//     console.log(result)
    
// })
//     .catch((err) => {

//     console.log(err)
// });

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req,res) => {
    res.send('Hello World')
})



app.get('/products', async (req,res) => {
    const products = await Product.find({})
    res.render('products/index', {products})
})


app.get('/products/create',(req,res) => {
    res.render('products/create')
})

app.post('/products', async (req,res) => {
    const product = new Product (req.body)
    await product.save()
    res.redirect(`/product/${product._id}`)
})



app.get('/product/:id', async(req,res)=>{
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show', {product})
})

app.get('/product/:id/edit', async(req , res ) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product})
})

app.put('/product/:id', async (req , res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
    res.redirect(`/product/${product._id}`)
})

app.delete('/product/:id', async (req , res) =>{
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000, ()=>{
    console.log('shop app running on http://127.0.0.1:3000')
})