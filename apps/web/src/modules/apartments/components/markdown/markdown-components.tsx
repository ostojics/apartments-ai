import type {Components} from 'react-markdown';

import {cn} from '@/lib/utils/cn';

export const apartmentMarkdownComponents: Components = {
  h1: ({className, ...props}) => (
    <h1
      className={cn(
        'mt-8 scroll-m-20 text-3xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-4xl',
        className,
      )}
      {...props}
    />
  ),
  h2: ({className, ...props}) => (
    <h2
      className={cn(
        'mt-7 scroll-m-20 text-2xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-3xl',
        className,
      )}
      {...props}
    />
  ),
  h3: ({className, ...props}) => (
    <h3
      className={cn('mt-6 scroll-m-20 text-xl font-semibold text-foreground first:mt-0 sm:text-2xl', className)}
      {...props}
    />
  ),
  h4: ({className, ...props}) => (
    <h4 className={cn('mt-5 scroll-m-20 text-lg font-semibold text-foreground first:mt-0', className)} {...props} />
  ),
  p: ({className, ...props}) => (
    <p
      className={cn('mt-4 text-base leading-relaxed text-muted-foreground first:mt-0 sm:text-[1.05rem]', className)}
      {...props}
    />
  ),
  a: ({className, ...props}) => (
    <a
      className={cn(
        'font-medium text-primary underline underline-offset-4 transition hover:text-primary/80',
        className,
      )}
      {...props}
    />
  ),
  ul: ({className, ...props}) => (
    <ul
      className={cn('mt-4 list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary/70', className)}
      {...props}
    />
  ),
  ol: ({className, ...props}) => (
    <ol
      className={cn('mt-4 list-decimal space-y-2 pl-5 text-muted-foreground marker:text-primary/70', className)}
      {...props}
    />
  ),
  li: ({className, ...props}) => <li className={cn('leading-relaxed', className)} {...props} />,
  blockquote: ({className, ...props}) => (
    <blockquote
      className={cn(
        'mt-6 rounded-lg border-l-4 border-primary/40 bg-secondary/50 px-4 py-3 text-sm text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  hr: ({className, ...props}) => <hr className={cn('my-8 border-border/70', className)} {...props} />,
  pre: ({className, ...props}) => (
    <pre
      className={cn(
        'mt-4 overflow-x-auto rounded-lg border border-border/60 bg-muted/60 p-4 text-sm text-foreground',
        className,
      )}
      {...props}
    />
  ),
  code: ({className, ...props}) => {
    const {inline, ...rest} = props as typeof props & {inline?: boolean};

    return (
      <code
        className={cn(
          inline
            ? 'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85rem] text-foreground'
            : 'font-mono text-sm text-foreground',
          className,
        )}
        {...rest}
      />
    );
  },
  table: ({className, ...props}) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border/60">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  thead: ({className, ...props}) => <thead className={cn('bg-muted/50 text-foreground', className)} {...props} />,
  tbody: ({className, ...props}) => <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />,
  tr: ({className, ...props}) => (
    <tr className={cn('border-b transition-colors hover:bg-muted/50', className)} {...props} />
  ),
  th: ({className, ...props}) => (
    <th
      className={cn(
        'px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  td: ({className, ...props}) => (
    <td className={cn('px-3 py-2 align-top text-sm text-foreground', className)} {...props} />
  ),
  img: ({className, ...props}) => (
    <img className={cn('my-6 h-auto w-full rounded-lg border border-border/60 shadow-sm', className)} {...props} />
  ),
  strong: ({className, ...props}) => <strong className={cn('font-semibold text-foreground', className)} {...props} />,
  em: ({className, ...props}) => <em className={cn('text-foreground', className)} {...props} />,
};
