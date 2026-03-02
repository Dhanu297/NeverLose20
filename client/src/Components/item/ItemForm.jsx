import React, { useState } from "react";//Importing react and usestate hook from 
import itemApi from "../../api/itemApi";
import "./ItemForm.css"
import CustomButton from "../CustomButton/CustomButton";
import UploadPhoto from "../uploadPhoto/UploadPhoto";
function ItemForm({ form, setForm, next }) {
  const[error,setError]=useState("");
  
  const handleNext=()=>{
            if(!form.nickname.trim()){
              setError("Item Nickname is required");
              return;
            }
            setError("");
            next();
          };
  const totalSteps=3;
  const currentStep=1;
   const [photoUrl, setPhotoUrl] = useState("");

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "900px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold">Create your item</h3>
        <p className="text-center text-muted mb-4">
          This info helps organize your inventory and helps the finder identify your item.
        </p>
        <div className="row g-4">
          {/*<div className="col-md-6">
            <label className="form-label fw-semibold">
               Upload a Photo :
            </label>
            <div 
              className="border border-2 rounded-3 d-flex align-items-center justify-content-center text-muted"
              style={{ height: "180px", backgroundColor: "#f8f9fa", cursor: "pointer" }}>
              Click to upload Photo
            </div>
          </div>*/}
           <UploadPhoto  onUploaded={(url) => setForm({ ...form, photoUrl: url })} />

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <span style={{color:"#dc3545",fontSize:"14px"}}>*</span>
                Item Nickname :
              </label>
              <input type="text" className="form-control" value={form.nickname}
                required onChange={(e) =>setForm({ ...form, nickname: e.target.value })
                }placeholder="e.g., Grey Adventure Backpack" 
              />
              {error&&(<p className="text-center" mt-2 small style={{color:'red'}}>
                {error}
              </p>)}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description:
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Mention unique details like marks or tags"
              />
            </div>
          </div>
        </div>
        <div className="text-end mt-4">
          <CustomButton variant="primary" onClick={handleNext}>
            Next
         </CustomButton>
  <div className="mt-4 mb-3">
  <div className="progress rounded-pill" style={{ height: "10px" }}>
    <div
      className="progress-bar bg-primary"
      role="progressbar"
      style={{ width: "33%",padding:"20px"}}
    ></div>
  </div>
</div>
<p className="mt-2 text-center fw-semibold"
 style={{fontSize:"13px",color:"#6c757d"}}>
  Step {currentStep} of {totalSteps}
 </p>
        </div>
     </div>
    </div>
  );
}


export default ItemForm;