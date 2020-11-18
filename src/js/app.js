import '../scss/app.scss';
import Router from './router';

window.addEventListener('load', () => {
  // On initialise le router
  window.router = new Router();
});
