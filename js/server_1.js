var express = require('express');
var app = express();
var fs = require('fs');


app.get('/', function (req, res) {
    console.log("Otrzymano żądanie GET dla strony głównej");
    res.send('Hello GET');
});

app.get('/products', function (req, res) {
    fs.readFile("./json/products.json", 'utf8', function (err, data) {
        console.log(data);
        jsonData = JSON.parse(data);
        res.end(data);
    });
});

app.get('/products/:id', function (req, res) {
    fs.readFile("./json/products.json", 'utf8', function (err, data) {
        jsonData = JSON.parse(data);
        id = req.params.id;
        product = jsonData[id];
        console.log(product);
        res.end(JSON.stringify(product));
    });
});


app.post('/products', function (req, res) {
    console.log("Otrzymano żądanie POST dla strony /products");

    newProduct = {
        title: req.query.id,
        price: req.query.price,
        category: req.query.category,
        cart: req.query.cart
    };


    fs.readFile("./json/products.json", 'utf8', function (err, data) {
        jsonData = JSON.parse(data);
        var arr = [];
        for(var x in jsonData){
            arr.push(jsonData[x]);
        }
        id = req.params.id;
        jsonData = arr.push(newProduct);
        fs.writeFileSync("./json/products.json", JSON.stringify(arr));
    });

    res.send(JSON.stringify(newProduct));
});

app.delete('/products/:id', function (req, res) {
    console.log("Otrzymano żądanie DELETE dla strony /products");
    var arr = [];

    fs.readFile("./json/products.json", 'utf8', function (err, data) {
        jsonData = JSON.parse(data);

        for(var x in jsonData){
            arr.push(jsonData[x]);
        }
        id = req.params.id;
        jsonData = arr.splice(id, 1);
        fs.writeFileSync("./json/products.json", JSON.stringify(arr));
    });

    res.end("OK");
});

app.put('/products/:id', function (req, res) {
    console.log("Otrzymano żądanie PUT dla strony /products");
    newProduct = {
        title: req.query.title,
        price: req.query.price,
        category: req.query.category,
        cart: req.query.cart
    };


    fs.readFile("./json/products.json", 'utf8', function (err, data) {
        jsonData = JSON.parse(data);


        var arr = [];
        for(var x in jsonData){
            arr.push(jsonData[x]);
        }
        id = req.params.id;
        jsonData = arr.splice(id,1,newProduct);
        fs.writeFileSync("./json/products.json", JSON.stringify(arr));
    });

    res.send(JSON.stringify(newProduct));
});


var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Przykładowa aplikacja nasłuchuje na http://%s:%s", host, port)
});