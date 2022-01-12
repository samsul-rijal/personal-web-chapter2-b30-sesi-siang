function submitData(){
    
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let phone = document.getElementById('input-phone').value
    let subject = document.getElementById('input-subject').value
    let message = document.getElementById('input-message').value


    if (document.getElementById('html').checked && document.getElementById('css').checked){
        console.log(document.getElementById('html').value, document.getElementById('css').value)

    } else if (document.getElementById('html').checked) {
        console.log(document.getElementById('html').value);
        
    } else if (document.getElementById('css').checked) {
        console.log(document.getElementById('css').value);
    }

    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(message);

    // condition

    if (name == ''){
        return alert("Nama wajib diisi")
    } else if (email == '') {
        return alert("Email wajib diisi")
    } else if (phone == '') {
        return alert("Phone Wajib diisi")
    } else if (subject == '') {
        return alert("Subject Wajib diisi")
    } else if (message == '') {
        return alert("Message Wajib diisi")
    } 

    let emailReceiver = 'samsul@mail.com'

    let a = document.createElement('a')

    a.href = `mailto: ${emailReceiver}?subject=${subject}&body=Hallo my name ${name} ${message} contact me ${phone}`

    // <a href="mailto:samsul@mail.com?subject=Test Subject&body=Hallo B30">Send Mail</a>
    a.click()

    // if (name == '' || email == '' || phone == '' || subject == '' || message == '') {
    //     alert("Semuanya wajib diisi")
    // }

    let dataObject = {
        name: name,
        email: email,
        phoneNumber: phone,
        subject: subject,
        message: message
    }

    console.log(dataObject);




}