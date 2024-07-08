import React from "react";
import InputField from "../../Input/InputField";

const ContactForm = ({ formState, setFormState, contactIndex }) => {
  console.log(formState.contacts[contactIndex]);
  const updateContact = (event) => {
    const updatedContacts = [...formState.contacts];
    updatedContacts[contactIndex] = {
      ...updatedContacts[contactIndex],
      [event.target.name]: event.target.value,
    };
    // Atualiza o estado do formulário com o novo array de contatos
    setFormState({ ...formState, contacts: updatedContacts });
  };

  return (
    <div className="p-3 border rounded">
      <h4>Contato {contactIndex + 1}</h4>
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
    </div>
  );
};

export default ContactForm;
