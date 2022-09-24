import map from "lodash";

const preparePerpetualGrowthHistoriesToDownload = (data) => {
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
      symbol: symbol.toUpperCase(),
      symbol_name: symbol_name,
      market_cap:
        symbol_currency === "USD"
          ? "$" + parseFloat(market_cap).toLocaleString()
          : "",
      ev:
        symbol_currency === "USD" ? "$" + parseFloat(ev).toLocaleString() : "",
      perpetual_growth_rate:
        parseFloat(perpetual_growth_rate).toLocaleString() + "%",
      currency: symbol_currency,
      revenue_ttm: "$" + parseFloat(revenue_ttm).toLocaleString(),
      nop_ttm: "$" + parseFloat(nop_ttm).toLocaleString(),
      roe: parseFloat(roe).toFixed(2) + "%",
      roc: parseFloat(roc).toFixed(2) + "%",
      ke: ke + "%",
      kd: parseFloat(kd).toFixed(2) + "%",
      wacc: parseFloat(wacc).toFixed(2) + "%",
      beta: beta,
      de_ratio: parseFloat(de_ratio).toFixed(2) + "%",
    };
    return updatedItem;
  });
  return preparedData;
};

export default preparePerpetualGrowthHistoriesToDownload;
