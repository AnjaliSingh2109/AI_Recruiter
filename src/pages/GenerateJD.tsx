import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../config";

type JobPayload = {
  jobId: string;
  role: string;
  job_Id: string;
  experience: string;
  jobType: string;
  jobLocation: string;
  salary: string;
  responsibilities: string;
  educationalRequirements: string;
  technologiesTools: string;
  noOfOpenings: string;
};

export default function GenerateJDModal() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobPayload>();

  const onSubmit = async (data: JobPayload) => {
    setIsLoading(true);
    setResult("");

    try {
      const res = await api.post(`/api/job-desc`, data);
      console.log("Response", res);

      const response = await api.post("/api/generate", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Set the result from the response data
      setResult(response.data); // Assuming the JD is plain text
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setResult("");
  };
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white rounded">
      <div className="d-flex">
        <Button
          onClick={() => navigate("/")}
          className="rounded-circle bg-dark text-white me-2"
        >
          <FaArrowLeftLong size={18} />
        </Button>
        <h3>Generate Hob Description</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3 py-5">
          <div className="col-md-4">
            <label className="form-label fw-bold">
              Job ID<span className="text-danger">*</span>
            </label>

            <input
              className="form-control"
              {...register("jobId", { required: true })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label  fw-bold">
              Role<span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              {...register("role", { required: true })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label  fw-bold">
              Job Code<span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              {...register("job_Id", { required: true })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label  fw-bold">
              Experience (years)<span className="text-danger">*</span>
            </label>
            <input className="form-control" {...register("experience")} />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">
              Job Type<span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              {...register("jobType", { required: true })}
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.jobType && (
              <div className="text-danger">Job Type is required</div>
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label  fw-bold">
              Location<span className="text-danger">*</span>
            </label>
            <input className="form-control" {...register("jobLocation")} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label  fw-bold">
              Salary<span className="text-danger">*</span>
            </label>
            <input className="form-control" {...register("salary")} />
          </div>
          <div className="col-md-6">
            <label className="form-label  fw-bold">
              No. of Openings<span className="text-danger">*</span>
            </label>
            <input className="form-control" {...register("noOfOpenings")} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label  fw-bold">
            Responsibilities<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows={3}
            {...register("responsibilities")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label  fw-bold">
            Educational Requirements<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows={3}
            {...register("educationalRequirements")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label  fw-bold">
            Technologies & Tools<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows={3}
            {...register("technologiesTools")}
          />
        </div>

        <div className="d-flex gap-2 mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>
      {result && (
        <div
          className="alert alert-success mt-4"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <h5>Generated JD:</h5>
          {result}
        </div>
      )}
    </div>
  );
}
