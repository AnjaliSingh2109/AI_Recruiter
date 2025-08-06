import  { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import api from "../config";
import JobCountChart from "../components/JobCountChart";
import CandidateCountChart from "../components/CandidateCountChart";
import { FaBriefcase, FaClipboardList, FaUserPlus, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  type Candidate = {
    id: number;
    fullName: string;
    email: string;
  };
  const [dashboardData, setDashboardData] = useState<Candidate[]>([]);

  const getCandidates = async () => {
    try {
      const res = await api.get(`/api/candidates`);
      setDashboardData(res.data); // assuming res.data is an array
    } catch (err) {
      console.error("Error fetching candidates", err);
    }
  };
  useEffect(() => {
    console.log("Updated Dashboard Data", dashboardData);
  }, [dashboardData]);
  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <div className="">
       <Row className="g-4 my-4">
             <Col md={3}>
               <div
                 className="bg-white py-4 px-4 rounded d-flex flex-column justify-content-center shadow"
                 style={{ minHeight: "160px" }}
               >
                 <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                   <FaBriefcase size={28} className="text-dark" />
                   <h5 className="mb-0 fw-semibold">Total Jobs</h5>
                 </div>
                 <h2 className="text-primary fw-lighter mb-0">
                   7
                 </h2>
               </div>
             </Col>
     
             <Col md={3}>
               <div
                 className="bg-white py-4 px-4 rounded d-flex flex-column justify-content-center shadow"
                 style={{ minHeight: "160px" }}
               >
                 <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                   <FaClipboardList size={26} className="text-dark" />
                   <h5 className="mb-0 fw-semibold">Open Positions</h5>
                 </div>
                 <h2 className="text-primary fw-lighter mb-0">
                   {Math.ceil(Math.random() * 100)}
                 </h2>
               </div>
             </Col>
     
             <Col md={3}>
               <div
                 className="bg-white py-4 px-4 rounded d-flex flex-column justify-content-center shadow"
                 style={{ minHeight: "160px" }}
               >
                 <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                   <FaUsers size={26} className="text-dark" />
                   <h5 className="mb-0 fw-semibold">Active Users</h5>
                 </div>
                 <h2 className="text-primary fw-lighter mb-0">
                   {Math.ceil(Math.random() * 10)}
                 </h2>
               </div>
             </Col>
     
             <Col md={3}>
               <div
                 className="bg-white py-4 px-4 rounded d-flex flex-column justify-content-center shadow"
                 style={{ minHeight: "160px" }}
               >
                 <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                   <FaUserPlus size={26} className="text-dark" />
                   <h5 className="mb-0 fw-semibold">New Registrations</h5>
                 </div>
                 <h2 className="text-primary fw-lighter mb-0">
                   {Math.ceil(Math.random() * 10)}
                 </h2>
               </div>
             </Col>
           </Row>

      <Row className="py-5">
        <Col>
          {" "}
          <CandidateCountChart />
        </Col>
        <Col>
          <JobCountChart />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
