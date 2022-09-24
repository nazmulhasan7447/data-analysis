import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "../../assets/css/data-table/dataTable.css";
import prepareEstimatedIntrinsicValueHistories from "./helpers/prepareEstimatedIntrinsicValue";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    headerClassName: "table-header-bg",
  },
  {
    field: "date",
    headerName: "Date",
    width: 180,
    headerClassName: "table-header-bg",
  },
  {
    field: "time",
    headerName: "Time(24H)",
    width: 180,
    headerClassName: "table-header-bg",
  },
  {
    field: "symbol",
    headerName: "Symbol",
    width: 100,
    headerClassName: "table-header-bg",
  },
  {
    field: "symbool_name",
    headerName: "Symbol Name",
    width: 100,
    headerClassName: "table-header-bg",
  },
  {
    field: "stage_1_growth",
    headerName: "Stage 1 Growth",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "stage_2_growth",
    headerName: "Stage 2 Growth",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "perpetual_growth",
    headerName: "Perpetual Growth",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 80,
    headerClassName: "table-header-bg",
  },
  {
    field: "revenue_ttm",
    headerName: "Revenue TTM",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "nop_ttm",
    headerName: "NOP TTM",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "roe",
    headerName: "ROE",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "roc",
    headerName: "ROC",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "ke",
    headerName: "KE",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "kd",
    headerName: "KD",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "d_e",
    headerName: "D/E",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "wacc",
    headerName: "WACC",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "beta",
    headerName: "Beta",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "market_cap",
    headerName: "Market Cap",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "ev",
    headerName: "EV",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "intrinsic_value",
    headerName: "Intrinsic Value",
    width: 130,
    headerClassName: "table-header-bg",
  },
];

export default function EstimatedIntrinsicDB({ estimatedIntrinsicHistories }) {
  const rows = prepareEstimatedIntrinsicValueHistories(
    estimatedIntrinsicHistories
  );
  const dateObj = new Date();
  const timeNow =
    "date-" +
    dateObj.getDate() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getFullYear() +
    " Time-" +
    dateObj.getHours() +
    ":" +
    dateObj.getMinutes() +
    ":" +
    dateObj.getSeconds();

  return (
    <React.Fragment>
      <Container>
        <Row className="mb-5 export-data-section">
          <Col md={12}>
            <div className="export-btn">
              <h4>Past Results</h4>
              <CSVLink
                data={rows}
                filename={`estimate_intrinsic_value_${timeNow}.csv`}
              >
                <button type="button" className="btn mb-3">
                  Export Excel
                </button>
              </CSVLink>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[5]}
                // checkboxSelection
              />
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <br />
      </Container>
    </React.Fragment>
  );
}
