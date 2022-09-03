import React from "react";
import "../../assets/css/pre-loader/preLoader.css";

const PreLoader = () => {
  return (
    <React.Fragment>
      <div className="pre-loader">
        <div className="d-flex justify-content-center pre-loader-main">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PreLoader;
