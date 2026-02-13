import {createRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import NotFound from './components/not-found/not-found';

export const router = createRouter({
  routeTree,
  context: {isValid: false},
  defaultNotFoundComponent: () => <NotFound />,
});
