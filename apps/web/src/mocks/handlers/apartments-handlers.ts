import {http, HttpResponse} from 'msw';

import {buildMockRoute} from '../utils/build-mock-route';

export const apartmentsHandlers = [
  http.get(buildMockRoute('/v1/buildings'), () => {
    return HttpResponse.json(
      {
        data: [
          {
            id: 'north-point',
            name: 'North Point Residences',
            slug: 'north-point',
            tenantId: 'tenant-1',
            imageUrl: 'https://placehold.co/640x360?text=North+Point',
            address: '123 Harbor Lane, Seattle, WA',
          },
          {
            id: 'garden-view',
            name: 'Garden View Lofts',
            slug: 'garden-view',
            tenantId: 'tenant-1',
            imageUrl: 'https://placehold.co/640x360?text=Garden+View',
            address: '456 Meadow Avenue, Portland, OR',
          },
          {
            id: 'skyline-heights',
            name: 'Skyline Heights',
            slug: 'skyline-heights',
            tenantId: 'tenant-1',
            imageUrl: null,
            address: '789 Skyline Blvd, San Francisco, CA',
          },
        ],
      },
      {
        status: 200,
      },
    );
  }),
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
