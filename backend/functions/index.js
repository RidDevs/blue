const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * ==========================
 * AUTH & USERS
 * ==========================
 */

// ✅ Sign Up User (Farmer / Buyer / Admin)
exports.signUpUser = functions.https.onCall(async (data, context) => {
  const { name, email, password, role } = data;

  if (!name || !email || !password || !role) {
    throw new functions.https.HttpsError("invalid-argument", "All fields are required");
  }

  // Prevent anyone from self-registering as admin
  if (role === "admin") {
    throw new functions.https.HttpsError("permission-denied", "Admin accounts cannot be self-created");
  }

  // Create Firebase Auth User
  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName: name,
  });

  // Store in Firestore
  const userDoc = {
    uid: userRecord.uid,
    name,
    email,
    role,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection("users").doc(userRecord.uid).set(userDoc);

  return { message: "User created successfully", uid: userRecord.uid };
});

// ✅ Get User by UID (for login redirection)
exports.getUserRole = functions.https.onCall(async (data, context) => {
  const { uid } = data;
  if (!uid) {
    throw new functions.https.HttpsError("invalid-argument", "UID required");
  }

  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) {
    throw new functions.https.HttpsError("not-found", "User not found");
  }

  return userSnap.data();
});

// ✅ Get All Users (Admin only)
exports.getUsers = functions.https.onCall(async (data, context) => {
  // Ensure only admin can call this
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in");
  }

  const callerUid = context.auth.uid;
  const callerSnap = await db.collection("users").doc(callerUid).get();
  if (!callerSnap.exists || callerSnap.data().role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Only admins can view all users");
  }

  const snapshot = await db.collection("users").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

/**
 * ==========================
 * ORDERS
 * ==========================
 */

// ✅ Create Order
exports.createOrder = functions.https.onCall(async (data, context) => {
  const { userId, items } = data;

  if (!userId || !items) {
    throw new functions.https.HttpsError("invalid-argument", "userId and items required");
  }

  const order = {
    userId,
    items,
    status: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const ref = await db.collection("orders").add(order);
  return { id: ref.id, ...order };
});

// ✅ Get Orders (User can only see their own, Admin sees all)
exports.getOrders = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }

  const uid = context.auth.uid;
  const userSnap = await db.collection("users").doc(uid).get();

  if (!userSnap.exists) {
    throw new functions.https.HttpsError("not-found", "User not found");
  }

  const role = userSnap.data().role;

  let snapshot;
  if (role === "admin") {
    snapshot = await db.collection("orders").get(); // Admin → All orders
  } else {
    snapshot = await db.collection("orders").where("userId", "==", uid).get(); // User → Own orders
  }

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});
