import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/pricing-table/pricing-table.css";
import * as Icon from "react-feather";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authentication";
import authFetch from "../../axios/Interceptors";
import PreLoader from "../pre-loader/PreLoader";

const Pricings = () => {
  const navigate = useNavigate();
  const [packageList, setPackageList] = useState([]);
  const [loading, setIsLoading] = useState(true);

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
      await authFetch
      .get("/api/package-list/")
      .then((response) => {
        setPackageList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    fetchPackageList();
  }, []);

  return (
    <>
      <Container>
        <div className="pricing-table">
          <Row>
            <Col>
              <div className="pricing-table-root-title">
                <h2 className="text-center">
                  choose <b>your</b> plan
                </h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {
                loading ? (
                  <PreLoader />
                ) : ''
              }
            </Col>
          </Row>
          <Row className="pricing-list">
            {packageList &&
              packageList.map((pack, index) => {
                if (index === 1) {
                  return (
                    <Col md={4}>
                      <div className="pricing-card active-pricing-card">
                        <div className="card" style={{ width: "100%" }}>
                          <div className="prcing-card-header">
                            <div className="pricing-title">
                              <h4 className="card-title text-center">
                                {pack.name}
                              </h4>
                              <p className="text-center">
                                {pack.sub_title}
                              </p>
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
                                    {
                                      pack.items && (
                                        pack.items.map((item, index)=>{
                                          return (
                                            <div className="item">
                                            <h6 className="text-center">
                                            <Icon.CheckSquare className="package-check" />
                                            <span>{item.item_description}</span>
                                            </h6>
                                          </div>
                                          );
                                        })
                                      )
                                    }
                            </div>
                          </div>

                          <div className="card-body text-center">
                            <button className="buy-now-btn btn-primary active-btn" onClick={()=>redirectToPaymentPage(pack.id)}>
                                    Buy Now
                              {/* <Link to={`payment/${pack.id}`}>Buy Now</Link> */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                }
                return (
                  <Col md={4}>
                    <div className="pricing-card pricing-card-not-active">
                      <div className="card" style={{ width: "100%" }}>
                        <div className="prcing-card-header">
                          <div className="pricing-title">
                            <h4 className="card-title text-center">
                            {pack.name}
                            </h4>
                            <p className="text-center">
                            {pack.sub_title}
                            </p>
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
                          {
                                      pack.items && (
                                        pack.items.map((item, index)=>{
                                          return (
                                            <div className="item">
                                            <h6 className="text-center">
                                            <Icon.CheckSquare className="package-check" />
                                            <span>{item.item_description}</span>
                                            </h6>
                                          </div>
                                          );
                                        })
                                      )
                                    }
                          </div>
                        </div>

                        <div className="card-body text-center">
                          <button
                            className="buy-now-btn btn-primary"
                            onClick={()=>redirectToPaymentPage(pack.id)}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Pricings;
