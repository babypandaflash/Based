import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import PrivyLogin from './components/PrivyLogin';

function App() {
  return (
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID || 'clxxxxxxxxxxxxxxxxxxxxxxx'}
      config={{
        // Login methods yang didukung
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord'],
        
        // Appearance configuration
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url.com/logo.png', // Ganti dengan logo Anda
        },
        
        // Embedded wallet configuration
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        
        // Legal links
        legal: {
          termsAndConditionsUrl: 'https://your-site.com/terms',
          privacyPolicyUrl: 'https://your-site.com/privacy',
        },
      }}
    >
      <PrivyLogin />
    </PrivyProvider>
  );
}

export default App;