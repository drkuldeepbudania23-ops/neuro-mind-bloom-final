import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neuromindbloom.app',
  appName: 'Neuro Mind Bloom',
  webDir: 'out',
  server: {
    url: 'https://neuromindbloom.com',
    cleartext: false
  }
};

export default config;
