$(document).ready(function ($) {
    var token = sessionStorage.getItem('jwt');
    if(!token){
        alert('로그인이 되어 있지 않거나, 비정상적인 접근입니다.');
        window.location.href = "https://dormabook.shop"
    }
    // console.log(Base64.decode(token.toString().split('.')[1]));
    // var parseJwt = JSON.parse(Base64.decode(token.toString().split('.')[1]));

    var a = "";
    var trHTML = '';
    // var data = "권한 : " + parseJwt.memberPermission + '<br>핸드폰 번호 : ' + parseJwt.memberPhone+ '<br>학번 : ' + parseJwt.memberStudentId;
    $("#mentee_postList").empty();
    $("#mento_postList").empty();
    // $('#mentee_postList').append(data);
    $.ajax({
        type: "GET",
        // url: "http://localhost:8080/api/post/community/postlist?" + $.param({"postRule": "멘티"}),
        url: "https://dormabook.shop/api/post/community/postlist?" + $.param({"postRule": "멘토"}),
        beforeSend: function (xhr){
            xhr.setRequestHeader("Authorization",token);
        },

        success: function (data) {
            console.log(data);

            $.each(data, function (i, item) {
                if (item.postMatchState === 0) {
                    a = "매칭 중";
                    trHTML += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox">' + a + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(170, 170, 170, 0.2)")
                } else {
                    a = "매칭 완료";
                    trHTML += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox2">' + a + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(72, 118, 239, 0.2)")
                }
            });
            $('#mentee_postList').append(trHTML);
        },
        error: function () {
            //
        }
    });

        $(document).on("click","#mentee_postList tr",function (){
            var tr = $(this);
            var td = tr.children();

            var no = td.eq(2).text();
            sessionStorage.setItem('postNo',no);
            //게시글 uri 넣기;
        console.log(no);
    })
    $(document).on("click","#mento_postList tr",function (){
        var tr = $(this);
        var td = tr.children();

        var no = td.eq(2).text();
        sessionStorage.setItem('postNo',no);
        //게시글 uri 넣기;
        console.log(no);
    })
    var a1 = "";
    var trHTML1 = '';
    $.ajax({
        type: "GET",
        // url: "http://localhost:8080/api/post/community/postlist?" + $.param({"postRule": "멘토"}),
        url: "https://dormabook.shop/api/post/community/postlist?" + $.param({"postRule": "멘토"}),
        beforeSend: function (xhr){
            xhr.setRequestHeader("Authorization",token);
        },
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            $.each(data, function (i, item) {
                if (item.postMatchState === 0) {
                    a1 = "매칭 중";
                    trHTML1 += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox">' + a1 + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(170, 170, 170, 0.2)")
                } else {
                    a1 = "매칭 완료";
                    trHTML1 += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox2">' + a1 + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(72, 118, 239, 0.2)")
                }
                // console.log(item.postNo);
            });
            $('#mento_postList').append(trHTML1);
        },
        error: function () {
            //
        }
    });
    $('#comunity_home').click(function (){
        window.location.href = "https://dormabook.shop/community";
    })
    $('#post_list').click(function (){
        window.location.href = "https://dormabook.shop/postlist";
    })
    // $('#my_profile').click(function (){
    //     window.location.href = "http://localhost:63342/dormabook-front/front/mypage/html/myProfile.html?_ijt=e9mqrjp9mj8qnnricf75soii9v&_ij_reload=RELOAD_ON_SAVE";
    // })
})

