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

function insertNo(str) {
    str = str.replace(/[^0-9]/g, '');

    return str;
}

var cellPhone = document.getElementById('phone');
cellPhone.onkeyup = function (event) {
    event = event || window.event;
    var _val = this.value.trim();
    this.value = autoHypenPhone(_val);
}
var studentNo = document.getElementById('studentNo');
studentNo.onkeyup = function (event) {
    event = event || window.event;
    var _val = this.value.trim();
    this.value = insertNo(_val);
}

var returnBtn = document.getElementById("returnBtn");

returnBtn.addEventListener('click', function () {
    window.location.href = "https://dormabook.shop/signup/guide"
});

var logo = document.getElementById("logo");

logo.addEventListener('click', function () {
    window.location.href = "https://dormabook.shop/"
});

let checkedID = false;
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
    $("#id").blur(function () {
        var xhr = new XMLHttpRequest();
        var getMemberId = $("#id").val();
        $.ajax({
            url: "http://localhost:9000/api/auth/signup/checkid",
            type: "post",
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                memberId: getMemberId
            }),
            datatype: "json",
            success: function (data) {
                if (getMemberId === "") {
                    document.getElementById("checkedId").innerText = '입력해주세요.';
                    document.getElementById("checkedId").style.color = "red";
                    checkedID = false;

                } else if (data === "") {
                    document.getElementById("checkedId").innerText = '사용가능한 ID 입니다.';
                    document.getElementById("checkedId").style.color = "blue";
                    checkedID = true;
                } else {
                    document.getElementById("checkedId").innerText = '이미 존재하는 회원 입니다.';
                    document.getElementById("checkedId").style.color = "red";
                    checkedID = false;
                }
            },
            error: function () {
                //
            }
        })
    })
});

$(document).ready(function ($) {
    $("#signupBtn").click(function () {
        if (checkedID === true && checkedPW === true) {
            var xhr = new XMLHttpRequest();
            var getMemberId = $("#id").val();
            var getMemberPw = $("#password").val();
            var getMemberName = $("#name").val();
            var getMemberStudentId = $("#studentNo").val();
            var getMemberPhone = $("#phone").val();
            var getMemberMajor = $("#department").val();
            var getMemberCollege = $("#college").val();

            if (getMemberName !== null && getMemberStudentId.length === 6 && getMemberPhone.length === 13 &&
                getMemberMajor !== null && getMemberCollege !== null) {

                $.ajax({
                    url: "http://localhost:9000/api/auth/signup",
                    type: "post",
                    contentType: 'application/json; charset=UTF-8',
                    data: JSON.stringify({
                        memberId: getMemberId,
                        memberPwd: getMemberPw,
                        memberName: getMemberName,
                        memberStudentId: getMemberStudentId,
                        memberPhone: getMemberPhone,
                        memberMajor: getMemberMajor,
                        memberCollege: getMemberCollege
                    }),
                    datatype: "json",
                    success: function (data) {
                        if (data !== "exist") {
                            alert("회원가입을 축하합니다.");
                            window.location.href = "https://dormabook.shop/login";
                        } else {
                            alert("회원가입에 실패했습니다.");
                            window.location.href = "https://dormabook.shop/signup";
                        }
                    },
                    error: function () {
                        //
                    }
                })
            }else {
                alert("다시 확인하세요");
            }
        } else {
            alert("다시 확인하세요");
        }
    })
})


