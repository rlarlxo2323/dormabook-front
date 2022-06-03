$(document).ready(function ($) {
    var a = "";
    var trHTML = '';
    $("#mentee_postList").empty();
    $("#mento_postList").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/community/mentee_postlist?" + $.param({"postRule": "멘티"}),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            $.each(data, function (i, item) {
                if (item.postMatchState === 0) {
                    a = "매칭 중";
                    trHTML += '<tr><th scope="row">' + item.postTitle + '</th><td class="postMatchBox">' + a + '</td></tr>';
                    $('.postMatchBox').css("background: rgba(170, 170, 170, 0.2)")
                } else {
                    a = "매칭 완료";
                    trHTML += '<tr><th scope="row">' + item.postTitle + '</th><td class="postMatchBox2">' + a + '</td></tr>';
                    $('.postMatchBox').css("background: rgba(72, 118, 239, 0.2)")
                }
            });
            $('#mentee_postList').append(trHTML);
        },
        error: function () {
            //
        }
    });
  var a1 = "";
  var trHTML1 = '';
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/community/mento_postlist?" + $.param({"postRule": "멘토"}),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);

      $.each(data, function (i, item) {
        if (item.postMatchState === 0) {
          a1 = "매칭 중";
          trHTML1 += '<tr><th scope="row">' + item.postTitle + '</th><td class="postMatchBox">' + a1 + '</td></tr>';
          $('.postMatchBox').css("background: rgba(170, 170, 170, 0.2)")
        } else {
          a1 = "매칭 완료";
          trHTML1 += '<tr><th scope="row">' + item.postTitle + '</th><td class="postMatchBox2">' + a1 + '</td></tr>';
          $('.postMatchBox').css("background: rgba(72, 118, 239, 0.2)")
        }
      });
      $('#mento_postList').append(trHTML1);
    },
    error: function () {
      //
    }
  });
})

