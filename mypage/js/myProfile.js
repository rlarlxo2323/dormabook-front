const $nav = document.querySelector('#nav2')
const $sections = document.querySelectorAll('.tab-item');

$nav.addEventListener('click', (e) => {
    if (!e.target.classList.contains('tab-head')) {
        return;
    }

    var matches = document.getElementsByClassName('b1 tab-head');

    for (var i = 0; i < matches.length; i++) {
        var item = matches.item(i);
        item.classList = 'b2 tab-head';
    }

    e.target.classList = 'b1 tab-head';

    const focusedTabId = e.target.dataset.tabSection;

    $sections.forEach(($section) => {
        if ($section.id === focusedTabId) {
            $section.removeAttribute('hidden');
        } else {
            $section.setAttribute('hidden', true);
        }
    });
});


function load_post (token){
    $("#content__title").empty();
    $("#content__matchState").empty();
    $("#content__date").empty();

    $.ajax({
        type: "GET",
        url: "https://dormabook.shop/api/post/community/mypage/postlist",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            console.log(data);
            if (data === null || data.length === 0){

            }else {
                document.getElementById("t1_postHeader").innerHTML="";
                document.getElementById("t1_postBody-text").innerHTML="";
                document.getElementById("t1_postFooter").innerHTML="";

                var numOfContent = data.length;
                var maxContent = 3;
                var maxButton = 5;
                var contents = document.querySelector(".t1_contents");
                var buttons = document.querySelector(".t1_postFooter");
                var maxPage = Math.ceil(numOfContent / maxContent);
                let page = 1;
                var title = [];
                var matchState = [];
                var createAt = [];
                var postNO = [];

                function timestamp(a) {
                    var today = new Date(a);
                    today.setHours(today.getHours() + 9);
                    return today.toISOString().replace('T', ' ').substring(0, 19);
                }

                $.each(data, function (i, item) {
                    title[i] = item.postTitle;
                    matchState[i] = item.postMatchState;
                    var date = timestamp(item.postCreatedAt);
                    createAt[i] = date;

                    if (matchState[i] === 0) {
                        var PMT = "매칭 중";
                        matchState[i] = PMT

                    } else {
                        var PMT = "매칭 완료";
                        matchState[i] = PMT
                    }
                    console.log(matchState[i])
                });


                var makeContent = (id) => {
                    var content = document.createElement("li_1");
                    var stateHTML = "";

                    content.classList.add("content_1");

                    content.innerHTML = `
                  <!--    <span class="content__id">${id}</span>-->
                  <!-- <span class="content_postNO">${postNO[id - 1]}</span>-->
                  <span class="content__title" id="content__title">${title[id - 1]}</span>
                  `;

                    if (matchState[id - 1] === "매칭 중") {
                        content.innerHTML += `
                    <span class="content__matchState" id="content__matchState" style="justify-content: center; width: 100px; border-radius: 20px; background: rgba(170, 170, 170, 0.2);
                        text-align: center; padding: 10px; line-height: 18px; color: rgba(0, 0, 0, 0.7);">${matchState[id - 1]}</span>
                    `;
                    } else {
                        content.innerHTML += `
                    <span class="content__matchState" id="content__matchState" style="justify-content: center; width: 100px; border-radius: 20px; background: rgba(72, 118, 239, 0.2);
                        text-align: center; padding: 10px; line-height: 18px; color: rgba(0, 0, 0, 0.7);">${matchState[id - 1]}</span>
                    `;
                    }

                    content.innerHTML += `<span class="content__date" id="content__date">${createAt[id - 1]}</span>`;


                    return content;
                };
                $(document).on("click", ".contents li_1", function () {
                    var a = $(this);
                    var s = a.eq(3).text();
                    console.log(s);

                })


                var makeButton = (id) => {
                    var button = document.createElement("button");
                    button.classList.add("button");
                    button.dataset.num = id;
                    button.innerText = id;
                    button.addEventListener("click", (e) => {
                        Array.prototype.forEach.call(buttons.children, (button) => {
                            if (button.dataset.num) button.classList.remove("active");
                        });
                        e.target.classList.add("active");
                        renderContent(parseInt(e.target.dataset.num));
                    });
                    return button;
                };

                var goPrevPage = () => {
                    page -= maxButton;
                    render(page);
                };

                var goNextPage = () => {
                    page += maxButton;
                    render(page);
                };

                var prev = document.createElement("button");
                prev.classList.add("button", "prev");
                prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
                prev.addEventListener("click", goPrevPage);

                var next = document.createElement("button");
                next.classList.add("button", "next");
                next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
                next.addEventListener("click", goNextPage);

                var renderContent = (page) => {
                    while (contents.hasChildNodes()) {
                        contents.removeChild(contents.lastChild);
                    }
                    for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
                        contents.appendChild(makeContent(id));
                    }
                };

                var renderButton = (page) => {
                    while (buttons.hasChildNodes()) {
                        buttons.removeChild(buttons.lastChild);
                    }
                    for (let id = page; id < page + maxButton && id <= maxPage; id++) {
                        buttons.appendChild(makeButton(id));
                    }
                    buttons.children[0].classList.add("active");

                    buttons.prepend(prev);
                    buttons.append(next);

                    if (page - maxButton < 1) buttons.removeChild(prev);
                    if (page + maxButton > maxPage) buttons.removeChild(next);
                };

                var render = (page) => {
                    renderContent(page);
                    renderButton(page);
                };
                render(page);
            }
        },
        error: function () {
            //
        }

    });
}

