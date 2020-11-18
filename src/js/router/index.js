import routes from './routes';

class Router {
  constructor() {
    this.routesMap = new Map();
    routes.forEach((route) => {
      this.routesMap.set(route.path, route);
    });

    const routeURL = new URL(window.location);
    const queryParams = {};

    for (const [key, values] of routeURL.searchParams.entries()) {
      queryParams[key] = values;
    }

    const route = this.routesMap.get(window.location.pathname);
    const routeParams = {
      name: route.name,
      query: queryParams,
    };
    route.load(routeParams);

    window.onpopstate = (e) => {
      this.routesMap.get(window.location.pathname).load(e.state);
    };
  }

  push(route, e = null) {
    console.log('route: ', route);
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
      const url = `${routeURL.pathname}${routeURL.search}`;
      window.history.pushState(route, route.name, url);
    }
  }
}

export default Router;
