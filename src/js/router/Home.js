import axios from '../axios';
import { addToCart } from '../utils';

function index() {
  axios.get('/')
    .then((response) => {
      const items = response.data;
      // selection de l'élément HTML article
      const article = document.getElementsByTagName('article')[0];
      // mise en place de la class 'list-articles' sur <article>
      article.className = 'list-articles';
      // selection du premier enfant de l'élément HTML article
      const wrapper = article.children[0];
      // on vide le wrapper
      wrapper.innerHTML = '';
      const container = document.createElement('div');
      container.className = 'list';
      // on creer un élément div temporaire pour contenir le HTML de chaque item
      const divTemp = document.createElement('div');

      items.forEach((item, i) => {
        item.quantity = 1;

        divTemp.innerHTML = `
        <div class="item bordered" data-id="${i}">
          <div class="item__image">
            <img src="${item.imageUrl}" alt="teddy_5">
          </div>
          <div class="item__name">
            ${item.name}
          </div>
          <div class="item__price">
            ${(item.price / 100).toFixed(2)} €
          </div>
          <div class="item__links">
            <a href="" onclick="router.push({ name: 'product', query: { id: '${item._id}' }}, ...arguments)">Voir</a>
            <a href="" class="mdi mdi-cart-plus" data-action="addToCart" >
            </a>
          </div>
        </div>
        `;

        const linkAddToCart = divTemp.querySelector('a[data-action=addToCart]');
        linkAddToCart.addEventListener('click', (e) => {
          e.preventDefault();
          addToCart(item);

          // on affiche remplit et affiche la snackbar
          const snackbar = document.getElementsByClassName('snackbar__content')[0];
          snackbar.parentNode.classList.add('success');
          snackbar.innerHTML = `
            L'article "${item.name}" à bien été ajouté à
            <a href="" onclick="router.push({ name: 'cart' }, ...arguments)" style="text-decoration: underline;">votre pannier</a>
          `;
          // après 3 sec on cache la snackbar et on la vide
          setTimeout(function () {
            snackbar.parentNode.classList.remove('success');
            snackbar.innerHTML = '';
          }, 3000);
        });
        container.appendChild(divTemp.firstElementChild);
      });
      wrapper.appendChild(container);
      article.appendChild(wrapper);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default index;
