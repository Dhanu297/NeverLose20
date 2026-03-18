import { useParams } from "react-router-dom";
import { useFoundFlow } from "../hooks/public/useFoundFlow";
import Step1ItemPreview from "../components/Found/Step1";
import Step2Verification from "../components/Found/Step2";
import Step3Success from "../components/Found/Step3";
import Founder from "../layouts/Founder/Founder";
import ProgressBar from "../components/progressBar/ProgressBar";
import { publicApi } from "../api/publicApi";

export default function FoundReport() {
  const { token } = useParams();
  const flow = useFoundFlow(token);

  if (flow.loading) return <p>Loading...</p>;
  if (flow.error) return <p>{flow.error}</p>;

  const submit = async () => {
    const payload = {
      ...flow.reportData,
      photoUrl: flow.photoUrl,
      verificationAnswer: flow.verificationAnswer,
    };

    await publicApi.submitFoundReport(token, payload);
    alert("Report submitted!");
  };

  return (
    <Founder
      right={
        <div className="p-2 p-md-4">
          <ProgressBar step={flow.step} />

          {flow.step === 1 && (
            <Step1ItemPreview
              item={flow.item}
              answer={flow.verificationAnswer}
              setAnswer={flow.setVerificationAnswer}
              photoUrl={flow.photoUrl}
              seturl={flow.seturl}
              onNext={flow.next}
            />
          )}

          {flow.step === 2 && flow.item.verificationQuestion && (
            <Step2Verification
              reportData={flow.reportData}
              setReportData={flow.setReportData}
              onSubmit={submit}
              onBack={flow.prev}
            />
          )}
        </div>
      }
    />
  );
}
