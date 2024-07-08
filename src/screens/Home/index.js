import React, { useEffect, useState, useRef } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Company/Delete";
import Alert from "../../components/Alert";
import "./style.css";
import CompanyOffcanvas from "../../components/Offcanvas/Company";
import { Offcanvas } from "bootstrap"; // Import specific Bootstrap JS component

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [deletingCompany, setDeletingCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
      <div className="container p-5 border rounded mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Lista de empresas</h2>
          <Link to="/create" className="btn btn-primary mb-3">
            Cadastrar Empresa
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
            <span className="sr-only ms-2">Aguarde...</span>
          </>
        ) : (
          <table className="table table-striped">
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
                    <ul className="mb-0">
                      {company.contacts &&
                        company.contacts.map((contact) => (
                          <li key={contact.id}>{contact.name}</li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <Link
                      to={`/edit/${company.id}`}
                      className="btn btn-warning ms-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => openModal(company)}
                      className="btn btn-danger ms-2"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <CompanyOffcanvas company={currentCompany} />
        <Modal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          confirmAction={handleDelete}
          company={deletingCompany}
        />
      </div>
    </>
  );
};

export default Home;
