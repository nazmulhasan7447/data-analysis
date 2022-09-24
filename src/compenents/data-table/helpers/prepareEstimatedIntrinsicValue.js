import { map } from "lodash";

const prepareEstimatedIntrinsicValueHistories = (data) =>
  map(data, (item, index) => {
    const {
      date,
      time,
      symbol,
      symbol_name,
      stage_1_growth,
      stage_2_growth,
      perpetual_growth_rate,
      symbol_currency,
      revenue_ttm,
      nop_ttm,
      roe,
      roc,
      ke,
      kd,
      de_ratio,
      wacc,
      beta,
      market_cap,
      ev,
      intrinsic_value,
    } = item;

    const preparedItem = {
      id: index + 1,
      date: date,
      time: time,
      symbol: symbol,
      symbool_name: symbol_name,
      stage_1_growth: stage_1_growth + "%",
      stage_2_growth: stage_2_growth + "%",
      perpetual_growth: perpetual_growth_rate + "%",
      currency: symbol_currency,
      revenue_ttm: "$" + parseFloat(revenue_ttm).toLocaleString(),
      nop_ttm: "$" + nop_ttm.toLocaleString(),
      roe: roe + "%",
      roc: roc + "%",
      ke: ke + "%",
      kd: kd + "%",
      d_e: de_ratio + "%",
      wacc: wacc + "%",
      beta: beta,
      market_cap: "$" + market_cap.toLocaleString(),
      ev: "$" + ev,
      intrinsic_value: "$" + intrinsic_value.toLocaleString(),
    };
    return preparedItem;
  });

export default prepareEstimatedIntrinsicValueHistories;
