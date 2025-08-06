import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import api from "../config";
import { FaBriefcase, FaClipboardList, FaEye, FaTrash, FaUserPlus, FaUsers } from "react-icons/fa";

const Jobs = () => {
  type Job = {
    id: number;
    role: string;
    experience: string;
    technologiesTools: string;
    noOfOpenings: string;
  };
  const [jobData, setJobData] = useState<Job[]>([]);

  const getJobs = async () => {
    try {
      const res = await api.get(`/api/job-desc`);
      setJobData(res.data); // assuming res.data is an array
    } catch (err) {
      console.error("Error fetching candidates", err);
    }
  };
  useEffect(() => {
    console.log("Updated Dashboard Data", jobData);
  }, [jobData]);
  useEffect(() => {
    getJobs();
  }, []);

  const handleView = () => {};
 

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = jobData.slice(itemOffset, endOffset);
  console.log("CurrentItems",currentItems);
  
  const pageCount = Math.ceil(jobData.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % jobData.length;
    setItemOffset(newOffset);
  };
  
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
              {jobData.length }
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
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Role</th>
              <th>Experience</th>
              <th>Technologies & Tools</th>
              <th>No. of Openings</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job?.role}</td>
                <td>{job?.experience}</td>
                <td>{job?.technologiesTools}</td>
                <td>{job?.noOfOpenings}</td>
                <td className="text-center">
                  <FaEye
                    onClick={() => handleView()}
                    style={{
                      cursor: "pointer",
                      color: "green",
                      marginRight: "10px",
                    }}
                    title="View Candidate"
                  />
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    title="Delete Candidate"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <ReactPaginate
        breakLabel="..."
        nextLabel="›"
        previousLabel="‹"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
};

export default Jobs;
