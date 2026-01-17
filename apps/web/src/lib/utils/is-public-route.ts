const PUBLIC_ROUTES = ['/', '/apartments'];

export const isPublicRoute = (path: string) => {
  return PUBLIC_ROUTES.some((page) => path.startsWith(page));
};
