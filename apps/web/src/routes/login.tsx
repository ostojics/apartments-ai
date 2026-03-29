import {SignIn} from '@clerk/react';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-secondary">
      <SignIn
        appearance={{
          elements: {
            footerAction: {display: 'none'},
          },
        }}
      />
    </section>
  );
}
