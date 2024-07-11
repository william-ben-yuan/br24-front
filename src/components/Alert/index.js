import React from "react";

const Alert = ({ show, message, variant }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={`alert alert-${variant}`} role="alert">
      {message.message ? message.message : message}
      <ul className="mb-0">
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
