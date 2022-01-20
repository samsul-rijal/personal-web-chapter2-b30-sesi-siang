const express = require('express')

const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')

const app = express()
const PORT = 5000

const db = require('./connection/db')
const upload = require('./middlewares/fileUpload')

app.set('view engine', 'hbs') // set hbs
app.use('/public', express.static(__dirname + '/public')) // set public folder/path
app.use('/uploads', express.static(__dirname + '/uploads')) // set public folder/path
app.use(express.urlencoded({extended: false}))


app.use(flash())

app.use(
    session({
        cookie: {
            maxAge: 2 * 60 * 60 * 1000, // 2 jam
            secure: false,
            httpOnly: true
        },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: false,
        secret: 'secretValue'
    })
)


// let isLogin = true

function getFullTime(time) {
    let month = ['January', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December']

    let date = time.getDate() // mendapatkan tanggal
    let monthIndex = time.getMonth()  // mendapatkan bulan
    let year = time.getFullYear() // mendpatkan tahun
  
    let hours = time.getHours() // mendapatkan jam
    let minutes = time.getMinutes() // mendapatkan menit
    
    return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
  
}

function getDistanceTime(time) {

    let timePost = time
    let timeNow = new Date()
  
    let distance = timeNow - timePost // perhitungan menghasilkan milisecond, (untuk mendapatkan hari, jam, menit, detik, kita lakukan convert dibwah)
  
    //  convert milisecond
    let milisecond = 1000 // seribu dalam 1 detik
    let secondsInHours = 3600 // dalam 1 jam 3600 detik
    let hoursInDay = 23 // dalam 1 hari 23 jam
  
    let seconds = 60 // detik
    let minutes = 60 // menit
  
    let distanceDay = Math.floor(distance / (milisecond * secondsInHours * hoursInDay)) // perhitungan untuk mendapatkan hari
    let distanceHours = Math.floor(distance / (milisecond * seconds * minutes)) // perhitungan untuk mendapatkan jam
    let distanceMinutes = Math.floor(distance / (milisecond * seconds)) // perhitungan untuk mendapatkan menit
    let distanceSecond = Math.floor(distance / milisecond) // perhitungan untuk mendapatkan detik
  
  
    // kondisi menampilkan hari
    if (distanceDay >= 1) {
        return `${distanceDay} day ago`;
  
    } else if(distanceHours >= 1) {
        // kondisi menampilkan jam
        return `${distanceHours} hours ago`;
  
    } else if(distanceMinutes >= 1) {
      // kondisi menampilkan menit
        return `${distanceMinutes} minutes ago`;
  
    } else {
        return `${distanceSecond} seconds ago`;
    }
  
}

app.get('/', function(request, response) {
    response.render('index')
})

app.get('/blog', function(request, response) {

    const query = `SELECT tb_blog.id, tb_blog.title, tb_blog.content, tb_blog.image, tb_user.name AS author, tb_blog.author_id, tb_blog.post_at
	FROM tb_blog LEFT JOIN tb_user ON tb_blog.author_id = tb_user.id`

    db.connect(function(err, client, done) {
        if (err) throw err

        client.query(query, function(err, result) {
            if (err) throw err

            let data = result.rows

            data = data.map(function(blog) {
                return {
                    ...blog,
                    isLogin: request.session.isLogin,
                    postAt: getFullTime(blog.post_at),
                    distance: getDistanceTime(blog.post_at)
                }
            })

            response.render('blog', {isLogin : request.session.isLogin, user: request.session.user, blogs: data})
        })
    })
})

app.get('/blog-detail/:id', function(request, response) {
    
    let id = request.params.id

    db.connect(function (err, client, done) {
        if (err) throw err

        client.query(`SELECT * FROM tb_blog WHERE id = ${id}`, function(err, result) {
            if (err) throw err

            let data = result.rows[0]
            console.log(data);

            response.render('blog-detail', {blog: data})
        })
    })
})

app.get('/add-blog', function(request, response) {

    if(!request.session.isLogin){
        request.flash('danger','Please Login!!')
        response.redirect('/login')
    }

    response.render('add-blog', {isLogin: request.session.isLogin, user: request.session.user})
})


app.post('/blog', upload.single('inputImage'), function(request, response) {

    let data = request.body

    const authorId =  request.session.user.id

    const image = request.file.filename

    let query = `INSERT INTO tb_blog(title, content, image, author_id) 
    VALUES ('${data.inputTitle}', '${data.inputContent}', '${image}','${authorId}')`

    db.connect(function (err, client, done) {
        if (err) throw err

        client.query(query, function(err, result) {
            if (err) throw err

            response.redirect('/blog')
       
        })
    })
})

app.get('/delete-blog/:id', function(request, response) {

    let id = request.params.id;

    let query = `DELETE FROM tb_blog WHERE id = ${id}`

    db.connect(function (err, client, done) {
        if (err) throw err

        client.query(query, function(err, result) {
            if (err) throw err

            response.redirect('/blog')
       
        })
    })
})

app.get('/contact', function(request, response) {
    response.render('contact')
})

app.get('/register', function(request, response) {
    response.render('register')
})


app.post('/register', function(request, response) {

    const {inputName, inputEmail, inputPassword} = request.body

    const hashedPassword = bcrypt.hashSync(inputPassword, 10)

    // console.log(hashedPassword);
    // console.log(inputPassword);
    // return;

    let query = `INSERT INTO tb_user(name, email, password) VALUES ('${inputName}', '${inputEmail}', '${hashedPassword}')`

    db.connect(function (err, client, done) {
        if (err) throw err

        client.query(query, function(err, result) {
            if (err) throw err

            response.redirect('/login')
       
        })
    })
})


app.get('/login', function(request, response) {
    response.render('login')
})

app.post('/login', function(request, response) {

    const {inputEmail, inputPassword} = request.body

    const query = `SELECT * FROM tb_user WHERE email = '${inputEmail}'`

    db.connect(function (err, client, done) {
        if (err) throw err

        client.query(query, function(err, result) {
            if (err) throw err

            // console.log(result.rows.length);

            if(result.rows.length == 0){

                request.flash('danger', 'Email and password dont match!')

                return response.redirect('/login')
            } 

            const isMatch = bcrypt.compareSync(inputPassword, result.rows[0].password)
            // console.log(isMatch);

            if(isMatch){

                request.session.isLogin = true
                request.session.user = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    email: result.rows[0].email
                }

                request.flash('success', 'Login success')
                response.redirect('/blog')

            } else {
                request.flash('danger', 'Email and password dont match!')
                response.redirect('/login')
            }

        })
    })
})

app.get('/logout', function(request, response){
    request.session.destroy()

    response.redirect('/blog')

})


app.listen(PORT, function() {
    console.log(`Server starting on PORT ${PORT}`);
})