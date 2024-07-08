import React, { useState } from "react";
import api from "../../../api/api";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import CompanyForm from "../../../components/Form/CompanyForm";
import Breadcrumb from "../../../components/Breadcrumb";

const Add = () => {
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const navigate = useNavigate();

  const handleCreate = async (formFields) => {
    try {
      await api.post("/companies", formFields);
      navigate("/");
    } catch (error) {
      setAlert({
        show: true,
        message: error.response.data,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Breadcrumb
          items={[{ label: "Home", to: "/" }, { label: "Cadastrar" }]}
        />
      </div>
      <div className="container p-5 border rounded mt-2">
        <CompanyForm
          initialFormState={{
            name: "",
            email: "",
            address: "",
            city: "",
            cnpj: "",
            contacts: [
              {
                name: "",
                last_name: "",
                email: "",
                phone: "",
              },
            ],
          }}
          onSubmit={handleCreate}
          buttonLabel="Cadastrar"
          alert={alert}
        />
      </div>
    </>
  );
};

export default Add;
