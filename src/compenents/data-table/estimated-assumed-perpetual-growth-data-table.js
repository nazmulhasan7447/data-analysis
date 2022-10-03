import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "../../assets/css/data-table/dataTable.css";
import preparePerpetualGrowthHistories from "./helpers/preparePerpetualGrowthHistory";
import preparePerpetualGrowthHistoriesToDownload from "./helpers/preparePerpetualGrowthRateDataForDownload";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    headerClassName: "table-header-bg",
  },
  {
    field: "date",
    headerName: "Date",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "symbol",
    headerName: "Symbol",
    width: 80,
    headerClassName: "table-header-bg",
  },
  {
    field: "symbol_name",
    headerName: "Symbol Name",
    width: 180,
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
    width: 150,
    headerClassName: "table-header-bg",
  },
  {
    field: "perpetual_growth_rate",
    headerName: "Perpetual Growth Rate",
    width: 170,
    headerClassName: "table-header-bg",
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 130,
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
    width: 100,
    headerClassName: "table-header-bg",
  },
  {
    field: "ke",
    headerName: "KE",
    width: 100,
    headerClassName: "table-header-bg",
  },
  {
    field: "kd",
    headerName: "KD",
    width: 100,
    headerClassName: "table-header-bg",
  },
  {
    field: "wacc",
    headerName: "WACC",
    width: 100,
    headerClassName: "table-header-bg",
  },
  {
    field: "beta",
    headerName: "Beta",
    width: 130,
    headerClassName: "table-header-bg",
  },
  {
    field: "de_ratio",
    headerName: "DE Ratio",
    width: 130,
    headerClassName: "table-header-bg",
  },
  // {
  //   field: "user_id",
  //   headerName: "User ID",
  //   width: 130,
  //   headerClassName: "table-header-bg",
  // },
  // {
  //   field: "group",
  //   headerName: "Group",
  //   width: 130,
  //   headerClassName: "table-header-bg",
  // },
];

export default function EstimatedAssumedPerpetualGrowthDB({
  perpetualGrowthHistory,
}) {
  const rows = preparePerpetualGrowthHistories(perpetualGrowthHistory);

  const dataToDownload = preparePerpetualGrowthHistoriesToDownload(
    perpetualGrowthHistory
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
                data={dataToDownload}
                filename={`estimate_perpetual_growth_${timeNow}.csv`}
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
            <div style={{ height: 700, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} pageSize={15} />
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
