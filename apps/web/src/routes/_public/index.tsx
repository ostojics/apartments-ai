import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_public/')({
  component: () => <div>Hello?</div>,
  // beforeLoad: ({context}) => {
  //   if (!context.isAuthenticated) {
  //     // eslint-disable-next-line @typescript-eslint/only-throw-error
  //     throw redirect({to: '/'});
  //   }

  //   // eslint-disable-next-line @typescript-eslint/only-throw-error
  //   throw redirect({to: '/'});
  // },
});
