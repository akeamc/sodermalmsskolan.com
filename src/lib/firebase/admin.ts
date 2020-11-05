import * as admin from "firebase-admin";

const serviceAccountJson = Buffer.from(
  process.env.FIREBASE_TOKEN,
  "base64"
).toString("ascii");

const serviceAccount = JSON.parse(serviceAccountJson);

if (admin.apps.length <= 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sodermalmsskolan-a8013.firebaseio.com",
  });
}

export default admin;
