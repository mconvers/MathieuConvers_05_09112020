import '../scss/app.scss';
import Router from './router';
import { setTotalCart } from './utils';

window.addEventListener('load', () => {
  // On initialise le router
  window.router = Router;
  Router.init();
  setTotalCart();
});
