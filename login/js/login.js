var logo = document.getElementById("logo");

logo.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/"
});

var searchID = document.getElementById("searchID");

searchID.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/login/searchid/"
});

var searchPW = document.getElementById("searchPW");

searchPW.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/login/searchpw/"
});

var signUp = document.getElementById("signUp");

signUp.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/signup/guide/"
});

//login jwt
$(document).ready(function($) {
    $("#login").click(function () {
        var xhr = new XMLHttpRequest();
        var getMemberId = $("#id").val();
        var getMemberPwd = $("#password").val();
        $.ajax({
            url: "https://dormabook.shop/api/auth/login",
            type: "post",
            contentType : 'application/json; charset=UTF-8',
            data: JSON.stringify({
                memberId: getMemberId,
                memberPwd : getMemberPwd
            }),
            datatype: "json",
            success: function (data) {
                console.log(data);
                const dtos = JSON.stringify(data);
                console.log(dtos);
                var tmp = JSON.parse(dtos);
                var token = 'Bearer '+ tmp.accessToken
                console.log(tmp.accessToken);
                sessionStorage.setItem('jwt',token);
                window.location.href = "https://dormabook.shop/community"
            },
            error: function () {
                //
            }
        })
    })
});