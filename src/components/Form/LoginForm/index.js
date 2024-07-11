import Alert from "../../Alert";

const LoginForm = ({ alert, handleChange, formState, handleSubmit }) => {
  return (
    <div className="col-6 mx-auto text-center border rounded p-5 bg-white shadow-sm">
      <h2 className="mb-4">Login</h2>
      <Alert
        show={alert.show}
        message={alert.message}
        variant={alert.variant}
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Senha"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-light shadow-sm w-100">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
