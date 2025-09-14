const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

/**
 * Farmer submits a new submission
 */
exports.createSubmission = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }
  if (context.auth.token.role !== "farmer") {
    throw new functions.https.HttpsError("permission-denied", "Farmers only");
  }

  const submissionRef = db.collection("submissions").doc();
  const newSubmission = {
    farmerId: context.auth.uid,
    imageUrl: data.imageUrl, // URL from Firebase Storage upload
    captureTimestamp: admin.firestore.Timestamp.now(),
    captureLocation: new admin.firestore.GeoPoint(data.lat, data.lng),
    adminStatus: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await submissionRef.set(newSubmission);
  return { id: submissionRef.id, ...newSubmission };
});
