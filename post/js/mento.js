$(document).on("click", "#agree", function () {
    var token = sessionStorage.getItem('jwt');

    // if (!token) {
    //     alert('로그인이 되어 있지 않거나, 비정상적인 접근입니다.');
    //     window.location.href = "https://dormabook.shop"
    // }

    var parseJwt = JSON.parse(Base64.decode(token.toString().split('.')[1]));
    var username = parseJwt.sub;
    var postNO = sessionStorage.getItem('postNo');

    // var test1 = 13;
    // var test2 = "momo1";

    var textarea1 = $('#text__area').val();
    if (textarea1 == null || textarea1 == undefined || textarea1 == "") {
        alert('내용을 입력해주세요.');
        $('#text__area').focus();
        return;
    }
    $.ajax({
        type: 'post',
        url: 'https://dormabook.shop/api/applications/applicationform',
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            postNo: postNO,
            applicationContent: textarea1,
            applicationId : username
            // postNo: test1,
            // applicationContent: textarea1,
            // applicationId : test2
        }),
        error: function (error) {
            alert('error 발생')
        },
        success: function () {
            console.log('')
            alert('success');
            window.location.href ="https://dormabook.shop";
        }
    });
})

function cancel(){
    self.close();
}

