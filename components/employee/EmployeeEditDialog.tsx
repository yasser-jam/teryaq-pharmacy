'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  HStack,
  Box,
  Text,
  Grid,
  GridItem,
  IconButton,
  Tabs,
  Stack,
  For,
  Field,
  Switch,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import BaseDialog from '../base/BaseDialog';
import SysField from '../system/SysField';
import BaseBtn from '../base/BaseBtn';
import { EMPLOYEE_SCHEMA, Employee } from '../../lib/schema';
import BaseSwitch from '../base/BaseSwitch';
// import BaseDatepicker from '../base/BaseDatepicker';

interface EmployeeEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Employee) => void;
  employee?: Partial<Employee>;
  isEdit?: boolean;
  loading?: boolean;
}

const DAYS_OF_WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

const DAY_LABELS = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
} as const;

const defaultWorkingHours = DAYS_OF_WEEK.map((day) => ({
  dayOfWeek: day,
  shifts: [],
}));

const EmployeeEditDialog: React.FC<EmployeeEditDialogProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  isEdit = false,
  loading = false,
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Ensure component is mounted on client-side before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<Employee>({
    resolver: zodResolver(EMPLOYEE_SCHEMA),
    defaultValues: {
      workingHours: employee?.workingHours || defaultWorkingHours,
      dateOfHire: String(employee?.dateOfHire) || new Date().toISOString(),
      status: employee?.status || 'ACTIVE',
    },
  });

  const { fields: workingHoursFields, update: updateWorkingHours } =
    useFieldArray({
      control,
      name: 'workingHours',
    });

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const addShift = (dayIndex: number) => {
    const currentDay = workingHoursFields[dayIndex];
    const newShifts = [
      ...currentDay.shifts,
      {
        startTime: '09:00',
        endTime: '17:00',
        description: 'Regular Shift',
      },
    ];
    updateWorkingHours(dayIndex, {
      ...currentDay,
      shifts: newShifts,
    });
  };

  const removeShift = (dayIndex: number, shiftIndex: number) => {
    const currentDay = workingHoursFields[dayIndex];
    const newShifts = currentDay.shifts.filter(
      (_, index) => index !== shiftIndex
    );
    updateWorkingHours(dayIndex, {
      ...currentDay,
      shifts: newShifts,
    });
  };

  const updateShift = (
    dayIndex: number,
    shiftIndex: number,
    field: string,
    value: string
  ) => {
    const currentDay = workingHoursFields[dayIndex];
    const newShifts = [...currentDay.shifts];
    newShifts[shiftIndex] = {
      ...newShifts[shiftIndex],
      [field]: value,
    };
    updateWorkingHours(dayIndex, {
      ...currentDay,
      shifts: newShifts,
    });
  };

  const handleFormSubmit = (data: Employee) => {
    onSubmit(data);
  };

  const statusValue = watch('status');

  const generalInfoTab = (
    <Stack gap={4} align='stretch'>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <GridItem>
          <SysField
            label='First Name'
            name='firstName'
            register={register}
            error={errors.firstName?.message}
            placeholder='Enter first name'
          />
        </GridItem>
        <GridItem>
          <SysField
            label='Last Name'
            name='lastName'
            register={register}
            error={errors.lastName?.message}
            placeholder='Enter last name'
          />
        </GridItem>
      </Grid>

      <SysField
        label='Email'
        name='email'
        type='email'
        register={register}
        error={errors.email?.message}
        placeholder='Enter email address'
      />

      <SysField
        label='Phone Number'
        name='phoneNumber'
        register={register}
        error={errors.phoneNumber?.message}
        placeholder='Enter phone number'
      />

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <GridItem>
          <SysField
            label='Date of Hire'
            name='dateOfHire'
            type='date'
            register={register}
            error={errors.dateOfHire?.message}
          />

          {/* <BaseDatepicker
            date={new Date()}
            setDate={(date: Date) => setValue('dateOfHire', String(date))}
          /> */}
        </GridItem>
        <GridItem>
          <SysField
            label='Role Name'
            name='roleName'
            register={register}
            error={errors.roleName?.message}
            placeholder='Enter role'
          />
        </GridItem>
      </Grid>

      {/* Status Switch */}
      <BaseSwitch
        error={errors.status?.message}
        statusValue={statusValue}
        setValue={(value: string) =>
          setValue('status', value as 'ACTIVE' | 'INACTIVE')
        }
      />
    </Stack>
  );

  const shiftsTab = (
    <Box height='60vh' overflowY='auto' pr={2}>
      <Stack gap={6} align='stretch'>
        {workingHoursFields.map((day, dayIndex) => (
          <Box
            key={day.dayOfWeek}
            p={4}
            borderWidth={1}
            borderRadius='md'
            bg='gray.50'
          >
            <HStack justify='space-between' mb={4}>
              <Text fontSize='lg' fontWeight='semibold'>
                {DAY_LABELS[day.dayOfWeek as keyof typeof DAY_LABELS]}
              </Text>
              <BaseBtn
                variant='outline'
                onClick={() => addShift(dayIndex)}
                btnProps={{ size: 'sm', colorPalette: 'blue' }}
              >
                <AddIcon /> Add Shift
              </BaseBtn>
            </HStack>

            <Box
              maxHeight='300px'
              overflowY='auto'
              pr={2}
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c1c1c1',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#a1a1a1',
                },
              }}
            >
              <Stack gap={3} align='stretch'>
                {day.shifts.map((shift, shiftIndex) => (
                  <Box
                    key={shiftIndex}
                    p={3}
                    bg='white'
                    borderRadius='md'
                    borderWidth={1}
                  >
                    <HStack justify='space-between' mb={3}>
                      <Text fontSize='sm' fontWeight='medium'>
                        Shift {shiftIndex + 1}
                      </Text>
                      <IconButton
                        aria-label='Delete shift'
                        size='sm'
                        variant='outline'
                        colorScheme='red'
                        onClick={() => removeShift(dayIndex, shiftIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </HStack>

                    <Grid
                      templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                      gap={3}
                    >
                      <GridItem>
                        <Box>
                          <Text mb={1} fontSize='sm' fontWeight='medium'>
                            Start Time
                          </Text>
                          <input
                            type='time'
                            value={shift.startTime}
                            onChange={(e) =>
                              updateShift(
                                dayIndex,
                                shiftIndex,
                                'startTime',
                                e.target.value
                              )
                            }
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
                      </GridItem>
                      <GridItem>
                        <Box>
                          <Text mb={1} fontSize='sm' fontWeight='medium'>
                            End Time
                          </Text>
                          <input
                            type='time'
                            value={shift.endTime}
                            onChange={(e) =>
                              updateShift(
                                dayIndex,
                                shiftIndex,
                                'endTime',
                                e.target.value
                              )
                            }
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
                      </GridItem>
                      <GridItem>
                        <Box>
                          <Text mb={1} fontSize='sm' fontWeight='medium'>
                            Description
                          </Text>
                          <input
                            type='text'
                            value={shift.description || ''}
                            onChange={(e) =>
                              updateShift(
                                dayIndex,
                                shiftIndex,
                                'description',
                                e.target.value
                              )
                            }
                            placeholder='Shift description'
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
                      </GridItem>
                    </Grid>
                  </Box>
                ))}
                {day.shifts.length === 0 && (
                  <Text
                    color='gray.500'
                    fontSize='sm'
                    textAlign='center'
                    py={4}
                  >
                    No shifts scheduled for this day
                  </Text>
                )}
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );

  return (
    <BaseDialog
      title={isEdit ? 'Edit Employee' : 'Add New Employee'}
      width='95vw'
      open={open}
      onClose={onClose}
      onSubmit={() => formRef.current?.requestSubmit()}
      loading={loading}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
        <Tabs.Root
          value={activeTab}
          onValueChange={(e) => setActiveTab(e.value)}
        >
          <Tabs.List mb={6} gap={4}>
            <Tabs.Trigger value='general' px={6} py={3}>
              General Information
            </Tabs.Trigger>
            <Tabs.Trigger value='shifts' px={6} py={3}>
              Working Hours & Shifts
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value='general'>{generalInfoTab}</Tabs.Content>

          <Tabs.Content value='shifts'>{shiftsTab}</Tabs.Content>
        </Tabs.Root>
      </form>
    </BaseDialog>
  );
};

export default EmployeeEditDialog;
