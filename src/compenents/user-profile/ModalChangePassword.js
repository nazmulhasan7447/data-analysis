import React from "react";

const ChangePasswordModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="changePasswordModal"
        tabindex="-1"
        aria-labelledby="changePasswordModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    Old Password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    New Password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn change-password-btn">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ChangePasswordModal;