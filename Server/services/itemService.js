// services/itemService.js
// Handles all Firestore operations related to items, including creation,
// listing, and token assignment. This layer contains business logic and
// validation, keeping controllers thin and focused on HTTP concerns.

const { db } = require("../config/firebaseConfig");
const { TokenService } = require("../services/tokenService");


const COLLECTION = "items";

exports.ItemService = {
  async createItem(ownerId, payload) {
    if (!payload.nickname || !payload.nickname.trim()) {
      throw new Error("Nickname is required");
    }

    if (
      payload.verification?.enabled &&
      !payload.verification.question?.trim()
    ) {
      throw new Error("Verification question is required when enabled");
    }

    const token = TokenService.generateSecureToken(128);
    const createdAt = new Date().toISOString();

    const docRef = db.collection(COLLECTION).doc();

    const item = {
      id: docRef.id,
      ownerId,
      nickname: payload.nickname.trim(),
      description: payload.description || "",
      photoUrl: payload.photoUrl || "", // now passed from upload API
      verification: payload.verification || { enabled: false },
      token,
      status: "ACTIVE",
      createdAt,
      lastActivityAt: null,
    };

    await docRef.set(item);
    return item;
  },

  async listItems(ownerId) {
    const snap = await db
      .collection(COLLECTION)
      .where("ownerId", "==", ownerId)
      
      .get();

    return snap.docs.map((doc) => doc.data());
  },
async updateItem(itemId, ownerId, updates) {
  const docRef = db.collection(COLLECTION).doc(itemId);
  const snap = await docRef.get();

  if (!snap.exists) return null;

  const item = snap.data();
  if (item.ownerId !== ownerId) return null;

  const allowed = {};

  if (updates.nickname?.trim()) {
    allowed.nickname = updates.nickname.trim();
  }

  if (typeof updates.description === "string") {
    allowed.description = updates.description;
  }

  if (typeof updates.photoUrl === "string") {
    allowed.photoUrl = updates.photoUrl;
  }

  if (updates.verification) {
    allowed.verification = updates.verification;
  }
 if (updates.status) {
    allowed.status = updates.status;
  }
  allowed.lastActivityAt = new Date().toISOString();

  await docRef.update(allowed);

  return { ...item, ...allowed };
},
async getItemByIdForOwner(itemId, ownerId) {
    const doc = await db.collection(COLLECTION).doc(itemId).get();
    if (!doc.exists) return null;

    const item = doc.data();
    if (item.ownerId !== ownerId) return null;
    item.publicUrl = process.env.HOST_URL + "/f/"+ item.token;
    return item;
  },
async getItemById(itemId) {
    const doc = await db.collection(COLLECTION).doc(itemId).get();
     const item = doc.data();
    if (!item) return null;
    item.publicUrl = process.env.HOST_URL + "/f/"+ item.token;
    return item;
  },

async  deleteItem(itemId) {
  // Delete all reports for this item
  const reportsRef = db.collection("reports").where("itemId", "==", itemId);
  const reportsSnap = await reportsRef.get();

  const batch = db.batch();

  reportsSnap.forEach((doc) => batch.delete(doc.ref));

  // Delete the item itself
  const itemRef = db.collection(COLLECTION).doc(itemId);
  batch.delete(itemRef);

  await batch.commit();

  return { deleted: true };
}
};