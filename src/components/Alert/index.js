import React from "react";

const Alert = ({ show, message, variant }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={`alert alert-${variant}`} role="alert">
      {message.errors ? null : message}
      <ul class="mb-0">
        {message.errors &&
          Object.entries(message.errors).map(([field, errors], index) => (
            <li key={index}>
              {errors.map((error, errorIndex) => (
                <span key={errorIndex}>{`${field}: ${error}`}</span>
              ))}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Alert;
