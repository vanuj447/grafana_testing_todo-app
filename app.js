const express = require("express");
const bodyParser = require("body-parser");
const client = require("prom-client");
const expressLayouts = require("express-ejs-layouts");
const winston = require("winston");
const LokiTransport = require("winston-loki");

const app = express();
const port = 8000;

// ====== Setup Logger with Loki ======
const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: "http://loki:3100", // Loki service (Docker Compose)
      labels: { app: "todo-app" },
    }),
    new winston.transports.Console(), // also log to console
  ],
});

// Middleware
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.use(bodyParser.urlencoded({ extended: true }));

// ====== Prometheus metrics setup ======
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "app_requests_total",
  help: "Total number of requests",
  labelNames: ["method", "endpoint"],
});
const httpRequestDuration = new client.Histogram({
  name: "app_request_latency_seconds",
  help: "Request latency in seconds",
  labelNames: ["endpoint"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});
const todosCounter = new client.Counter({
  name: "app_todos_total",
  help: "Total number of todos created/deleted",
  labelNames: ["action"],
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);
register.registerMetric(todosCounter);

// Middleware to track requests
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ endpoint: req.path });
  res.on("finish", () => {
    httpRequestCounter.inc({ method: req.method, endpoint: req.path });
    end();
  });
  next();
});

// In-memory todo list
let todos = [];

// ====== Routes ======
app.get("/", (req, res) => {
  logger.info("Homepage visited");
  res.render("index", { todos });
});

app.post("/add", (req, res) => {
  const task = req.body.task.trim();
  if (task) {
    todos.push(task);
    todosCounter.inc({ action: "created" });
    logger.info(`✅ Task added: ${task}`);
  }
  res.redirect("/");
});

app.get("/delete/:task", (req, res) => {
  todos = todos.filter((t) => t !== req.params.task);
  todosCounter.inc({ action: "deleted" });
  logger.warn(`🗑️ Task deleted: ${req.params.task}`);
  res.redirect("/");
});

app.get("/about", (req, res) => {
  logger.info("About page visited");
  res.render("about");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Start server
app.listen(port, () => {
  logger.info(`🚀 Todo app running at http://localhost:${port}`);
});
