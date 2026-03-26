import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { labelApi } from "../../api/labelApi";
import itemApi from "../../api/itemApi";
import qrIcon from "../../assets/QR-Icon.svg";
import tagIcon from "../../assets/tag-icon.svg";
import printIcon from "../../assets/print-icon.svg";

import { ReactComponent as WalletIcon } from "../../assets/WalletQR.svg";
import { ReactComponent as CircleIcon } from "../../assets/CircleQR.svg";
import { ReactComponent as SquareIcon } from "../../assets/SquareQR.svg";
import { ReactComponent as CustomIcon } from "../../assets/CustomQR.svg";

import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import "./LabelScreen.css";

export default function LabelScreen({ item: propItem, embedded = true }) {
  const { itemId } = useParams();
  const location = useLocation();

  //  IMPORTANT FIX
  const initialItem = propItem || location.state;
  const defaultPresets = [
    {
      id: "wallet",
      name: "Wallet",
      description: "Standard ID size (8.5 x 5.4 cm)",
      shape: "rect",
      widthMm: 85.6,
      heightMm: 54.0,
    },
    {
      id: "airtag",
      name: "AirTag",
      description: "Circular sticker (3.2 cm diameter)",
      shape: "circle",
      diameterMm: 32.0,
    },
    {
      id: "small-tag",
      name: "Small Tag",
      description: "Ideal for keychains (3 x 2 cm)",
      shape: "rect",
      widthMm: 30.0,
      heightMm: 20.0,
    },
    {
      id: "custom",
      name: "Custom",
      description: "Set your own dimensions",
    },
  ];

  const [item, setItem] = useState(() => {
    if (!initialItem) return null;

    return {
      ...initialItem,
      labelPresets: initialItem.labelPresets || defaultPresets,
    };
  });
  const [error, setError] = useState("");

  // Custom size inputs
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  //confirmation States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const downloadPreset = async (preset) => {
    try {
      let payload = { preset }; // DO NOT CHANGE API CALL STRUCTURE

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
      a.download = `label-${preset}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Failed to download label.");
    }
  };

  const handlePrepareDownload = (presetId) => {
    setSelectedPresetId(presetId);

    if (presetId === "custom") {
      if (!customWidth || !customHeight) {
        alert("Please enter dimensions for your custom label.");
        return;
      }
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmAction = () => {
    downloadPreset(selectedPresetId);
    setIsConfirmOpen(false);
    setSelectedPresetId(null);
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
        {/* 🔥 FULL PAGE HEADER */}
        {!embedded && (
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h1 className="display-5 fw-extrabold mb-0">
                Download your QR Code
              </h1>
              <p className="fs-4">{propItem.nickname}</p>

              <p>
                Public Scan URL:
                <code className="d-block bg-light text-dark p-2 rounded mt-1">
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
        )}

        {/*  EMBEDDED HEADER (FIGMA STYLE) */}
        {embedded && (
          <div className="mb-4">
            <h4 className="fw-bold mb-0">
              Ready to protect it?{" "}
              <span className="fw-normal">Print your QR Code</span>
            </h4>
          </div>
        )}

        {/*  GRID */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {item.labelPresets?.map((preset) => (
            <div key={preset.id} className="col">
              {/* Card */}
              <div
                onClick={() => {
                  if (preset.id !== "custom") handlePrepareDownload(preset.id);
                }}
                role="button"
                className="h-100 nl-preset-card shadow-sm p-1 d-flex flex-column align-items-center justify-content-center"
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
                    <button
                      className="btn btn-light btn-sm  rounded-pill mx-3 fw-bold py-2 text-primary"
                      onClick={() => handlePrepareDownload("custom")}
                    >
                      Generate PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Ready to Print?"
        message={`You are about to download the ${selectedPresetId} label for "${item.nickname}". This will generate a printable PDF file.`}
        onConfirm={handleConfirmAction}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}
