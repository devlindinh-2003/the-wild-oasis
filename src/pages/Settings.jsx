import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import Heading from '../ui/Heading';

export default function Settings() {
  return (
    <Heading as="h1">
      Update hotel settings
      <UpdateSettingsForm />
    </Heading>
  );
}
