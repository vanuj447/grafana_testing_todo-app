# 📊 grafana_testing_todo-app

A full-stack demo project that showcases **Observability with Metrics, Logs, and Dashboards** using a simple **Node.js Todo Application**.

This project integrates:

- ✅ **Node.js + Express** – Todo web app with EJS UI  
- ✅ **Prometheus** – Metrics collection & scraping  
- ✅ **Grafana** – Dashboard visualization  
- ✅ **Loki + Promtail** – Centralized log aggregation  
- ✅ **Traffic Generator** – Bash script to simulate user activity  

---

## 🚀 Features

- Simple Todo app with **Add / Delete** functionality and clean UI  
- **Prometheus instrumentation**:  
  - Request count (per method & endpoint)  
  - Request latency histogram  
  - Todo created/deleted counters  
- Exposes `/metrics` endpoint for Prometheus  
- Centralized logging with **Promtail → Loki → Grafana**  
- Pre-built Grafana dashboards for:
  - Request rate (QPS)  
  - Error rate tracking  
  - Request latency (p50, p95, p99)  
  - Todo trends (created vs deleted)  
  - Live logs from the app  
- **Traffic generator** script to simulate app usage  

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/) – Backend server  
- [Express](https://expressjs.com/) – Web framework  
- [EJS](https://ejs.co/) – UI templating  
- [Prometheus](https://prometheus.io/) – Metrics  
- [Grafana](https://grafana.com/) – Dashboards  
- [Loki](https://grafana.com/oss/loki/) – Log aggregation  
- [Promtail](https://grafana.com/docs/loki/latest/clients/promtail/) – Log collection agent  
- [Docker & Docker Compose](https://docs.docker.com/compose/) – Container orchestration  

---

## 📂 Project Structure

grafana_testing_todo-app/
├── app.js # Node.js Express app
├── package.json # App dependencies
├── views/ # EJS templates (UI)
│ ├── layout.ejs
│ ├── index.ejs
│ └── about.ejs
├── prometheus.yml # Prometheus scrape config
├── docker-compose.yml # Orchestrates all services
├── traffic.sh # Bash script to generate traffic
└── README.md # Project documentation


---

## ⚡ Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/grafana_testing_todo-app.git
cd grafana_testing_todo-app

2️⃣ Start the stack

docker compose up --build

This will start:

    Todo app → http://localhost:8000

Prometheus → http://localhost:9090

Grafana → http://localhost:3000

(default user/pass: admin / admin)

Loki → http://localhost:3100
3️⃣ Generate traffic

chmod +x traffic.sh
./traffic.sh

This will continuously hit the app, add/delete todos, and fetch metrics.
📈 Prometheus Metrics

The app exposes metrics at:
👉 http://localhost:8000/metrics

Available metrics:

    app_requests_total – Total requests per method/endpoint

    app_request_latency_seconds – Request latency histogram

    app_todos_total – Total todos created/deleted

Example queries:

rate(app_requests_total[1m])
histogram_quantile(0.95, rate(app_request_latency_seconds_bucket[5m]))
sum by(action)(rate(app_todos_total[1m]))

📊 Grafana Dashboards

    Import Prometheus as a Data Source

    Import Loki as a Data Source

    Build dashboards to visualize:

        Request traffic (QPS)

        Latency heatmaps

        Todo creation/deletion stats

        Application logs (via Loki)

📝 Logs with Loki

The Node.js app prints structured logs like:

2025-09-09T12:00:00Z [INFO] GET / - 200
2025-09-09T12:00:01Z [INFO] POST /add - task=Task_123
2025-09-09T12:00:02Z [INFO] GET /delete/Task_123 - 200

Promtail ships these logs to Loki, and they can be queried in Grafana’s Explore section.
🤝 Contributing

Pull requests are welcome! If you’d like to improve UI, add new metrics, or extend dashboards, feel free to fork and submit PRs.
📜 License

MIT License – free to use, modify, and distribute.
🎯 Purpose

This project is designed as a hands-on lab for learning:

    How to instrument Node.js apps with Prometheus

    How to visualize metrics in Grafana

    How to collect & query logs with Loki

    How to simulate traffic for testing observability setups
