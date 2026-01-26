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
  http.get(buildMockRoute('/v1/buildings/:slug'), ({params}) => {
    const {slug} = params;
    return HttpResponse.json({
      data: {
        content: `# ${slug as string}\n\nThis is mock building information for **${slug as string}**.\n\n## Features\n- Free WiFi\n- Parking available\n- 24/7 Security\n\n## House Rules\n- Check-in: 14:00\n- Check-out: 11:00\n- Quiet hours: 22:00 - 08:00`,
        name: `Building ${slug as string}`,
      },
    });
  }),
];
