import React, { useState } from "react";


const EditItemComponent = () => {
  const [formData, setFormData] = useState({
    nickname: "Grey Adventure Backpack",
    description: "North Face bag, grey color...",
    securityQuestion: "What color is inside?",
    status: "",
    photo:  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="item-form-content">

      
      <h3 className="text-white text-center fw-bold mb-4 display-6">
        Edit Your Item
      </h3>

     
      <div className="bg-white rounded-4 shadow-sm w-100 px-5 py-4">

        <div style={{ maxWidth: "900px" }} className="mx-auto">

          <div className="d-flex gap-4">

            
            <div style={{ width: "35%" }} className="text-center">
<p className="fw-semibold mt-2">Upload a Photo:</p>
              <img
  src={formData.photo}
  alt="item"
  className="img-fluid rounded mb-3"
  style={{ height: "150px", objectFit: "cover" }}
  
/>

              <label className="btn btn-outline-primary w-100 mb-3">
  Change Photo
  <input
    type="file"
    hidden
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          photo: imageUrl
        }));
      }
    }}
  />
</label>
              
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Item Status</option>
                <option value="Safe">Safe</option>
                <option value="Closed">Closed</option>
                <option value="Lost">Lost</option>
              </select>

            </div>

            
            <div style={{ width: "65%" }}>

              <div className="mb-3">
                <label>Item Nickname:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Description:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Security Question</label>
                <input
                  type="text"
                  className="form-control"
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                />
              </div>

              
              <div className="d-flex justify-content-between mt-4">

                <button className="btn btn-outline-secondary">
                  Back
                </button>

                <button className="btn btn-primary">
                  Update Item
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default EditItemComponent;