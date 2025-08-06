import React, { useState, useEffect } from "react";
import { Button, Spinner, Form, Alert } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";
import api from "../config";

export default function TechnicalScreening() {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate | null>(
    null
  );

  const email = localStorage.getItem("email");

  interface ICandidate {
    id?: number;
    fullName: string;
    email: string;
    job_Id: string;
    phone_number: number;
    cvUrl?: string;
    createdAt?: string;
    cvBase64: string;
    score?: number;
  }

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await api.get(`/api/candidates`);
        const allCandidates: ICandidate[] = res.data;
        const found = allCandidates.find((c) => c.email === email);

        if (found) {
          setSelectedCandidate(found);
          setJobId(found.job_Id || "");

          if (found.cvBase64) {
            const byteCharacters = atob(found.cvBase64);
            const byteNumbers = Array.from(byteCharacters, (char) =>
              char.charCodeAt(0)
            );
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });
            const reconstructedFile = new File([blob], "candidate_cv.pdf", {
              type: "application/pdf",
            });
            setFile(reconstructedFile);
          }
        }
      } catch (err) {
        console.error("Failed to fetch candidate", err);
      }
    };

    fetchCandidate();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload your CV.");
      return;
    }
    if (!jobId.trim()) {
      setError("Job ID is missing.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobId", jobId);

    try {
      const response = await api.post(
        "/api/technical-screening",
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
    alert("Answers submitted!");
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h2 className="mb-4 text-primary">Technical Screening</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formJobId" className="mb-3">
          <Form.Label className="fw-bold">Job ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Job ID"
            value={selectedCandidate?.job_Id || ""}
            onChange={(e) => setJobId(e.target.value)}
            disabled={!!selectedCandidate?.job_Id}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className="fw-bold">
            Upload CV (PDF, DOC, DOCX)
          </Form.Label>
          <Form.Control
            type="file"
            accept=".pdf,.doc,.docx"
            disabled={!!file}
          />
          {file && selectedCandidate && (
            <div className="mt-2 text-muted">
              Selected file:{" "}
              <strong className="text-primary">
                {selectedCandidate.fullName}'s CV
              </strong>
            </div>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={
            loading || !selectedCandidate || selectedCandidate.score! < 75
          }
        >
          <FaFileUpload className="me-2" />
          {selectedCandidate &&
          typeof selectedCandidate.score === "number" &&
          selectedCandidate.score >= 75 ? (
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

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {questions.length > 0 && (
        <div className="mt-5">
          <h4 className="text-success mb-4">Generated Technical Questions</h4>
          {questions.map((question, index) => (
            <div key={index} className="mb-3 p-3 bg-white border rounded">
              <strong>Q{index + 1}:</strong> {question}
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Your answer..."
                className="mt-2"
              />
            </div>
          ))}
          <Button onClick={handleClick}>Submit</Button>
        </div>
      )}
    </div>
  );
}
