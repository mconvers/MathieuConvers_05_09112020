export function addToCart(item) {
  let items = [];

  if (window.localStorage.getItem('basket')) {
    items = JSON.parse(window.localStorage.getItem('basket'));
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
}

export function updateQuantities(action, item, options) {
  // switch case selon data action
  switch (action) {
    case 'increment':
    case 'decrement':
      console.log(options);
      const quantityDiv = options.div;
      const itemQuantity = quantityDiv.children[1];
      const decrementBtn = quantityDiv.children[0];
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
        console.log('part module');
        // re calcule de la ligne
        window.localStorage.setItem('basket', JSON.stringify(options.items));
        const totalRow = document.querySelector('.total-row');
        totalRow.textContent = `${(item.quantity * item.price / 100).toFixed(2)} €`;
      }
      break;
    default:
  }
  totalCart(options.items);
}

export function totalCart(items) {
  const totalDiv = document.getElementById('totalCart');
  const r = (items.reduce((acc, item) => acc + item.quantity * item.price, 0) / 100).toFixed(2);
  totalDiv.textContent = `${r} €`;
}

export function deleteItem(itemKey, items) {
  items.splice(itemKey, 1);
  window.localStorage.setItem('basket', JSON.stringify(items));
}
