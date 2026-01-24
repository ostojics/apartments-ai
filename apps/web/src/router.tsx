import {createRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {queryClient} from './modules/api/query-client';

export const router = createRouter({
  routeTree,
  context: {isAuthenticated: true, isValid: undefined, queryClient},
});
