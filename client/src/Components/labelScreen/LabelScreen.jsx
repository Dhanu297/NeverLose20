import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { labelApi } from "../../api/labelApi";
import itemApi from "../../api/itemApi";

export default function LabelScreen() {
  const { itemId } = useParams();
  const location = useLocation();

  // Item data passed from ItemCard via navigate()
  const initialItem = location.state;

  const [item, setItem] = useState(initialItem);
  const [error, setError] = useState("");

  // Custom size inputs
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  // If user refreshes the page, state is lost → fetch minimal item info
  useEffect(() => {
    const loadItem = async () => {
      
        try {
          const res = await itemApi.getItemById(itemId);
          const data =res;

          // Default presets
          const labelPresets = [
            { id: "wallet", name: "Wallet", shape: "rect",description:"Perfect for IDs or wallets",size:'2"*2.7" (5*7cm)', widthMm: 85.6, heightMm: 54.0 },
            { id: "airtag", name: "AirTag", shape: "circle",description:"Circular sticker",size:'1.2"*1.2" (3*3cm)', diameterMm: 32.0 },
            { id: "small-tag", name: "Small Tag", shape: "rect",description:"Ideal for keychains",size:'1.5"*1.6" (4*4cm)', widthMm: 30.0, heightMm: 20.0 },
            { id: "custom", name: "Custom Size" ,description:"choose your own dimensions"}
          ];

          setItem({
            ...data,
            labelPresets: data.labelPresets || labelPresets
          });

        } catch (err) {
          console.error(err);
          setError("Unable to load item details.");
        }
      
    };

    loadItem();
  }, [ itemId]);

  if (error) {
    return (
      <div className="container mt-5">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!item || !item.labelPresets) {
    return <p className="p-6">Loading…</p>;
  }

  const downloadPreset = async (preset) => {
    try {
      let payload = { preset }; // DO NOT CHANGE API CALL STRUCTURE

      // Custom requires width + height
      if (preset.id === "custom") {
        if (!customWidth || !customHeight) {
          alert("Please enter both width and height.");
          return;
        }

        const wInches = Number(customWidth);
        const hInches = Number(customHeight);
        const w=Math.round(wInches*25.4);
        const h=Math.round(hInches*25.4);

        if (w <= 0 ||  h <= 0 ) {
          alert("Width and height must be greater than 0 inches.");
          return;
        }
        if(wInches>7.5||hInches>7.5){
          alert("Label size cannot exceed this size(7.5*7.5 inches).")
        return;
        }

        payload.widthMm = w;
        payload.heightMm = h;
      }

      const res = await labelApi.downloadPdf(itemId, payload);

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
  console.log(item);
return (
  <div className="container mt-5">
    <div className=" shadow-lg p-4 rounded-4">

      <div
        className="p-4 rounded-4 text-white"
        style={{ background: "linear-gradient(135deg,var(--n1-tech-blue),var(--n1-deep-blue);)" }}
      >

        <h2 className="text-center text-white fw-bold mb-2">Label for {item.nickname}</h2>

        <p className="text-center text-light mb-3">
          Use these printable labels to attach to your item.
          Scanning the QR code will take finders to your public page.
        </p>
        <div className="mb-4">
          <p className="fw-semibold text-white mb-1">Public Scan URL:</p>

          <code className="text-dark p-2 rounded d-block">
            {item.publicUrl}
          </code>
        </div>
        <h4 className="mt-4">Download Label</h4>

        <div className="row mt-3">

          {item.labelPresets && item.labelPresets.length > 0 ? (
            item.labelPresets.map((preset) => (
              <div key={preset.id} className="col-md-3 mb-3">

                <button
                  onClick={() => downloadPreset(preset)}
                  className="btn btn-light w-100 text-start p-3"
                >
                  <div className="fw-bold">
                  {preset.name}</div>
                  {preset.description&&(<div className="small text-muted">{preset.description}</div>)}
                  {preset.size &&(<div className="small text-muted">{preset.size}</div>)}
                </button>

              
                {preset.id === "custom" && (
                  <div className="row g-2 mt-2">
                    <div className="col-6">

                    <input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="Width (in)"
                      className="form-control mb-2"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                    />
                    </div>
                    <div className="col-6">

                    <input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="Height (in)"
                      className="form-control"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                    />
                    </div>

                  </div>
                )}

              </div>
            ))
          ) : (
            <p className="text-warning mt-3">
              No label presets available.
            </p>
          )}

        </div>

      </div>
    </div>
  </div>

)};
