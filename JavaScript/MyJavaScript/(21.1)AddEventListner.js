// var element;

// document.getElementById("header").onmouseenter = abc;

// function abc(){
//     document.getElementById("header").style.background = "red"; 
// }

////////////////////////////////////////////////////

// Add Event-Listener
var element;

document.getElementById("main").addEventListener("mouseenter",abc);
document.getElementById("main").addEventListener("click",function(){
    
    this.style.border = "10px solid pink"
});

function abc(){
    document.getElementById("main").style.color = "orange"
}