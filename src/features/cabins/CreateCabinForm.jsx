import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

export default function CreateCabinForm({
  cabinToEdit = {},
  setShowForm,
  onCloseModal,
}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  //* Create cabin
  const { isCreating, creatingCabin } = useCreateCabin();
  //* Update cabin
  const { isEditing, editingCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      editingCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            setShowForm(false);
            onCloseModal?.();
          },
        }
      );
    else
      creatingCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
    // console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This cannot be empty',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This cannot be empty',
            min: {
              value: 1,
              message: 'The capacity must be at least 1',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This cannot be empty',
            min: {
              value: 1,
              message: 'The price must be at least 1',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This cannot be empty',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount must be less than the regular price',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This cannot be empty',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This cannot be empty',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}
