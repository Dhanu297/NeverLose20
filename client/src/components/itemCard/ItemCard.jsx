const ItemCard = ({ data }) => {
  if (!data) return null;

  const { nickname, description, photoUrl, verification } = data;

  return (
    <div
      className="container mx-auto bg-white p-4 p-md-4"
      style={{
        maxWidth: "850px",
      }}
    >
      <div className="row align-items-center gx-lg-5">
        {/* LEFT SIDE IMAGE */}
        <div className="col-12 col-md-5 d-flex justify-content-center">
          <div
            className="rounded-4 border overflow-hidden bg-light d-flex align-items-center justify-content-center mx-auto"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              transition: "transform 0.3s ease",
            }}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={nickname}
                className="w-100 h-100 object-fit-cover"
              />
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="col-md-7">
          <h2 className="fw-bold mb-2" style={{ color: "var(--nl-deep-blue)" }}>
            {nickname || "Unnamed Item"}
          </h2>
          <p className="text-muted mb-4">
            {description || "No description provided."}
          </p>

          {verification?.question && (
            <div className="p-3 bg-light rounded-3">
              <label
                className="d-block fw-bold small text-uppercase mb-1"
                style={{ color: "var(--nl-tech-blue)", letterSpacing: "1px" }}
              >
                Security Question
              </label>
              <span>{verification.question}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
