import map from "lodash";

const preparePerpetualGrowthHistories = (data) => {
  console.log(data);
  const preparedData = data.map((item, index) => {
    const {
      date,
      symbol,
      symbol_name,
      symbol_currency,
      revenue_ttm,
      nop_ttm,
      roe,
      roc,
      ke,
      kd,
      ev,
      wacc,
      market_cap,
      perpetual_growth_rate,
      de_ratio,
      beta,
      user,
    } = item;

    const updatedItem = {
      id: index + 1,
      date: date,
      symbol: symbol,
      symbol_name: symbol_name,
      market_cap: symbol_currency === "USD" ? "$" + market_cap : "",
      ev: symbol_currency === "USD" ? "$" + ev : "",
      perpetual_growth_rate: parseFloat(perpetual_growth_rate).toFixed(2) + "%",
      currency: symbol_currency,
      revenue_ttm: "$" + revenue_ttm,
      nop_ttm: "$" + nop_ttm,
      roe: parseFloat(roe).toFixed(2) + "%",
      roc: parseFloat(roc).toFixed(2) + "%",
      ke: ke + "%",
      kd: parseFloat(kd).toFixed(2) + "%",
      wacc: parseFloat(wacc).toFixed(2) + "%",
      beta: beta,
      de_ratio: parseFloat(de_ratio).toFixed(2) + "%",
      user_id: user?.userID,
      group: user?.userID,
    };
    return updatedItem;
  });
  console.log(preparedData);
  return preparedData;
};

export default preparePerpetualGrowthHistories;
