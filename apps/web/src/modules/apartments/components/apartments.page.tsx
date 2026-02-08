import {useBuildings} from '@/modules/apartments/hooks/use-buildings';
import {ApartmentsListView} from './apartments-list-view';
import {ApartmentsPageLoading} from './apartments.page.loading';
import {ApartmentsPageError} from './apartments.page.error';

export function ApartmentsPage() {
  const {data: buildingsData, isLoading, isError} = useBuildings();

  if (isLoading) {
    return <ApartmentsPageLoading />;
  }

  if (isError) {
    return <ApartmentsPageError />;
  }

  return <ApartmentsListView apartments={buildingsData?.data ?? []} />;
}
