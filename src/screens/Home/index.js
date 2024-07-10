import React, { useEffect, useState, useRef } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import "./style.css";
import CompanyOffcanvas from "../../components/Offcanvas/Company";
import { Offcanvas } from "bootstrap"; // Import specific Bootstrap JS component
import DeleteCompanyModal from "../../components/Modal/Company/Delete";
import Breadcrumb from "../../components/Breadcrumb";

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [deletingCompany, setDeletingCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const offcanvasRef = useRef(null);
  const [currentCompany, setCurrentCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const response = await api.get("/companies");
      setCompanies(response.data);
      setLoading(false);
    };

    fetchCompanies();
    const offcanvasElement = document.getElementById("companyOffcanvas");
    offcanvasRef.value = new Offcanvas(offcanvasElement);
  }, []);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      await api.delete(`/companies/${id}`);
      setCompanies(companies.filter((company) => company.id !== id));
      setAlert({
        show: true,
        message: "Empresa excluída com sucesso!",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Erro ao excluir empresa, tente novamente.",
        variant: "danger",
      });
    }
    setDeleteLoading(false);
    setShowModal(false);
  };

  const openModal = (company) => {
    setDeletingCompany(company);
    setShowModal(true);
  };

  const handleOffcanvas = (company) => {
    setCurrentCompany(company);
    offcanvasRef.value.show();
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Breadcrumb items={[{ label: "Home" }]} />
        <h2>Lista de empresas</h2>
        <div className="p-5 border rounded bg-white shadow-sm">
          <div className="d-flex justify-content-end align-items-center">
            <Link to="/create" className="btn btn-light mb-3 shadow-sm">
              <i className="fas fa-plus me-2"></i>Cadastrar Empresa
            </Link>
          </div>
          <Alert
            show={alert.show}
            message={alert.message}
            variant={alert.variant}
          />
          {loading ? (
            <>
              <div className="spinner-border spinner-border-sm" role="status" />
              <span className="sr-only ms-2">Carregando lista...</span>
            </>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Contatos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.id}</td>
                    <td>
                      <a href="#" onClick={() => handleOffcanvas(company)}>
                        {company.title}
                      </a>
                    </td>
                    <td>
                      <ul className="mb-0 p-0">
                        {company.contacts &&
                          company.contacts.map((contact) => (
                            <li key={contact.id}>
                              {contact.name} {contact.last_name}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td>
                      <Link to={`/edit/${company.id}`}>
                        <i className="far fa-edit text-warning"></i>
                      </Link>
                      <i
                        className="far fa-trash-alt text-danger ms-2"
                        onClick={() => openModal(company)}
                        role="button"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <CompanyOffcanvas currentCompany={currentCompany} />
          <DeleteCompanyModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            confirmAction={handleDelete}
            company={deletingCompany}
            loading={deleteLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
