'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import BaseDialog from '../../../components/base/BaseDialog';
import SysField from '../../../components/system/SysField';
import { api } from '../../../lib/api';
import { REGISTER_SCHEMA } from '../../../lib/schema';

export default function CompleteRegistrationPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(REGISTER_SCHEMA),
  });

  const handleFormSubmit = (data: any) => {
    completeRegistration(data);
  };

  const { mutate: completeRegistration, isPending: isCompleting } = useMutation({
    mutationKey: ['complete-registration'],
    mutationFn: async (data: any) =>
      await api('/pharmacy/complete-registration', {
        method: 'POST',
        body: {
            ...data,
            openingHours: '',
        },
      }),
    onSuccess: () => {
      router.replace('/');
    },
  });

  const handleClose = () => {
    router.replace('/');
  };

  return (
    <BaseDialog
      title='Complete Registration'
      width='600px'
      open={true}
      onClose={handleClose}
      onSubmit={() => formRef.current?.requestSubmit()}
      loading={isCompleting}
    >
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleFormSubmit)(e);
        }}
      >
        <Stack gap={4} align='stretch'>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='New Password'
                register={register('newPassword')}
                error={errors.newPassword?.message}
                placeholder='Enter new password'
                type='password'
              />
            </GridItem>
            <GridItem>
              <SysField
                label='Location'
                register={register('location')}
                error={errors.location?.message}
                placeholder='Enter pharmacy location'
              />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='Pharmacy Email'
                register={register('pharmacyEmail')}
                error={errors.pharmacyEmail?.message}
                placeholder='Enter pharmacy email'
                type='email'
              />
            </GridItem>
            <GridItem>
              <SysField
                label='Pharmacy Phone'
                register={register('pharmacyPhone')}
                error={errors.pharmacyPhone?.message}
                placeholder='Enter pharmacy phone number'
                type='tel'
              />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='Manager First Name'
                register={register('managerFirstName')}
                error={errors.managerFirstName?.message}
                placeholder='Enter manager first name'
              />
            </GridItem>
            <GridItem>
              <SysField
                label='Manager Last Name'
                register={register('managerLastName')}
                error={errors.managerLastName?.message}
                placeholder='Enter manager last name'
              />
            </GridItem>
          </Grid>
        </Stack>
      </form>
    </BaseDialog>
  );
} 