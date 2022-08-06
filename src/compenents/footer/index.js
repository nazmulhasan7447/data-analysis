import React from "react";
import "../../assets/css/footer/index.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer">
        <footer className="item-bottom footer">
          <p className="text-center">All rights reserved @2022</p>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Footer;
