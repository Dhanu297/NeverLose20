import { useState, useEffect } from "react";
import { publicApi } from "../../api/publicApi";
import { useNavigate } from "react-router-dom";

export function useFoundFlow(token) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoUrl, seturl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [reportData, setReportData] = useState({
    finder: { name: "", email: "", phone: "" },
    message: "",
    foundLocationText: "",
    photoUrl: "",
  });

  useEffect(() => {
    //todo: token naver change
    async function load() {
      try {
        const res = await publicApi.getItem(token);
        setItem(res.data);
      } catch (err) {
        // setError("Invalid or expired tag.");
        navigate("/error", {
          state: {
            title: "Oops! We couldn't find this tag",
            message: (
              <>
                It seems like this QR code isn't registered in our system or has
                been deactivated. Please try scanning it again or check if the
                tag is damaged.
                <strong> Thank you for trying to help!</strong>
              </>
            ),
          },
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return {
    step,
    next,
    back,
    item,
    loading,
    error,
    verificationAnswer,
    setVerificationAnswer,
    photoUrl,
    seturl,
    reportData,
    setReportData,
    isSubmitting,
    setIsSubmitting,
    setError,
  };
}
