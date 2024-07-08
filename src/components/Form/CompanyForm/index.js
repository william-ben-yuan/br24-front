import React, { useState } from "react";
import InputField from "../../Input/InputField";
import SelectField from "../../Input/SelectField";
import Alert from "../../Alert";
import ufs from "../../../data/ufs.js";
import ContactForm from "../ContactForm/index.js";

const CompanyForm = ({ initialFormState, onSubmit, buttonLabel, alert }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onSubmit(formState);
    setLoading(false);
  };

  const handleAddContact = () => {
    setFormState((prevState) => ({
      ...prevState,
      contacts: [
        ...prevState.contacts,
        {
          name: "",
          last_name: "",
          email: "",
          phone: "",
        },
      ],
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 px-5">
            <h2>
              {buttonLabel === "Cadastrar"
                ? "Cadastrar Empresa"
                : "Editar Empresa"}
            </h2>
            <Alert
              show={alert.show}
              message={alert.message}
              variant={alert.variant}
            />
            <div className="mb-3">
              <InputField
                label="Nome"
                id="title"
                name="title"
                value={formState.title}
                onChange={handleChange}
                required={true}
              />
              <InputField
                label="Email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required={true}
              />
              <InputField
                label="Endereço"
                id="address"
                name="address"
                value={formState.address}
                onChange={handleChange}
                required={true}
              />
              <InputField
                label="Cidade"
                id="city"
                name="city"
                value={formState.city}
                onChange={handleChange}
                required={true}
              />
              <SelectField
                label="UF"
                id="uf"
                name="uf"
                options={ufs}
                value={formState.uf}
                onChange={handleChange}
                required={true}
              />
              <InputField
                label="CNPJ"
                id="cnpj"
                name="cnpj"
                value={formState.cnpj}
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>
          <div className="col-md-6">
            <h3>Contatos</h3>
            {formState.contacts &&
              formState.contacts.map((contact, index) => (
                <ContactForm
                  key={index}
                  formState={formState}
                  setFormState={setFormState}
                  contactIndex={index}
                  formLoading={loading}
                />
              ))}
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary mt-3 me-3"
            disabled={loading}
            onClick={handleAddContact}
          >
            Adicionar contato
          </button>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
                <span className="ms-2 sr-only">Salvando...</span>
              </>
            ) : (
              "Salvar Empresa"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default CompanyForm;
