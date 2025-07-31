'use client';

import React from 'react';
import { Provider } from '../../../components/ui/provider';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}