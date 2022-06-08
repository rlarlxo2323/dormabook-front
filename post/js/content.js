$(document).ready(function ($) {

    var token = sessionStorage.getItem('jwt');
    if (!token) {
        alert('로그인이 되어 있지 않거나, 비정상적인 접근입니다.');
        window.location.href = "https://dormabook.shop"
    }

    $("#content__title").empty();
    $("#content__matchState").empty();
    $("#content__date").empty();

    var post_url = "https://dormabook.shop/api/post/post_list/all";



    $('#comunity_home').click(function () {
        window.location.href = "https://dormabook.shop/community";
    })
    $('#post_list').click(function () {
        window.location.href = "https://dormabook.shop/postlist";
    })


    // $('#my_profile').click(function (){
    //     window.location.href = "http://localhost:63342/dormabook-front/front/mypage/html/myProfile.html?_ijt=e9mqrjp9mj8qnnricf75soii9v&_ij_reload=RELOAD_ON_SAVE";
    // })

    $.ajax({
        type: "GET",
        url: post_url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            console.log(data);

            var numOfContent = data.length;
            var maxContent = 8;
            var maxButton = 5;
            var contents = document.querySelector(".contents");
            var buttons = document.querySelector(".buttons");
            var maxPage = Math.ceil(numOfContent / maxContent);
            let page = 1;
            var title = [];
            var matchState = [];
            var createAt = [];
            var postNO = [];
            var postRole = [];
            document.getElementById("post_count").innerText = "전체 게시글 : " + numOfContent + " 건";
            document.getElementById("load_post").style.backgroundColor = "#00C473";
            document.getElementById("load_post").style.color = "white";

            document.getElementById("load_mentopost").style.backgroundColor = "#ffffff";
            document.getElementById("load_mentopost").style.color = "black";

            document.getElementById("load_menteepost").style.backgroundColor = "#ffffff";
            document.getElementById("load_menteepost").style.color = "black";

            function timestamp(a) {
                var today = new Date(a);
                today.setHours(today.getHours() + 9);
                return today.toISOString().replace('T', ' ').substring(0, 19);
            }

            $.each(data, function (i, item) {
                title[i] = item.postTitle;
                matchState[i] = item.postMatchState;
                postNO[i] = item.postNo;
                postRole[i] = item.postRole;
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
                var content = document.createElement("lli");
                var stateHTML = "";

                content.classList.add("content");

                content.innerHTML = `
                  <!--    <span class="content__id">${id}</span>-->
                  <span style="display: none">${postRole[id-1]}</span>
                  <span class="content_postNO" style="display: none">${postNO[id - 1]}</span>
                  <span class="content__title" id="content__title">${title[id - 1]}</span>
                  `;

                if (matchState[id - 1] == "매칭 중") {
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

        },
        error: function () {
            //
        }

    });



    $('#load_post').click(function () {
        post_url = "https://dormabook.shop/api/post/post_list/all";
        console.log(post_url);
        $.ajax({
            type: "GET",
            url: post_url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", token);
            },
            success: function (data) {
                console.log(data);

                var numOfContent = data.length;
                var maxContent = 8;
                var maxButton = 5;
                var contents = document.querySelector(".contents");
                var buttons = document.querySelector(".buttons");
                var maxPage = Math.ceil(numOfContent / maxContent);
                let page = 1;
                var title = [];
                var matchState = [];
                var createAt = [];
                var postNO = [];
                document.getElementById("post_count").innerText = '전체 게시글 : ' + numOfContent + '건';
                document.getElementById("load_post").style.backgroundColor = "#00C473";
                document.getElementById("load_post").style.color = "white";

                document.getElementById("load_mentopost").style.backgroundColor = "#ffffff";
                document.getElementById("load_mentopost").style.color = "black";

                document.getElementById("load_menteepost").style.backgroundColor = "#ffffff";
                document.getElementById("load_menteepost").style.color = "black";

                function timestamp(a) {
                    var today = new Date(a);
                    today.setHours(today.getHours() + 9);
                    return today.toISOString().replace('T', ' ').substring(0, 19);
                }

                $.each(data, function (i, item) {
                    title[i] = item.postTitle;
                    matchState[i] = item.postMatchState;
                    postNO[i] = item.postNo;
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
                    var content = document.createElement("lli");
                    var stateHTML = "";

                    content.classList.add("content");

                    content.innerHTML = `
                  <!--    <span class="content__id">${id}</span>-->
                  <span class="content_postNO" style="display: none">${postNO[id - 1]}</span>     
                  <span class="content__title" id="content__title">${title[id - 1]}</span>
                  `;

                    if (matchState[id - 1] == "매칭 중") {
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

            },
            error: function () {
                //
            }

        });

    })
    $('#load_mentopost').click(function () {
        post_url = "https://dormabook.shop/api/post/post_list?" + $.param({"postRule": "멘토"});
        console.log(post_url);
        $.ajax({
            type: "GET",
            url: post_url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", token);
            },
            success: function (data) {
                console.log(data);

                var numOfContent = data.length;
                var maxContent = 8;
                var maxButton = 5;
                var contents = document.querySelector(".contents");
                var buttons = document.querySelector(".buttons");
                var maxPage = Math.ceil(numOfContent / maxContent);
                let page = 1;
                var title = [];
                var matchState = [];
                var createAt = [];
                var postNO = [];
                document.getElementById("post_count").innerText = '멘토 게시글 : ' + numOfContent + '건';

                document.getElementById("load_mentopost").style.backgroundColor = "#00C473";
                document.getElementById("load_mentopost").style.color = "white";

                document.getElementById("load_post").style.backgroundColor = "#ffffff";
                document.getElementById("load_post").style.color = "black";

                document.getElementById("load_menteepost").style.backgroundColor = "#ffffff";
                document.getElementById("load_menteepost").style.color = "black";

                function timestamp(a) {
                    var today = new Date(a);
                    today.setHours(today.getHours() + 9);
                    return today.toISOString().replace('T', ' ').substring(0, 19);
                }

                $.each(data, function (i, item) {
                    title[i] = item.postTitle;
                    matchState[i] = item.postMatchState;
                    postNO[i] = item.postNo;
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
                    var content = document.createElement("lli");
                    var stateHTML = "";

                    content.classList.add("content");

                    content.innerHTML = `
                  <!--    <span class="content__id">${id}</span>-->
                  <span class="content_postNO" style="display: none">${postNO[id -1]}</span>
                  <span class="content__title" id="content__title">${title[id - 1]}</span>
                  `;

                    if (matchState[id - 1] == "매칭 중") {
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

            },
            error: function () {
                //
            }

        });

    })
    $('#load_menteepost').click(function () {
        post_url = "https://dormabook.shop/api/post/post_list?" + $.param({"postRule": "멘티"});
        console.log(post_url);
        $.ajax({
            type: "GET",
            url: post_url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", token);
            },
            success: function (data) {
                console.log(data);

                var numOfContent = data.length;
                var maxContent = 8;
                var maxButton = 5;
                var contents = document.querySelector(".contents");
                var buttons = document.querySelector(".buttons");
                var maxPage = Math.ceil(numOfContent / maxContent);
                let page = 1;
                var title = [];
                var matchState = [];
                var createAt = [];
                var postNO = [];
                document.getElementById("post_count").innerText = '멘티 게시글 : ' + numOfContent + '건';
                document.getElementById("load_menteepost").style.backgroundColor = "#00C473";
                document.getElementById("load_menteepost").style.color = "white";

                document.getElementById("load_post").style.backgroundColor = "#ffffff";
                document.getElementById("load_post").style.color = "black";

                document.getElementById("load_mentopost").style.backgroundColor = "#ffffff";
                document.getElementById("load_mentopost").style.color = "black";

                function timestamp(a) {
                    var today = new Date(a);
                    today.setHours(today.getHours() + 9);
                    return today.toISOString().replace('T', ' ').substring(0, 19);
                }

                $.each(data, function (i, item) {
                    title[i] = item.postTitle;
                    matchState[i] = item.postMatchState;
                    postNO[i] = item.postNo;
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
                    var content = document.createElement("lli");
                    var stateHTML = "";

                    content.classList.add("content");

                    content.innerHTML = `
                  <!--    <span class="content__id">${id}</span>-->
                  <span class="content_postNO" style="display: none">${postNO[id -1]}</span>
                  <span class="content__title" id="content__title">${title[id - 1]}</span>
                  `;

                    if (matchState[id - 1] == "매칭 중") {
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

            },
            error: function () {
                //
            }

        });

    })

    //게시글 상세 조회로 이동
    $(document).on("click",".contents lli", function (){
        var a = $(this);
        var td = a.children();
        var s = td.eq(1).text();
        var s2 =td.eq(0).text();
        console.log(s);
        console.log(s2);
        if(s2 == '멘토'){
            sessionStorage.setItem('postNo',s);
            // 멘토 게시글.html 로 가기; todo: 아래 작성 중
            window.location.href="http://dormabook.shop/"
        }else{
            sessionStorage.setItem('postNo',s);
            // 멘토 게시글.html 로 가기; todo: 아래 작성 중
            window.location.href="http://dormabook.shop/"
        }
    })

    $('#comunity_home').click(function (){
        window.location.href = "https://dormabook.shop/community";
    })
    $('#post_list').click(function (){
        window.location.href = "https://dormabook.shop/postlist";
    })
    $('#my_profile').click(function (){
        window.location.href = "https://dormabook.shop/mypage";
    })
})
