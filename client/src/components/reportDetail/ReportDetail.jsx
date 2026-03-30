import React from "react";
import "./ReportDetail.css";
import { Row, Col, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

const ReportDetail = ({ report, onUpdateStatus }) => {
  const currentStatus = report.reportStatus || "NEW";

  const statusConfig = {
    NEW: { color: "var(--nl-success)", label: "New" },
    CONTACTED: { color: "var(--nl-warning)", label: "Contacted" },
    RESOLVED: { color: "var(--nl-info)", label: "Recovered" },
    SPAM: { color: "var(--nl-danger)", label: "Spam" },
  };

  const badgeStyle = statusConfig[currentStatus] || statusConfig.NEW;

  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip" className="custom-tooltip">
      {text}
    </Tooltip>
  );

  // Helper to determine button states based on sequential workflow
  const getButtonProps = (type) => {
    const isNew = currentStatus === "NEW";
    const isContacted = currentStatus === "CONTACTED";
    const isFinal = currentStatus === "RESOLVED" || currentStatus === "SPAM";

    let isDisabled = true;
    let className = "btn manage-btn w-100 fw-bold ";
    let color = "#fff";

    if (type === "CONTACTED") {
      color = "#e8944f"; // Orange
      isDisabled = !isNew || isFinal; // Enabled only when NEW
      if (isContacted) className += "active-status";
    } else if (type === "RESOLVED") {
      color = "#87ceeb"; // Light Blue
      isDisabled = !isContacted || isFinal; // Enabled only after CONTACTED
      if (currentStatus === "RESOLVED") className += "active-status";
    } else if (type === "SPAM") {
      color = "#f08080"; // Salmon/Red
      isDisabled = !isContacted || isFinal; // Enabled only after CONTACTED
      if (currentStatus === "SPAM") className += "active-status";
    }

    // Apply fade if disabled and not the current active state
    if (isDisabled && currentStatus !== type) className += "disabled-fade";

    return { disabled: isDisabled, className, style: { color } };
  };

  return (
    <div className="bg-white rounded-4 overflow-hidden shadow-sm p-4 mt-3 border report-card">
      <Badge 
        style={{ backgroundColor: badgeStyle.color, color: "#000" }} 
        className="px-3 text-uppercase mb-2"
      >
        {badgeStyle.label}
      </Badge>

      <div className="text-center mb-3">
        <span className="text-muted small italic">
          Last Activity: {new Date(report.createdAt).toLocaleString('en-US', { 
            month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
          })}
        </span>
      </div>

      <div className="status-divider" style={{ backgroundColor: "#b2f2bb" }} />

      <Row>
        {/* Left Side: Context and Contact */}
        <Col md={8} className="border-end pe-md-4">
          <section className="mb-5 pb-3 border-bottom">
            <h6 className="text-uppercase text-muted fw-bold small mb-3 ls-wide">Found Context</h6>
            <div className="mb-3 d-flex align-items-baseline">
              <span className="fw-bold me-2 min-w-150">Found Location:</span>
              <span>{report.foundLocationText || "N/A"}</span>
            </div>
            <div className="mb-3 d-flex align-items-baseline">
              <span className="fw-bold me-2 min-w-150">Verification Answer:</span>
              <span className="text-primary">{report.verificationAnswer || "N/A"}</span>
            </div>
            <div className="mb-3 d-flex align-items-baseline">
              <span className="fw-bold me-2 min-w-150">Message:</span>
              <span className="text-secondary italic">"{report.message || "N/A"}"</span>
            </div>
            <div className="mb-2 d-flex align-items-center">
              <span className="fw-bold me-2 min-w-150">Photo evidence:</span>
             {report.photoUrl ? (
    /* Link exists only if URL is present */
    <a href={report.photoUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
      <div className="evidence-icon-box me-2">
        <i className="bi bi-image"></i>
      </div>
    </a>
  ) : (
    /* Static box if no URL */
    <div className="evidence-icon-box me-2 opacity-25">
      <i className="bi bi-image"></i>
    </div>
  )}<span className="text-secondary small">
    {report.photoUrl ? "Click to view evidence" : "No photo uploaded"}
  </span>
             {/*  <span className="text-secondary small">{report.photoUrl || "N/A"}</span> */}
            </div>
          </section>

          <section>
            <h6 className="text-uppercase text-muted fw-bold small mb-3 ls-wide">Finder Contact</h6>
            <div className="mb-2 d-flex">
              <span className="fw-bold me-2 min-w-150">Email Address:</span>
              <span>{report.finder?.email}</span>
            </div>
            <div className="mb-2 d-flex">
              <span className="fw-bold me-2 min-w-150">Finder Name:</span>
              <span>{report.finder?.name}</span>
            </div>
            <div className="mb-2 d-flex">
              <span className="fw-bold me-2 min-w-150">Phone Number:</span>
              <span>{report.finder?.phone}</span>
            </div>
          </section>
        </Col>

        {/* Right Side: Manage Report */}
        <Col md={4} className="ps-md-5">
          <h6 className="text-uppercase text-muted fw-bold small mb-2">Manage Report</h6>
          <p className="extra-small text-muted mb-4">Follow the steps to recover your item.</p>

          <div className="d-flex flex-column gap-4">
            {/* Contacted */}
            <div className="action-wrapper">
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Step 1: Confirm you contacted the finder.")}>
                <span className="d-block">
                  <button 
                    {...getButtonProps("CONTACTED")} 
                    onClick={() => onUpdateStatus(report.id, report.itemId, "CONTACTED")}
                  >
                    Contacted
                  </button>
                </span>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2">Enable this first to reach out to the finder.</p>
            </div>

            {/* Item Recovered */}
            <div className="action-wrapper">
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Step 2: Close case once item is back.")}>
                <span className="d-block">
                  <button 
                    {...getButtonProps("RESOLVED")} 
                    onClick={() => onUpdateStatus(report.id, report.itemId, "RESOLVED")}
                  >
                    Item Recovered
                  </button>
                </span>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2">Case closed! This will resolve the report.</p>
            </div>

            {/* Spam */}
            <div className="action-wrapper">
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Alternative: Mark as fake/spam.")}>
                <span className="d-block">
                  <button 
                    {...getButtonProps("SPAM")} 
                    onClick={() => onUpdateStatus(report.id,report.itemId, "SPAM")}
                  >
                    Spam
                  </button>
                </span>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2">Mark as spam if the item is not yours.</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReportDetail;