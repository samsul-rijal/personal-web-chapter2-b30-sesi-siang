
let blogs = []

function addBlog(event){
    event.preventDefault()
    
    let title = document.getElementById('input-blog-title').value
    let content = document.getElementById('input-blog-content').value

    let image = document.getElementById('input-blog-image').files // files untuk mendapatkan data file keseluruhan dari gambar

    image = URL.createObjectURL(image[0]) // untuk membuat url gambar, agar bisa diakses/tampil

    let blog ={
        title: title,
        content: content,
        image: image,
        author: 'Samsul Rijal',
        postAt: new Date()
    }

    blogs.push(blog) // untuk mengirimkan data blog ke dalam variabel blogs yang ada diatas di tampung di array

    console.log(blogs);


    // looping

    // for (let i = 0; i < blogs.length; i++) {
    //     console.log(blogs[i]);
    // }

    renderBlog()

}


// DOM Manipulation

function renderBlog() {
    let contentContainer = document.getElementById('contents')

    contentContainer.innerHTML = firstBlogContent()

    for (let i = 0; i < blogs.length; i++) {
        contentContainer.innerHTML = `<div class="blog-list-item">
        <div class="blog-image">
          <img src="${blogs[i].image}" alt="" />
        </div>
        <div class="blog-content">
          <div class="btn-group">
            <button class="btn-edit">Edit Post</button>
            <button class="btn-post">Post Blog</button>
          </div>
          <h1>
            <a href="blog-detail.html" target="_blank"
              >${blogs[i].title}</a
            >
          </h1>
          <div class="detail-blog-content">
            ${getFullTime(blogs[i].postAt)} | ${blogs[i].author}
          </div>
          <p>
            ${blogs[i].content}
          </p>

          <div style="text-align: right;">
            <span style="font-size: 13px; color: grey">
            ${getDistanceTime(blogs[i].postAt)}
            </span>
          </div>

        </div>
      </div>`
    }
}

function firstBlogContent() {
  return `<div class="blog-list-item">
  <div class="blog-image">
    <img src="assets/blog-img.png" alt="" />
  </div>
  <div class="blog-content">
    <div class="btn-group">
      <button class="btn-edit">Edit Post</button>
      <button class="btn-post">Post Blog</button>
    </div>
    <h1>
      <a href="blog-detail.html" target="_blank"
        >Pasar Coding di Indonesia Dinilai Masih Menjanjikan</a
      >
    </h1>
    <div class="detail-blog-content">
      12 Jul 2021 22:30 WIB | Ichsan Emrald Alamsyah
    </div>
    <p>
      Ketimpangan sumber daya manusia (SDM) di sektor digital masih
      menjadi isu yang belum terpecahkan. Berdasarkan penelitian
      ManpowerGroup, ketimpangan SDM global, termasuk Indonesia,
      meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum,
      dolor sit amet consectetur adipisicing elit. Quam, molestiae
      numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta,
      eligendi debitis?
    </p>

    <div style="text-align: right;">
        <span style="font-size: 13px; color: grey">
          1 day ago
        </span>
    </div>

  </div>
</div>`
}



// let waktu = new Date()

// console.log(waktu);

// console.log(waktu.getDate()); // tanggal
// console.log(waktu.getMonth()); // bulan
// console.log(waktu.getFullYear()); // tahun

// console.log(waktu.getHours()); // jam
// console.log(waktu.getMinutes()); // menit


let month = ['January', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December']

// isi dari parameter time ada di potsAt di atas, yang isinya adalah new Date(), dari new Date(), di pecahkan/tampung di variabel dibawah
function getFullTime(time) {

  let date = time.getDate() // mendapatkan tanggal
  let monthIndex = time.getMonth()  // mendapatkan bulan
  let year = time.getFullYear() // mendpatkan tahun

  let hours = time.getHours() // mendapatkan jam
  let minutes = time.getMinutes() // mendapatkan menit


  let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`

  return fullTime

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

  let distanceDay = distance / (milisecond * secondsInHours * hoursInDay) // perhitungan untuk mendapatkan hari
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

// untuk menjalankan function render blog setiap 3 detik
setInterval(() => {
  // console.log('render');
  renderBlog()
}, 3000)