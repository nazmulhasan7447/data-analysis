import React, {useState, useRef} from "react";
import { Container, Row, Col } from "react-bootstrap";
import authFetch from "../../axios/Interceptors";
import { useAuth } from "../auth/Authentication";
import { useSnackbar } from 'notistack';

const ContactUsModal = () => {

  const btnClose = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const intitialMsg = Object.freeze({email: '', text: ''});

  const [msg, setMsg] = useState(intitialMsg);

  const msgOnchangeHandler = (e) =>{
    setMsg({...msg, [e.target.name]: e.target.value});
  };

  const closeContactusModal = () =>{
    btnClose.current.click();
  }

  const msgOnClickHandler = (e) =>{

    const sendMessage = async () => {
      await authFetch
        .post('/api/user/messages/', msg)
        .then((response)=>{
          closeContactusModal();
          const msg = "Your enquiry has been sent successfully!"
          enqueueSnackbar(msg, {variant: 'success'})
        })
        .catch((error)=>{
          const msg = "Sorry! We could send your enquiry. Please try again!"
          enqueueSnackbar(msg, {variant: 'warning'})
        })
    };

    sendMessage();
  }

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
                          name="email"
                          value={msg.email}
                          onChange={msgOnchangeHandler}
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
                          name="text"
                          value={msg.text}
                          onChange={msgOnchangeHandler}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn upgrade-btn "
                      data-bs-dismiss="modal"
                      ref={btnClose}
                    >
                      Close
                    </button>
                    <button type="submit" onClick={()=>msgOnClickHandler()} className="btn unsubscribe-btn">
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