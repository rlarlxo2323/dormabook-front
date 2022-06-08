$(document).on("click", "#agree", function () {
    var token = sessionStorage.getItem('jwt');
    var parseJwt = JSON.parse(Base64.decode(token.toString().split('.')[1]));
    var username = parseJwt.sub;
    var postNO = sessionStorage.getItem('postNo');


    var textarea1 = $('#text_area').val();
    if (textarea1 == null || textarea1 == undefined || textarea1 == "") {
        alert('내용을 입력해주세요.');
        $('#text_area').focus();
        return;
    }
    $.ajax({
        type: 'post',
        url: 'https://dormabook.shop/api/applications/applicationform',
        beforeSend: function (xhr){
            xhr.setRequestHeader("Authorization",token);
        },
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            postNo: postNO,
            applicationContent: textarea1,
            applicationId : username

        }),
        error: function (error) {
            alert('error 발생')
        },
        success: function () {
            console.log('')
            alert('신청이 완료되었습니다.');
            self.close();
        }
    });


})

function cancel(){
    self.close();
}