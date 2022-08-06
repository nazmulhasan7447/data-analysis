import React from "react";
import "../../assets/css/nav-bar/index.css";
import "../../assets/css/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light nav-main">
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ color: "white" }}>
            Logo
          </Link>
          <div className="navigationBarLinks">
            <ul>
              <li>
                <Link to="/pricing-table">Pricing</Link>
              </li>
              <li
                data-bs-toggle="modal"
                data-bs-target="#contactUsForm"
                data-bs-whatever="@getbootstrap"
              >
                <a>Contact us</a>
              </li>
              <li className="nav-sign-in">
                <Link to="/register">
                  <span>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                  </span>
                  <span className="text">Sign In</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavigationBar;
