/* 
const PDFDocument = require('pdfkit');

const MM_TO_PT = 72 / 25.4;
const mmToPt = (mm) => Number(mm) * MM_TO_PT;

exports.getPresetSize = (preset, custom) => {
  switch (preset) {
    case 'wallet':
      return { width: mmToPt(85.6), height: mmToPt(54) };

    case 'airtag':
      return { width: mmToPt(32), height: mmToPt(32), circle: true };

    case 'small-tag':
      return { width: mmToPt(40), height: mmToPt(20) };

    case 'custom':
      // Circle tag (diameter)
      if (custom?.diameterMm) {
        const d = mmToPt(custom.diameterMm);
        return { width: d, height: d, circle: true };
      }

      // Rectangle tag
      if (!custom?.widthMm || !custom?.heightMm) {
        throw new Error("Custom preset requires widthMm and heightMm");
      }

      return {
        width: mmToPt(custom.widthMm),
        height: mmToPt(custom.heightMm),
      };

    default:
      throw new Error('Invalid preset');
  }
};

exports.streamLabelPdf = async (res, opts) => {
  const size = exports.getPresetSize(opts.preset, opts.custom);

  const doc = new PDFDocument({
    size: [size.width, size.height],
    margin: 0,
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="label.pdf"');

  doc.pipe(res);

  // QR sizing
  const qrSize = Math.min(size.width * 0.8, size.height * 0.8);
  const qrX = (size.width - qrSize) / 2;
  const qrY = (size.height - qrSize) / 2 - 5;

  const qrCenterX = qrX + qrSize / 2;
  const qrCenterY = qrY + qrSize / 2;

  // Draw QR (circle mask if needed)
  if (size.circle) {
    doc.save();
    doc.circle(qrCenterX, qrCenterY, qrSize / 2);
    
    doc.image(opts.qrDataUrl, qrX, qrY, {
      width: qrSize,
      height: qrSize,
    });
    doc.restore();
  } else {
    doc.image(opts.qrDataUrl, qrX, qrY, {
      width: qrSize,
      height: qrSize,
    });
  }
const qrBottom = qrY + qrSize;

  // Blue "SCAN IF FOUND"
  doc
    .fillColor('#007BFF')
    .fontSize(10)
    .text('SCAN IF FOUND', 5,qrBottom + 5, {
      width: size.width - 10,
      align: 'center',
    })
    .fillColor('black'); // reset

  // Scan URL
  doc.fontSize(8).text(opts.scanUrl, 5,qrBottom + 18, {
    width: size.width - 10,
    align: 'center',
  });

  doc.end();
}; */

// --- Proportional layout ---
// src/lib/pdf.js
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

const MM_TO_PT = 72 / 25.4;
const mmToPt = (mm) => Number(mm) * MM_TO_PT;

exports.getPresetSize = (preset, custom) => {
  switch (preset) {
    case 'wallet':
      return { width: mmToPt(85.6), height: mmToPt(54) };

    case 'airtag':
      return { width: mmToPt(32), height: mmToPt(32), circle: true };

    case 'small-tag':
      return { width: mmToPt(40), height: mmToPt(20) };

    case 'custom':
      // Circle tag
      if (custom?.diameterMm) {
        const d = mmToPt(custom.diameterMm);
        return { width: d, height: d, circle: true };
      }

      // Rectangle tag
      if (!custom?.widthMm || !custom?.heightMm) {
        throw new Error("Custom preset requires widthMm and heightMm");
      }

      return {
        width: mmToPt(custom.widthMm),
        height: mmToPt(custom.heightMm),
      };

    default:
      throw new Error('Invalid preset');
  }
};

exports.streamLabelPdf = async (res, opts) => {
  const size = exports.getPresetSize(opts.preset, opts.custom);

  // Create document with exact size of the label (no margins)
  const doc = new PDFDocument({
    size: [size.width, size.height],
    margins: { top: 0, left: 0, bottom: 0, right: 0 }
  }); 
// Generate QR Code as a high-quality Buffer
  const qrBuffer = await QRCode.toBuffer(opts.scanUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    type: 'png',
    width: 600 // High resolution for print
  });

  // 1. Draw Circle Clip (if AirTag)
  if (size.circle) {
    doc.circle(size.width / 2, size.height / 2, size.width / 2).clip();
  }

  // 2. Calculate QR size (leave 15% padding)
  const qrSize = Math.min(size.width, size.height ) * 0.75;
  const xPos = (size.width - qrSize) / 2;
  const yPos = (size.height  - qrSize) / 2;

  // 3. Add QR to PDF
  doc.image(qrBuffer, xPos, yPos - (size.height  * 0.05), { width: qrSize });

  // 4. Add Label Text (Nickname)
 /*  const fontSize = Math.max(size.height  * 0.08, 6); // Responsive font size
  doc
    .fillColor('#333333')
    .fontSize(fontSize)
    .text("SCAN IF FOUND", 0, yPos + qrSize + 2, {
      width: size.width ,
      align: 'center',
      lineBreak: false
    }); */

  doc.end();
 return doc;
};