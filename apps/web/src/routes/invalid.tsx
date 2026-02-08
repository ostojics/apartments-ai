import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/invalid')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="min-h-screen bg-secondary flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Invalid Tenant</h1>
    </section>
  );
}
