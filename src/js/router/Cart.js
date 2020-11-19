import {
  updateQuantities, setTotalCart, deleteItem, getItems,
} from '../utils';

function cart() {
  // on récupère les items du basket dans LocalStorage
  const items = getItems();

  // selection de l'élément HTML article
  const article = document.getElementsByTagName('article')[0];
  // mise en place de la class 'cart' sur <article>
  article.className = 'cart';
  // selection du premier enfant de l'élément HTML article
  const wrapper = article.children[0];
  // on ajouter la balie h1 au wrapper
  wrapper.innerHTML = '<h1 class="cart__title">Panier</h1>';
  // on créer un élément div qui contendra le header du tableau et les lignes d'item
  const containerTable = document.createElement('div');
  // on ajoute la class à la div
  containerTable.className = 'cart__items bordered';
  containerTable.innerHTML = `
  <div class="cart__items__header">
      <div></div>
      <div></div>
      <div>Product</div>
      <div>Price</div>
      <div>Quantity</div>
      <div>Total</div>
    </div>`;
  // on creer un élément div temporaire pour contenir le HTML de chaque item
  const divTemp = document.createElement('div');
  // onc réer la boucle sur les items du LocalStorage
  items.forEach((item, i) => {
    divTemp.innerHTML = `
      <div class="cart__items__row item" data-id="${i}">
        <div class="item__action">
          <button class="mdi mdi-close" data-action="delete"></button>
        </div>
        <div class="item__image">
          <img src="${item.imageUrl}" alt="" width="30px">
        </div>
        <div class="item__name">
          <span class="item__title">Produit</span>
          ${item.name}
        </div>
        <div class="item__price">
          <span class="item__title">Prix</span>
          ${(item.price / 100).toFixed(2)} €
        </div>
        <div class="item__calc">
          <span class="item__title">Quantité</span>
          <div class="quantity bordered">
            <button class="btn mdi mdi-minus" data-action="decrement">
            </button>
            <div class="quantity__count bordered">
              ${item.quantity}
            </div>
            <button class="btn mdi mdi-plus" data-action="increment">
            </button>
          </div>
        </div>
        <div class="item__total">
          <span class="item__title">Total</span>
          <span class="total-row">${((item.quantity * item.price) / 100).toFixed(2)} €</span>
        </div>
      </div>
    `;

    // ### actions d'update de la quantité ###
    // on recupère l'élément div.quantity, le nom du module et la liste d'items du LocalStorage
    const options = {
      div: divTemp.querySelector('div.cart__items__row'),
      module: 'Cart',
      items: items,
    };
    // on recupère les boutons
    const linkIncrement = divTemp.querySelector('button[data-action=increment]');
    const linkDecrement = divTemp.querySelector('button[data-action=decrement]');
    const linkDelete = divTemp.querySelector('button[data-action=delete]');
    // on update la quantité au click
    linkIncrement.addEventListener('click', () => {
      updateQuantities('increment', item, options);
    });
    linkDecrement.addEventListener('click', () => {
      updateQuantities('decrement', item, options);
    });
    linkDelete.addEventListener('click', () => {
      deleteItem(i, items);
      cart();
    });

    // on ajoute l'élément au containerTable
    containerTable.appendChild(divTemp.firstElementChild);
  });
  // on ajoute le tableau d'items au wrapper
  wrapper.appendChild(containerTable);
  divTemp.innerHTML = `
    <div class="cart__total bordered">
      <p class="cart__total__title">Total panier</p>
      <div class="cart__total__price" id="totalCart">
        0,00 €
      </div>
    </div>
  `;
  // on ajoute le bloc Total au wrapper
  wrapper.appendChild(divTemp.firstElementChild);
  divTemp.innerHTML = `
  <div class="cart__form form">
    <form action="">
      <div class="form__input">
        <label for="mail">Mail <span>*</span> </label>
        <input type="text" id="mail" data-name="Mail" data-type="email">
      </div>
      <div class="form__input">
        <label for="lastname">Nom <span>*</span></label>
        <input type="text" id="lastname" data-name="Nom" data-type="lastName">
      </div>
      <div class="form__input">
        <label for="name">Prénom <span>*</span></label>
        <input type="text" id="name" data-name="Prénom" data-type="firstName">
      </div>
      <div class="form__input">
        <label for="adress">Adresse <span>*</span></label>
        <input des rues" type="text" id="adress" data-name="Adresse" data-type="address">
      </div>
      <div class="form__input">
        <label for="city">Ville <span>*</span></label>
        <input type="text" id="city" data-name="Ville" data-type="city">
      </div>
      <div class="info">
        <span>*</span> : Champs obligatoir
      </div>
      <button
        id="submit"
        data-action="decrement"
        type="submit"
        class="btn cart__items__btn"
        color="primary"
        elevation
        big
      >
        Passer la commande
      </button>
    </form>
  </div>
  `;
  // on ajoute le form au wrapper
  wrapper.appendChild(divTemp.firstElementChild);

  // on ajoute le wrapper à l'élément article
  article.appendChild(wrapper);

  // Total du pannier
  setTotalCart();

  // on crée le json à envoyer
  const formBody = {
    contact: {},
    products: [],
  };

  document.querySelector('cart__form');

  // on récupère tous les inputs
  const inputs = document.querySelectorAll('input');

  // click to order
  document.getElementById('submit').onclick = (e) => {
    e.preventDefault();

    // validation des inputs
    const errors = [];
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].getAttribute('data-name') === 'Mail') {
        // on vérifie si le mail est valide
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputs[i].value)) {
          formBody.contact[inputs[i].dataset.type] = inputs[i].value;
        } else if (inputs[i].value === '') {
          errors.push("- L'email doit être saisi");
        } else {
          inputs[i].parentNode.classList.add('error');
          errors.push("- L'email est invalide");
        }
      } else if (inputs[i].value === '') {
        inputs[i].parentNode.classList.add('error');
        errors.push(`- Le champ ${inputs[i].getAttribute('data-name')} doit être saisi`);
      } else {
        // on ajoute les infos de contact à l'object qui sera envoyé au serveur
        formBody.contact[inputs[i].dataset.type] = inputs[i].value;
      }
    }

    const msgError = errors.join('<br>');

    if (msgError) {
      // on affiche remplit et affiche la snackbar
      const snackbar = document.getElementsByClassName('snackbar__content')[0];
      snackbar.parentNode.classList.add('error');
      snackbar.innerHTML = `Les champs suivant sont éronés : </br></br>${msgError}`;
      // après 5 sec on cache la snackbar et on la vide
      setTimeout(function () {
        snackbar.parentNode.classList.remove('error');
        snackbar.innerHTML = '';
      }, 5000);
    } else {
      // on ajoute les id des items à envoyer au serveur
      items.forEach((item) => {
        for (let i = 0; i < item.quantity; i += 1) {
          formBody.products.push(item._id);
        }
      });
      // on passe sous forme de string l'objet à envoyer
      const body = JSON.stringify(formBody);

      // on envoie la requete en POST au serveur
      fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }).then((res) => res.json())
        .then((data) => {
          // on passe la réponse dans le localStorage
          window.localStorage.setItem('order', JSON.stringify(data));
          // on affiche remplit et affiche la snackbar
          const snackbar = document.getElementsByClassName('snackbar__content')[0];
          snackbar.parentNode.classList.add('success');
          snackbar.innerHTML = `
            Votre demande est en cours de validation
            <div class="loader" style="width:15px; margin-left: 10px;">
              <svg class="circular" viewBox="25 25 50 50">
                <circle
                  class="path"
                  cx="50" cy="50" r="20"
                  fill="none"
                  stroke-width="4"
                  stroke-miterlimit="10"/>
              </svg>
            </div>
          `;
          // après 5 sec on cache la snackbar et on la vide puis on va à la page de confirmation
          setTimeout(function () {
            snackbar.parentNode.classList.remove('success');
            snackbar.innerHTML = '';
            window.router.push({ name: 'confirm' }, { preventDefault: () => {} });
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}

export default cart;
