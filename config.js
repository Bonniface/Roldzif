window.process = window.process || { env: {} };

// Load environment variables directly to avoid fetch restrictions on dotfiles
// NOTE: Flutterwave Secret Key and Encryption Key have been removed for security.
// They should never be exposed in client-side code.
Object.assign(window.process.env, {
  FLUTTERWAVE_CLIENT_ID: "43b0beee-77dd-4c7f-819a-9e8fa27b9d2b",
  FIREBASE_API_KEY: "AIzaSyBHN7GKSz1HcHmFIuCmqPpu8R3z6vxsPoM",
  FIREBASE_AUTH_DOMAIN: "roldzif.firebaseapp.com",
  FIREBASE_PROJECT_ID: "roldzif",
  FIREBASE_STORAGE_BUCKET: "roldzif.firebasestorage.app",
  FIREBASE_MESSAGING_SENDER_ID: "58667416955",
  FIREBASE_APP_ID: "1:58667416955:web:fe72f5db30259d60e991de",
  FIREBASE_MEASUREMENT_ID: "G-6X9ZTJ81GD"
});