import { useState, useEffect, useContext } from "react";
import { reportsApi } from "../api/reportsApi";
import { AuthContext } from "../context/AuthContext";

export const useItemReports = (itemId) => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish
    if (authLoading) return;

    // If no user, stop loading and return empty list
    if (!user) {
      setReports([]);
      setLoading(false);
      return;
    }

    if (!itemId) return;

    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await reportsApi.list(itemId);
        setReports(res.data || []);
      } catch (err) {
        console.error("Fail to load reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [itemId, user, authLoading]);

  const updateStatus = async (reportId, newStatus) => {
    try {
      await reportsApi.updateStatus(reportId,{reportStatus:newStatus});
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, status: newStatus } : report
        )
      );
    } catch (err) {
      alert("Error updating status");
    }
  };

  return {
    reports,
    loading: loading || authLoading,
    updateStatus,
  };
};