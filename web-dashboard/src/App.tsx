import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Router from './router';
import { AppContextProvider } from './context/AppContext';
import { loadIcons } from './utils/icons';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: false
    }
  }
});

loadIcons();

function App() {
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContextProvider>
  );
}

export default App;
