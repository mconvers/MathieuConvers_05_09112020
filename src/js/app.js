import '../scss/app.scss';

import axios from 'axios';

const urlBase = 'http://localhost:3000/api/teddies';

window.addEventListener('load', () => {
  let items = [];
  axios.get(`${urlBase}/`)
    .then((response) => {
      items = response.data;
      GetAll(items);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function GetAll(items) {
  if (location.pathname === '/') {
    let listOfItems = '';
    items.forEach((item) => {
      listOfItems += `
        <div class="item bordered" data-id="${item._id}">
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
            <a href="product.html?item=${item._id}">Voir</a>
            <a href="">
              <span class="mdi mdi-cart-plus"></span>
            </a>
          </div>
        </div>
      `;
    });
    document.getElementById('list').innerHTML = listOfItems;
  }

  if (location.pathname.substring(1).split('/')[0] === 'product.html') {
    let product = '';
    // console.log('params', location.search);
    items.forEach((item) => {
      item = { ...item, quantity: 1 };
      console.log(item);
      if (item._id === location.search.substring(6)) {
        product += `
          <div class="product__image">
            <img src="${item.imageUrl}" alt="Peluche ${item.name}">
          </div>
          <div class="product__infos">
            <h1 class="product__title">${item.name}</h1>
            <p class="product__price">${item.price} €</p>
            <p class="product__desc">${item.description}</p>
            <div class="product__select">
              <label for="colors">Couleurs :</label>
              <div class="custom-select">
                <select name="colors" id="">`;
        item.colors.forEach((color) => {
          product += `<option value="${color}">${color}</option>`;
        });
        product += `
                </select>
              </div>
            </div>
            <div class="product__action">
              <div class="quantity bordered">
                <button class="btn" disabled="${item.quantity} <= 1">
                  <span class="mdi mdi-minus"></span>
                </button>
                <div class="quantity__count bordered">
                  ${item.quantity}
                </div>
                <button class="btn">
                  <span class="mdi mdi-plus"></span>
                </button>
              </div>
              <button class="btn addToCart" color="primary" elevation click="">
                Ajouter au panier
              </button>
            </div>
          </div>
        `;
      }
    });
    document.getElementById('product').innerHTML = product;
  }
  // console.log('path', location.pathname.substring(1).split('/')[0]);
}
