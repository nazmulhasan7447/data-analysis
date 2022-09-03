import React, {useHistory} from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/login-register/login-registration.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import authFetch from "../../axios/Interceptors";
import { useSnackbar } from 'notistack';
import { User } from "react-feather";


const Registration = () => {

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const initialUserInfo = Object.freeze({fname: '', lname: '', email: '', username: '', password: '', is_agreed_with_termsConsition: false});
  const [userInfo, setUserInfo] = React.useState(initialUserInfo);


  const onChangeHandler = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }


  const registerSubmitHandler = (e) =>{
    e.preventDefault();

    if (userInfo.is_agreed_with_termsConsition === 'on') {
      setUserInfo({...userInfo, is_agreed_with_termsConsition: true})
    }

    try {
      authFetch
      .post(`/api/create-account/`, userInfo)
      .then((response)=>{
        const msg = "Your account has been created successfully!"
        enqueueSnackbar(msg, {variant: 'success'})
        navigate('/login', {replace: true})
      })
      .catch((error) =>{
        const msg = "User already exists with these username or gmail! Try to use different one!"
        enqueueSnackbar(msg, {variant: 'warning'})
      }) 
    } catch(error) {
      
    }
  }

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
                <h4 className="text-center">Create Account</h4>
                <form className="row gy-2">
                  <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      name="fname"
                      onChange={onChangeHandler}
                      required={true}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      name="lname"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="email"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      name="username"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      name="password"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                        name="is_agreed_with_termsConsition"
                        onChange={onChangeHandler}
                        required={true}
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
