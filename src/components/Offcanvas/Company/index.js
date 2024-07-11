import { useEffect, useState } from "react";
import api from "../../../api/api";

const CompanyOffcanvas = ({ currentCompany }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      const response = await api.get(`/companies/${currentCompany.id}`);
      setCompany(response.data);
      setLoading(false);
    };

    if (currentCompany) fetchCompany();
  }, [currentCompany]);

  return (
    <div
      className="offcanvas offcanvas-end w-50"
      tabIndex="-1"
      id="companyOffcanvas"
      aria-labelledby="companyOffcanvasLabel"
    >
      {company ? (
        <>
          <div className="offcanvas-header">
            <h2 className="offcanvas-title" id="companyOffcanvasLabel">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                  <span className="sr-only ms-2">Carregando lista...</span>
                </div>
              ) : (
                company.title
              )}
            </h2>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {!loading ? (
              <div className="container">
                <div className="row border-bottom">
                  <div className="col-3 fw-bold">CNPJ:</div>
                  <div className="col-9">{company.cnpj}</div>
                </div>

                <div className="row border-bottom">
                  <div className="col-3 fw-bold">Email:</div>
                  <div className="col-9">{company.email}</div>
                </div>
                <div className="row border-bottom">
                  <div className="col-3 fw-bold">Endereço:</div>
                  <div className="col-9">{company.address}</div>
                </div>
                <div className="row border-bottom">
                  <div className="col-3 fw-bold">Cidade:</div>
                  <div className="col-9">{company.city}</div>
                </div>
                <div className="row border-bottom">
                  <div className="col-3 fw-bold">UF:</div>
                  <div className="col-9">{company.uf}</div>
                </div>
                <div className="mt-5">
                  {company.contacts &&
                    company.contacts.map((contact, index) => (
                      <div key={contact.id}>
                        <h5 className="mt-2 fs-small">Contato {index + 1}</h5>
                        <div className="row border-bottom">
                          <div className="col-3 fw-bold">Nome:</div>
                          <div className="col-9">{contact.name}</div>
                        </div>
                        <div className="row border-bottom">
                          <div className="col-3 fw-bold">Sobrenome:</div>
                          <div className="col-9">{contact.last_name}</div>
                        </div>
                        <div className="row border-bottom">
                          <div className="col-3 fw-bold">Email:</div>
                          <div className="col-9">{contact.email}</div>
                        </div>
                        <div className="row border-bottom">
                          <div className="col-3 fw-bold">Telefone:</div>
                          <div className="col-9">{contact.phone}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CompanyOffcanvas;