function load_application_form (token){

}

function load_class (token){
    $("#content__body").empty();
    $("#content__btn").empty();

    $.ajax({
        type: "GET",
        url: "https://dormabook.shop/api/post/community/mypage/classlist",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            console.log(data);
            if (data === null || data.length === 0){

            }else {

                document.getElementById("t3_postHeader").innerHTML="";
                document.getElementById("t3_postBody-text").innerHTML="";
                document.getElementById("t3_postFooter").innerHTML="";

                var numOfContent = data.length;
                var maxContent = 3;
                var maxButton = 5;
                var contents = document.querySelector(".t3_contents");
                var buttons = document.querySelector(".t3_postFooter");
                var maxPage = Math.ceil(numOfContent / maxContent);
                let page = 1;
                var team_no = [];
                var subject = [];
                var team_roomNo = [];
                var team_addr = [];
                var user_id = [];

                $.each(data, function (i, item) {
                    team_no[i] = item.teamNo;
                    subject[i] = item.teamSubject;
                    team_roomNo[i] = item.studyroomNo;
                    team_addr[i] = item.studyroomdomainaddr;
                    user_id[i] = item.memberId;

                });


                var makeContent = (id) => {
                    var content = document.createElement("li_3");
                    var stateHTML = "";

                    content.classList.add("content_3");

                    content.innerHTML = `
                  <span class="content__body" id="content__body">${subject[id - 1]} 학습실</span>
                  `;

                    content.innerHTML += `<form method="get">`;
                    content.innerHTML += `<button name="form1" class="content__btn btn-redirect" id="content__btn" type="submit" value2=${team_addr[id -1]} value1=${team_roomNo[id -1]}>학습실로 이동</button>`;
                    content.innerHTML += `</form>`


                    return content;
                };

                $(document).on("click", ".content__btn", function () {
                    var param2 = $(this).attr('value2');
                    var param1 = $(this).attr('value1');

                    $("#content__btn").attr("action", "https://class.dormabook.shop/video-chat").submit();

                    // $.ajax({
                    //     type: "GET",
                    //     url: "https://class.dormabook.shop/video-chat",
                    //     // beforeSend: function (xhr) {
                    //     //     xhr.setRequestHeader("Authorization", token);
                    //     // },
                    //     success: function (data) {
                    //         // window.location.href = "https://class.dormabook.shop/study-room/"+param1+"/"+param2;
                    //
                    //     },
                    //     error: function () {
                    //         //
                    //     }
                    //
                    // });
                });


                var makeButton = (id) => {
                    var button = document.createElement("button");
                    button.classList.add("button");
                    button.dataset.num = id;
                    button.innerText = id;
                    button.addEventListener("click", (e) => {
                        Array.prototype.forEach.call(buttons.children, (button) => {
                            if (button.dataset.num) button.classList.remove("active");
                        });
                        e.target.classList.add("active");
                        renderContent(parseInt(e.target.dataset.num));
                    });
                    return button;
                };

                var goPrevPage = () => {
                    page -= maxButton;
                    render(page);
                };

                var goNextPage = () => {
                    page += maxButton;
                    render(page);
                };

                var prev = document.createElement("button");
                prev.classList.add("button", "prev");
                prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
                prev.addEventListener("click", goPrevPage);

                var next = document.createElement("button");
                next.classList.add("button", "next");
                next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
                next.addEventListener("click", goNextPage);

                var renderContent = (page) => {
                    while (contents.hasChildNodes()) {
                        contents.removeChild(contents.lastChild);
                    }
                    for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
                        contents.appendChild(makeContent(id));
                    }
                };

                var renderButton = (page) => {
                    while (buttons.hasChildNodes()) {
                        buttons.removeChild(buttons.lastChild);
                    }
                    for (let id = page; id < page + maxButton && id <= maxPage; id++) {
                        buttons.appendChild(makeButton(id));
                    }
                    buttons.children[0].classList.add("active");

                    buttons.prepend(prev);
                    buttons.append(next);

                    if (page - maxButton < 1) buttons.removeChild(prev);
                    if (page + maxButton > maxPage) buttons.removeChild(next);
                };

                var render = (page) => {
                    renderContent(page);
                    renderButton(page);
                };
                render(page);
            }
        },
        error: function () {
            //
        }

    });
}

$(document).ready(function ($) {

    $('#comunity_home').click(function () {
        window.location.href = "https://dormabook.shop/community";
    })
    $('#post_list').click(function () {
        window.location.href = "https://dormabook.shop/postlist";
    })

    var token = sessionStorage.getItem('jwt');
    if (!token) {
        alert('로그인이 되어 있지 않거나, 비정상적인 접근입니다.');
        window.location.href = "https://dormabook.shop"
    }

    load_post(token);
    load_class(token);



});