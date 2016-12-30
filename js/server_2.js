var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/shop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('connection with db is established');
});

var Schema = mongoose.Schema;

var Products = new Schema({
    title: String,
    price: Number,
    category: String,
    cart: Boolean
});

mongoose.model('Product', Products);

app.get('/products', function (req, res) {
    var Product = mongoose.model('Product');
    Product.find({}, function(err, products) {
        var productsList = [];

        products.forEach(function(product) {
            productsList.push(product);
        });

        res.send(JSON.stringify(productsList));
    });
});

app.get('/products/:id', function (req, res) {
    var Product = mongoose.model('Product');
    Product.findById(req.params.id, function(err, product) {
        console.log('product was found')
        res.end(JSON.stringify(product));
    });
});

app.post('/products', function (req, res) {

    var Product = mongoose.model('Product');
    var product = new Product();

    product.title = req.query.title;
    product.price = req.query.price;
    product.category = req.query.category;
    product.cart = req.query.cart;

    product.save(function(err) {
        if (err) throw err;
        console.log('Task has been saved');
    });

    res.end(product.toString());
});

app.delete('/products/:id', function (req, res) {
    var Product = mongoose.model('Product');
    Product.findById(req.params.id, function(err, product) {
        res.end(JSON.stringify(product));
        product.remove();
    });
});

app.put('/products/:id', function (req, res) {
    var Product = mongoose.model('Product');
    Product.update(
        {_id: req.params.id},
        {
            title: req.query.title,
            price: req.query.price,
            category: req.query.category,
            cart: req.query.cart
        },
        {multi: false},
        function(err, rows_updated) {
            if (err) throw err;
            console.log('Updated');
            res.end("Updated");
        }
    );

});

var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server has started and listen on http://%s:%s", host, port)
});