import {http, HttpResponse} from 'msw';

import {buildMockRoute} from '../utils/build-mock-route';

export const apartmentsHandlers = [
  http.post(buildMockRoute('/v1/apartments/promotions'), () => {
    return HttpResponse.json(
      {
        success: true,
      },
      {
        status: 201,
      },
    );
  }),
];
