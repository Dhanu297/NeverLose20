import { useState, useEffect } from "react";
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await itemApi.list();

        //Data normalization ensures we always work with an array even if the API structure changes
        const normalized = Array.isArray(res) ? res : res.items || [];

        setItems(normalized);
      } catch (err) {
        console.error("Failed to load items:", err);
        setError("Could not sync with the database.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const itemsWithReports = items.map((item) => ({
    ...item,
    hasReports:
      item.reportsCount > 0 || (item.reports && item.reports.length > 0),
  }));

  const handleCreate = () => navigate("/create-item");
  const handleGoToDetail = (id) => navigate(`/item-details/${id}`);
  const handleGoToReports = (id) => navigate(`/item/${id}/reports`);

  return {
    items,
    loading,
    error,
    handleCreate,
    handleGoToDetail,
    handleGoToReports,
    itemsWithReports,
  };
};
