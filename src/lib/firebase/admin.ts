import * as admin from "firebase-admin";

const serviceAccountJson = Buffer.from(
  process.env.FIREBASE_TOKEN ?? "e30", // `{}` in base64
  "base64",
).toString("ascii");

const serviceAccount = JSON.parse(serviceAccountJson);

if (admin.apps.length <= 0) {
  if (process.env.NODE_ENV === "test") {
    admin.initializeApp({
      projectId: "test-project",
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://sodermalmsskolan-a8013.firebaseio.com",
    });
  }
}

export default admin;
