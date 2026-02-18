const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

const INDICES = {
  NIFTY: "^NSEI",
  SENSEX: "^BSESN",
  BANKNIFTY: "^NSEBANK",
};

const WATCHLIST = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "SBIN.NS", "TATAMOTORS.NS", "ITC.NS", "AXISBANK.NS", "LT.NS",
  "BAJFINANCE.NS", "MARUTI.NS", "ASIANPAINT.NS", "HCLTECH.NS", "TITAN.NS"
];

async function getLivePrice(symbol) {
  try {
    const quote = await yahooFinance.quote(symbol.endsWith(".NS") ? symbol : symbol + ".NS");
    return quote.regularMarketPrice;
  } catch (error) {
    console.error(`Yahoo fetch error for ${symbol}:`, error.message);
    return null;
  }
}

async function getIndices() {
  try {
    const results = await Promise.all(
      Object.keys(INDICES).map(async (key) => {
        const quote = await yahooFinance.quote(INDICES[key]);
        return {
          symbol: key,
          price: quote.regularMarketPrice,
          change: quote.regularMarketChange,
          changePercent: quote.regularMarketChangePercent,
        };
      })
    );
    return results;
  } catch (error) {
    console.error("Error fetching indices:", error.message);
    return [];
  }
}

async function getTopMovers() {
  try {
    const quotes = await yahooFinance.quote(WATCHLIST);
    const mapped = quotes.map((q) => ({
      symbol: q.symbol.replace(".NS", ""),
      price: q.regularMarketPrice,
      change: q.regularMarketChange,
      changePercent: q.regularMarketChangePercent,
      name: q.shortName || q.longName,
    }));

    // Sort by percentage change
    mapped.sort((a, b) => b.changePercent - a.changePercent);

    return {
      gainers: mapped.slice(0, 5),
      losers: mapped.slice(-5).reverse(),
    };
  } catch (error) {
    console.error("Error fetching top movers:", error.message);
    return { gainers: [], losers: [] };
  }
}

module.exports = { getLivePrice, getIndices, getTopMovers };
