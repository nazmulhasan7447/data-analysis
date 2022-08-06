import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ContactUsModal = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div
              className="modal fade"
              id="contactUsForm"
              tabindex="-1"
              aria-labelledby="contactUsForm"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Send your enquiry
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
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="recipient-name"
                          placeholder="E-mail"
                        />
                      </div>
                      <div className="mb-3">
                        <label for="message-text" className="col-form-label">
                          Message:
                        </label>
                        <textarea
                          className="form-control"
                          id="message-text"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn upgrade-btn "
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn unsubscribe-btn">
                      Send message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUsModal;