import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

// Safely access env vars from window.process.env populated by config.js
const env = (window as any).process?.env || {};

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase (Compat)
const app = firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(firebaseConfig);

// Initialize Auth
const auth = firebase.auth();
// Attempt to set language
try {
    auth.useDeviceLanguage();
} catch (error) {
    console.warn("Auth language setting failed", error);
}

// Initialize Analytics (Conditional)
let analytics: any = null;
if (typeof window !== 'undefined') {
  firebase.analytics.isSupported().then((supported) => {
    if (supported) {
      analytics = firebase.analytics();
    }
  }).catch((err) => {
      console.warn("Analytics not supported:", err);
  });
}

export { app, auth, analytics };
export default app;