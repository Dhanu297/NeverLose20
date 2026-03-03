import { useParams } from "react-router-dom";
import { useFoundFlow} from "../hooks/public/useFoundFlow"
import Step1ItemPreview from "../components/Found/Step1";
import Step2Verification from "../components/Found/Step2";
import Step3FoundForm from "../components/Found/Step3";
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
      verificationAnswer: flow.verificationAnswer,
    };

    await publicApi.submitFoundReport(token, payload);
    alert("Report submitted!");
  };

  return (
    <div className="p-6">
      <ProgressBar step={flow.step} />

      {flow.step === 1 && (
        <Step1ItemPreview item={flow.item} onNext={flow.next} />
      )}

      {flow.step === 2 && flow.item.verificationQuestion && (
        <Step2Verification
          item={flow.item}
          answer={flow.verificationAnswer}
          setAnswer={flow.setVerificationAnswer}
          onNext={flow.next}
        />
      )}

      {flow.step === 3 && (
        <Step3FoundForm
          reportData={flow.reportData}
          setReportData={flow.setReportData}
          onSubmit={submit}
        />
      )}
    </div>
  );
}