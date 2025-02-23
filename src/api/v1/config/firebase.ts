import admin from "firebase-admin";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Load Firebase service account credentials
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS || "./assignment-3-96ab3-firebase-adminsdk-fbsvc-ef2e24c38b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Ensure this is set in your .env file if needed
});

export default admin;
