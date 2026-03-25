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

  const doc = new PDFDocument({
    size: [size.width, size.height],
    margin: 0,
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="label.pdf"');

  doc.pipe(res);

  // --- Proportional layout ---
  const qrHeight = size.height * 0.60;
  const text1Height = size.height * 0.20; // SCAN IF FOUND
  const text2Height = size.height * 0.20; // scan URL

  const qrSize = Math.min(size.width * 0.8, qrHeight); // keep square
  const qrX = qrSize/2;
  const qrY = size.height * 0.10; // 10% top padding

  // Draw QR (circle or square)
  /* if (size.circle) {
    const qrCenterX = qrX + qrSize / 2;
    const qrCenterY = qrY + qrSize / 2;

    doc.save();
    doc.circle(qrCenterX, qrCenterY, qrSize / 2);
   
    doc.image(opts.qrDataUrl, qrX, qrY, { width: qrSize, height: qrSize });
    doc.restore();
  } else { */
    doc.image(opts.qrDataUrl, qrX, qrY, { width: qrSize, height: qrSize });
  //}

  // --- Text positions ---
  const text1Y = qrY + qrSize + 5; // SCAN IF FOUND
  const text1X = qrX + qrSize + 5; // SCAN IF FOUND
  const text2Y = text1Y + text1Height - 10; // scan URL

  // Blue "SCAN IF FOUND"
  doc
    .fillColor('#007BFF')
    .fontSize(4)
    .text('SCAN IF FOUND', 5,text1X, text1Y, {
      width: size.width - 10,
     
      align: 'center',
    })
    .fillColor('black');

  // Scan URL
  doc.fontSize(4).text(opts.scanUrl, 5, text2Y, {
    width: size.width - 10,
    align: 'center',
  });

  doc.end();
};