'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  Center,
  Alert,
} from '@chakra-ui/react';
import { LOGIN_SCHEMA, LoginFormData } from '../../../lib/schema';
import SysField from '../../../components/system/SysField';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';
import { useMutation } from '@tanstack/react-query';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => api('/login', {
      method: 'POST',
      body: data,
    })
  })


  const onSubmit = async (data: LoginFormData) => {
    console.log(
      data
    );
  };

  return (
    <Center minH="100vh" bg="gray.50" p={4}>
      <Card.Root maxW="md" w="full" p={8}>
        <Card.Body>
          <VStack gap={6} align="stretch">
            {/* Header */}
            <VStack gap={2} textAlign="center">
              <Heading size="lg" color="gray.800">
                Welcome Back
              </Heading>
              <Text color="gray.600">
                Please sign in to your account
              </Text>
            </VStack>

            {/* Login Error Alert */}
            {loginError && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>Login Failed</Alert.Title>
                <Alert.Description>{loginError}</Alert.Description>
              </Alert.Root>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={4}>
                <SysField
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  register={register}
                  error={errors.email?.message}
                />

                <SysField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  register={register}
                  error={errors.password?.message}
                />

                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  colorPalette="blue"
                  loading={isLoading}
                  mt={2}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </VStack>
            </form>

            {/* Footer */}
            <Text textAlign="center" fontSize="sm" color="gray.500">
              Don't have an account? Contact your administrator.
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}