
function autoHypenPhone(str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 4) {
        return str;
    } else if (str.length < 7) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    } else if (str.length < 11) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    } else {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }
    return str;
}

var cellPhone = document.getElementById('phone');
cellPhone.onkeyup = function (event) {
    event = event || window.event;
    var _val = this.value.trim();
    this.value = autoHypenPhone(_val);
}

var logo = document.getElementById("logo");

logo.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/"
});

var searchID = document.getElementById("returnBtn");

searchID.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/login/"
});

function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

function timer() {
    var time = 180;
    var min = "";
    var sec = "";

    var x = setInterval(function (){
        min = parseInt(time/60);
        sec = time%60;
        document.getElementById("accessBtn").innerText = min+"분"+sec+"초";
        time--;
        document.getElementById("accessBtn").disabled = true;

        if (time < 0){
            clearInterval(x);
            document.getElementById("accessBtn").innerText = "재전송";
            document.getElementById("accessBtn").disabled = false;
        }
    }, 1000);
}

let accessNum = "";

$(document).ready(function ($) {
    $("#accessBtn").click(function () {
        timer();
        var xhr = new XMLHttpRequest();
        var getPhoneNum = $("#phone").val();
        var PhoneNum = getPhoneNum.replace(/-/g, "");
        accessNum = generateRandomCode(6);
        $.ajax({
            url: "https://dormabook.shop/api/auth/sms",
            type: "post",
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                recipientPhoneNumber: PhoneNum,
                content: "인증번호: "+accessNum
            }),
            datatype: "json",
            success: function (data) {

            },
            error: function () {
                //
            }
        })
    })
});


$(document).ready(function ($) {
    $("#submitBtn").click(function () {
        var result = $("#accessNumber").val();
        if(result === accessNum){
            var xhr = new XMLHttpRequest();
            var getId = $("#id").val();
            var getName = $("#name").val();
            var getPhoneNum = $("#phone").val();
            $.ajax({
                url: "https://dormabook.shop/api/auth/searchpw",
                type: "post",
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    memberId: getId,
                    memberPhone: getPhoneNum,
                    memberName: getName
                }),
                datatype: "json",
                success: function (data) {
                    if (data === null || data === ""){
                        alert("가입한 정보가 없습니다.");
                        window.location.href = "https://dormabook.shop/login"
                    }else{
                        sessionStorage.setItem('id', data);
                        window.location.href = "https://dormabook.shop/login/resultpw"
                    }
                },
                error: function () {
                    //
                }
            })
        }else{
            alert("인증정보가 맞지 않습니다.");
            window.location.href = "https://dormabook.shop/login/searchpw"
        }
    })
});
