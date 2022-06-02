var checkedPersonal = document.getElementById("checkedPersonal");

var checkedService = document.getElementById("checkedService");

var checkedAll = document.getElementById("checkedAll");

var submitBtn = document.getElementById("submitBtn");

var returnBtn = document.getElementById("returnBtn");

checkedAll.addEventListener('click', function (){
    if (checkedAll.checked === true) {
        checkedService.checked = true;
        checkedPersonal.checked = true;
    }
});

submitBtn.addEventListener('click', function (){
    if (checkedService.checked === true && checkedPersonal.checked === true){
        window.location.href = "https://dormabook.shop/signup"
    }
});

returnBtn.addEventListener('click', function (){
    window.location.href = "https://dormabook.shop/"
});