# JM Coaches Demo

Prototype phone app for JM Coaches: daily vehicle walk-around checks and workshop job cards. A defect on a check opens a job card automatically.

- Front end: `public/` (plain HTML/CSS/JS, no build step)
- Demo data: `public/seed.js`, dated from today. Everything users add is saved in their own browser; Profile → "Reset demo data" restores the seed.
- Demo PIN: 1111 for every user

## Run locally

    python3 server.py        # http://localhost:4358

## Deploy on Railway

Deploy this repo as a service. `railway.json` starts `python3 server.py`, which listens on Railway's `PORT`. No variables or volume are needed.
