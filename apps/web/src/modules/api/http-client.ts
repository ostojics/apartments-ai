import {API_URL} from '@/common/constants/constants';
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
      },
    ],
  },
});

export default extended;
