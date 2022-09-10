import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/homePgForLoggedInUsers/home.css";
import * as Icon from "react-feather";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authentication";
import authFetch from "../../axios/Interceptors";
import PreLoader from "../pre-loader/PreLoader";
import { parseJwt } from "../parser/Parser";
import SevenDayFreeTrialConfirmationModal from "./FreeTrailConfirmationModal";

const HomePgForLoggedInUser = () => {
  const navigate = useNavigate();
  const [packageList, setPackageList] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const [currentUserDetail, setCurrentUserDetail] = useState({
    is_paid_member: false,
  });

  const isUserLoggedIn = useAuth().isAuthenticated;

  const redirectToPaymentPage = (id) => {
    if (isUserLoggedIn) {
      navigate(`/payment/${id}/`, { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    async function fetchPackageList() {
      const currentUserAccessToken = localStorage.getItem("access_token")
        ? localStorage.getItem("access_token")
        : "";
      const currentUserID = parseJwt(currentUserAccessToken)?.user_id;

      // getting package list
      await authFetch
        .get("/api/package-list/")
        .then((response) => {
          const proPackage = response.data?.filter(
            (item) => item.package_type === "pro_paid"
          );
          setPackageList(proPackage ? proPackage : []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      // getting current user details
      if (currentUserID) {
        await authFetch
          .get(`/api/user-details/${currentUserID}/`)
          .then((response) => {
            setCurrentUserDetail(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    fetchPackageList();
  }, []);

  return (
    <Container>
      <Row className={`home-page-loggedin-user ${currentUserDetail.is_paid_member && "position-center "}`}>
        <Col md={2}></Col>
        <Col md={3}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">
                <Link to="/estimated/intrinsica/perpetual/growth">
                  Estimate Perpetual Growth Rate of a Stock
                </Link>
              </h5>
            </div>
          </div>
        </Col>
        <Col md={2} className="mt-3"></Col>
        <Col md={3}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">
                <Link to="/estimated/intrinsica/value">
                  Estimate Intrinsic Value of a Stock
                </Link>
              </h5>
            </div>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>

      {!currentUserDetail?.is_paid_member && (
        loading ? <PreLoader />
        : (
          <Row className="pro-package pricing-list">
          {packageList &&
            packageList.map((pack, index) => {
              return (
                <>
                  <Col md={4}></Col>
                  <Col md={4}>
                    <div className="pricing-card pricing-card-not-active">
                      <div className="card" style={{ width: "100%" }}>
                        <div className="prcing-card-header">
                          <div className="pricing-title">
                            <h4 className="card-title text-center">
                              {pack.name}
                            </h4>
                            <p className="text-center">{pack.sub_title}</p>
                          </div>
                          <div className="divider"></div>
                          <div className="pricing-amount">
                            <h5 className="text-center">
                              ${pack.price}/<small>{pack.willBeCharged}</small>
                            </h5>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="card-items">
                            {pack.items &&
                              pack.items.map((item, index) => {
                                return (
                                  <div className="item">
                                    <h6 className="text-center">
                                      <Icon.CheckSquare className="package-check" />
                                      <span>{item.item_description}</span>
                                    </h6>
                                  </div>
                                );
                              })}
                          </div>
                        </div>

                        <div className="card-body text-center">
                          <button
                            className="btn-primary pro-package-buy-btn"
                            onClick={() =>
                              redirectToPaymentPage(pack.package_id)
                            }
                          >
                            Upgrade now
                          </button>
                          {
                            currentUserDetail?.is_free_trial_used || (
                              <button 
                            className="btn-primary mt-3 pro-package-buy-btn seven_day_free_trial_confirmationModal"
                            data-bs-toggle="modal"
                            data-bs-target="#seven_day_free_trial_confirmationModal"
                          >
                            7-DAY FREE TRIAL
                          </button>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}></Col>
                </>
              );
            })}
        </Row>
        )
      )
    }
    <SevenDayFreeTrialConfirmationModal currentUserDetails={currentUserDetail} />
    </Container>
  );
};

export default HomePgForLoggedInUser;
