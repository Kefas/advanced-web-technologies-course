var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
    console.log("Otrzymano żądanie GET dla strony głównej");
    res.send('Hello GET');
});

app.get('/products', function (req, res) {
    fs.readFile("/Users/sg0222871/workspace/webowe/json/products.json", 'utf8', function (err, data) {
        console.log(data);
        jsonData = JSON.parse(data);
        res.end(data);
    });
});

app.get('/products/:id', function (req, res) {
    fs.readFile("/Users/sg0222871/workspace/webowe/json/products.json", 'utf8', function (err, data) {
        jsonData = JSON.parse(data);
        id = req.params.id;
        product = jsonData[id];
        console.log(product);
        res.end(JSON.stringify(product));
    });
});

app.post('/', function (req, res) {
    console.log("Otrzymano żądanie POST dla strony głównej");
    res.send('Hello POST'); })
app.delete('/usun', function (req, res) {
    console.log("Otrzymano żądanie DELETE dla strony /usun");
    res.send('Hello DELETE');
})
app.put('/user_list', function (req, res) {
    console.log("Otrzymano żądanie PUT dla strony /user_list");
    res.send('Lista użytkowników');
});


var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Przykładowa aplikacja nasłuchuje na http://%s:%s", host, port)
});