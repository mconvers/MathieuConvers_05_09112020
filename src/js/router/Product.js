import axios from '../axios';
import { addToCart, updateQuantities } from '../utils';

function product(routeParams) {
  axios.get(`/${routeParams.query.id}`)
    .then((response) => {
      const item = response.data;
      // selection de l'élément HTML article
      const article = document.getElementsByTagName('article')[0];
      // mise en place de la class 'product' sur <article>
      article.className = 'product';
      // selection du premier enfant de l'élément HTML article
      const wrapper = article.children[0];
      wrapper.innerHTML = '';
      // on creer un élément div temporaire pour contenir le HTML de chaque item
      const divTemp = document.createElement('div');
      // on initialise la qunatité à 1
      item.quantity = 1;

      divTemp.innerHTML = `
        <div class="product__image">
          <img src="${item.imageUrl}" alt="Peluche ${item.name}">
        </div>
        <div class="product__infos">
          <h1 class="product__title">${item.name}</h1>
          <p class="product__price">${(item.price / 100).toFixed(2)} €</p>
          <p class="product__desc">${item.description}</p>
          <div class="product__select">
            <label for="colors">Couleurs :</label>
            <div class="custom-select">
              <select name="colors" id="">
                ${item.colors.map((color) => `<option value="${color}">${color}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="product__action">
            <div class="quantity bordered">
              <button class="btn" id="decrementItem" data-action="decrement" disabled>
                <span class="mdi mdi-minus"></span>
              </button>
              <div class="quantity__count bordered" id="itemQuantity">
                ${item.quantity}
              </div>
              <button class="btn" id="incrementItem" data-action="increment">
                <span class="mdi mdi-plus"></span>
              </button>
            </div>
            <button class="btn addToCart" data-action=addToCart color="primary" elevation>
              Ajouter au panier
            </button>
          </div>
        </div>
    `;

      // on recupère l'élément data-action = addToCart
      const linkAddToCart = divTemp.querySelector('button[data-action=addToCart]');
      // on écoute l'event au click sur l'élément
      linkAddToCart.addEventListener('click', (e) => {
        e.preventDefault();
        // on ajoute au panier l'item (dans le localstorage)
        addToCart(item);

        // on affiche remplit et affiche la snackbar
        const snackbar = document.getElementsByClassName('snackbar__content')[0];
        snackbar.parentNode.classList.add('success');
        snackbar.innerHTML = `
          L'article "${item.name}" à bien été ajouté à
          <a href="" onclick="router.push({ name: 'cart' }, ...arguments)" style="text-decoration: underline;">votre pannier</a>
        `;
        // après 5 sec on cache la snackbar et on la vide
        setTimeout(function () {
          snackbar.parentNode.classList.remove('success');
          snackbar.innerHTML = '';
        }, 5000);
      });

      // ### actions d'update de la quantité ###
      // on recupère l'élément div.quantity
      const option = { div: divTemp.querySelector('div.quantity') };
      console.log(option);
      // on recupère les bouton + et -
      const linkIncrement = divTemp.querySelector('button[data-action=increment]');
      const linkDecrement = divTemp.querySelector('button[data-action=decrement]');
      // on update la quantité au click
      linkIncrement.addEventListener('click', () => {
        updateQuantities('increment', item, option);
      });
      linkDecrement.addEventListener('click', () => {
        updateQuantities('decrement', item, option);
      });

      // on ajoute les éléments à l'élément article du DOM
      while (divTemp.firstChild) {
        wrapper.appendChild(divTemp.firstElementChild);
      }
      article.appendChild(wrapper);
    });
}

export default product;
