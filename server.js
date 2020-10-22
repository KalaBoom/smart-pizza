const 
    express  = require('express'),
    fs       = require('fs'),
    path     = require('path'),
    PORT     = process.env.PORT || 5000,
    app      = express()

app.use(express.json({extended:true}))

app.use((req,res,next) => {
    const data = `${req.method} ${req.url}`
    //console.log(data)
    next()
})

app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

app.get('/products', (req, res) => {
    const products = fs.readFileSync("products.json", "utf8")
    res.send(products)
})

app.post('/order', (req, res) => {
    let nowOrders = fs.readFileSync('orders.json', "utf-8")

    if(nowOrders === "") nowOrders = []
    else nowOrders = JSON.parse(nowOrders)
    nowOrders.push(req.body)

    fs.writeFileSync('orders.json', JSON.stringify(nowOrders), 'utf8', (err) => {
        if (err) throw err
    })
    res.send(true)
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, '404.html'))
});

app.listen(PORT, ()=> {
    console.log(`Server listen on ${PORT}`)
})