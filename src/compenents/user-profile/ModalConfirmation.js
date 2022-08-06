import React from "react";

const ConfirmationModal = () => {
  return (
    <>
      <div
        class="modal fade"
        id="confirmationModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Change Subscription Status
              </h5>
              <button
                type="button"
                class="btn btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
                <p>Are you sure want to un-subscribe?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn upgrade-btn"
                data-bs-dismiss="modal"
              >
                Not Now
              </button>
              <button type="button" class="btn change-password-btn">
                Yes, I am
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ConfirmationModal;