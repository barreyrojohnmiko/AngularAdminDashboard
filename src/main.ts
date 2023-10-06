import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

if (environment.production) {
  enableProdMode();
}

const firebaseConfig = environment.firebaseConfig; // Your Firebase configuration

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request notification permission when the app starts
async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
    } else {
      console.warn('Notification permission denied');
    }
  } catch (error) {
    console.error('Error requesting notification permission', error);
  }
}

// Call the function to request notification permission when the app starts
requestNotificationPermission();

// Register the service worker for Firebase Cloud Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      // Service Worker registered
    })
    .catch((error) => {
      console.error('Service Worker registration failed', error);
    });
}

// Bootstrap the app
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
