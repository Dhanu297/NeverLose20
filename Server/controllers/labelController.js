// controllers/labelsController.js
// Generates printable QR label PDFs for items owned by the authenticated user.
// The controller delegates all logic to LabelService.

const { LabelService } = require("../services/labelService");

exports.getLabel = async (req, res) => {
  try {
    const ownerId = req.user.uid;
    const { itemId } = req.params;

    // Default preset is "wallet" unless specified
    const preset = req.query["preset[id]"] || "wallet";

    // Optional custom dimensions
    const widthMm = req.query["preset[widthMm]"] ? Number(req.query["preset[widthMm]"] ) : undefined;
    const heightMm = req.query["preset[heightMm]"]  ? Number(req.query["preset[heightMm]"]) : undefined;
    const diameterMm =req.query["preset[diameterMm]"]  ? Number(req.query["preset[diameterMm]"] ) : undefined;

    // Streams PDF directly to response
    const doc = await LabelService.generateLabelPdfForItem({
      ownerId,
      itemId,
      preset,
      widthMm,
      heightMm,
      diameterMm,
      res,
    });
     res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="label.pdf"');

  doc.pipe(res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};