import React from "react";

const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  required,
  options,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <select
      className="form-select"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="">Selecione</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
