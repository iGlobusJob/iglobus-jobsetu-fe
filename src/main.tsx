import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx';

import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme="auto" />

      <MantineProvider defaultColorScheme="auto">
        <ModalsProvider>
          <App />
          <ToastContainer />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
