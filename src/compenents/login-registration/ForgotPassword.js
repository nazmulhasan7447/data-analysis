import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/login-register/login.css";
import {Link, useNavigate} from 'react-router-dom';
import { User } from "react-feather";
import { useSnackbar } from 'notistack';
import authFetch from "../../axios/Interceptors";
import { Navigate } from "react-router-dom";
import { parseJwt } from "../parser/Parser";

const ForgotPassword = () => {

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const initialLoginCredentials = Object.freeze({email_or_username:''});
  const [userEmailOrUsername, setUserEmailOrUsername] = React.useState(initialLoginCredentials);

  const onChangeHandler = (e) => {
    setUserEmailOrUsername({...userEmailOrUsername, [e.target.name]: e.target.value});
  }

  const passwordChangeRequestHandler = (e) =>{
    e.preventDefault();
    authFetch
      .post(`/api/user/forgot/password/`, userEmailOrUsername)
      .then((response) =>{
        const msg = response.data;
        enqueueSnackbar(msg, {variant: 'success'})
        navigate('/login');
      })
      .catch((error) =>{
        const msg = "Wrong credentials! Try again please!"
        enqueueSnackbar(msg, {variant: 'warning'})
      })
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <div className="login-register">
              <div className="login-register-form">
              <div>
                  <h4 className="text-center">
                   <User className="user-icon" />
                  </h4>
                </div>
                <h4 className="text-center">Please provide your username or email to us!</h4>
                <form className="row gy-2" onSubmit={(e) => passwordChangeRequestHandler(e)}>
                  <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Email or Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      name="email_or_username"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn submit-button mt-3">
                      Send
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

export default ForgotPassword;
