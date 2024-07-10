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
                <div class="d-flex justify-content-center align-items-center">
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
              <>
                <div className="row">
                  <div className="col-3">CNPJ:</div>
                  <div className="col-9">{company.cnpj}</div>
                </div>
                <div className="row">
                  <div className="col-3">Endereço:</div>
                  <div className="col-9">{company.address}</div>
                </div>
                <div className="row">
                  <div className="col-3">Cidade:</div>
                  <div className="col-9">{company.city}</div>
                </div>
                <div className="row">
                  <div className="col-3">UF:</div>
                  <div className="col-9">{company.uf}</div>
                </div>
                <div className="row">
                  <div className="col-3">Contatos:</div>
                  <div className="col-9">
                    <ul className="mb-0 p-0">
                      {company.contacts &&
                        company.contacts.map((contact) => (
                          <li key={contact.id}>
                            {contact.name} {contact.last_name}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CompanyOffcanvas;
