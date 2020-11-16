import '../scss/app.scss';

/* Your JS Code goes here */

/* Demo JS */
import './demo.js';

window.addEventListener('load', () => {
  console.log('ok');
  const items = [
    {
      id: 251235,
      name: 'Teddy',
      price: 45.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      imageUrl: '/images/products/teddy_1.jpg',
    },
    {
      id: 123153,
      name: 'Teddy mom',
      price: 33.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      imageUrl: '/images/products/teddy_2.jpg',
    },
    {
      id: 254685,
      name: 'Gros Teddy',
      price: 47.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      imageUrl: '/images/products/teddy_3.jpg',
    },
    {
      id: 155486,
      name: 'bébé Teddy',
      price: 19.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      imageUrl: '/images/products/teddy_4.jpg',
    },
    {
      id: 558694,
      name: 'Teddy bro',
      price: 47.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      imageUrl: '/images/products/teddy_5.jpg',
    },
    {
      id: 888652,
      name: 'Teddy GF',
      price: 19.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
      imageUrl: '/images/products/teddy_3.jpg',
    },
  ];
  // console.log(items);
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
