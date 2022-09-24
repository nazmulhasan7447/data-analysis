import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/estimate-intrinsic-value/index.css";
import EstimatedIntrinsicDB from "../data-table/estimated-intrinsic-data-table";
import authFetch from "../../axios/Interceptors";
import { useSnackbar } from "notistack";
import { parseJwt } from "../parser/Parser";

const EstimatedIntrinsicVal = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showBackDrop, setShowBackdrop] = useState(false);
  const [costOfEquity, setCostOfEquity] = useState("");
  const [costOfDebt, setCostOfDebt] = useState("");
  const [estimatedIntrinsicValue, setEstimatedIntrinsicValue] = useState({});
  const [estimatedIntrinsicHistories, setEstimatedIntrinsicHistories] =
    useState([]);

  const [userRequestLimit, setUserRequestLimit] = useState({});

  const initialSymbolObj = Object.freeze({ epgSymbol: "" });
  const initialIntrinsicValueInputObject = Object.freeze({
    symbol: "",
    crp: "",
    comRP: "",
    rating: "",
    premium: "",
    stage_1_years: "",
    stage_1_growth: "",
    stage_2_years: "",
    stage_2_growth: "",
    stage_3_growth: "",
  });

  const [
    estimatedIntrinsicValueInputObject,
    setEstimatedIntrinsicValueInputObj,
  ] = useState(initialIntrinsicValueInputObject);

  const [symbol, setSymbol] = useState(initialSymbolObj);
  const [disablePerpetualGrowthForm, setDisablePerpetualGrowthForm] =
    useState(true);

  const onSymbolChangeHandlerEstimatedIntrinsic = (e) => {
    setSymbol({ ...initialSymbolObj, [e.target.name]: e.target.value });
    setEstimatedIntrinsicValueInputObj({
      ...estimatedIntrinsicValueInputObject,
      symbol: e.target.value,
    });
  };

  const onEstimatedIntrinsicValueChangeHandler = (e) => {
    setEstimatedIntrinsicValueInputObj({
      ...estimatedIntrinsicValueInputObject,
      [e.target.name]: e.target.value,
    });
  };
  const symbolOnFocusoutHandler = async () => {
    await authFetch
      .post("/api/check/symbool/", symbol)
      .then((response) => {
        console.log(response.data);
        setDisablePerpetualGrowthForm(response?.data?.success ? false : true);
        const msg = response?.data?.success || response?.data?.failed;
        enqueueSnackbar(msg, {
          variant: `${response?.data?.success ? "success" : "warning"}`,
        });
      })
      .catch((e) => {
        const msg = "Something went wrong. Try again please!";
        enqueueSnackbar(msg, { variant: "warning" });
      });
  };

  const getCostOfEquity = () => {
    if (
      estimatedIntrinsicValueInputObject?.symbol &&
      estimatedIntrinsicValueInputObject?.crp &&
      estimatedIntrinsicValueInputObject?.comRP
    ) {
      setShowBackdrop(true);
      authFetch
        .post("/api/get/perpetualgrowth/cost_of/equity/", {
          symbol: estimatedIntrinsicValueInputObject?.symbol,
          crp: estimatedIntrinsicValueInputObject?.crp,
          comRP: estimatedIntrinsicValueInputObject?.comRP,
        })
        .then((response) => {
          setCostOfEquity(response?.data);
          setShowBackdrop(false);
        })
        .catch((error) => {
          console.log(error);
          setShowBackdrop(false);
        });
    }
  };

  const getCostOfDebt = () => {
    if (
      estimatedIntrinsicValueInputObject?.rating &&
      estimatedIntrinsicValueInputObject?.premium
    ) {
      setShowBackdrop(true);
      authFetch
        .post("/api/get/perpetualgrowth/cost_of/debt/", {
          symbol: estimatedIntrinsicValueInputObject?.symbol,
          rating: estimatedIntrinsicValueInputObject?.rating,
          premium: estimatedIntrinsicValueInputObject?.premium,
        })
        .then((response) => {
          setCostOfDebt(response?.data);
          setShowBackdrop(false);
        })
        .catch((error) => {
          console.log(error);
          setShowBackdrop(false);
        });
    }
  };

  const currentUserAccessToken = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "";
  const currentUserID = parseJwt(currentUserAccessToken)?.user_id;

  const getEstimatedIntrinsicValueHistories = () => {
    authFetch
      .get("/api/get/estimated/intrinsic/value/history/data/")
      .then((response) => {
        if (response?.data) {
          setEstimatedIntrinsicHistories(response?.data);
        }
      })
      .catch((e) => {
        const msg = "History data not found!";
        enqueueSnackbar(msg, { variant: "warning" });
      });
  };

  const getEstimatedIntrinsicValue = (e) => {
    e.preventDefault();

    if (
      estimatedIntrinsicValueInputObject?.symbol &&
      estimatedIntrinsicValueInputObject?.crp &&
      estimatedIntrinsicValueInputObject?.comRP &&
      estimatedIntrinsicValueInputObject?.rating &&
      estimatedIntrinsicValueInputObject?.premium &&
      estimatedIntrinsicValueInputObject?.stage_1_growth &&
      estimatedIntrinsicValueInputObject?.stage_1_years &&
      estimatedIntrinsicValueInputObject?.stage_2_years &&
      estimatedIntrinsicValueInputObject?.stage_2_growth &&
      estimatedIntrinsicValueInputObject?.stage_3_growth
    ) {
      setShowBackdrop(true);
      try {
        authFetch
          .post(
            `/api/get/estimated/intrinsic/value/${currentUserID}/`,
            estimatedIntrinsicValueInputObject
          )
          .then((response) => {
            setShowBackdrop(false);
            console.log(response.data);
            setEstimatedIntrinsicValue(response?.data);
            getEstimatedIntrinsicValueHistories();
          })
          .catch((e) => {
            setShowBackdrop(false);
            console.log(e);
          });
      } catch (e) {
        setShowBackdrop(false);
        console.log(e);
      }
    }
  };

  const getNumberOfRequestSentByCurrentUser = () => {
    try {
      authFetch
        .get(`/api/get/number/of/reques/by/user/${currentUserID}`)
        .then((response) => {
          console.log(response.data);
          setUserRequestLimit(response?.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (estimatedIntrinsicValueInputObject?.comRP) {
      getCostOfEquity();
    }
  }, [
    estimatedIntrinsicValueInputObject?.crp,
    estimatedIntrinsicValueInputObject?.comRP,
    symbol?.epgSymbol,
  ]);

  useEffect(() => {
    if (estimatedIntrinsicValueInputObject?.premium) {
      getCostOfDebt();
    }
  }, [
    estimatedIntrinsicValueInputObject?.symbol,
    estimatedIntrinsicValueInputObject?.premium,
    estimatedIntrinsicValueInputObject?.rating,
  ]);

  useEffect(() => {
    getEstimatedIntrinsicValueHistories();
    getNumberOfRequestSentByCurrentUser();
  }, []);

  return (
    <React.Fragment>
      {showBackDrop ? <div className="back-drop"></div> : ""}

      <Container>
        <Row>
          <Col className="estimate-intrinsic-value">
            <div className="title mt-5">
              <h2 className="text-center">estimated intrinsic value</h2>
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
                    <div class="col-md-6 mb-3">
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
                        name="epgSymbol"
                        onChange={onSymbolChangeHandlerEstimatedIntrinsic}
                        onBlur={() => symbolOnFocusoutHandler()}
                      />
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
                        placeholder="0-50 %"
                        id="inputEmail4"
                        disabled={disablePerpetualGrowthForm}
                        name="crp"
                        onChange={onEstimatedIntrinsicValueChangeHandler}
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
                        placeholder="0-50 %"
                        disabled={disablePerpetualGrowthForm}
                        name="comRP"
                        onChange={onEstimatedIntrinsicValueChangeHandler}
                      />
                    </div>

                    <div class="col-md-12">
                      <label
                        for="inputPassword4"
                        class="col-form-label col-form-label-sm"
                      >
                        <b>
                          Cost of Equity:{" "}
                          {costOfEquity
                            ? parseFloat(costOfEquity).toFixed(2) + "%"
                            : ""}
                        </b>
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
                        name="rating"
                        disabled={disablePerpetualGrowthForm}
                        onChange={onEstimatedIntrinsicValueChangeHandler}
                      >
                        <option selected>Select Option</option>
                        <option value="AAA">AAA</option>
                        <option value="AA">AA+, AA, AA-</option>
                        <option value="A">A+, A, A-</option>
                        <option value="BBB">BBB+, BBB, BBB- </option>
                        <option value="BB">BB+, BB</option>
                        <option value="B">B</option>
                        <option value="CCC">CCC and below</option>
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
                        placeholder="0-50 %"
                        id="inputPassword4"
                        disabled={disablePerpetualGrowthForm}
                        name="premium"
                        onChange={onEstimatedIntrinsicValueChangeHandler}
                      />
                    </div>

                    <div class="col-md-12">
                      <label
                        for="inputPassword4"
                        class="col-form-label col-form-label-sm"
                      >
                        <b>
                          Cost of Debt:{" "}
                          {costOfDebt
                            ? parseFloat(costOfDebt).toFixed(1) + "%"
                            : ""}
                        </b>
                      </label>
                      <span> </span>
                    </div>

                    <Col md={12}>
                      <Row>
                        <div>
                          <h6>Stage 1</h6>
                        </div>
                      </Row>
                      <Row>
                        <div class="col-md-6">
                          <label
                            for="inputPassword4"
                            class="col-form-label col-form-label-sm"
                          >
                            No of Years
                          </label>
                          <span></span>
                          <input
                            type="number"
                            class="form-control form-control-sm"
                            min={0}
                            max={50}
                            id="inputPassword4"
                            placeholder="0-50"
                            disabled={disablePerpetualGrowthForm}
                            name="stage_1_years"
                            onChange={onEstimatedIntrinsicValueChangeHandler}
                          />
                        </div>

                        <div class="col-md-6">
                          <label
                            for="inputPassword4"
                            class="col-form-label col-form-label-sm"
                          >
                            Growth Rate(%)
                          </label>
                          <span></span>
                          <input
                            type="number"
                            class="form-control form-control-sm"
                            id="inputPassword4"
                            placeholder="-100 to 999 %"
                            disabled={disablePerpetualGrowthForm}
                            name="stage_1_growth"
                            onChange={onEstimatedIntrinsicValueChangeHandler}
                          />
                        </div>
                      </Row>
                    </Col>

                    <Col md={12}>
                      <Row>
                        <div>
                          <h6>Stage 2</h6>
                        </div>
                      </Row>
                      <Row>
                        <div class="col-md-6">
                          <label
                            for="inputPassword4"
                            class="col-form-label col-form-label-sm"
                          >
                            No of Years
                          </label>
                          <span></span>
                          <input
                            type="number"
                            class="form-control form-control-sm"
                            min={0}
                            max={50}
                            id="inputPassword4"
                            placeholder="0-50"
                            disabled={disablePerpetualGrowthForm}
                            name="stage_2_years"
                            onChange={onEstimatedIntrinsicValueChangeHandler}
                          />
                        </div>

                        <div class="col-md-6">
                          <label
                            for="inputPassword4"
                            class="col-form-label col-form-label-sm"
                          >
                            Growth Rate(%)
                          </label>
                          <span></span>
                          <input
                            type="number"
                            class="form-control form-control-sm"
                            id="inputPassword4"
                            placeholder="-100 to 999 %"
                            disabled={disablePerpetualGrowthForm}
                            name="stage_2_growth"
                            onChange={onEstimatedIntrinsicValueChangeHandler}
                          />
                        </div>
                      </Row>
                    </Col>

                    <Col md={12}>
                      <Row>
                        <div>
                          <h6>Stage 3 - Perpetual</h6>
                        </div>
                      </Row>
                      <Row>
                        <div class="col-md-6">
                          <label
                            for="inputPassword4"
                            class="col-form-label col-form-label-sm"
                          >
                            Growth Rate(%)
                          </label>
                          <span></span>
                          <input
                            type="number"
                            class="form-control form-control-sm"
                            id="inputPassword4"
                            placeholder="-100 to 999 %"
                            disabled={disablePerpetualGrowthForm}
                            name="stage_3_growth"
                            onChange={onEstimatedIntrinsicValueChangeHandler}
                          />
                        </div>
                      </Row>
                    </Col>

                    {userRequestLimit?.user_paid_status ? (
                      <div class="col-6">
                        <button
                          type="submit"
                          onClick={(e) => getEstimatedIntrinsicValue(e)}
                          class="btn submit-button mt-2"
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <div class="col-6">
                        <button
                          type="submit"
                          onClick={(e) => getEstimatedIntrinsicValue(e)}
                          class="btn submit-button mt-2"
                          disabled={
                            userRequestLimit?.no_of_request_today > 5
                              ? true
                              : false
                          }
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </Col>

              <Col md={1}></Col>

              <Col md={4} style={{ position: "relative" }}>
                <div className="result-section">
                  <h3 className="text-center">Estimated Intrinsic Value</h3>
                  <h3 className="text-center text-black">
                    ${estimatedIntrinsicValue?.intrinsic_value || 0} mil
                  </h3>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row>
          <Col>
            <EstimatedIntrinsicDB
              estimatedIntrinsicHistories={estimatedIntrinsicHistories}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default EstimatedIntrinsicVal;
