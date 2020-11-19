import cart from './Cart';
import product from './Product';
import index from './Home';
import confirm from './Confirm';
import error from './Error';

export default [
  {
    path: '/',
    name: 'index',
    load: index,
  },
  {
    path: '/product',
    name: 'product',
    load: product,
  },
  {
    path: '/cart',
    name: 'cart',
    load: cart,
  },
  {
    path: '/confirm',
    name: 'confirm',
    load: confirm,
  },
  {
    path: '/error',
    name: 'error',
    load: error,
  },
];
