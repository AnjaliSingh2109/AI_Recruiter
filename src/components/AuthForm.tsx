import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaBuilding,
  FaIdBadge,
  FaRobot,
} from "react-icons/fa";
import api from "../config";
import axios from "axios";

type FormData = {
  fullName?: string;
  phone?: string;
  email: string;
  password: string;
  number?: string;
  companyName?: string;
  companyId?: string;
};

const AuthForm = () => {
  const [activeTab, setActiveTab] = React.useState("login");
  const [loginType, setLoginType] = React.useState<"user" | "company">("user");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (form: FormData) => {
    try {
      let endpoint = "";
      let payload = {};

      if (activeTab === "login") {
        endpoint =
          loginType === "company" ? "/auth/company/login" : "/auth/user/login";
        payload = {
          email: form.email,
          password: form.password,
        };
      } else if (activeTab === "user") {
        endpoint = "/auth/user/signup";
        payload = {
          fullName: form.fullName,
          number: form.number,
          email: form.email,
          password: form.password,
        };
      } else if (activeTab === "company") {
        endpoint = "/auth/company/signup";
        payload = {
          companyName: form.companyName,
          companyId: form.companyId,
          number: form.number,
          email: form.email,
          password: form.password,
        };
      }

      const res = await api.post(endpoint, payload, {
        withCredentials: true,
      });

      if (activeTab === "login") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("role", res.data.role);
        toast.success("Login successful!");
        window.location.href = "/";
      } else {
        toast.success("Registration successful.");
        reset();
        setActiveTab("login");
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Try again.";
console.log(error);

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="container d-flex flex-column min-vh-100 w-100 p-4 rounded">
      <ToastContainer position="top-right" />
      <div className="d-flex flex-row align-items-center">
        <FaRobot size={30} />
        <h3 className="text-start ms-3">AI Recruiter</h3>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <div
          className="card shadow-lg p-4 auth-card animate__animated animate__fadeIn"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <ul className="nav nav-tabs mb-3">
            {["login", "user", "company"].map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "login"
                    ? "Login"
                    : tab === "user"
                    ? "User Signup"
                    : "Company Signup"}
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit(onSubmit)}>
            {activeTab === "login" && (
              <div className="mb-3">
                <label>Login as</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="loginType"
                      id="userRadio"
                      value="user"
                      checked={loginType === "user"}
                      onChange={() => setLoginType("user")}
                    />
                    <label className="form-check-label" htmlFor="userRadio">
                      User
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="loginType"
                      id="companyRadio"
                      value="company"
                      checked={loginType === "company"}
                      onChange={() => setLoginType("company")}
                    />
                    <label className="form-check-label" htmlFor="companyRadio">
                      Company
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "user" && (
              <>
                <div className="mb-3">
                  <label>Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      className="form-control"
                      {...register("fullName", {
                        required: "Full name required",
                      })}
                      placeholder="e.g. Anjali Kumari"
                    />
                  </div>
                  {errors.fullName && (
                    <small className="text-danger">
                      {errors.fullName.message}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPhone />
                    </span>
                    <input
                      className="form-control"
                      {...register("number")}
                      placeholder="e.g. +91 9876543210"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "company" && (
              <>
                <div className="mb-3">
                  <label>Company Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaBuilding />
                    </span>
                    <input
                      className="form-control"
                      {...register("companyName", {
                        required: "Company name required",
                      })}
                      placeholder="e.g. OpenAI Technologies"
                    />
                  </div>
                  {errors.companyName && (
                    <small className="text-danger">
                      {errors.companyName.message}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label>Company ID</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaIdBadge />
                    </span>
                    <input
                      className="form-control"
                      {...register("companyId", {
                        required: "Company ID required",
                      })}
                      placeholder="e.g. OP-20392"
                    />
                  </div>
                  {errors.companyId && (
                    <small className="text-danger">
                      {errors.companyId.message}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPhone />
                    </span>
                    <input
                      className="form-control"
                      {...register("number")}
                      placeholder="e.g. +91 9876543210"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-3">
              <label>Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <input
                  className="form-control"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="e.g. example@gmail.com"
                />
              </div>
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  className="form-control"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>

            <button className="btn btn-primary w-100 mt-2" type="submit">
              {activeTab === "login" ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
