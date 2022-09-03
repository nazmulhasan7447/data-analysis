import React, {useState} from "react";
import { Menu } from "react-feather";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAuth } from "../auth/Authentication";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logout from "../login-registration/Logout";
import '../../assets/css/nav-bar/navSmallDevice.css';



const NavLinkSmallDevices = ({userID}) => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isUserLoggedIn = useAuth().isAuthenticated;

  return (
    <>
      <Button className="btn-small-device" onClick={handleShow}>
        <Menu />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Logo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="navigationBarLinks nav-link-small-dev">
            <ul>
              {isUserLoggedIn ? (
                <>
                  <li>
                    <Link to="/estimated/intrinsica/perpetual/growth">Est. Perpetual Growth</Link>
                  </li>
                  <li>
                    <Link to="/estimated/intrinsica/value">Est. Intrinsic Value</Link>
                  </li>
                </>
              ) : (
                ""
              )}

              <li
                data-bs-toggle="modal"
                data-bs-target="#contactUsForm"
                data-bs-whatever="@getbootstrap"
              >
                <a>Contact us</a>
              </li>
              {isUserLoggedIn ? (
                <li className="nav-item dropdown my-account-dropdown">
                  {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Account
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item">
                        <Link to={`/my-profile/${userID}`}>My Profile</Link>
                      </a>
                    </li>
                    <li>
                      <Logout />
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-sign-in">
                  <Link to="/register">
                    <span>
                      <FontAwesomeIcon icon={faUser} className="icon" />
                    </span>
                    <span className="text">Sign In</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavLinkSmallDevices;
