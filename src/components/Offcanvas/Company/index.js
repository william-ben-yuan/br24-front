const CompanyOffcanvas = ({ company }) => {
  return (
    <div
      className="offcanvas offcanvas-end w-50"
      tabindex="-1"
      id="companyOffcanvas"
      aria-labelledby="companyOffcanvasLabel"
    >
      {company ? (
        <>
          <div className="offcanvas-header">
            <h2 className="offcanvas-title" id="companyOffcanvasLabel">
              {company.title}
            </h2>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CompanyOffcanvas;
