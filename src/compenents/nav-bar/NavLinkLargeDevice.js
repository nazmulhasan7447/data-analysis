import React from "react";
import { useAuth } from "../auth/Authentication";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logout from "../login-registration/Logout";


const NavLinkLargeDevices = ({userID}) =>{

    const isUserLoggedIn = useAuth().isAuthenticated;

    return (
        <div className="navigationBarLinks">
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
    );
}

export default NavLinkLargeDevices;