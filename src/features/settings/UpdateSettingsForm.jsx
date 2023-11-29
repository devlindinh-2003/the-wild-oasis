import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';

export default function UpdateSettingsForm() {
  const { register } = useForm();
  const { isUpdating: isUpdatingSetting, updatingSetting } =
    useUpdateSettings();
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  if (isLoading) return <Spinner />;

  function handleUpdateSetting(e, field) {
    const { value } = e.target;
    if (!value) return;
    updatingSetting({
      [field]: value,
    });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register('minBookingLength', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e, 'minBookingLength'),
          })}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          type="number"
          id="max-nights"
          {...register('maxBookingLength', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e, 'maxBookingLength'),
          })}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
          {...register('maxGuestsPerBooking', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e, 'maxGuestsPerBooking'),
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
          {...register('breakfastPrice', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e, 'breakfastPrice'),
          })}
        />
      </FormRow>
    </Form>
  );
}
