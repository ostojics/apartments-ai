import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {apartmentMarkdownComponents} from './markdown/markdown-components';
import {markdownContent} from './markdown/markdown-content';

export default function ApartmentManualTab() {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={apartmentMarkdownComponents}>
      {markdownContent}
    </Markdown>
  );
}
