const functions = require("firebase-functions");

/**
 * Triggered when a new submission is created
 * Placeholder: run AI vegetation analysis here
 */
exports.runAiVerification = functions.firestore
  .document("submissions/{submissionId}")
  .onCreate(async (snap, context) => {
    const submission = snap.data();
    console.log("Running AI verification for:", submission?.imageUrl);

    // TODO: call your ExG model service
    const fakeResult = {
      exgScore: Math.random(),
      confidence: { greenery: 0.8 },
    };

    await snap.ref.update({ ai: fakeResult });
  });
