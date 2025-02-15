import React from "react";

function FormContainer({ children }) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6">{children}</div>
      </div>
    </div>
  );
}

export default FormContainer;