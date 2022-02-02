const mobileRegex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/ ;
const passwordRegex = /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/;

 
function check(){

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('psw').value;
    const passwordc = document.getElementById('pswc').value;
    const phonem = document.getElementById('phonem');
    const pswm = document.getElementById('pswm');
    const pswam = document.getElementById('pswam');
    if(!mobileRegex.test(phone)){
        phonem.innerHTML="Please enter Valid mobile number";
    }

    if(!passwordRegex.test(password)){
         pswm.innerHTML="Password length must be 4-10 digits with atleast one upper or lower case value and one digit";
    }

    if(!password.test(passwordc)){
         pswam.innerHTML="Password don't match enter again";
    }

    
    
}
 
 