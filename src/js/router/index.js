import routes from './routes';

let ready = false;

class Router {
  // Initialise le routeur, peut être appelée plusieurs fois sans problème
  static init() {
    if (!ready) {
      const routesMap = new Map();
      routes.forEach((route) => {
        routesMap.set(route.path, route);
      });

      const routeURL = new URL(window.location);
      const queryParams = {};

      for (const [key, values] of routeURL.searchParams.entries()) {
        queryParams[key] = values;
      }

      const route = routesMap.get(window.location.pathname);

      if (!route || route.name === 'confirm') {
        return window.router.push({ name: 'error' });
      }

      const routeParams = {
        name: route.name,
        query: queryParams,
      };
      route.load(routeParams);

      window.onpopstate = (e) => {
        const r = routesMap.get(window.location.pathname);
        if (!r || r.name === 'confirm') {
          window.router.push({ name: 'error' });
        }
        r.load(e.state);
      };

      ready = true;
    }
  }

  static push(route, e = null) {
    console.log(route, e);
    // console.log('route: ', route);
    const nextRoute = routes.find((r) => r.name === route.name);
    const routeURL = new URL(nextRoute.path, window.location);
    if (route.query) {
      Object.keys(route.query).forEach((key) => {
        routeURL.searchParams.append(key, route.query[key]);
      });
    }

    if (route.name) {
      routes.find((r) => r.name === route.name).load(route);
    }

    if (e) {
      e.preventDefault();
    }

    const url = `${routeURL.pathname}${routeURL.search}`;
    window.history.pushState(route, route.name, url);
  }
}

export default Router;
