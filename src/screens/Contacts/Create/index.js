import React, { useState } from 'react';
import api from '../../../api/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Alert from '../../../components/Alert';

const CreateContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        type: 'whatsapp',
        contact: ''
    });
    const [alert, setAlert] = useState({ show: false, message: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post(`/companies/${id}/contacts`, {
                type: formState.type,
                contact: formState.contact
            });
            navigate(`/view/${id}`);
        } catch (error) {
            setAlert({ show: true, message: 'Erro ao adicionar contato, tente novamente.', variant: 'danger' });
        }
    };

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Link to={`/view/${id}`}> Voltar</Link>
            </div>
            <div className="container p-5 border rounded mt-2">
                <h2>Adicionar Contato</h2>
                <Alert show={alert.show} message={alert.message} variant={alert.variant} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Tipo</label>
                        <select id="type" className="form-select" value={formState.type} name="type" onChange={handleChange}>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="email">Email</option>
                            <option value="telefone">Telefone</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="value" className="form-label">Valor</label>
                        <input type="text" id="value" className="form-control" value={formState.contact} name="contact" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Adicionar</button>
                </form>
            </div>
        </>
    );
};

export default CreateContact;