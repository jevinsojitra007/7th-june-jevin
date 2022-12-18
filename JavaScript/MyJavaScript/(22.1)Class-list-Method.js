var element;

document.getElementById("header").addEventListener("click",abc);

function abc(){
    document.getElementById("header").classList.add("xyz", "hcl"); // add class
    // document.getElementById("header").classList.toggle("xyz");   // toggle
    
    // document.getElementById("header").classList.remove("xyz");  // remove class

    // var a = document.getElementById("header").classList;
    var a = document.getElementById("header").classList.contains("abc");  // contans :"if class is added than its return true , if class is not added than its return false"
    // var a = document.getElementById("header").classList.item(0);   // item
    // var a = document.getElementById("header").classList.length;  // length of class
    console.log(a)
}