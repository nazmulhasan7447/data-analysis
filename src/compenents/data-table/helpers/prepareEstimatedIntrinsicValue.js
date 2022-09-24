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
    console.log(item);

    const preparedItem = {
      id: index + 1,
      date: date,
      time: time.slice(0, 8),
      symbol: symbol.toUpperCase(),
      symbool_name: symbol_name,
      stage_1_growth: stage_1_growth + "%",
      stage_2_growth: stage_2_growth + "%",
      perpetual_growth: perpetual_growth_rate + "%",
      currency: symbol_currency,
      revenue_ttm: "$" + parseFloat(revenue_ttm).toLocaleString(),
      nop_ttm: "$" + nop_ttm.toLocaleString(),
      roe: parseFloat(roe).toFixed(2) + "%",
      roc: parseFloat(roc).toFixed(2) + "%",
      ke: parseFloat(ke).toLocaleString() + "%",
      kd: parseFloat(kd).toLocaleString() + "%",
      d_e: de_ratio + "%",
      wacc: wacc + "%",
      beta: beta,
      market_cap: "$" + parseFloat(market_cap).toLocaleString(),
      ev: "$" + parseFloat(ev).toLocaleString(),
      intrinsic_value: "$" + parseFloat(intrinsic_value).toLocaleString(),
    };
    return preparedItem;
  });

export default prepareEstimatedIntrinsicValueHistories;
