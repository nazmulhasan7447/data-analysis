import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/login-register/login.css";
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const loginRequestHandler = (e) =>{
    e.preventDefault()
    navigate('/my-profile', {replace: 'true'});
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <div className="login-register">
              <div className="login-register-form">
                <h4 className="text-center">Login In</h4>
                <form className="row gy-2">
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
                    <button type="submit" onClick={(e) => {loginRequestHandler(e)}} className="btn submit-button mt-3">
                      Login
                    </button>
                  </div>
                </form>
                <p className="pt-2">
                  Don't have account?<Link to="/register"> Register</Link> here
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

export default Login;
