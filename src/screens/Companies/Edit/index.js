import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Alert from "../../../components/Alert";
import InputField from "../../../components/Input/InputField";
import CompanyForm from "../../../components/Form/CompanyForm";

const Edit = () => {
  const params = useParams();
  const [company, setCompany] = useState({ name: "" });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      const response = await api.get(`/companies/${params.id}`);
      setCompany(response.data);
      setLoading(false);
    };
    fetchCompany();
  }, [params.id]);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/companies/${params.id}`, company);
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
        <Link to="/"> Voltar</Link>
      </div>
      <div className="container p-5 border rounded mt-2">
        {loading ? (
          <>
            <div className="spinner-border spinner-border-sm" role="status" />
            <span className="sr-only ms-2">Aguarde...</span>
          </>
        ) : (
          <CompanyForm
            initialFormState={company}
            onSubmit={handleEdit}
            buttonLabel="Editar"
            alert={alert}
          />
        )}
      </div>
    </>
  );
};

export default Edit;