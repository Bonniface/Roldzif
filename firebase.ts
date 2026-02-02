import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

// Hardcoded configuration for local testing as requested
const firebaseConfig = {
  apiKey: "AIzaSyBHN7GKSz1HcHmFIuCmqPpu8R3z6vxsPoM",
  authDomain: "roldzif.firebaseapp.com",
  projectId: "roldzif",
  storageBucket: "roldzif.firebasestorage.app",
  messagingSenderId: "58667416955",
  appId: "1:58667416955:web:fe72f5db30259d60e991de",
  measurementId: "G-6X9ZTJ81GD"
};

// Initialize Firebase (Compat)
// Check if app is already initialized to avoid duplicate initialization errors
const app = firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(firebaseConfig);

// Initialize Auth
const auth = firebase.auth();
auth.useDeviceLanguage();

// Initialize Analytics (Conditional)
let analytics: any = null;
if (typeof window !== 'undefined') {
  if (firebase.analytics && typeof firebase.analytics === 'function') {
      try {
        analytics = firebase.analytics();
      } catch (e) {
        console.warn("Analytics init failed", e);
      }
  }
}

export { app, auth, analytics };
export default app;