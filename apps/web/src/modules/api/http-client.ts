import {API_URL, TENANT_SLUG} from '@/common/constants/constants';
import ky from 'ky';
import {getCurrentLanguage} from '../i18n/utils/get-current-language';

const httpClient = ky.create({
  prefixUrl: API_URL,
  credentials: 'include',
});

const extended = httpClient.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const language = getCurrentLanguage();
        request.headers.set('Accept-Language', language);

        if (TENANT_SLUG) {
          request.headers.set('X-Tenant-Slug', TENANT_SLUG);
        }
      },
    ],
  },
});

export default extended;
