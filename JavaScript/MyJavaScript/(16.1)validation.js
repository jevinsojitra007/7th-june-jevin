function seterror(id ,error){
    //set error inside tag of id
    Element = document.getElementById(id);
    Element.getElementsByClassName('formerror')[0].innerHTML = error;

};

function clearErrors(){
    errors = document.getElementsByClassName('formerror');
    for(let item of errors){
        item.innerHTML = "";
    }
};

function validateForm(){
    var returnval = true;
    clearErrors();

    var name = document.forms['myForm']['fname'].value;
    if(name.length < 5){
        seterror("name","*length of name is to short")
        returnval = false
    }
    if(name.length == 0){
        seterror("name","*length of name is can not be zero")
        returnval = false
    }

    var email = document.forms['myForm']['femail'].value;
    if(email.length > 15){
        seterror("email","*number of length is to long");
        returnval = false;
    }
    if(email.length == 0){
        seterror("email","*enter valid email");
        document.write(email)
        returnval = false;
    }
    var phone = document.forms['myForm']['fphone'].value;
    if(phone.length < 10){
        seterror("phone","*number of length should be 10 digits");
        returnval = false;
    }
    var password = document.forms['myForm']['fpass'].value;
    if(password.length < 6){
        seterror("pass","*length of password should be 6 caractor's");
        returnval = false;
    }
    var confirmpassword = document.forms['myForm']['fcpass'].value;
    if(confirmpassword != password){
        seterror("cpass", "*password should be not match");
        returnval = false;
    }

    return returnval;

};