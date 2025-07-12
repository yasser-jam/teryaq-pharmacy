'use client';
import React, { useRef } from 'react';
import { Input, Button, VStack, Field } from '@chakra-ui/react/';
import { useRouter } from 'next/navigation';
import BaseDialog from '../../../components/base/BaseDialog';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SysField from '../../../components/system/SysField';

export default function Page() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  // Schema validation using Zod
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Submitted:', data);
  };

  const onClose = React.useCallback(() => {
    setOpen(false);
    router.back();
  }, [router]);

  const isEdit = false;

  const saveSubmit = async () => {};

  const editSubmit = async () => {};

  const submit = () => {};

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <BaseDialog
      title='Employee Info'
      width={900}
      open={true}
      onClose={() => router.replace('/employees')}
      onSubmit={() => {
        formRef.current?.requestSubmit();
      }}
    >
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        {/* <Field.Root invalid={!!errors.name?.message}>
          <Field.Label htmlFor='name'>First name</Field.Label>

          <Input
            id='name'
            paddingX={4}
            placeholder='name'
            {...register('name')}
          />
          <Field.ErrorText>
            {errors.name && errors.name.message}
          </Field.ErrorText>
        </Field.Root> */}

        <SysField label="First Name" name='name' register={register} error={errors.name?.message}  />
      </form>
    </BaseDialog>
  );
}
