import React from "react";
import { User } from "react-feather";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/user-profile/user-profile.css";
import ChangePasswordModal from "./ModalChangePassword";
import ConfirmationModal from "./ModalConfirmation";


const UserProfile = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <nav aria-label="breadcrumb" className="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User profile
                </li>
              </ol>
            </nav>
          </Col>
        </Row>

        <Row>
          <Col md={3}></Col>
          <Col md={6} className="user-profile-section">
            <div className="user-profile-pic text-center">
              <div className="profile-img">
                <img src={require("../../assets/images/user-profile.jpg")} />
                <h6>John Doe</h6>
              </div>

              <div className="mt-4">
                <button type="button" className="btn user-profile-btn unsubscribe-btn" data-bs-toggle="modal" data-bs-target="#confirmationModal">
                  Unsubscribe
                </button>
                <button type="button" className="btn user-profile-btn upgrade-btn">
                  Upgrade
                </button>
              </div>
            </div>

            <div className="user-profile-details">
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  First Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
                    value="First Name"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Last Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
                    value="Last Name"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  E-mail
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputPassword"
                    value="email@gmail.com"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
                    value="Username"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label for="change-password-btn" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="button"
                    className="form-control"
                    id="change-password-btn"
                    value="Change Password"
                    data-bs-toggle="modal" data-bs-target="#changePasswordModal" data-bs-whatever="@getbootstrap"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label for="membership-status" className="col-sm-2 col-form-label">
                  Current Membership
                </label>
                <div className="col-sm-10">
                  <input
                    type="button"
                    className="form-control"
                    id="membership-status"
                    value="Pro Member"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}></Col>
        </Row>

        <div className="margin-bottom"></div>

        <ConfirmationModal />
        <ChangePasswordModal />
      </Container>
    </>
  );
};

export default UserProfile;
