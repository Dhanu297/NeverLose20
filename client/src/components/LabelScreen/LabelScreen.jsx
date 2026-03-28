import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Modal, Button } from "react-bootstrap";

import { labelApi } from "../../api/labelApi";

import qrIcon from "../../assets/QR-Icon.svg";
import tagIcon from "../../assets/tag-icon.svg";
import printIcon from "../../assets/print-icon.svg";

// SVG Icons
import { ReactComponent as WalletIcon } from "../../assets/WalletQR.svg";
import { ReactComponent as CircleIcon } from "../../assets/CircleQR.svg";
import { ReactComponent as SquareIcon } from "../../assets/SquareQR.svg";
import { ReactComponent as CustomIcon } from "../../assets/CustomQR.svg";

// Components
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import "./LabelScreen.css";
// 1. Define Presets outside the component or at the top
const defaultPresets = [
  { id: "wallet", name: "Wallet", description: "Standard ID size (8.5 x 5.4 cm)", shape: "rect", widthMm: 85.6, heightMm: 54.0 },
  { id: "airtag", name: "AirTag", description: "Circular sticker (3.2 cm diameter)", shape: "circle", diameterMm: 32.0 },
  { id: "small-tag", name: "Small Tag", description: "Ideal for keychains (3 x 2 cm)", shape: "rect", widthMm: 30.0, heightMm: 20.0 },
  { id: "custom", name: "Custom", description: "Set your own dimensions" },
];
export default function LabelScreen({ item: propItem, embedded = true }) {
  const location = useLocation();

  //  IMPORTANT FIX  
  const initialItem = propItem || location.state;
  
// --- 2. State Hooks (Must be at the top) ---
  // --- 2. State Hooks (Must be at the top) ---
  const [item] = useState(() => ({
    ...initialItem,
    labelPresets: initialItem?.labelPresets || defaultPresets,
  }));
  const [error, setError] = useState("");

  // Custom size inputs
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  //confirmation States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [activePreset, setActivePreset] = useState(null);

  // --- 3. Logic Functions ---

  const getPreviewDimensions = (presetId) => {
    // 1. Handle Custom Case
    if (presetId === "custom") {
      return { 
        w: (Number(customWidth) * 10) || 50, 
        h: (Number(customHeight) * 10) || 50,
        shape: "rect" 
      };
    }

    // 2. Find the preset in the array
    const p = defaultPresets.find((p) => p.id === presetId);

    // 3. Fallback if preset isn't found or is null
    if (!p) {
      return { w: 50, h: 50, shape: "rect" };
    }

    return { 
      w: p.widthMm || p.diameterMm || 50, 
      h: p.heightMm || p.diameterMm || 50, 
      shape: p.shape || "rect" 
    };
  };

  const downloadPreset = async (preset) => {
    try {
      let payload = { preset };

      // Custom requires width + height
      if (preset === "custom") {
        if (!customWidth || !customHeight) {
          alert("Please enter both width and height.");
          return;
        }

        const w = Number(customWidth);
        const h = Number(customHeight);

        if (w <= 0 || w > 21 || h <= 0 || h > 21) {
          alert("Width and height must be between 1 and 21 cm.");
          return;
        }

        payload.widthMm = w*10;
        payload.heightMm = h*10;
      }

      const res = await labelApi.downloadPdf(propItem.id, payload);

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `label-${preset.id}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Failed to download label.");
    }
  };

  const handlePrepareDownload = (preset) => {
    /* if (preset.id === "custom" && (!customWidth || !customHeight)) {
      alert("Please enter dimensions for your custom label.");
      return;
    }
    setSelectedPresetId(preset);
    setIsConfirmOpen(true); */
      downloadPreset(activePreset); 
      setIsConfirmOpen(false); 
  };
  const handlePreview = (preset) => {
    if (preset.id === "custom" && (!customWidth || !customHeight)) {
      alert("Please enter dimensions first.");
      return;
    }
    setActivePreset(preset);
    setIsPreviewOpen(true);
  };

  if (!embedded && error) {
    return <div className="alert alert-danger m-5">{error}</div>;
  }
  if (!item) {
    return <p className="p-6">Loading…</p>;
  }
  console.log("ITEM:", item);
  console.log("PRESETS:", item?.labelPresets);
  return (
    <div className={embedded ? "embedded-label-box" : "container py-5"}>
      <div className="nl-QRcontainer rounded-4 p-4 p-md-5  border-0">
      {/* Header Logic */}
        {
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h5 className="fw-bold mb-2">
                Download Your QR Code
              </h5>
             
              <p>
                Public Scan URL:
                <code className="d-block text-dark p-2 rounded mt-1">
                  {propItem.publicUrl}
                </code>
              </p>
            </div>
            
            <div className="d-none d-md-flex align-items-center gap-3">
              <img src={qrIcon} width="40" />
              <i className="bi bi-arrow-right"></i>
              <img src={printIcon} width="40" />
              <i className="bi bi-arrow-right"></i>
              <img src={tagIcon} width="50" />
            </div>
          </div>
        }       

        {/*  GRID */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {item.labelPresets?.map((preset) => (
            <div key={preset.id} className="col">
              {/* Card */}
              <div      onClick={() => {
                   handlePreview(preset);
                }}
                role="button"  className="h-100 nl-preset-card shadow-sm p-1 d-flex flex-column align-items-center justify-content-center"
              >
                {/* Icons */}
                <div
                  className="mb-3 d-flex align-items-center justify-content-center"
                  style={{ height: "30px" }}
                >
                  {preset.id === "wallet" && (
                    <WalletIcon className="qr-svg-icon" />
                  )}
                  {preset.id === "airtag" && (
                    <CircleIcon className="qr-svg-icon" />
                  )}
                  {preset.id === "small-tag" && (
                    <SquareIcon className="qr-svg-icon" />
                  )}
                </div>

                {/* Info Tag */}
                <div className="mb-3">
                  <h5
                    className="preset-name"
                    style={{ fontFamily: "var(--font-titles)" }}
                  >
                    {preset.name} Size
                  </h5>
                  <p className="preset-desc mb-0">
                    {preset.description || "Click to download"}
                  </p>
                </div>

                {/* Download Buttons */}
                {preset.id === "custom" && (
                  <div
                    className="w-100 mb-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="d-flex gap-2 mb-3 mx-3">
                      <input
                        type="number"
                        placeholder="Width(cm)"
                        className="form-control form-control-sm rounded-3 border-0 text-center bg-white shadow-sm py-2"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Height(cm)"
                        className="form-control form-control-sm rounded-3 border-0 text-center bg-white shadow-sm py-2"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                      />
                    </div>
                   
                  </div>
                )}
                <div className="d-flex flex-column gap-2">
                 {/*  <button className="btn btn-outline-primary btn-sm rounded-pill w-80" onClick={() => handlePreview(preset)}>Preview & Download</button> */}
                  {/* <button className="btn btn-primary btn-sm rounded-pill" onClick={() => handlePrepareDownload(preset.id)}>Download PDF</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Preview Modal */}
            <Modal show={isPreviewOpen} onHide={() => setIsPreviewOpen(false)} centered>
              <Modal.Header closeButton><Modal.Title>QR Preview</Modal.Title></Modal.Header>
              <Modal.Body className="d-flex flex-column align-items-center bg-light py-4">
                <div style={{
                  width: `${getPreviewDimensions(activePreset?.id).w * 4}px`,
                  height: `${getPreviewDimensions(activePreset?.id).h * 4}px`,
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: activePreset?.shape === "circle" ? "50%" : "4px",
                  border: "1px solid #ddd",
                  position: "relative",
        overflow: "hidden", // Ensures no corner clipping
                }}>
                  <QRCodeSVG value={propItem.publicUrl} 
                  size={
          activePreset?.shape === "circle"
            ? getPreviewDimensions(activePreset?.id).w * 1.4 // 70% of the 2x scaled container
            : Math.min(getPreviewDimensions(activePreset?.id).w, getPreviewDimensions(activePreset?.id).h) * 1.6
        }
        level="H" // High error correction is best for small/curved surfaces
        includeMargin={false} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => { setIsPreviewOpen(false); handlePrepareDownload(activePreset); }}>Looks Good, Download</Button>
              </Modal.Footer>
            </Modal>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Ready to Print?"
        message={`Download PDF for "${item.nickname}"?`}
        onConfirm={() => { downloadPreset(activePreset); setIsConfirmOpen(false); }}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}
