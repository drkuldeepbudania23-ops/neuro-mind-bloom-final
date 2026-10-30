import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neuromindbloom.app',
  appName: 'Neuro Mind Bloom',
  webDir: 'out',
  // Lets the website recognise the app (residents' content is app-only). Must match APP_UA_MARKER in lib/appShell.ts.
  appendUserAgent: 'NeuroMindBloomApp/1',
  server: {
    url: 'https://neuromindbloom.com',
    cleartext: false
  }
};

export default config;
