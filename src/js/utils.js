export function getItems() {
  const items = [];

  if (window.localStorage.getItem('basket')) {
    return JSON.parse(window.localStorage.getItem('basket'));
  }
  return items;
}
export function addToCart(item) {
  const items = getItems();
  if (items.length) {
    const foundItem = items.find((i) => i._id === item._id);
    if (foundItem) {
      foundItem.quantity += item.quantity;
    } else {
      items.push(item);
    }
  } else {
    items.push(item);
  }
  window.localStorage.setItem('basket', JSON.stringify(items));
  setTotalCart();
}

export function updateQuantities(action, item, options) {
  // switch case selon data action
  switch (action) {
    case 'increment':
    case 'decrement':
      const itemDiv = options.div;
      const itemQuantity = itemDiv.querySelector('.quantity__count');
      const decrementBtn = itemDiv.querySelector('button[data-action=decrement]');
      if (action === 'increment') {
        // si data action est increment on ajoute un item
        item.quantity += 1;
        if (item.quantity > 1) {
          decrementBtn.disabled = false;
        }
      } else if (item.quantity > 1) {
        // si la quantité est plus grande que 1 on enlève un item
        item.quantity -= 1;
        if (item.quantity === 1) {
          decrementBtn.disabled = true;
        }
      }
      // maj quantité
      itemQuantity.textContent = item.quantity;

      if (options.module === 'Cart') {
        // re calcule de la ligne
        window.localStorage.setItem('basket', JSON.stringify(options.items));
        const totalRow = itemDiv.querySelector('.total-row');
        totalRow.textContent = `${(item.quantity * item.price / 100).toFixed(2)} €`;
        setTotalCart();
      }
      break;
    default:
  }
}

export function setTotalCart() {
  const items = getItems();
  const r = (items.reduce((acc, item) => acc + item.quantity * item.price, 0) / 100).toFixed(2);
  const div = document.getElementById('totalCart');
  if (div) {
    div.textContent = `${r} €`;
  }
  const div2 = document.querySelector('.cart-ico__totalCart');
  div2.textContent = `${r} €`;
}

export function totalOrder(items) {
  const totalDiv = document.getElementById('totalCart');
  const r = (items.reduce((acc, item) => acc + item.price, 0) / 100).toFixed(2);
  totalDiv.textContent = `${r} €`;
}

export function deleteItem(itemKey, items) {
  items.splice(itemKey, 1);
  window.localStorage.setItem('basket', JSON.stringify(items));
}
