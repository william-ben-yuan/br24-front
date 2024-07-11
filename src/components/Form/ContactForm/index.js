import React from "react";
import InputField from "../../Input/InputField";

const ContactForm = ({
  formState,
  setFormState,
  contactIndex,
  formLoading,
}) => {
  const updateContact = (event) => {
    const updatedContacts = [...formState.contacts];
    updatedContacts[contactIndex] = {
      ...updatedContacts[contactIndex],
      [event.target.name]: event.target.value,
    };
    // Atualiza o estado do formulário com o novo array de contatos
    setFormState({ ...formState, contacts: updatedContacts });
  };

  const handleRemoveContact = () => {
    const updatedContacts = formState.contacts.filter(
      (contact, index) => index !== contactIndex
    );
    setFormState({ ...formState, contacts: updatedContacts });
  };
  return (
    <div className="p-3 border bg-white shadow-sm rounded mb-3">
      <h4>Contato {contactIndex + 1}</h4>
      <input
        type="hidden"
        value={formState.contacts[contactIndex].id}
        name="id"
        onChange={updateContact}
      />
      <InputField
        label="Nome"
        id={`name-${contactIndex}`}
        name="name"
        value={formState.contacts[contactIndex].name}
        onChange={updateContact}
        required={true}
      />
      <InputField
        label="Sobrenome"
        id={`last_name-${contactIndex}`}
        name="last_name"
        value={formState.contacts[contactIndex].last_name}
        onChange={updateContact}
        required={true}
      />
      <InputField
        label="Email"
        id={`email-${contactIndex}`}
        name="email"
        value={formState.contacts[contactIndex].email}
        onChange={updateContact}
        required={true}
      />
      <InputField
        label="Telefone"
        id={`phone-${contactIndex}`}
        name="phone"
        value={formState.contacts[contactIndex].phone}
        onChange={updateContact}
        required={true}
      />
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-danger"
          disabled={formLoading || formState.contacts.length === 1}
          onClick={handleRemoveContact}
        >
          <i className="far fa-trash-alt me-2" role="button"></i>
          Remover contato
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
