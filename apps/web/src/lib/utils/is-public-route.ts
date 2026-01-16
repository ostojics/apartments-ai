const EXACT_PUBLIC_PAGES = ['/', '/welcome'];
const PREFIX_PUBLIC_PAGES = ['/login', '/onboarding'];

export const isPublicRoute = (path: string) => {
  if (EXACT_PUBLIC_PAGES.includes(path)) {
    return true;
  }

  return PREFIX_PUBLIC_PAGES.some((page) => path.startsWith(page));
};
