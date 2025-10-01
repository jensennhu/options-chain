import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/metrics/snapshot", async (req, res) => {
    try {
      const { symbol, metrics } = req.body;

      if (!symbol || !metrics) {
        return res.status(400).json({ error: "Symbol and metrics are required" });
      }

      const snapshot = await storage.saveMetricsSnapshot(symbol, metrics);
      res.json(snapshot);
    } catch (error) {
      console.error("Error saving metrics snapshot:", error);
      res.status(500).json({ error: "Failed to save metrics snapshot" });
    }
  });

  app.get("/api/metrics/history/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const { limit = "50" } = req.query;

      const history = await storage.getMetricsHistory(symbol, parseInt(limit as string));
      res.json(history);
    } catch (error) {
      console.error("Error fetching metrics history:", error);
      res.status(500).json({ error: "Failed to fetch metrics history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
