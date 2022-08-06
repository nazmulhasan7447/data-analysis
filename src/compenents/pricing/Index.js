import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/pricing-table/pricing-table.css";
import * as Icon from "react-feather";

const Pricings = () => {
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
          <Row className="pricing-list">
            <Col md={4}>
              <div className="pricing-card pricing-card-not-active">
                <div className="card" style={{ width: "100%" }}>
                  <div className="prcing-card-header">
                    <div className="pricing-title">
                      <h4 className="card-title text-center">Plan title</h4>
                      <p className="text-center">Lorem ipsum doller summet</p>
                    </div>
                    <div className="divider"></div>
                    <div className="pricing-amount">
                      <h5 className="text-center">
                        $30/<small>Month</small>
                      </h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-items">
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>

                      <div className="item">
                        <h6 className="text-center">
                          {/* <Icon.X className="package-item-cross" /> */}
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>

                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="card-body text-center">
                    <button className="buy-now-btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="pricing-card active-pricing-card">
                <div className="card" style={{ width: "100%" }}>
                  <div className="prcing-card-header">
                    <div className="pricing-title">
                      <h4 className="card-title text-center">Plan title</h4>
                      <p className="text-center">Lorem ipsum doller summet</p>
                    </div>
                    <div className="divider"></div>
                    <div className="pricing-amount">
                      <h5 className="text-center">
                        $30/<small>Month</small>
                      </h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-items">
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>

                      <div className="item">
                        <h6 className="text-center">
                          {/* <Icon.X className="package-item-cross" /> */}
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>

                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="card-body text-center">
                    <button className="buy-now-btn btn-primary active-btn">Buy Now</button>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="pricing-card pricing-card-not-active">
                <div className="card" style={{ width: "100%" }}>
                  <div className="prcing-card-header">
                    <div className="pricing-title">
                      <h4 className="card-title text-center">Plan title</h4>
                      <p className="text-center">Lorem ipsum doller summet</p>
                    </div>
                    <div className="divider"></div>
                    <div className="pricing-amount">
                      <h5 className="text-center">
                        $30/<small>Month</small>
                      </h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-items">
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>

                      <div className="item">
                        <h6 className="text-center">
                          {/* <Icon.X className="package-item-cross" /> */}
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>

                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                      <div className="item">
                        <h6 className="text-center">
                          <Icon.CheckSquare className="package-check" />
                          <span>
                            Lorem Ipsum doller summet up. doller summet
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="card-body text-center">
                    <button className="buy-now-btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Pricings;
