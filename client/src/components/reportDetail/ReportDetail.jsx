import React from "react";
import "./ReportDetail.css";
import { Row, Col, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

const ReportDetail = ({ report, onUpdateStatus }) => {
  const statusConfig = {
    NEW: { color: "var(--nl-success)", label: "New" },
    CONTACTED: { color: "var(--nl-warning)", label: "Contacted" },
    RESOLVED: { color: "var(--nl-info)", label: "Recovered" },
    SPAM: { color: "var(--nl-danger)", label: "Spam" },
  };

  const currentStatus = statusConfig[report.reportStatus] || statusConfig.NEW;

  // Function to render the Tooltip component
  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip" className="custom-tooltip">
      {text}
    </Tooltip>
  );

  const getButtonClass = (buttonStatus) => {
    const isActive = report.reportStatus === buttonStatus;
    const isClosed = report.reportStatus === "RESOLVED" || report.reportStatus === "SPAM";
    
    let baseClass = "btn manage-btn w-100 fw-bold ";
    if (isActive) return baseClass + "active-status";
    if (isClosed && !isActive) return baseClass + "disabled-fade";
    return baseClass;
  };

  return (
    <div className="bg-white rounded-4 overflow-hidden shadow-sm p-4 mt-3 border report-card">
      <Badge
        style={{ backgroundColor: currentStatus.color, color: "#000" }}
        className="px-3 text-uppercase mb-2"
      >
        {currentStatus.label}
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
        {/* Left Side */}
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
              <span className="text-secondary">"{report.message || "N/A"}"</span>
            </div>
            <div className="mb-2 d-flex align-items-center">
              <span className="fw-bold me-2 min-w-150">Photo evidence:</span>
              <div className="evidence-icon-box">
                <i className="bi bi-image"></i> <span className="text-secondary">"{report.photoUrl || "N/A"}"</span>
              </div>
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
          <p className="extra-small text-muted mb-4">
            Update the status of this report to keep your dashboard organized.
          </p>

          <div className="d-flex flex-column gap-4">
            {/* Contacted */}
            <div className="action-wrapper">
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Click to confirm you have contacted the finder.")}>
                <button 
                  className={getButtonClass("CONTACTED")}
                  onClick={() => onUpdateStatus(report.id, "CONTACTED")}
                  disabled={report.reportStatus === "RESOLVED"}
                  style={{ color: "#e8944f" }}
                >
                  Contacted
                </button>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2">You have reached out to the finder to coordinate the recovery.</p>
            </div>

            {/* Item Recovered */}
            <div className="action-wrapper">
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Mark as resolved once the item is back with you.")}>
                <button 
                  className={getButtonClass("RESOLVED")}
                  onClick={() => onUpdateStatus(report.id, "RESOLVED")}
                  style={{ color: "#87ceeb" }}
                >
                  Item Recovered
                </button>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2">Case closed! The item is back in your hands. This will resolve the report.</p>
            </div>

            {/* Spam */}
            <div className="action-wrapper">
              <OverlayTrigger placement="bottom" overlay={renderTooltip("Mark as spam to remove from active list.")}>
                <button 
                  className={getButtonClass("SPAM")}
                  onClick={() => onUpdateStatus(report.id, "SPAM")}
                  style={{ color: "#f08080" }}
                >
                  Spam
                </button>
              </OverlayTrigger>
              <p className="extra-small text-muted mt-2">Mark this as fake or irrelevant. It will be moved out of your active reports.</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReportDetail;