import axios from 'axios';

const url = 'https://hexschool.github.io/js-filter-data/data.json';
let data;
let showData = [];
let category = '';

const table = document.querySelector('.table-content');
const filter = document.querySelector('.filter');

const renderData = (d) => {
  let str = '';
  d.forEach((b) => {
    const content = `
      <tr><td>${b.作物名稱}
      </td><td>${b.市場名稱}
      </td><td>${b.上價}
      </td><td>${b.中價}
      </td><td>${b.下價}
      </td><td>${b.平均價}
      </td><td>${b.交易量}
      </td></tr>
    `;
    str += content;
  });
  return str;
};

axios.get(url)
  /* eslint prefer-arrow-callback: ['error', { 'allowNamedFunctions': true } ] */
  .then(function afterGet(res) {
    data = res.data.filter((a) => a.作物名稱);
    // TODO: 之後拆成 renderData 函式
    const str = renderData(data);
    table.innerHTML = str;
  });

function filterCategory(e) {
  if (e.target.nodeName === 'BUTTON') {
    category = e.target.dataset.category;
    showData = data.filter((i) => i.種類代碼 === category);
    const str = renderData(showData);
    table.innerHTML = str;
  }
}

filter.addEventListener('click', filterCategory);
