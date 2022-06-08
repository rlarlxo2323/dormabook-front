$(document).ready(function ($) {
    var token = sessionStorage.getItem('jwt');
    if(!token){
        alert('로그인이 되어 있지 않거나, 비정상적인 접근입니다.');
        window.location.href = "https://dormabook.shop"
    }
    var getpostNO = sessionStorage.getItem("postNo"); //서버 연결 후 이걸로 사용
    $("#post__title").empty();
    $("#user__name").empty();
    $("#post__created_at").empty();
    $("#post__match_state").empty();
    $("#post__content").empty();
    var post_url = "https://dormabook.shop/api/post/mentee_post?" + $.param({"postNo": getpostNO});

    function timestamp(a) {
        var today = new Date(a);
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace('T', ' ').substring(0, 19);
    }

    $.ajax({
        type: "GET",
        url: post_url,
        beforeSend: function (xhr){
            xhr.setRequestHeader("Authorization",token);
        },
        success: function (data) {
            console.log(data)
            // console.log(data.member.memberName)
            if (data.postCreatedAt == 1){
                var matchState = "매칭 완료";
            }else{
                var matchState = "매칭 중";
            }
            var date = timestamp(data.postCreatedAt);
            document.getElementById("post__title").innerText = data.postTitle;
            document.getElementById("user__name").innerText = data.member.memberName;
            document.getElementById("post__created_at").innerText = date;
            document.getElementById("post__match_state").innerText = matchState;
            document.getElementById("post__content").innerText = data.postContent;
        },
        error: function () {
            //
        }

    });
})
function back(){
    window.history.back();
}

$('#comunity_home').click(function (){
    window.location.href = "https://dormabook.shop/community";
})
$('#post_list').click(function (){
    window.location.href = "https://dormabook.shop/postlist";
})
$('#my_profile').click(function (){
    window.location.href = "https://dormabook.shop/mypage";
})