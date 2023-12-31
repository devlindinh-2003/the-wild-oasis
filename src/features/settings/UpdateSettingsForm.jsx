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

  function handleUpdateSetting(e) {
    const { id, value, defaultValue } = e.target;
    if (!id || !value || defaultValue === value) return;
    updatingSetting({
      [id]: value,
    });
    e.target.value = value;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          {...register('minBookingLength', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e),
          })}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          type="number"
          id="maxBookingLength"
          {...register('maxBookingLength', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e),
          })}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="maxGuestsPerBooking"
          {...register('maxGuestsPerBooking', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e),
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakfastPrice}
          type="number"
          id="breakfastPrice"
          {...register('breakfastPrice', {
            disabled: isUpdatingSetting,
            onBlur: (e) => handleUpdateSetting(e),
          })}
        />
      </FormRow>
    </Form>
  );
}
