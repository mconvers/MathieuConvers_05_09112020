import '../scss/app.scss';

import axios from 'axios';

const urlBase = "http://localhost:3000/api/teddies";

window.addEventListener('load', () => {
  console.log('ok');
  let items = [];
    axios.get(`${urlBase}/`)
    .then((response) => {
      items = response;
      console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
  let listOfItems = '';
  items.forEach((item) => {
    listOfItems += `
      <div class="item bordered">
        <div class="item__image">
          <img src="${item.imageUrl}" alt="teddy_5">
        </div>
        <div class="item__name">
          ${item.name}
        </div>
        <div class="item__price">
          ${item.price} €
        </div>
        <div class="item__links">
          <a href="product.html?item=${item.id}">Voir</a>
          <a href="">
            <span class="mdi mdi-cart-plus"></span>
          </a>
        </div>
      </div>
    `;
  });
  document.getElementById('list').innerHTML = listOfItems;
});