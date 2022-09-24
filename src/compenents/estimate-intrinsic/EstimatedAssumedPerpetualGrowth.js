import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/estimate-intrinsic-value/index.css";
import EstimatedAssumedPerpetualGrowthDB from "../data-table/estimated-assumed-perpetual-growth-data-table";
import authFetch from "../../axios/Interceptors";
import { useSnackbar } from "notistack";
import { parseJwt } from "../parser/Parser";

const EstimatedAssumedPerpetualGrowthRate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showBackDrop, setShowBackdrop] = useState(false);
  const [perpetualGrowthRate, setPerpetualGrowthRate] = useState(0);
  const [costOfEquity, setCostOfEquity] = useState("");
  const [costOfDebt, setCostOfDebt] = useState("");
  const [perpetualGrowthRateHistoryData, setPerpetualGrowthRateHistoryData] =
    useState([]);

  const initialSymbolObj = Object.freeze({ epgSymbol: "" });
  const initialPerpetualGrowthRateInputObj = Object.freeze({
    symbol: "",
    crp: "",
    comRP: "",
    rating: "",
    premium: "",
  });

  const currentUserAccessToken = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "";
  const currentUserID = parseJwt(currentUserAccessToken)?.user_id;

  const [perpetualGrowthRateInputObj, setPerpetualGrowthRateInputObj] =
    useState(initialPerpetualGrowthRateInputObj);

  const [symbol, setSymbol] = useState(initialSymbolObj);
  const [disablePerpetualGrowthForm, setDisablePerpetualGrowthForm] =
    useState(true);

  const getPreviousPerpetualGrowthRateHistory = () => {
    authFetch
      .get("/api/get/perpetual/growth/history/")
      .then((response) => {
        if (response?.data) {
          setPerpetualGrowthRateHistoryData(response?.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSymbolChangeHandler = (e) => {
    setSymbol({ ...initialSymbolObj, [e.target.name]: e.target.value });
    setPerpetualGrowthRateInputObj({
      ...perpetualGrowthRateInputObj,
      symbol: e.target.value,
    });
  };

  const getCostOfEquity = () => {
    if (
      perpetualGrowthRateInputObj?.symbol &&
      perpetualGrowthRateInputObj?.crp &&
      perpetualGrowthRateInputObj?.comRP
    ) {
      setShowBackdrop(true);
      authFetch
        .post("/api/get/perpetualgrowth/cost_of/equity/", {
          symbol: perpetualGrowthRateInputObj?.symbol,
          crp: perpetualGrowthRateInputObj?.crp,
          comRP: perpetualGrowthRateInputObj?.comRP,
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
      perpetualGrowthRateInputObj?.rating &&
      perpetualGrowthRateInputObj?.premium
    ) {
      setShowBackdrop(true);
      authFetch
        .post("/api/get/perpetualgrowth/cost_of/debt/", {
          symbol: perpetualGrowthRateInputObj?.symbol,
          rating: perpetualGrowthRateInputObj?.rating,
          premium: perpetualGrowthRateInputObj?.premium,
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

  const getPerpetualGrowthRate = (e) => {
    e.preventDefault();
    if (
      perpetualGrowthRateInputObj?.symbol &&
      perpetualGrowthRateInputObj?.crp &&
      perpetualGrowthRateInputObj?.comRP &&
      perpetualGrowthRateInputObj?.rating &&
      perpetualGrowthRateInputObj?.premium
    ) {
      setShowBackdrop(true);
      try {
        authFetch
          .post(
            `/api/get/perpetualgrowth/rate/${currentUserID}/`,
            perpetualGrowthRateInputObj
          )
          .then((response) => {
            setShowBackdrop(false);
            setPerpetualGrowthRate(
              response?.data?.perpetual_gowth_rate
                ? response.data.perpetual_gowth_rate
                : 0
            );
            getPreviousPerpetualGrowthRateHistory();
          })
          .catch((error) => {
            console.log(error);
            setShowBackdrop(false);
          });
      } catch {
        const msg = "May some data is missing! Try again!";
        enqueueSnackbar(msg, { variant: "warning" });
      }
    }
  };

  const symbolOnFocusoutHandler = async () => {
    await authFetch
      .post("/api/check/symbool/", symbol)
      .then((response) => {
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

  const onPerpetualGrowthrateInptHandler = (e) => {
    setPerpetualGrowthRateInputObj({
      ...perpetualGrowthRateInputObj,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (perpetualGrowthRateInputObj?.comRP) {
      getCostOfEquity();
    }
  }, [
    perpetualGrowthRateInputObj.crp,
    perpetualGrowthRateInputObj?.comRP,
    symbol?.epgSymbol,
  ]);

  useEffect(() => {
    if (perpetualGrowthRateInputObj?.premium) {
      getCostOfDebt();
    }
  }, [
    perpetualGrowthRateInputObj?.symbol,
    perpetualGrowthRateInputObj.premium,
    perpetualGrowthRateInputObj?.rating,
  ]);

  useEffect(() => {
    getPreviousPerpetualGrowthRateHistory();
  }, []);

  return (
    <React.Fragment>
      {showBackDrop ? <div className="back-drop"></div> : ""}

      <Container>
        <Row>
          <Col className="estimate-intrinsic-value">
            <div className="title mt-5">
              <h2 className="text-center">
                Estimate Assumed Perpetual Growth Rate
              </h2>
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
                  {/* onSubmit={(e)=>symbolSubmitHandler(e)} */}
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
                        onChange={onSymbolChangeHandler}
                        onBlur={() => symbolOnFocusoutHandler()}
                      />
                    </div>
                    <div class="col-auto"></div>
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
                        step="0.01"
                        placeholder="0-50 %"
                        id="inputEmail4"
                        name="crp"
                        onChange={onPerpetualGrowthrateInptHandler}
                        disabled={disablePerpetualGrowthForm}
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
                        step="0.01"
                        id="inputPassword4"
                        placeholder="0-50 %"
                        name="comRP"
                        onChange={onPerpetualGrowthrateInptHandler}
                        disabled={disablePerpetualGrowthForm}
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
                            ? parseFloat(costOfEquity).toFixed(3) + "%"
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
                        onChange={onPerpetualGrowthrateInptHandler}
                        disabled={disablePerpetualGrowthForm}
                      >
                        <option selected>Select Option</option>
                        <option value="AAA">
                          <div className="col-5">AAA</div>
                          <div className="col-2"></div>
                          <div className="col-5 text-right">AAA</div>
                        </option>
                        <option value="AA">AA+, AA, AA-</option>
                        <option value="A">A+, A, A-</option>
                        <option value="BBB">BBB+, BBB, BBB-</option>
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
                        step="0.01"
                        placeholder="0-50 %"
                        id="inputPassword4"
                        name="premium"
                        onChange={onPerpetualGrowthrateInptHandler}
                        disabled={disablePerpetualGrowthForm}
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
                            ? parseFloat(costOfDebt).toFixed(3) + "%"
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

                    <div class="col-6">
                      <button
                        type="submit"
                        class="btn submit-button mt-2"
                        onClick={(e) => getPerpetualGrowthRate(e)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Col>

              <Col md={1}></Col>

              <Col md={4} style={{ position: "relative" }}>
                <div className="result-section">
                  <h3 className="text-center">Perpetual Growth Rate</h3>
                  <h3 className="text-center text-black">
                    {perpetualGrowthRate ? perpetualGrowthRate : 0}%
                  </h3>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row>
          <Col>
            <EstimatedAssumedPerpetualGrowthDB
              perpetualGrowthHistory={perpetualGrowthRateHistoryData}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default EstimatedAssumedPerpetualGrowthRate;
