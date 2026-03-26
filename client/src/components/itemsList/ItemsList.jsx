import React from "react";
import { Table } from "react-bootstrap";
import "./itemsList.css";

const ItemList = ({
  items,
  page,
  totalPages,
  setPage,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  onItemDetails,
  onReportsList,
}) => {
  return (
    <div className="bg-white rounded-4 overflow-hidden shadow p-3">

      {/* FILTER + SORT BAR */}
      <div className="d-flex gap-3 mb-3">

        {/* Search */}
        <input
          type="text"
          className="form-control"
          placeholder="Search by nickname..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Status Filter */}
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="SAFE">Safe</option>
          <option value="LOST">Lost</option>
        </select>

        {/* Sort Field */}
        <select
          className="form-select"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="nickname">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>

        {/* Sort Direction */}
        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
          }
        >
          {sortDirection === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* TABLE */}
      <Table responsive className="mb-0 custom-table">
        <thead>
          <tr>
            <th className="p-3 border-0 w-50">Item Nickname</th>
            <th className="p-3 border-0">Item Status</th>
            <th className="p-3 border-0 text-center">View Report</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="align-middle border-bottom">
              <td
                className="p-3 fw-bold item-nickname"
                onClick={() => onItemDetails(item.id)}
              >
                {item.nickname}
              </td>

              <td className="p-3">
                <span
                  className={`status-dot me-2 ${item.status.toLowerCase()}`}
                ></span>
                {item.status}
              </td>

              <td className="p-3 text-center">
                <button
                  className="btn btn-link p-0 border-0" fs-4 fw-bold
                  onClick={() => onReportsList(item.id)}
                  disabled={item.ReportCount==0}
                >
                  {item.ReportCount}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* PAGINATION */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="fw-bold">
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemList;