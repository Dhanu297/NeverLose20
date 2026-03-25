
const {auth,db} = require("../config/firebaseConfig"); // Firebase Admin SDK
const COLLECTION = "items";
const FOUND_COLLECTION = "foundReports";
const USER_COLLECTION="users";


exports.PublicService = {

 async getItemByToken(token) {
    const snap = await db
      .collection(COLLECTION)
      .where("token", "==", token)
      .limit(1)
      .get();

    if (snap.empty) return null;
    return snap.docs[0].data();
  },

  toPublicView(item) {
    return {
      token: item.token,
      nickname: item.nickname,
      status: item.status,
      verificationQuestion: item.verification?.enabled
        ? item.verification.question
        : null,
      instructions: item.instructions || null, // optional field if you add it
    };
  },
  async getItemOwner(ownerId)
  {
    if (!ownerId) throw new Error("UID is required");
    
    const doc = await db.collection(USER_COLLECTION).doc(ownerId).get();
    return doc.exists ? doc.data() : null;
  },
  
async createFoundReport({ item, token, payload,ip}) {
  const createdAt = new Date().toISOString();

  // 1. Enforce business rule: max 3 reports per email
  const finderEmail = payload.finder.email;
 // 1. Read max attempts from environment variable
  const MAX_ATTEMPTS = parseInt(process.env.MAX_FOUNDER_ATTEMPTS || "3", 10);


  const existingReportsSnap = await db
    .collection(FOUND_COLLECTION)
    .where("ip", "==", ip)
    .where("itemId", "==", item.id)
    .get();

  if (existingReportsSnap.size >= MAX_ATTEMPTS) {
    const rateLimitError = new Error("Too many submissions. Please try again later.");
    rateLimitError.code = "RATE_LIMITED";
    rateLimitError.status = 429;
    throw rateLimitError;

  }
   const allReportsForItem = await db
    .collection(FOUND_COLLECTION)
    .where("itemId", "==", item.id)
    .get();

  const isFirstReport = allReportsForItem.empty;


  // 2. Create new report
  const docRef = db.collection(FOUND_COLLECTION).doc();

  const report = {
    id: docRef.id,
    itemId: item.id,
    itemToken: token,
    ownerId: item.ownerId,
    finder: {
      name: payload.finder?.name || "",
      email: finderEmail,
      phone: payload.finder?.phone || "",
    },
    message: payload.message,
    reportStatus: "NEW",
    internalStatus: "OPEN",
    foundLocationText: payload.foundLocationText || "",
    photoUrl: payload.photoUrl || "",
    verificationAnswer: payload.verificationAnswer || "",
    createdAt,
    ip
  };

  await docRef.set(report);
    //  Update item status ONLY if this is the first report
   if (isFirstReport) {
    await db.collection(COLLECTION).doc(item.id).update({
      status: "LOST",
      updatedAt: new Date().toISOString(),
    });
  }

  return {
    reportId: report.id,
    ok: true,
  };
}
};
