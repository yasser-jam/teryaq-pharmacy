'use client';
import React, { use, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  HStack,
  Box,
  Text,
  Grid,
  GridItem,
  IconButton,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import BaseDialog from '../../../../components/base/BaseDialog';
import SysField from '../../../../components/system/SysField';
import { api } from '../../../../lib/api';
import SysManufacturersSelect from '../../../../components/system/SysManufacturersSelect';
import z from 'zod';
import { MEDICINE_SCHEMA } from '../../../../lib/schema';
import SysTypeSelect from '../../../../components/system/SysTypeSelect';
import { medicineDefaultValues } from '../../../../lib/init';
import BaseSwitch from '../../../../components/base/BaseSwitch';
import SysFormSelect from '../../../../components/system/SysFormSelect';

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
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MEDICINE_SCHEMA),
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const medicineData = {
        ...data,
        barcodes,
      };

      console.log('updated');
      console.log(medicineData);

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

  const requiresPrescription = watch('requiresPrescription');

  return (
    <BaseDialog
      title={isEdit ? 'Edit Medicine' : 'Add New Medicine'}
      width='90vw'
      open={true}
      onClose={handleClose}
      onSubmit={() => formRef.current?.requestSubmit()}
      loading={isCreating || isUpdating}
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
                label='Trade Name'
                register={register('tradeName')}
                error={errors.tradeName?.message}
                placeholder='Enter trade name'
              />
            </GridItem>
            <GridItem>
              <SysField
                label='Scientific Name'
                register={register('scientificName')}
                error={errors.scientificName?.message}
                placeholder='Enter scientific name'
              />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='Concentration'
                register={register('concentration')}
                error={errors.concentration?.message}
                placeholder='Enter concentration (optional)'
              />
            </GridItem>
            <GridItem>
              <SysField
                label='Size'
                register={register('size')}
                error={errors.size?.message}
                placeholder='Enter size (optional)'
              />
              {/* <SysSizeSelect value={} setValue={setSize} /> */}
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysTypeSelect
                label='Type'
                register={register('typeId')}
                error={errors.typeId?.message}
                placeholder='Select Type'
              />
            </GridItem>
            <GridItem>
              <SysFormSelect
                label='Form'
                register={register('formId')}
                error={errors.formId?.message}
                placeholder='Select Form'
              />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              {/* <SysField
                label='Requires Prescription'
                type='checkbox'
                register={register('requiresPrescription')}
                error={errors.requiresPrescription?.message}
              /> */}
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='Tax (%)'
                register={register('tax')}
                error={errors.tax?.message}
                placeholder='Enter tax percentage'
              />
            </GridItem>

            <GridItem>
              <SysManufacturersSelect
                label='Manufacturer'
                register={register('manufacturerId')}
                error={errors.manufacturerId?.message}
                placeholder='Select manufacturer'
              />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(1, 1fr)' }} gap={4}>
            <GridItem>
              <SysField
                label='Notes'
                register={register('notes')}
                error={errors.notes?.message}
                placeholder='Enter additional notes (optional)'
                type='textarea'
              />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(1, 1fr)' }} gap={4}>
            <GridItem>
              <BaseSwitch
                statusValue={!!requiresPrescription}
                subtitle='Requires Prescription'
                title='Requires Prescription'
                setValue={() =>
                  setValue(
                    'requiresPrescription',
                    !requiresPrescription
                  )
                }
              />
            </GridItem>
          </Grid>

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
