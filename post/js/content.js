const contents = document.querySelector(".contents");
const buttons = document.querySelector(".buttons");

const numOfContent = 118; //전체 글의 갯수
const maxContent = 10; //한 페이지에 보여줄 글의 최대 갯수
const maxButton = 5; //한 페이지에 보여줄 페이지 버튼의 최대 갯수
const maxPage = Math.ceil(numOfContent / maxContent); //글을 모두 보여주기 위해 필요한 페이지의 갯수
let page = 1; // 현재 페이지

const makeContent = (id) => {
  const content = document.createElement("li");
  content.classList.add("content");
  content.innerHTML = `
    <span class="numOfContent">전체 게시물</span>
    <span class="content__id">${id}</span>
    <span class="content__title">게시물 제목</span>
    <span class="content__author">작성자</span>
    <span class="content__date">2022.01.01</span>
  `;
  return content;
};

const makeButton = (id) => {
  const button = document.createElement("button");
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

// Prev, Next Button
const goPrevPage = () => {
  page -= maxButton;
  render(page);
};

const goNextPage = () => {
  page += maxButton;
  render(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);

const renderContent = (page) => {
  while (contents.hasChildNodes()) {
    contents.removeChild(contents.lastChild);
  }
  for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
    contents.appendChild(makeContent(id));
  }
};

const renderButton = (page) => {
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

const render = (page) => {
  renderContent(page);
  renderButton(page);
};
render(page);