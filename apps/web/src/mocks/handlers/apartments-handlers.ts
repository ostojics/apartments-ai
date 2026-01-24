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
