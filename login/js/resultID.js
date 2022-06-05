var logo = document.getElementById("logo");

logo.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/"
});

var searchPW = document.getElementById("searchPWBtn");

searchPW.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/login/searchpw/"
});

var loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/login/"
});


$(document).ready(function ($) {
    var id = sessionStorage.getItem('id');
    var lenId = 0;
    if (id.length < 10){
        lenId = parseInt(id.length/2);
    }else{
        lenId = 5;
    }
    var replaceStr = "*".repeat(lenId);
    var result = id.replace(id.slice(-lenId), replaceStr);

    document.getElementById("userId").innerText = result;

    sessionStorage.clear();
});
