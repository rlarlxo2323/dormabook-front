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
        url: "https://dormabook.shop/api/post/mypage/postlist",
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

                    content.innerHTML = `<span class="content__title" id="content__title">${title[id - 1]}</span>`;

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
                $(document).on("click", ".content_1 li_1", function () {
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

let applicationNum;
let postNum;

function load_application_form (token){
    $("#content__postTitle").empty();
    $("#content__formBtn").empty();
    $("#content__postDate").empty();

    $.ajax({
        type: "GET",
        url: "https://dormabook.shop/api/post/mypage/applicationlist",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            console.log(data);
            if (data === null || data.length === 0){

            }else {
                document.getElementById("t2_postHeader").innerHTML="";
                document.getElementById("t2_postBody-text").innerHTML="";
                document.getElementById("t2_postFooter").innerHTML="";

                var numOfContent = data.length;
                var maxContent = 3;
                var maxButton = 5;
                var contents = document.querySelector(".t2_contents");
                var buttons = document.querySelector(".t2_postFooter");
                var maxPage = Math.ceil(numOfContent / maxContent);
                let page = 1;
                var titles = [];
                var applicationNo = [];
                var createAt = [];
                var postNos = [];
                var postRules =[];

                function timestamp(a) {
                    var today = new Date(a);
                    today.setHours(today.getHours() + 9);
                    return today.toISOString().replace('T', ' ').substring(0, 19);
                }

                $.each(data, function (i, item) {
                    titles[i] = item.postTitle;
                    postNos[i] = item.postNo;
                    postRules[i] = item.postRule;
                    applicationNo[i] = item.applicationNo;

                    var date = timestamp(item.noticecreateAt);
                    createAt[i] = date;
                });


                var makeContent = (id) => {
                    var content = document.createElement("li_2");
                    var stateHTML = "";

                    content.classList.add("content_2");

                    var newDiv = document.createElement("div");
                    newDiv.innerHTML = `${titles[id - 1]}`;
                    newDiv.classList.add("content__postTitle");
                    newDiv.setAttribute("id", "content__postTitle");

                    var secondDiv = document.createElement("div");
                    secondDiv.setAttribute("id", "flexDiv");
                    secondDiv.classList.add("secondDiv");

                    var formBtn = document.createElement("button");
                    formBtn.classList.add("content__formBtn");
                    formBtn.classList.add("btn-redirect");
                    formBtn.setAttribute("id", "btn-modal");

                    applicationNum = applicationNo[id - 1];
                    postNum = postNos[id - 1];

                    formBtn.setAttribute("value1", applicationNum);
                    formBtn.setAttribute("value2", postNum);

                    formBtn.innerHTML = `신청서 확인하기`;

                    var timeDiv = document.createElement("div");
                    timeDiv.innerHTML=`${createAt[id - 1]}`;
                    timeDiv.classList.add("content__postDate");
                    timeDiv.setAttribute("id", "content__postDate");

                    content.appendChild(newDiv);
                    content.appendChild(secondDiv);
                    secondDiv.appendChild(formBtn);
                    secondDiv.appendChild(timeDiv);

                    return content;
                };
                $(document).on("click", ".contents_2 li_2", function () {
                    var a = $(this);
                    var s = a.eq(3).text();
                    console.log(s);

                });

                $(document).on("click", "#btn-modal", function (){

                    var a = $(this).attr('value1');
                    $.ajax({
                        type: "GET",
                        url: "https://dormabook.shop/api/post/mypage/application?" + $.param({"applicationNo": a}),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", token);
                        },
                        datatype: "json",
                        success: function (data) {
                            if (data === "" || data === null){

                            }else{

                                var name = data.memberName;
                                var id = data.memberId;
                                var major = data.memberMajor;
                                var college = data.memberCollege;
                                var applicationContent = data.applicationContent;

                                document.getElementById("name").innerText = name;
                                document.getElementById("id").innerText = id;
                                document.getElementById("userMajor").innerText = major;
                                document.getElementById("userDepartment").innerText = college;
                                document.getElementById("text").innerText = applicationContent;

                                modalOn();
                            }
                        },
                        error:function() {

                        }
                    });
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

function load_class (token){
    $("#content__body").empty();
    $("#content__btn").empty();

    $.ajax({
        type: "GET",
        url: "https://dormabook.shop/api/post/mypage/classlist",
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
                    var submitId = "content__btn"+id;

                    content.classList.add("content_3");

                    content.innerHTML = `
                  <span class="content__body" id="content__body">${subject[id - 1]} 학습실</span>
                  `;

                    content.innerHTML += `<form id=${submitId}>`;
                    content.innerHTML += `<button class="content__btn btn-redirect"  value1=${team_roomNo[id -1]} value2=${team_addr[id -1]} value3=${id}>학습실로 이동</button>`;
                    content.innerHTML += `</form>`;


                    return content;
                };


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

var isSubmitted = false;

//한번만 submit 하기 위한 함수 정의.
//submit 하는 함수 중간에 넣던지 form의 onsubmit 이벤트에 걸던지 알아서..
function oneTimeSubmit(form){

    if(isSubmitted == false){

        isSubmitted = true;

        form.submit();

    }else{

        alert("데이터를 전송중입니다. 확인메세지가 나올 때 까지 기다리세요");
    }
}


$(document).on("click", ".content__btn", function () {

    var param1 = $(this).attr('value1');
    var param2 = $(this).attr('value2');
    var param3 = $(this).attr('value3');
    var submitId = "content__btn"+param3;
    var jwt = sessionStorage.getItem('jwt');

    var form = document.getElementById(submitId);
    form.action = "https://class.dormabook.shop/study-room/"+param1+"/"+param2;
    console.log(form.action);
    form.method = "post";

    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'jwt';
    hiddenField.value = jwt;
    form.appendChild(hiddenField);


    oneTimeSubmit(form);
});

const buttons = document.querySelectorAll(`button[data-modal-trigger]`);
for(let button of buttons) {
    modalEvent(button);
}
function modalEvent(button) {
    button.addEventListener('click', () => {
        const trigger = button.getAttribute('data-modal-trigger');
        const modal = document.querySelector(`[data-modal=${trigger}]`);
        const contentWrapper = modal.querySelector('.content-wrapper');
        const close = modal.querySelector('.close');
        close.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', () => modal.classList.remove('open'));
        contentWrapper.addEventListener('click', (e) => e.stopPropagation());
        modal.classList.toggle('open');
    });
}

function showUserInfo(token) {
    parseJwt = JSON.parse(Base64.decode(token.toString().split('.')[1]));

    document.getElementById("userName").innerText = parseJwt.memberName + "님";
    document.getElementById("intro").innerText = parseJwt.memberIntroduce;
    document.getElementById("college").innerText = parseJwt.memberCollege;
    document.getElementById("major").innerText = parseJwt.memberMajor;
    document.getElementById("point").innerText = parseJwt.memberPoint;

}

function modifyIntro(token){
    var modifyBtn = document.getElementById("modifyBtn");
    var introBox = document.getElementById("intro");

    modifyBtn.addEventListener('click', function (){

        if (modifyBtn.outerText === "프로필 수정"){
            modifyBtn.innerText = "프로필 저장";
            modifyBtn.style.backgroundColor = "#C42F14";
            introBox.readOnly=false;
        }else{
            modifyBtn.innerText = "프로필 수정";
            modifyBtn.style.backgroundColor = "#00C473";
            var intro = introBox.value;
            introBox.readOnly=true;
            $.ajax({
                type: "POST",
                url: "https://dormabook.shop/api/post/mypage/modifyintro",
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify({
                    memberIntroduce: intro,
                    memberValue: "value"
                }),
                datatype: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", token);
                },
                success: function (data) {
                    if (data === 1){
                        alert("자기소개가 성공적으로 변경되었습니다.");
                    }
                },
                error: function () {
                    //
                }

            });
        }
    });
}


const modal = document.getElementById("modal")
function modalOn() {
    modal.style.display = "flex"
}
function isModalOn() {
    return modal.style.display === "flex"
}
function modalOff() {
    modal.style.display = "none"
}

const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})

function guid() {
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

$(document).on("click", "#Yes", function () {
    var param1 = applicationNum;
    var param2 = postNum;
    var param3 = guid();
    var token = sessionStorage.getItem('jwt');

    console.log(param1);

    $.ajax({
        type: "POST",
        url: "https://dormabook.shop/api/post/mypage/modifyapplication",
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({
            applicationNo: param1,
            flag: 1,
            postNo: param2,
            addr: param3
        }),
        datatype: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            if (data === 1) {
                alert("승락 되었습니다.");
                modalOff();
            }
        },
        error: function () {
            //
        }
    });

});


$(document).on("click", "#No", function () {
    var param1 = applicationNum;
    var param2 = postNum;
    var param3 = guid();
    var token = sessionStorage.getItem('jwt');

    console.log(param1);

    $.ajax({
        type: "POST",
        url: "https://dormabook.shop/api/post/mypage/modifyapplication",
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({
            applicationNo: param1,
            flag: 2,
            postNo: param2,
            addr: param3
        }),
        datatype: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            if (data === 1) {
                alert("거절 되었습니다.");
                modalOff();
            }
        },
        error: function () {
            //
        }
    });
});



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

    sessionStorage.setItem('jwt', token);

    showUserInfo(token);

    load_post(token);
    load_application_form(token);
    load_class(token);

    modifyIntro(token);

});