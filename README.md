# Grafana Testing Todo-App

A complete observability demo project built on a **Node.js Todo Application** with **Prometheus, Grafana, and Loki** integration.  
This project demonstrates **metrics collection, logging, and dashboard visualization** for real-world monitoring use cases.

---

## 🚀 Features

- **Todo App**: Node.js + Express + EJS-based web UI
- **Metrics**: Exposes Prometheus metrics at `/metrics`
  - Request count, latency histograms, todos created/deleted
- **Logging**: Uses **Winston** for structured logging, collected in Grafana Loki
- **Dashboards**:
  - Includes a pre-built `dashboard.json` Grafana dashboard for easy import
- **Docker Compose**: Single command to spin up the full stack
- **Traffic Generator**: Simple bash script to simulate load on the app

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, EJS
- **Metrics**: Prometheus + prom-client
- **Logging**: Winston → Loki
- **Visualization**: Grafana
- **Containerization**: Docker & Docker Compose

---

## 📂 Repository Structure

```
grafana_testing_todo-app/
├── app.js                # Node.js Todo app
├── views/                # EJS templates (UI)
├── logs/                 # Winston log output
├── prometheus.yml        # Prometheus config
├── dashboard.json        # Pre-built Grafana dashboard
├── docker-compose.yml    # Orchestration file
├── package.json          # Node.js dependencies
├── README.md             # Project documentation
└── scripts/
    └── generate_traffic.sh   # Script to generate load
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/vanuj447/grafana_testing_todo-app.git
cd grafana_testing_todo-app
```

### 2️⃣ Start the stack
```bash
docker compose up --build
```

This will start:
- **Todo App** → `http://localhost:8000`
- **Prometheus** → `http://localhost:9090`
- **Grafana** → `http://localhost:3000`
- **Loki** → `http://localhost:3100`

### 3️⃣ Access Grafana
- Open `http://localhost:3000`
- Default credentials: `admin / admin`
- Go to **Dashboards → Manage → Import**
- Upload or paste JSON from `dashboard.json`
- Start exploring!

---

## 📊 Metrics to Query in Prometheus

Some example PromQL queries:

- **Total Requests**  
  ```promql
  sum(app_requests_total)
  ```
- **Requests by Method**  
  ```promql
  sum by (method) (app_requests_total)
  ```
- **Request Latency (95th percentile)**  
  ```promql
  histogram_quantile(0.95, sum(rate(app_request_latency_seconds_bucket[5m])) by (le))
  ```
- **Todos Created/Deleted**  
  ```promql
  sum by (action) (app_todos_total)
  ```

---

## 📜 Logs

The app uses **Winston** for logging. Logs are forwarded to **Grafana Loki**.  

- Query logs inside Grafana:
  - Go to **Explore → Loki**
  - Run queries like:
    ```logql
    {job="todo-app"} |~ "ERROR"
    ```

---

## 🔄 Generate Load

Use the provided script to generate traffic:

```bash
chmod +x scripts/generate_traffic.sh
./scripts/generate_traffic.sh
```

This will send continuous requests to the app and create activity in both **metrics** and **logs**.

---

## 📈 Example Dashboard

This repo already includes `dashboard.json` with:
- Request rate graph
- Latency heatmap
- Todo activity counter
- Logs panel (via Loki)

Import it in Grafana and start monitoring instantly.

<img width="1520" height="921" alt="Screenshot from 2025-09-10 15-59-51" src="https://github.com/user-attachments/assets/e9aea549-5668-4ca8-a5d6-ee93af419755" />

---

## 🤝 Contributing

Feel free to open issues or PRs if you’d like to extend the project.

---

## 📄 License

MIT License © 2025
