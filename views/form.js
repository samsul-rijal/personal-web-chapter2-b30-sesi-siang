function submitData() {
  
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let phone = document.getElementById('input-phone').value
    let subject = document.getElementById('input-subject').value
    let message = document.getElementById('input-message').value

    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(message);


    if (document.getElementById('html').checked & document.getElementById('css').checked) {
        console.log(document.getElementById('html').value + document.getElementById('css').value );

    } else if (document.getElementById('html').checked) {
        console.log(document.getElementById('html').value)

    } else if (document.getElementById('css').checked) {
        console.log(document.getElementById('css').value)
    }


    if (name == '') {
        alert("Nama harus diisi")
    } else if (email == '') {
        alert("Email harus diisi")
    } else if (phone == '') {
        alert("Phone harus diisi")
    } else if (subject == '') {
        alert("Subject harus diisi")
    } else if (message == '') {
        alert("Pesan harus diisi")
    }

    // if (name == '' || email == '' || phone == '' || subject == '' || message=='') {
    //     alert("Semua wajib diisi")
    // }

    let emailReceiver = 'samsul@mail.com'

    let a = document.createElement('a')

    a.href = `mailto: ${emailReceiver}?subject=${subject}&body=Hallo my name ${name}, ${message}, call ${phone}`

    a.click()

    let dataObject = {
        name: name,
        email: email,
        phoneNumber: phone,
        subject: subject,
        message: message
    }

    console.log(dataObject)
}