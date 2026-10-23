import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const uid = process.argv[2]?.trim();
const authorizedDoctorEmail = "drkuldeepbudania23@gmail.com";
if (!uid) {
  console.error("Usage: npm run grant:doctor -- <firebase-user-uid>");
  process.exit(1);
}

try {
  const app = initializeApp({
    credential: applicationDefault(),
    // Set FIREBASE_PROJECT_ID to the DEV project while testing (defaults to the live project).
    projectId: process.env.FIREBASE_PROJECT_ID || "neuro-mind-bloom",
  });
  const adminAuth = getAuth(app);
  const user = await adminAuth.getUser(uid);
  if (
    user.uid !== uid ||
    user.disabled ||
    !user.emailVerified ||
    user.email?.trim().toLowerCase() !== authorizedDoctorEmail
  ) {
    throw new Error("The supplied UID does not match the verified doctor account.");
  }

  if (user.customClaims?.doctor !== true) {
    await adminAuth.setCustomUserClaims(uid, {
      ...user.customClaims,
      doctor: true,
    });
  }

  const verifiedUser = await adminAuth.getUser(uid);
  if (
    verifiedUser.uid !== uid ||
    verifiedUser.disabled ||
    !verifiedUser.emailVerified ||
    verifiedUser.email?.trim().toLowerCase() !== authorizedDoctorEmail ||
    verifiedUser.customClaims?.doctor !== true
  ) {
    throw new Error("Doctor claim verification failed.");
  }

  console.log("Verified doctor account has doctor access. Sign out and back in to refresh claims.");
} catch {
  console.error("Unable to verify doctor identity or doctor claim. Check Firebase Admin access and the supplied UID.");
  process.exitCode = 1;
}