// Featch the items from the JSON file
function loadItems() {
  return fetch('data/data.json') //fetch라는것을 통해서 데이터를 받아 온다.
    .then((response) => response.json()) // 받아온 데이터가 성공적이면 response의 body를 json Object로 변환 한다.
    .then((json) => json.items); // 그리고 제이슨 안에 있는 아이템들을 리턴하게 된다.
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items ul');
  const html = items.map((item) => createHTMLString(item));
  console.log(html); // 뭐가 나오는지 궁금할 땐, 이렇게
  // HTML 요소로 각각 아이템을 변환해 줄 것이다. (컨테이너에 innerHTML 업데이트)
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" />
            <div class="size">${item.size}</div>
        </li>
    `;
}

// Handle button click
function onButtonClick(event, items) {
  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);
  // 컨테이너에서 이벤트 리스너를 달았기 때문에 버튼들이 아니여도 컨테이너 안 주위를 누르게 되면 이벤트가 발생하고 있는것도 볼 수 있다.
  // But, undefined로 나오겠지요.
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key === null || value === null) {
    return; // 해당하는게 없다면 빨리 끝내겠다.
  }
  // const filtered = displayItems(items.filter((item) => item[key] === value));
  // console.log(filtered);
  displayItems(items.filter((item) => item[key] === value));
  // updateItems(items, key, value);
}

// Make the items matching {key: value} invisible.
// function updateItems(items, key, value) {
//   items.forEach((item) => {
//     if (item[key] === value) {
//       item.classList.remove('invisible');
//     }
//     item.classList.add('visible');
//   });
// }

function setEventListener(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.footer'); // 컨테이너 안에 있는 자식들까지 이벤트 위임을 해줄것이기 때문에 이거 하나만 쿼리해줘도 된다.
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items)); // 이벤트가 발생한 아이(event)를 인자로 전달해주고 items도 전달해준다.
}

const today = new Date();
const hours = today.getHours();
const minutes = today.getMinutes();
const clock = document.querySelector('.clock');
clock.innerText = `${hours}:${minutes}`;

// Main
loadItems()
  .then((items) => {
    console.log(items); // Array(33)
    displayItems(items); // 받아온 아이템들을 다시 displayItems 함수로 전달한다.
    setEventListener(items); // 받아온 아이템들을 다시 setEventListener 함수로 전달한다.
  })
  .catch(console.log);
