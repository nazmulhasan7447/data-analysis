import React, {useRef} from "react";
import authFetch from "../../axios/Interceptors";
import { useSnackbar } from 'notistack';
import { parseJwt } from "../parser/Parser";
import { useAuth } from "../auth/Authentication";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = () => {

  const { enqueueSnackbar } = useSnackbar();
  const useAuthStatus = useAuth();
  const navigate = useNavigate();
  const btnClose = useRef();

  const initialStateInfo = Object.freeze({username: '', password_old: '', password_new: ''});
  const [initialCredentials, setInitialCredentials] = React.useState(initialStateInfo);

  const onchangeHandler = (e) =>{
    if (e.target.name === 'password_new' && e.target.value.length < 8) {
          const msg = "Password must be 8 character long!"
          const msgBearer = document.getElementById('password-validation-msg');
          // enqueueSnackbar(msg, {variant: 'warning'});
          msgBearer.innerHTML = msg;
          msgBearer.style.color = 'red';
    }else {
      document.getElementById('password-validation-msg').innerHTML = '';
    }
    setInitialCredentials({...initialCredentials, [e.target.name]: e.target.value});
  }

  const closeContactusModal = () =>{
    btnClose.current.click();
  }


  const onClickPassChangeHanlder = (e) =>{

    const currentUserAccessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') :  '';
    const currentUserID = parseJwt(currentUserAccessToken)?.user_id;

    const sendPassChangeRequest = async () =>{
      console.log(initialCredentials);
      await authFetch
        .put(`/api/user/change/password/${currentUserID}/`, initialCredentials)
        .then((res)=>{
          closeContactusModal();
          const msg = "Password has been successfully changed!"
          enqueueSnackbar(msg, {variant: 'success'});
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          authFetch.defaults.headers['Authorization'] = null;
          useAuthStatus.logoutStatusChangeHandler();
          navigate('/', {replace: true});
        })
        .catch((error)=>{
          console.log(error);
          try {
            if (error?.response?.data.non_field_errors[0]) {
              const msg = error?.response?.data.non_field_errors[0];
              enqueueSnackbar(msg, {variant: 'warning'});
            }
          } catch {
              const msg = "Password can't be changed. Try again!"
              enqueueSnackbar(msg, {variant: 'warning'});
          }
        })
    }

    if (currentUserID) {
      sendPassChangeRequest();
    }else {
          const msg = "User not found!"
          enqueueSnackbar(msg, {variant: 'warning'})
    }
  }

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
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="username"
                      onChange={onchangeHandler}
                    />
                  </div>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    Old Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="recipient-name"
                    name="password_old"
                    onChange={onchangeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">
                    New Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="recipient-name"
                    name="password_new"
                    onChange={onchangeHandler}
                  />
                  <p id="password-validation-msg"></p>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={btnClose}
              >
                Close
              </button>
              <button type="button" className="btn change-password-btn" onClick={()=> onClickPassChangeHanlder()}>
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