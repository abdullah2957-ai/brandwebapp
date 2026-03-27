import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disable CSP for development/iframe compatibility
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Simulated Stripe Checkout
  app.post("/api/create-checkout-session", async (req, res) => {
    const { items, successUrl, cancelUrl } = req.body;
    
    // In a real app, you'd use the stripe SDK here:
    // const session = await stripe.checkout.sessions.create({ ... });
    
    // For this demo, we'll simulate a successful session creation
    console.log("Creating simulated checkout session for items:", items);
    
    res.json({ 
      id: "sim_session_" + Math.random().toString(36).substr(2, 9),
      url: successUrl // Redirect directly to success for simulation
    });
  });

  // Contact Form Submission
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Received message from ${name} (${email}): ${message}`);
    
    // Simulate processing
    setTimeout(() => {
      res.json({ success: true, message: "Message received successfully!" });
    }, 1000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
