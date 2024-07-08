import React from 'react';

function InputField({ label, id, name, value, onChange, type = 'text', required = false }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input type={type} className="form-control" id={id} name={name} value={value} onChange={onChange} required={required} />
    </div>
  );
}

export default InputField;