const PUBLIC_PAGES = ['/', '/_public', '/login', '/onboarding'];

export const isPublicRoute = (path: string) => {
  return PUBLIC_PAGES.some((page) => path.startsWith(page));
};
