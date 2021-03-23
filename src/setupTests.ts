import { cache } from "swr";
import "next"; // Polyfills
import fs from "fs";
import path from "path";

jest.mock("./lib/analytics/gtag");

const firebaseConfigPath = path.resolve(__dirname, "../firebase.json");
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));

process.env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${firebaseConfig.emulators.auth.port}`;

afterEach(() => {
  cache.clear();
});
