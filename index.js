const express = require('express')

const app = express()

app.get('/', function(request, response) {
    response.send("Hello World")
})

app.get('/about', function(request, response) {
    response.send("Ini halaman perubahan")
})

app.listen(5000, function() {
    console.log('Server starting on PORT 5000');
})