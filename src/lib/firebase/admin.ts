import * as admin from "firebase-admin";
import { firebaseConfig } from "./firebase";

if (admin.apps.length <= 0) {
  if (process.env.NODE_ENV === "test") {
    admin.initializeApp({
      projectId: "test-project",
    });
  } else {
    const serviceAccountJson = Buffer.from(
      process.env.FIREBASE_TOKEN,
      "base64",
    ).toString("ascii");

    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: firebaseConfig.databaseURL,
    });
  }
}

export default admin;
