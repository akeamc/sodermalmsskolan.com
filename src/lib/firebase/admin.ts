import * as admin from "firebase-admin";

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
      databaseURL: "https://sodermalmsskolan-a8013.firebaseio.com",
    });
  }
}

export default admin;
