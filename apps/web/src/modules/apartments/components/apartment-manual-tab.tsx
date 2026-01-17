import {useTranslation} from 'react-i18next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ApartmentManualTab() {
  const {t} = useTranslation();
  const markdownContent = t('apartment.manual.content', {interpolation: {prefix: '[[', suffix: ']]'}});

  return <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>;
}
