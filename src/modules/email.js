export function EmailRegex() {
    let email = document.getElementById('email');
    var re = /\S+@\S+\.\S+/;
    if(re.test(email.value) && email.value !== ''){
        email.style.border = 'none'
        return email.value
    } else{
        email.style.border = '2px solid red'
        return email.value
    }
}