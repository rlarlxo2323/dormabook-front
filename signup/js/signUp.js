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

function autoHypenPhone(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{
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
cellPhone.onkeyup = function(event){
    event = event || window.event;
    var _val = this.value.trim();
    this.value = autoHypenPhone(_val) ;
}

var returnBtn = document.getElementById("returnBtn");

returnBtn.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/signup/guide"
});

var logo = document.getElementById("logo");

logo.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/"
});