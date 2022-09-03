import React, { useState, useRef, useEffect } from "react";
import { Camera, User } from "react-feather";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/user-profile/user-profile.css";
import ChangePasswordModal from "./ModalChangePassword";
import ConfirmationModal from "./ModalConfirmation";
import { parseJwt } from "../parser/Parser";
import authFetch, { BASE_URL } from "../../axios/Interceptors";
import { useSnackbar } from "notistack";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../auth/Authentication";
import PreLoader from "../pre-loader/PreLoader";
// import { BASE_URL } from "../../axios/Interceptors";



const UserProfile = () => {

  const { username } = useParams();
  const navigate = useNavigate();
  const [proPackage, setProPackage] = useState({});
  const [loading, setIsLoading] = useState(true);
  const useAuthStatus = useAuth();
  
  const { enqueueSnackbar } = useSnackbar();

  const [userDetailsInfo, setUserDetailsInfo] = React.useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    is_paid_member: false
  });


  const uploadCameraSection = document.getElementById('camera');
  const fileInput = document.getElementById('profile_pic');

  if (uploadCameraSection) {
    uploadCameraSection.onclick = () =>{
      fileInput.click();
    }
  }

  const onProfilePicUpload = (e) => {

    const previewer = document.getElementById('profilePic');
    const uploadedImg = URL.createObjectURL(e.target.files[0]);

    if (uploadedImg) {
      previewer.src = uploadedImg;
    }

  
    setTimeout(()=>{
      const config = {headers: {'Content-Type': 'multipart/form-data'}}
      authFetch
      .post(`/api/upload/profile/image/`, {'user': username, 'img': e.target.files[0]}, config)
      .then((response)=>{
        console.log(response)
        const msg = "Profile pic successfully uploaded!";
        enqueueSnackbar(msg, { variant: "success" });
      })
      .catch((error)=>{
        const msg = "Profile pic can't be uploaded!";
        enqueueSnackbar(msg, { variant: "warning" });
      })
    }, 500);  

  }

  // useEffect(()=>{
    
  // }, [profilePicInfo])
  

  const currentUserAccessToken = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "";
  const currentUserID = parseJwt(currentUserAccessToken)?.user_id;

  React.useEffect(() => {
    if (currentUserID !== username) {
      navigate("/login", { replace: true });
      const msg = "Account not found!";
      enqueueSnackbar(msg, { variant: "warning" });
    }

    if (currentUserID) {
      authFetch
        .get(`api/user-details/${currentUserID}/`)
        .then((response) => {
          setIsLoading(false);
          setUserDetailsInfo(response.data);
        })
        .catch((error) => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          authFetch.defaults.headers["Authorization"] = null;
          useAuthStatus.logoutStatusChangeHandler();
          navigate("/login", { replace: true });
          const msg = "Account not found!";
          enqueueSnackbar(msg, { variant: "warning" });
        });
    }

    const fetchCurrentProPackge = async () =>{
      await authFetch
        .get("/api/package-list/")
        .then((response) => {
          const proPackageList = response.data?.filter(
            (item) => item.package_type === "pro_paid"
          );
          setProPackage(proPackageList[0] ? proPackageList[0] : {});
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchCurrentProPackge();

  }, []);


  const unsubscribe = () =>{
    authFetch
      .post(`/api/unsubscribe/${username}/`, {'username': username, 'unsubscribe': true})
      .then((response)=>{
        enqueueSnackbar(response.data, {variant: 'success'});
        setUserDetailsInfo({...userDetailsInfo, is_paid_member: false});
      })
  }
  

  return (
    <>
      <Container>
        <Row className="upload-profile-pic-row">
          <Col>
            <form encType="multipart/form-data">
            <input type="file" onChange={onProfilePicUpload} id="profile_pic" name="profile_pic" accept="image/*" />
            </form>
          </Col>
        </Row>
        <Row>
          <Col>
            <nav aria-label="breadcrumb" className="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User profile
                </li>
              </ol>
            </nav>
          </Col>
        </Row>

        {loading ? (
          <PreLoader />
        ) : (
          <Row>
            <Col md={3}></Col>
            <Col md={6} className="user-profile-section">
              <div className="user-profile-pic text-center">
                <div className="profile-img text-center">
                  {
                    userDetailsInfo.profile_pic ? (
                      <div className="img">
                        <img src={`${BASE_URL}${userDetailsInfo.profile_pic.img}`} id="profilePic" />
                        <div className="camera" id="camera">
                          <Camera className="camera-icon icon" />
                        </div>
                      </div>
                    ) :
                    (
                      <div className="img">
                        <img src={require("../../assets/images/user-profile.jpg")} id="profilePic" />
                        <div className="camera" id="camera">
                          <Camera className="camera-icon icon" />
                        </div>
                      </div>
                    )
                  }
                  
                  <h6>
                    {userDetailsInfo.fname} {userDetailsInfo.lname}
                  </h6>
                </div>

                <div className="mt-4">
                  {
                    userDetailsInfo.is_paid_member ? (
                      <button
                    type="button"
                    className="btn user-profile-btn unsubscribe-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#confirmationModal"
                  >
                  Unsubscribe
                  </button>
                    ) : (
                      <button
                    type="button"
                    className="btn user-profile-btn upgrade-btn"
                  >
                    <Link to={`/payment/${proPackage.package_id}/`}>Upgrade</Link>
                  </button>
                    )
                  }
                </div>
              </div>

              <div className="user-profile-details">
                <div className="mb-3 row">
                  <label
                    for="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      value={userDetailsInfo.fname}
                      disabled
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    for="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Last Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      value={userDetailsInfo.lname}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    for="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    E-mail
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputPassword"
                      value={userDetailsInfo.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    for="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Username
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      value={userDetailsInfo.username}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    for="change-password-btn"
                    className="col-sm-2 col-form-label"
                  >
                    Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="button"
                      className="form-control"
                      id="change-password-btn"
                      value="Change Password"
                      data-bs-toggle="modal"
                      data-bs-target="#changePasswordModal"
                      data-bs-whatever="@getbootstrap"
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    for="membership-status"
                    className="col-sm-2 col-form-label"
                  >
                    Membership
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="button"
                      className="form-control"
                      id="membership-status"
                      value={userDetailsInfo.is_paid_member ? 'Pro Member' : 'Free Member'}
                      style={{
                        'border': 'none',
                        'background': 'none',
                        'color': 'black',
                        'outline': 'none',
                        'fontWeight': '700',
                        'textAlign': 'left'
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        )}

        <div className="margin-bottom"></div>

        <ConfirmationModal unsubscribe={unsubscribe} />
        <ChangePasswordModal />
      </Container>
    </>
  );
};

export default UserProfile;
