import { useState, useEffect } from "react";
import itemApi from "../api/itemApi";

export function useItemDetails(id) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await itemApi.getItemById(id)
        setItem(res.data);
      } catch (err) {
        setError("Invalid or expired tag.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return {
    item,
    loading,
    error
  };
}