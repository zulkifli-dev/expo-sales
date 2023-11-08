import Router from './src/router/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/authContext';


export default function App() {

  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <StatusBar backgroundColor='#2089AB' style='light' />
        <Router />
      </AuthProvider>
    </QueryClientProvider >
  );
}


