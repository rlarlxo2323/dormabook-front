const validityMessage = {
    badInput: "잘못된 입력입니다.",
    patternMismatch: "패턴에 맞게 입력하세요",
    tooLong: "최대 글자 미만으로 입력하세요",
    tooShort: "최소 글자 미만으로 입력하세요",
    valueMissing: "이 필드를 반드시 입력하세요",
}

function getMessage(validity) {
    for (const key in validityMessage) {
        if (validity[key]) {
            return validityMessage[key]
        }
    }
}

function showError(input) {
    input.setCustomValidity(getMessage(input.validity) || "")
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("invalid", () => {
        document.forms[0].classList.add("iss-validated")

        showError(input)
    })
})

var logo = document.getElementById("logo");

logo.addEventListener('click', function () {
    window.location.href = "https://dormabook.shop/"
});

let checkedPW = false;

var repassword = document.getElementById("rePassword");

repassword.addEventListener('blur', function () {
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("rePassword").value;
    var pwpattern = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (password.match(pwpattern) == null) {
        document.getElementById("checkedPW").innerText = '옳지않은 패스워드 입니다.';
        document.getElementById("checkedPW").style.color = "red";
        checkedPW = false;
    } else if (password === repassword) {
        document.getElementById("checkedPW").innerText = '올바른 패스워드 입니다.';
        document.getElementById("checkedPW").style.color = "blue";
        checkedPW = true;
    } else {
        document.getElementById("checkedPW").innerText = '일치하지않는 패스워드 입니다.';
        document.getElementById("checkedPW").style.color = "red";
        checkedPW = false;
    }
})

$(document).ready(function ($) {
    $("#submitBtn").click(function () {
        if (checkedPW === true) {
            var xhr = new XMLHttpRequest();
            var getMemberPw = $("#password").val();
            var getMemberId = sessionStorage.getItem('id');

                $.ajax({
                    url: "https://dormabook.shop/api/auth/modifypw",
                    type: "post",
                    contentType: 'application/json; charset=UTF-8',
                    data: JSON.stringify({
                        memberId: getMemberId,
                        memberPwd: getMemberPw
                    }),
                    datatype: "json",
                    success: function (data) {
                        if (data === 1) {
                            alert("비밀번호가 성공적으로 변경되었습니다.");
                            window.location.href = "https://dormabook.shop/login";
                        } else {
                            alert("서버 오류로 인해\n비밀번호 변경에 실패했습니다.");
                            window.location.href = "https://dormabook.shop/login/searchpw";
                        }
                    },
                    error: function () {
                        //
                    }
                })
            }else {
                alert("다시 확인하세요");
            }
        sessionStorage.clear();
    })
})


