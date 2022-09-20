import { compile } from "path-to-regexp";

const findRouteByName = (nameToFind, routes) =>
  routes.find((route) => route.name === nameToFind);

const toPathByRouteName = (nameToFind, routes) => {
  const route = findRouteByName(nameToFind, routes);
  if (!route) {
    throw new Error(`Path "${nameToFind}" was not found.`);
  }
  return compile(route.path);
};

/**
 * Shorthand for single path call. (```pathByRouteName('PostsPage', routes, { id: uuidX });```)
 */
export const pathByRouteName = (nameToFind, routes, params = {}) => {
  const hasEmptySlug =
    params && params.hasOwnProperty("slug") && params.slug === "";
  const pathParams = hasEmptySlug ? { ...params, slug: "no-slug" } : params;
  return toPathByRouteName(nameToFind, routes)(pathParams);
};

/**
 * Find component related to route name
 *
 * @param {String} nameToFind - Route name
 * @param {Array<{ route }>} routes - Route configuration as flat array.
 *
 * @return {Route} - Route that matches the given route name.
 */
export const findRouteByRouteName = (nameToFind, routes) => {
  const route = findRouteByName(nameToFind, routes);
  if (!route) {
    throw new Error(`Component "${nameToFind}" was not found.`);
  }
  return route;
};
