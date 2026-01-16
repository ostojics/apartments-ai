import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/__pathlessLayout/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Settings page content will go here.</p>
    </div>
  );
}
