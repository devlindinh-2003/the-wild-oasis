import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createEditCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

export default function CreateCabinForm({ cabinToEdit = {}, setShowForm }) {
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
  const queryClinet = useQueryClient();
  //* Create cabin
  const { mutate: creatingCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully !');
      queryClinet.invalidateQueries({
        queryKey: ['cabin'],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //* Update cabin
  const { mutate: editingCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited !');
      queryClinet.invalidateQueries({
        queryKey: ['cabin'],
      });
      reset();
      setShowForm(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      editingCabin({ newCabinData: { ...data, image }, id: editId });
    else creatingCabin({ ...data, image: image });
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
            required: 'This cannot be empty',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}
