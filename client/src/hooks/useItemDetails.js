import { useState, useEffect } from "react";
import itemApi from "../api/itemApi";

export function useItemDetails(id) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    async function load() {
      setLoading(true);
      try {
        const res = await itemApi.getItemById(id);
        if (isMounted) {
          setItem(res); // Ensure res is the item object
          setError("");
        }
      } catch (err) {
        if (isMounted) setError("Item not found.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => { isMounted = false; };
  }, [id]); // Re-runs if ID changes

  return { item, loading, error };
}