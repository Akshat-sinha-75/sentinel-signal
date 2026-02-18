require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getLivePrice, getIndices, getTopMovers } = require("./services/marketData");
const { createClient } = require("@supabase/supabase-js");


const app = express();
app.use(cors());
app.use(express.json());

// Supabase admin client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Market Data Endpoints
app.get("/market/indices", async (req, res) => {
  const data = await getIndices();
  res.json(data);
});

app.get("/market/movers", async (req, res) => {
  const data = await getTopMovers();
  res.json(data);
});

// Middleware to verify user token
async function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = data.user;
  next();
}

// Add holding
app.post("/holdings", authenticate, async (req, res) => {
  const { ticker, quantity, average_price } = req.body;

  const { data, error } = await supabase
    .from("holdings")
    .insert([
      {
        user_id: req.user.id,
        ticker,
        quantity,
        average_price,
      },
    ]);

  if (error) return res.status(400).json({ error });

  res.json(data);
});

// Get holdings
app.get("/portfolio", authenticate, async (req, res) => {
  const { data: holdings, error } = await supabase
    .from("holdings")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error });

  //   const enriched = [];

  //   for (let holding of holdings) {
  //     const livePrice = await getLivePrice(holding.ticker);

  //     if (!livePrice) continue;

  //     const pnl = (livePrice - holding.average_price) * holding.quantity;

  //     enriched.push({
  //       ...holding,
  //       live_price: livePrice,
  //       current_value: livePrice * holding.quantity,
  //       pnl,
  //       pnl_percent:
  //         ((livePrice - holding.average_price) / holding.average_price) * 100,
  //     });
  //   }

  //   res.json(enriched);
  const enriched = await Promise.all(
    holdings.map(async (holding) => {
      const livePrice = await getLivePrice(holding.ticker);

      if (!livePrice) return null;

      const pnl = (livePrice - holding.average_price) * holding.quantity;

      return {
        ...holding,
        live_price: livePrice,
        current_value: livePrice * holding.quantity,
        pnl,
        pnl_percent:
          ((livePrice - holding.average_price) / holding.average_price) * 100,
      };
    })
  );

  res.json(enriched.filter(Boolean));

});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
