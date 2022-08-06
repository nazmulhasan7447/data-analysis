import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/estimate-intrinsic-value/index.css";
import EstimatedAssumedPerpetualGrowthDB from "../data-table/estimated-assumed-perpetual-growth-data-table";

const EstimatedAssumedPerpetualGrowthRate = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col className="estimate-intrinsic-value">
            <div className="title mt-5">
              <h2 className="text-center">Estimate Assumed Perpetual Growth Rate</h2>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 mb-5">
          <Col md={1}></Col>
          <Col md={10} className="estimated-instrinsic-value-form">
            <Row>
            <Col md={7}>
                {/* <div className="title">
                  <h5>Lorem Ipsum doller</h5>
                </div> */}

                <div className="symbool-input">
                  <form>
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label col-form-label-sm"
                      >
                        Symbol
                      </label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        placeholder="Symbol"
                      />
                    </div>
                    <div class="col-auto">
                      
                    </div>
                    <div class="col-md-6">
                    <button type="submit" class="btn submit-button mb-3">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

                <div className="symbool-input">
                  <form class="row g-2">
                    <div class="col-md-6">
                      <label
                        for="inputEmail4"
                        class="col-form-label col-form-label-sm"
                      >
                        Country Risk Premium(%)
                      </label>
                      <input
                        type="number"
                        class="form-control form-control-sm"
                        min={0}
                        max={50}
                        placeholder="0-50 (%)"
                        id="inputEmail4"
                      />
                    </div>
                    <div class="col-md-6">
                      <label
                        for="inputPassword4"
                        class="col-form-label col-form-label-sm"
                      >
                        Company Risk Premium(%)
                      </label>
                      <input
                        type="number"
                        class="form-control form-control-sm"
                        min={0}
                        max={50}
                        id="inputPassword4"
                        placeholder="0-50 (%)"
                      />
                    </div>

                    <div class="col-md-12">
                      <label
                        for="inputPassword4"
                        class="col-form-label col-form-label-sm"
                      >
                        <b>Cost of Equity:</b>
                      </label>
                      <span></span>
                      {/* <input
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                  /> */}
                    </div>

                    <div class="col-md-6">
                      <label
                        for="inputState"
                        class="col-form-label col-form-label-sm"
                      >
                        Rating
                      </label>
                      <select
                        id="inputState"
                        class="form-select form-select-sm"
                      >
                        <option selected>Select Option</option>
                        <option>Option one</option>
                        <option>Option one</option>
                        <option>Option one</option>
                        <option>Option one</option>
                      </select>
                    </div>

                    <div class="col-md-6">
                      <label
                        for="inputPassword4"
                        class="col-form-label col-form-label-sm"
                      >
                        Premium (%)
                      </label>
                      <span></span>
                      <input
                        type="number"
                        class="form-control form-control-sm"
                        min={0}
                        max={50}
                        placeholder="0-50 (%)"
                        id="inputPassword4"
                      />
                    </div>

                    <div class="col-md-12">
                      <label
                        for="inputPassword4"
                        class="col-form-label col-form-label-sm"
                      >
                        <b>Cost of Debt:</b>
                      </label>
                      <span></span>
                      {/* <input
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                  /> */}
                    </div>

                    <div class="col-6">
                      <button type="submit" class="btn submit-button mt-2">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Col>

              <Col md={1}></Col>

              <Col md={4} style={{'position': 'relative'}}>
                <div className="result-section">
                  <h3 className="text-center">Perpetual Growth Rate</h3>
                  <h3 className="text-center text-black">2.34%</h3>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row>
            <Col>
             <EstimatedAssumedPerpetualGrowthDB />
            </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default EstimatedAssumedPerpetualGrowthRate;
