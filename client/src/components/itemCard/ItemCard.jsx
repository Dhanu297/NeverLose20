const ItemCard = ({ data }) => {
  if (!data) return null;

  const { nickname, description, photoUrl, verification } = data;

  return (
    <div className="row align-items-center gx-4">
      {/* LEFT SIDE IMAGE */}
      <div className="col-md-4 text-center mb-3 mb-md-0">
        <div
          className="rounded-4 border overflow-hidden bg-light mx-auto"
          style={{
            width: "260px",
            maxWidth: "260px",
            aspectRatio: "1 / 1",
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
      <div className="col-md-8">
        <h2 className="fw-bold mb-2">{nickname || "Unnamed Item"}</h2>
        <p className="text-muted mb-3">
          {description || "No description provided."}
        </p>

        {verification?.question && (
          <div className="p-3 bg-light rounded-3">
            <small className="text-uppercase fw-bold text-muted d-block mb-1">
              Security Question
            </small>
            <span>{verification.question}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;