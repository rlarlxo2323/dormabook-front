$(document).ready(function ($) {

    var getpostNO = sessionStorage.getItem("postNO"); //서버 연결 후 이걸로 사용
    $("#post__title").empty();
    $("#user__name").empty();
    $("#post__created_at").empty();
    $("#post__match_state").empty();
    $("#post__content").empty();
    $("#book__image").empty();
    // var postNO = 70; //테스트 코드
    var post_url = "https://dormabook.shop/api/post/mento_post?" + $.param({"postNo": getpostNO});

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
            console.log(data.postCreatedAt);
            console.log(data.memberName);
            console.log(data.postMatchState);
            console.log(data.bookSaveimagename);
            console.log(data.bookimageRoute);
            console.log(data.postContent);
            console.log(data.postTitle);
            if (data.postMatchState == 1){
                var matchState = "매칭 완료";
            }else{
                var matchState = "매칭 중";
            }
            var date = timestamp(data.postCreatedAt);                         // todo: 아래코드를 서버 사진 저장 폴더 경로로 바꿔줘야함. 39번째 라인
            var imageCode = data.bookimageRoute + "/" + data.bookSaveimagename; // ->  c:/Users/KING/test/uploads/5faa9050-e5c7-4813-886d-95766e60e350_t2.png
            console.log(imageCode)
            var test =imageCode.replaceAll('/','\\');    // -> C:\Users\KING\test\uploads\41c43072-4e49-4e4d-851b-b8f3af778930_mento_scprit.png
            console.log(test)
            document.getElementById("post__title").innerText = data.postTitle;
            document.getElementById("user__name").innerText = data.memberName;
            document.getElementById("post__created_at").innerText = date;
            document.getElementById("post__match_state").innerText = matchState;
            document.getElementById("post__content").innerText = data.postContent;

            function display_image(src, width, height, alt) {
                var a = document.createElement("img");
                a.src = src;
                a.width = width;
                a.height = height;
                a.alt = alt;
                document.getElementById("book__image").appendChild(a);
            }
            display_image(test,100,100,'bookImage');
        },
        error: function (error) {
            console.log(error)
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