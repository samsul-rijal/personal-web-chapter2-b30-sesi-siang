const express = require('express')

const app = express()
const PORT = 5000

const db = require('./connection/db')

app.set('view engine', 'html') // set hbs

app.use('/public', express.static(__dirname + '/public')) // set public folder/path

app.use(express.urlencoded({extended: false}))

let isLogin = true

let blogs = [
    {
        title: 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan Sekali',
        postAt: '13 Januari 2022 13:30 WIB',
        author: 'Samsul Rijal',
        content: 'Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, molestiae numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta, eligendi debitis?'
    },
]

console.log(blogs);


function getFullTime(time) {
    let month = ['January', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December']

    let date = time.getDate() // mendapatkan tanggal
    let monthIndex = time.getMonth()  // mendapatkan bulan
    let year = time.getFullYear() // mendpatkan tahun
  
    let hours = time.getHours() // mendapatkan jam
    let minutes = time.getMinutes() // mendapatkan menit
    
    return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
  
}

app.get('/', function(request, response) {
    response.render('index')
})

app.get('/blog', function(request, response) {

    db.connect(function(err, client, done) {
        if (err) throw err

        client.query('SELECT * FROM tb_blog', function(err, result) {
            if (err) throw err

            console.log(result.rows);
            let data = result.rows

            response.render('blog', {isLogin : isLogin, blogs: data})
        })
    })
})

app.get('/blog-detail/:id', function(request, response) {
    // console.log(req.params);
    
    let blogId = request.params.id
    response.render('blog-detail', {blog : {
        id : blogId,
        title: 'Selamat datang di web personal',
        content: 'In the first term of college, I was introduced to a subject called Logic. In the "I think, therefore I am" fashion, you might think this would be an easy subject. After all, we are all taught how to think throughout school and, since all of us "think", there would be nothing unfamiliar in the subject that could trick the less-than-alert mind',
        author: 'Samsul Rijal',
        postAt: '12 Jan 2022 11:30 WIB'
    }})

})

// routing halaman add blog
app.get('/add-blog', function(request, response) {
    response.render('add-blog')
})


app.post('/blog', function(request, response) {

    let data = request.body

    data = {
        title: data.inputTitle,
        content: data.inputContent,
        author: 'Samsul Rijal',
        postAt: getFullTime(new Date())
    }

    blogs.push(data)
    console.log(data);

    response.redirect('/blog')

})

app.get('/delete-blog/:index', function(request, response) {

    let index = request.params.index;

    blogs.splice(index, 1)
    
    console.log(index);
    response.redirect('/blog')


})

app.get('/contact', function(request, response) {
    response.render('contact')
})


app.listen(PORT, function() {
    console.log(`Server starting on PORT ${PORT}`);
})