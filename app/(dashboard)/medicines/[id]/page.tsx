'use client';
import React, { use, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  HStack,
  Box,
  Text,
  Grid,
  GridItem,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import BaseDialog from '../../../../components/base/BaseDialog';
import SysField from '../../../../components/system/SysField';
import { api } from '../../../../lib/api';

interface MedicineEditPageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: MedicineEditPageProps) {
  const router = useRouter();
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const { id } = use(params);
  

  const medicineId = id as string;
  const isEdit = medicineId !== 'create';

  // TODO: Fetch medicine data if editing
  // const [medicine, setMedicine] = React.useState<Medicine | null>(null);

  // React.useEffect(() => {
  //   if (isEdit) {
  //     // Fetch medicine data
  //     api(`/medicines/${medicineId}`)
  //       .then(setMedicine)
  //       .catch(console.error);
  //   }
  // }, [medicineId, isEdit]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    tradeName: string;
    scientificName: string;
    concentration: string;
    size: string;
    notes: string;
    tax: number;
  }>({
    defaultValues: {
      tradeName: '',
      scientificName: '',
      concentration: '',
      size: '',
      notes: '',
      tax: 0,
    },
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const medicineData = {
        ...data,
        barcodes,
      };
      
      if (isEdit) {
        updateMedicine(medicineData);
      } else {
        createMedicine(medicineData);
      }

      router.replace('/medicines');
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  const { mutate: createMedicine, isPending: isCreating } = useMutation({
    mutationKey: ['medicines-create'],
    mutationFn: async (data: any) =>
      await api('/pharmacy_products', {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      router.replace('/medicines');
    },
  });

  const { mutate: updateMedicine, isPending: isUpdating } = useMutation({
    mutationKey: ['medicines-update'],
    mutationFn: async (data: any) =>
      await api(`/pharmacy_products/${medicineId}`, {
        method: 'PUT',
        body: data,
      }),
    onSuccess: () => {
      router.replace('/medicines');
    },
  });

  const handleClose = () => {
    router.replace('/medicines');
  };

  const addBarcode = () => {
    setBarcodes([...barcodes, '']);
  };

  const removeBarcode = (index: number) => {
    setBarcodes(barcodes.filter((_, i) => i !== index));
  };

  const updateBarcode = (index: number, value: string) => {
    const newBarcodes = [...barcodes];
    newBarcodes[index] = value;
    setBarcodes(newBarcodes);
  };

  return (
    <BaseDialog
      title={isEdit ? 'Edit Medicine' : 'Add New Medicine'}
      width='90vw'
      open={true}
      onClose={handleClose}
      onSubmit={() => formRef.current?.requestSubmit()}
      loading={isCreating || isUpdating}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack gap={4} align='stretch'>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='Trade Name'
                name='tradeName'
                register={register}
                error={errors.tradeName?.message}
                placeholder='Enter trade name'
              />
            </GridItem>
            <GridItem>
              <SysField
                label='Scientific Name'
                name='scientificName'
                register={register}
                error={errors.scientificName?.message}
                placeholder='Enter scientific name'
              />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='Concentration'
                name='concentration'
                register={register}
                error={errors.concentration?.message}
                placeholder='Enter concentration (optional)'
              />
            </GridItem>
            <GridItem>
              <SysField
                label='Size'
                name='size'
                register={register}
                error={errors.size?.message}
                placeholder='Enter size (optional)'
              />
            </GridItem>
          </Grid>

          <SysField
            label='Tax (%)'
            name='tax'
            type='number'
            register={register}
            error={errors.tax?.message}
            placeholder='Enter tax percentage'
            step='0.01'
            min='0'
          />

          <SysField
            label='Notes'
            name='notes'
            register={register}
            error={errors.notes?.message}
            placeholder='Enter additional notes (optional)'
          />

          {/* Barcodes Section */}
          <Box>
            <HStack justify='space-between' mb={4}>
              <Text fontSize='lg' fontWeight='semibold'>
                Barcodes
              </Text>
              <IconButton
                aria-label='Add barcode'
                size='sm'
                variant='outline'
                colorScheme='blue'
                onClick={addBarcode}
              >
                <AddIcon />
              </IconButton>
            </HStack>

            <Stack gap={3} align='stretch'>
              {barcodes.map((barcode, index) => (
                <HStack key={index} gap={3}>
                  <Box flex={1}>
                    <Text mb={1} fontSize='sm' fontWeight='medium'>
                      Barcode {index + 1}
                    </Text>
                    <input
                      type='text'
                      value={barcode}
                      onChange={(e) => updateBarcode(index, e.target.value)}
                      placeholder='Enter barcode'
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #CBD5E0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white',
                        outline: 'none',
                      }}
                    />
                  </Box>
                  <IconButton
                    aria-label='Remove barcode'
                    size='sm'
                    variant='outline'
                    colorScheme='red'
                    onClick={() => removeBarcode(index)}
                    mt={6} // Align with the input field
                  >
                    <DeleteIcon />
                  </IconButton>
                </HStack>
              ))}
              {barcodes.length === 0 && (
                <Text
                  color='gray.500'
                  fontSize='sm'
                  textAlign='center'
                  py={4}
                  border='1px dashed'
                  borderColor='gray.300'
                  borderRadius='md'
                >
                  No barcodes added. Click the + button to add a barcode.
                </Text>
              )}
            </Stack>
          </Box>
        </Stack>
      </form>
    </BaseDialog>
  );
}
