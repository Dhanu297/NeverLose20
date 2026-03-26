// services/reportService.js
// Firestore operations for reports stored in a top-level "reports" collection.

const { db } = require("../config/firebaseConfig");

const REPORTS = "foundReports";
const ITEMS = "items";

exports.ReportService = {
  async listReports(itemId, ownerId) {
    // Verify item belongs to owner
    const itemSnap = await db.collection(ITEMS).doc(itemId).get();
    if (!itemSnap.exists) return [];

    const item = itemSnap.data();
    if (item.ownerId !== ownerId) return [];

    // Fetch reports for this item
    const snap = await db
      .collection(REPORTS)
      .where("itemId", "==", itemId)
      .where("internalStatus", "==", "OPEN")
      .where("reportStatus", "!=", "SPAM")
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getReport(reportId, ownerId) {
    const reportSnap = await db.collection(REPORTS).doc(reportId).get();
    if (!reportSnap.exists) return null;

    const report = reportSnap.data();

    // Fetch related item to verify ownership
    const itemSnap = await db.collection(ITEMS).doc(report.itemId).get();
    if (!itemSnap.exists) return null;

    const item = itemSnap.data();
    if (item.ownerId !== ownerId) return "FORBIDDEN";

    return { id: reportSnap.id, ...report };
  },

  async updateReportStatus(reportId, reportStatus) {
  const updatedAt = new Date().toISOString();

  // Build base update payload
  const updatePayload = {
    reportStatus,
    updatedAt,
  };

  // Add conditional internalStatus
  if (reportStatus === "RESOLVED") {
    updatePayload.internalStatus = "CLOSE";
  }

  // 1. Update the report (single write)
  await db.collection(REPORTS).doc(reportId).update(updatePayload);

  // 2. If resolved, update the related item
  if (reportStatus === "RESOLVED") {
    const reportSnap = await db.collection(REPORTS).doc(reportId).get();

    if (reportSnap.exists) {
      const { itemId } = reportSnap.data();
  // 2a. Mark the item as SAFE
      await db.collection(ITEMS).doc(itemId).update({
        status: "SAFE",
        updatedAt,
      });
      // 2b. Mark ALL reports for this item as CLOSED
      const allReportsSnap = await db
        .collection(REPORTS)
        .where("itemId", "==", itemId)
        .get();

      const batch = db.batch();

      allReportsSnap.forEach((doc) => {
        batch.update(doc.ref, {
          reportStatus: "CLOSED",
          internalStatus: "CLOSE",
          updatedAt,
        });
      });

      await batch.commit();

    }
  }

  return { ok: true };
}
};