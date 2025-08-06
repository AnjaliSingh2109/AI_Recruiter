import  { useEffect, useState } from "react";
import { Button, Spinner, Form, Alert } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";
import api from "../config";

export default function HRScreening() {
  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [candidateName, setCandidateName] = useState<string>("");
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate | null>(null);

  const email=localStorage.getItem("email")

  interface ICandidate {
    id?: number;
    fullName: string;
    email: string;
    jobId: string;
    phone_number: number;
    cvUrl?: string;
    createdAt?: string;
    cvBase64: string;
    score?:number;
  }

  const getCandidates = async () => {
    try {
      const res = await api.get(`/api/candidates`);
      const allCandidates: ICandidate[] = res.data;

      const desiredCandidate = allCandidates.find(
        (item: ICandidate) => item.email === email
      );

      setSelectedCandidate(desiredCandidate ?? null);


      if (desiredCandidate?.cvBase64) {
        setCandidateName(desiredCandidate.fullName);

        const byteCharacters = atob(desiredCandidate.cvBase64);
        const byteNumbers = Array.from(byteCharacters, (char) =>
          char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // 👇 Convert Blob to File object for upload
        const reconstructedFile = new File([blob], "candidate_cv.pdf", {
          type: "application/pdf",
        });

        setFile(reconstructedFile);
      } else {
        console.log("Candidate not found or no CV uploaded");
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("CV not loaded.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/api/hr-screening",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setQuestions(response.data || []);
    } catch (err) {
      setError("Failed to generate questions. Please try again.");
      console.log("Error",err);
      
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    // TODO: Handle submission of answers if needed
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h2 className="mb-4 text-primary">HR Screening </h2>

     <Form.Group controlId="formFile" className="mb-3">
  <Form.Label className="fw-bold">Upload CV (PDF, DOC, DOCX)</Form.Label>
  <Form.Control
    type="file"
    accept=".pdf,.doc,.docx"
    disabled={!!file} // disabled if file is already set
  />
  {file && (
    <div className="mt-2 text-muted">
      Selected file: <strong className="text-primary text-semibold">{candidateName}'s CV</strong>
    </div>
  )}
</Form.Group>

      <Form onSubmit={handleSubmit}>
  <Button
    variant="primary"
    type="submit"
    disabled={
  loading ||
  !selectedCandidate ||
  (typeof selectedCandidate.score === "number" && selectedCandidate.score <75)
}

  >
    <FaFileUpload className="me-2" />
    {selectedCandidate && typeof selectedCandidate.score === "number" && selectedCandidate?.score >=75 ? (
      loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        "Generate Questions"
      )
    ) : (
      "Not Eligible"
    )}
  </Button>
</Form>


      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {questions.length > 0 && (
        <div className="mt-5">
          <h4 className="text-success mb-4">Generated HR Questions</h4>
          {questions.map((question, index) => (
            <div key={index} className="mb-3 p-3 bg-white border rounded">
              <strong>Q{index + 1}:</strong> {question}
              <Form.Control as="textarea" rows={2} placeholder="Your answer..." className="mt-2" />
            </div>
          ))}
          <Button onClick={handleClick}>Submit</Button>
        </div>
      )}
    </div>
  );
}
