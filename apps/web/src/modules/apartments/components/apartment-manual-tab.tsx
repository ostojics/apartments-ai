import {useParams} from '@tanstack/react-router';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {apartmentMarkdownComponents} from './markdown/markdown-components';
import {useBuildingInfo} from '../hooks/use-building-info';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {AlertCircle, Loader2} from 'lucide-react';

export default function ApartmentManualTab() {
  const {apartmentId} = useParams({from: '/_public/apartments/$apartmentId'});
  const {data, isLoading, isError} = useBuildingInfo(apartmentId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load building information. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="px-2">
      <Markdown remarkPlugins={[remarkGfm]} components={apartmentMarkdownComponents}>
        {data?.data.content ?? ''}
      </Markdown>
    </section>
  );
}
