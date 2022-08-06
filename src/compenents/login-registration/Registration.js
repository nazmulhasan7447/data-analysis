import React, {useHistory} from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/login-register/login-registration.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';


const Registration = () => {

  const navigate = useNavigate();

  const registerSubmitHandler = (e) =>{
    e.preventDefault();
    navigate('/my-profile', {replace: 'true'})
    // <Redirect to="/user-profile" />
  }
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <div className="login-register">
              <div className="login-register-form">
                <h4 className="text-center">Create Account</h4>
                <form className="row gy-2">
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                    />
                  </div>

                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                    />
                  </div>

                  <div className="col-md-12">
                    <label for="inputPassword4" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                    />
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                      />
                      <label className="form-check-label" for="gridCheck">
                        I have read and agree to <a href="#">Terms of Use</a> as
                        well as <a href="#">Privacy </a>
                        and <a href="#">Cookie policy</a>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <ReCAPTCHA
                      sitekey="6Ld3zUEhAAAAADpDfbzMDEXd27FenX2ulR0R3cYa"
                      className="width-100"
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" onClick={(e)=>registerSubmitHandler(e)} className="btn submit-button mt-5">
                      Register
                    </button>
                  </div>
                </form>
                <p className="pt-2">
                  Already has account?<Link to="/login"> Login</Link> here
                </p>
              </div>
            </div>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Registration;
