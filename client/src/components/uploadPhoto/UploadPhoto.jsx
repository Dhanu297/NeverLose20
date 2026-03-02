import { useState } from "react";
import uploadApi from "../../api/uploadApi";
import { useEffect } from "react";

function UploadPhoto({photoUrl ,onUploaded }) {
  const [preview, setPreview] = useState(photoUrl||null);
  const [uploading, setUploading] = useState(false);
  useEffect(()=>{
    if(photoUrl){
      setPreview(photoUrl);
    }
  },[photoUrl]);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);
      const url = await uploadApi.uploadPhoto(file);
      onUploaded(url);
    } catch (err) {
      alert("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-2">
        <label className="form-label fw-semibold mb-0" style={{whiteSpace:"nowrap"}}>
          Upload a Photo:
        </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="border border-2 rounded-3 d-flex align-items-center justify-content-center"
      style={{height:"200px",
        backgroundColor:"#f8f9fa",
        overflow:"hidden"
      }}>
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          style={{ width:"100%", height:"100%", objectFit:"contain", borderRadius: 8 }}
        />
      ):(
        <span className="text-muted">No image selected</span>
      )}
      </div>
         {uploading && <p className="mt-2 mb-0">Uploading...</p>}
    </div>
  );
}
  export default UploadPhoto;
