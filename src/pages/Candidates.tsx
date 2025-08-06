import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import api from "../config";
import {
  FaBriefcase,
  FaClipboardList,
  FaEye,
  FaTrash,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

const Candidates = () => {
  type Candidate = {
    id: number;
    fullName: string;
    email: string;
  };
  const [dashboardData, setDashboardData] = useState<Candidate | null>(null);
  const [data, setData] = useState<Candidate[]>([]);
  const [itemOffset, setItemOffset] = useState(0);

  const role = localStorage.getItem("role");
  const getCandidates = async () => {
    try {
      const res = await api.get(`/api/candidates`);
      const candidateList: Candidate[] = res.data;
      if (role === "USER") {
        setData(candidateList);

        const email = localStorage.getItem("email");
        const matchedCandidate = candidateList.find(
          (item) => item.email === email
        );
        setDashboardData(matchedCandidate ?? null);
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.error("Error fetching candidates", err);
    }
  };
  useEffect(() => {
    console.log("Updated Dashboard Data", dashboardData);
  }, [data]);
  useEffect(() => {
    getCandidates();
  }, []);

  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
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
            <h2 className="text-primary fw-lighter mb-0">6</h2>
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
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {role === "USER" ? (
              dashboardData ? (
                <tr key={dashboardData.id}>
                  <td>1</td>
                  <td>{dashboardData.fullName}</td>
                  <td>{dashboardData.email}</td>
                  <td className="text-center">
                    <FaEye
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
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    No candidate available
                  </td>
                </tr>
              )
            ) : data.length > 0 ? (
              currentItems.map((candidate, index) => (
                <tr key={candidate.id}>
                  <td>{itemOffset + index + 1}</td>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.email}</td>
                  <td className="text-center">
                    <FaEye
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No candidates found.
                </td>
              </tr>
            )}
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

export default Candidates;
