import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/__admin/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Dashboard page content will go here.</p>
    </div>
  );
}
