const express = require('express')

const app = express()
const PORT = 3000

app.set('view engine', 'hbs') // set template engine hbs

app.use('/public',express.static(__dirname + '/public')) // path agar css dan gambar tampil

app.use(express.urlencoded({extended : false}))


let isLogin = true

app.get('/', function(request, response) {
    response.render('index')
})

app.get('/blog', function(request, response) {
    response.render('blog', {isLogin : isLogin})
})

app.get('/blog-detail/:id', function(request, response) {
    // console.log(request.params);

    let blogId = request.params.id

    response.render('blog-detail', {blog : {
        id: blogId,
        title: 'Selamat datang di web',
        content: 'AI is changing our world and the impact to come is massive: on the way we work, we live, collaborate, decide and act as a society. But what are the risks and how can we get prepared?',
        author: 'Samsul Rijal',
    }})
})

app.get('/contact', function(request, response) {
    response.render('contact')
})

app.get('/add-blog', function(request, response) {
    response.render('add-blog')
})


app.post('/blog', function(request, response) {
    // console.log(request.body);

    let data = request.body;
    
    console.log(data);
    
    console.log({
        title: data.inputTitle,
        content: data.inputContent
    });

})


app.listen(PORT, function() {
    console.log('Server starting on localhost');
})