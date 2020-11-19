import axios from '../axios';
import { totalOrder } from '../utils';

function confirm() {
  // on récupère les infos de commande (contact, orderId et products)
  const order = JSON.parse(window.localStorage.getItem('order'));
  // on récupère les items du basket dans LocalStorage car on a émuler la possibilité d'avoir le choix d'un quantité
  const items = JSON.parse(window.localStorage.getItem('basket'));

  // selection de l'élément HTML article
  const article = document.getElementsByTagName('article')[0];
  // mise en place de la class 'cart' sur <article>
  article.className = 'confirm';
  // selection du premier enfant de l'élément HTML article
  const wrapper = article.children[0];
  // on remplit le wrapper
  wrapper.innerHTML = `
    <header>
      <div class="confirm__logo">
        <i class="mdi mdi-check"></i>
      </div>
      <p class="confirm__title">
        Merci ${order.contact.firstName}, <br>
      </p>
      <p class="confirm__subtitle">
        à bientôt !
      </p>
    </header>
    <div class="confirm__summary">
      <div class="confirm__command-nbr">
        <p class="command-label">
          Numéro de votre commande
        </p>
        <p class="command-sublabel">
          ${order.orderId}
        </p>
      </div>
      <div class="confirm__command-price">
        <p class="command-label">
          Total de votre commande
        </p>
        <p class="command-sublabel" id="totalCart">
        </p>
      </div>
    </div>
    <footer>
      <a href="" onclick="router.push({ name: 'index' }, ...arguments)" class="btn" color="primary" elevation big>
        OK
      </a>
      <p>
        Un e-mail de confirmation a été encoyé à ${order.contact.email} <br>
        Des questions ? Contactez-nous au <a href="tel:01-XX-XX-XX-XX">01-XX-XX-XX-XX</a>
      </p>
    </footer>
    `;

  // on ajoute le wrapper à l'élément article
  article.appendChild(wrapper);

  // on affiche le total de la commande
  totalOrder(order.products);
  // on vide le LocalStorage (vide le pannier)
  window.localStorage.clear();
}

export default confirm;
