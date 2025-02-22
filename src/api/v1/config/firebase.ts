import admin from "firebase-admin";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Load Firebase service account credentials
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS || "./assignment03bed-firebase-adminsdk-fbsvc-0e29e6e58c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Ensure this is set in your .env file if needed
});

export default admin;
