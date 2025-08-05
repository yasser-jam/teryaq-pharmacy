'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MEDICINE_SCHEMA } from '../../../lib/schema';
import z from 'zod';
import SysField from '../../../components/system/SysField';
import SysTypeSelect from '../../../components/system/SysTypeSelect';
import SysManufacturersSelect from '../../../components/system/SysManufacturersSelect';

export default function Page() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(z.object({
        tradeName: z.string().min(1, 'Trade name is required'),
        scientificName: z.string().min(1, 'Scientific name is required'),
        concentration: z.string().optional(),
        manufacturerId: z.string().min(1, 'Manufacturer is required'),
        size: z.string().optional(),
        notes: z.string().optional(),
        tax: z.string().optional(),
    })),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log(register('manufacturerId'));

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SysField
          register={register}
          name='tradeName'
          label='Trade Name'
          error={errors.tradeName?.message}
        />
        <SysField
          register={register}
          name='scientificName'
          label='Scientific Name'
          error={errors.scientificName?.message}
        />
        <SysManufacturersSelect
          register={register('manufacturerId')}
          label='Manufacturer'
          error={errors.manufacturerId?.message}
        />
        <SysField
          register={register}
          name='concentration'
          label='Concentration'
          error={errors.concentration?.message}
        />
        {/* <SysTypeSelect
          register={register}
          name='typeId'
          label='Type'
          error={errors.typeId?.message}
        /> */}
        <SysField
          register={register}
          name='size'
          label='Size'
          error={errors.size?.message}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
