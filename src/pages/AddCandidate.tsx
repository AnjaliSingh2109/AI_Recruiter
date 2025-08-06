import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../config";

type CandidatePayload = {
  fullName: string;
  email: string;
  job_Id: string;
  phone_number: string;
  cv?: FileList;
  role:string;
};

export default function AddCandidate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const role = localStorage.getItem("role");
  const emailData = localStorage.getItem("email") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CandidatePayload>({
    defaultValues: {
      email: role === "USER" ? emailData : "",
    },
  });

  const onSubmit = async (data: CandidatePayload) => {
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("job_Id", data.job_Id);
      formData.append("phone_number", data.phone_number);
      if (data.cv && data.cv.length > 0) {
        formData.append("file", data.cv[0]);
      }

      const response = await api.post(`/api/candidates`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response) throw new Error("Failed to add candidate");

      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const getJobs = async () => {
    const res = await api.get(`/api/job-desc`);
    setJobs(res.data);
  };
  useEffect(() => {getJobs()}, []);
  return (
    <div className="p-4 bg-white rounded">
      <div className="d-flex align-items-center mb-4">
        <Button
          onClick={() => navigate("/")}
          className="rounded-circle bg-dark text-white me-2"
        >
          <FaArrowLeftLong size={18} />
        </Button>
        <h3 className="mb-0">Add Candidate</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Full Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (
              <div className="text-danger">{errors.fullName.message}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              Email<span className="text-danger">*</span>
            </label>
            {role === "USER" ? (
              <input
                type="email"
                className="form-control"
                {...register("email", { required: "Email is required" })}
                disabled
              />
            ) : (
              <input
                type="email"
                className="form-control"
                {...register("email", { required: "Email is required" })}
              />
            )}
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Job Code<span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              {...register("job_Id", { required: "Job Code is required" })}
            >
              <option value="">-- Select Job Code --</option>
              {jobs.map((job:CandidatePayload) => (
                <option key={job.job_Id} value={job.job_Id}>
                  {`${job.role} (${job.job_Id})`}
                </option>
              ))}
            </select>
            {errors.job_Id && (
              <div className="text-danger">{errors.job_Id.message}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              Phone Number<span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              className="form-control"
              {...register("phone_number", {
                required: "Phone number is required",
              })}
            />
            {errors.phone_number && (
              <div className="text-danger">{errors.phone_number.message}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">
            Upload CV<span className="text-danger">*</span>
          </label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx"
            {...register("cv", { required: "CV is required" })}
          />
          {errors.cv && (
            <div className="text-danger">{errors.cv.message as string}</div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Add Candidate"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger mt-4">Error: {error}</div>}
    </div>
  );
}
