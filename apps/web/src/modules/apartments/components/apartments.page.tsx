import {useEffect} from 'react';
import {useNavigate} from '@tanstack/react-router';

import {useBuildings} from '@/modules/apartments/hooks/use-buildings';
import {ApartmentsListView} from './apartments-list-view';
import {ApartmentsPageLoading} from './apartments.page.loading';
import {ApartmentsPageError} from './apartments.page.error';

export function ApartmentsPage() {
  const navigate = useNavigate();
  const {data: buildingsData, isLoading, isError} = useBuildings();

  useEffect(() => {
    const apartments = buildingsData?.data ?? [];
    if (apartments.length === 1) {
      const singleApartment = apartments[0];

      if (singleApartment) {
        void navigate({
          to: '/apartments/$apartmentId',
          params: {apartmentId: singleApartment.id},
          replace: true,
        });
      }
    }
  }, [buildingsData, navigate]);

  if (isLoading) {
    return <ApartmentsPageLoading />;
  }

  if (isError) {
    return <ApartmentsPageError />;
  }

  return <ApartmentsListView apartments={buildingsData?.data ?? []} />;
}
