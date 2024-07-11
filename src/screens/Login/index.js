import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../auth/authService";
import Alert from "../../components/Alert";
import LoginForm from "../../components/Form/LoginForm";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "" });
  const navigate = useNavigate();
  const backgroundImageUrl = process.env.REACT_APP_BACKGROUND_IMAGE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await authService.login(formState.email, formState.password);
    if (user) {
      navigate("/");
    } else {
      setAlert({
        show: true,
        message: "Falha no login, tente novamente.",
        variant: "danger",
      });
    }
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      className="row vh-100 login-screen"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="col-6 justify-content-center bg-light h-100 d-flex align-items-center ">
        <LoginForm
          alert={alert}
          handleChange={handleChange}
          formState={formState}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
