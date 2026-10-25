# 🌱 AnnSetu — Surplus Food Redistribution Platform

> Built for **Vashisht Hackathon 3.0** — EcoTech Innovation Track

AnnSetu connects surplus food donors with recipients in real-time, using AI-powered safety scoring, smart matching, spoilage prediction, and multi-stop volunteer route batching.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS + Zustand |
| Backend | Node.js + Express + Socket.io + Mongoose |
| ML Service | Python FastAPI + scikit-learn |
| Database | MongoDB |
| Real-time | Socket.io |

---

## Features

- 🗺️ **Live map feed** — listings appear in real-time via WebSockets
- 🤖 **AI safety scoring** — every listing auto-scored 0–100 before going live
- 🟢 **Spoilage risk badge** — ML classifier predicts low/medium/high spoilage risk
- 🚴 **Batch route planner** — volunteers plan optimised multi-stop pickup routes
- 📊 **Impact dashboard** — meals saved, kg rescued, CO₂ prevented
- 🔔 **Push notifications** — instant alerts when food appears nearby
- 👥 **Role-based flows** — Donor / Recipient / Volunteer

---

## Quick Start (Local)

### 1. Environment setup

```bash
cp .env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret
# Create client/.env with the VITE_* lines from .env.example
```

### 2. ML Service
```bash
cd ml
# Create an isolated Python environment for the ML service
python -m venv .venv

# Activate it (choose the command for your shell)
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# Windows Command Prompt:
# .venv\Scripts\activate.bat
# macOS / Linux:
# source .venv/bin/activate

# Install Python dependencies inside the activated environment
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Keep the virtual environment active whenever you run the ML service or install its Python packages. To leave it, run `deactivate`. If PowerShell blocks activation, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in that terminal, then activate the environment again.

### 3. Server
```bash
cd server
npm install
npm run dev
```

### 4. Client
```bash
cd client
npm install
npm run dev
```

App → **http://localhost:5173**

---

## Docker Compose

```bash
docker-compose up --build
```

- Client → http://localhost:5173
- Server → http://localhost:5000
- ML     → http://localhost:8000

---

## Seed Demo Data

From the `server` directory, create one test login for each role:

```bash
cd server
npm run seed:demo
```

The command creates these accounts in the MongoDB database configured in `server/.env`. Existing accounts with these emails are left unchanged.

| Role | Email | Password |
|---|---|---|
| Donor | `demo.donor@annsetu.local` | `DemoDonor123!` |
| Recipient | `demo.recipient@annsetu.local` | `DemoRecipient123!` |
| Volunteer | `demo.volunteer@annsetu.local` | `DemoVolunteer123!` |

These credentials are for local testing only. Do not use them in a public deployment.

```bash
curl -X POST http://localhost:5000/api/seed-impact
```

---

## Key API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Register (donor/recipient/volunteer) |
| POST | `/api/auth/login` | Login |
| GET | `/api/listings` | Browse food (lat/lng/radius filter) |
| POST | `/api/listings` | Post new listing |
| POST | `/api/listings/:id/claim` | Claim a listing |
| POST | `/api/route/batch` | Plan optimised volunteer route |
| POST | `/api/route/complete-stop` | Mark stop as delivered |
| GET | `/api/route/suggestions` | Suggest nearby listings to batch |
| POST | `/ml/spoilage-predict` | Predict spoilage risk |
| POST | `/ml/match` | Smart donor-recipient matching |

---

## Project Structure

```
AnnSetu/
├── client/src/
│   ├── pages/        Home, Feed, Dashboard, Volunteer, RouteBatch ...
│   └── components/   Navbar, SpoilageRiskBadge, SafetyBadge ...
├── server/src/
│   ├── models/       FoodListing, User, Review, ImpactStats
│   ├── routes/       auth, listings, users, volunteer, routeBatching
│   └── services/     mlClient, matchingEngine, expiryWatcher ...
├── ml/
│   ├── main.py               FastAPI entrypoint
│   ├── spoilage_predictor.py RandomForest spoilage classifier
│   ├── smart_matching.py     GradientBoosting matching
│   └── nlp_safety.py         NLP safety scorer
└── docker-compose.yml
```
