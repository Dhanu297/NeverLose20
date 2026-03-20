// src/lib/pdf.js
const PDFDocument =require('pdfkit');

const MM_TO_PT = 72 / 25.4;
const mmToPt = mm => mm * MM_TO_PT;

exports.getPresetSize = (preset, custom) =>{
  switch (preset) {
    case 'wallet':
      return { width: mmToPt(85.6), height: mmToPt(54) };
    case 'airtag':
      return { width: mmToPt(32), height: mmToPt(32), circle: true };
    case 'small-tag':
      return { width: mmToPt(40), height: mmToPt(20) };
    case 'custom':
      if (custom?.diameterMm) {
        const d = mmToPt(custom.diameterMm);
        return { width: d, height: d, circle: true };
      }
      return {
        width: mmToPt(custom.widthMm),
        height: mmToPt(custom.heightMm),
      };
    default:
      throw new Error('Invalid preset');
  }
}

exports.streamLabelPdf = async(res, opts)=> {
  const size = this.getPresetSize(opts.preset, opts.custom);
  const doc = new PDFDocument({
    size: [size.width, size.height],
    margin: 0,
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="label.pdf"');

  doc.pipe(res);

  const qrSize = Math.min(size.width * 0.8, size.height * 0.8);

const qrX = (size.width - qrSize) / 2;
const qrY = (size.height - qrSize) / 2 - 5;

const qrCenterX = qrX + qrSize / 2;
const qrCenterY = qrY + qrSize / 2;

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


  doc.fontSize(8).text(opts.scanUrl, 5, size.height - 12, {
    width: size.width - 10,
    align: 'center',
  });

  doc.end();
}