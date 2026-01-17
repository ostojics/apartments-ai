/* eslint-disable max-lines */
import {MessageCircle} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '@/components/ui/empty';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownContent = `# A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
([\`rehype-starry-night\`](https://github.com/rehypejs/rehype-starry-night)).

\`\`\`js
import React from 'react'
import ReactDom from 'react-dom'
import {MarkdownHooks} from 'react-markdown'
import rehypeStarryNight from 'rehype-starry-night'

const markdown = \`
# Your markdown here
\`

ReactDom.render(
  <MarkdownHooks rehypePlugins={[rehypeStarryNight]}>{markdown}</MarkdownHooks>,
  document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
([\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use)).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
import React from 'react'
import ReactDom from 'react-dom'
import Markdown from 'react-markdown'
import MyFancyRule from './components/my-fancy-rule.js'

const markdown = \`
# Your markdown here
\`

ReactDom.render(
  <Markdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr(props) {
        const {node, ...rest} = props
        return <MyFancyRule {...rest} />
      }
    }}
  >
    {markdown}
  </Markdown>,
  document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/)`;

interface ApartmentPageProps {
  apartmentId: string;
}

export function ApartmentPage({apartmentId}: ApartmentPageProps) {
  const {t} = useTranslation();

  return (
    <section className="bg-secondary/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{t('apartment.title', {id: apartmentId})}</h1>
          </div>
        </div>

        <Tabs defaultValue="manual" className="gap-6">
          <TabsList className="w-full justify-start sm:w-fit">
            <TabsTrigger value="chat">{t('apartment.tabs.chat')}</TabsTrigger>
            <TabsTrigger value="manual">{t('apartment.tabs.manual')}</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Empty className="bg-background">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle>{t('apartment.chat.title')}</EmptyTitle>
                <EmptyDescription>{t('apartment.chat.description')}</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <p className="text-muted-foreground text-sm">{t('apartment.chat.note')}</p>
              </EmptyContent>
            </Empty>
          </TabsContent>

          <TabsContent value="manual">
            <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
