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

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 15 * 1000; // 30 seconds

async function getQuotes(symbols) {
  const now = Date.now();
  const results = {};
  const symbolsToFetch = [];

  symbols.map(s => s.endsWith(".NS") || Object.values(INDICES).includes(s) ? s : s + ".NS").forEach((s) => {
    const cached = cache.get(s);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      results[s] = cached.data;
    } else {
      symbolsToFetch.push(s);
    }
  });

  if (symbolsToFetch.length > 0) {
    try {
      // Yahoo finance quote can handle multiple symbols in one call
      const quotes = await yahooFinance.quote(symbolsToFetch);
      // If only one symbol is requested, yahoo-finance2 might return an object instead of an array
      const quotesArray = Array.isArray(quotes) ? quotes : [quotes];

      quotesArray.forEach((q) => {
        cache.set(q.symbol, {
          timestamp: now,
          data: q,
        });
        results[q.symbol] = q;
      });
    } catch (error) {
      console.error("Error fetching quotes from Yahoo:", error.message);
    }
  }

  return results;
}

async function getLivePrice(symbol) {
  const s = symbol.endsWith(".NS") ? symbol : symbol + ".NS";
  const quotes = await getQuotes([s]);
  return quotes[s] ? quotes[s].regularMarketPrice : null;
}

async function getIndices() {
  const symbols = Object.values(INDICES);
  const quotes = await getQuotes(symbols);

  return Object.keys(INDICES).map((key) => {
    const q = quotes[INDICES[key]];
    return {
      symbol: key,
      price: q?.regularMarketPrice || 0,
      change: q?.regularMarketChange || 0,
      changePercent: q?.regularMarketChangePercent || 0,
    };
  });
}

async function getTopMovers() {
  const quotes = await getQuotes(WATCHLIST);
  const mapped = WATCHLIST.map((s) => {
    const q = quotes[s];
    if (!q) return null;
    return {
      symbol: q.symbol.replace(".NS", ""),
      price: q.regularMarketPrice,
      change: q.regularMarketChange,
      changePercent: q.regularMarketChangePercent,
      name: q.shortName || q.longName,
    };
  }).filter(Boolean);

  // Sort by percentage change
  mapped.sort((a, b) => b.changePercent - a.changePercent);

  return {
    gainers: mapped.slice(0, 5),
    losers: mapped.slice(-5).reverse(),
  };
}

module.exports = { getLivePrice, getIndices, getTopMovers, getQuotes };
