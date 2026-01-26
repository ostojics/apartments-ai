import {API_URL} from '@/common/constants/constants';
import {getCurrentLanguage} from '@/modules/i18n/utils/get-current-language';
import {fetchServerSentEvents, useChat} from '@tanstack/ai-react';
import {useParams} from '@tanstack/react-router';

export const useApartmentChat = () => {
  const params = useParams({from: '/_public/apartments/$apartmentId'});

  return useChat({
    connection: fetchServerSentEvents(`${API_URL}/v1/buildings/${params.apartmentId}/chat`, {
      headers: {
        'Accept-Language': getCurrentLanguage(),
      },
    }),
  });
};
