const ItemCard = ({ data }) => {
  if (!data) return null;
  const { nickname, description, photoUrl, verification } = data;

  return (
    <div className="row align-items-center">
      <div className="col-md-5 text-center mb-3 mb-md-0">
        <div className="rounded-4 border overflow-hidden shadow-sm bg-light" style={{ aspectRatio: '1/1' }}>
          {photoUrl ? (
            <img src={photoUrl} alt={nickname} className="w-100 h-100 object-fit-cover" />
          ) : (
            <div className="h-100 d-flex align-items-center justify-content-center text-muted">No Image</div>
          )}
        </div>
      </div>
      <div className="col-md-7">
        <h2 className="fw-bold">{nickname || "Unnamed Item"}</h2>
        <p className="text-muted">{description || "No description provided."}</p>
        {verification?.question && (
          <div className="mt-3 p-2 bg-light rounded">
            <small className="text-uppercase fw-bold text-muted d-block">Security Question</small>
            <span>{verification.question}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;