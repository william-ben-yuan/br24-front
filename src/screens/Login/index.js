import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../auth/authService';
import Alert from '../../components/Alert';

const Login = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const [alert, setAlert] = useState({ show: false, message: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await authService.login(formState.email, formState.password);
        if (user) {
            navigate('/');
        } else {
            setAlert({ show: true, message: 'Falha no login, tente novamente.', variant: 'danger' });
        }
    };

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-4 mx-auto text-center border rounded p-5">
                <h2 className="mb-4">Login 1</h2>
                <Alert show={alert.show} message={alert.message} variant={alert.variant} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" name="email" className="form-control" placeholder="Email" value={formState.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" className="form-control" placeholder="Senha" value={formState.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;