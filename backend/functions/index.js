const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Sign up user
exports.signup = functions.https.onRequest(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().createUser({ email, password });
    res.status(200).send({ uid: user.uid, email: user.email });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all users (for testing)
exports.listUsers = functions.https.onRequest(async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers(1000);
    res.status(200).send(listUsersResult.users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
