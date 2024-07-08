import React from "react";

const DeleteCompanyModal = ({
  showModal,
  closeModal,
  confirmAction,
  company,
  loading,
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmação de Exclusão</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>Tem certeza de que deseja excluir {company?.name}?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => confirmAction(company?.id)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCompanyModal;
