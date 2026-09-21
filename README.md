# TrustTrack AI

**Evidence-backed project monitoring for DoSJE field operations.**

TrustTrack AI is a working browser prototype for a centralized project monitoring command centre.

## Working prototype

- Live project dashboard with simulated real-time updates
- Project location map with clickable project markers
- Project registry with project detail modal
- CCTV monitoring panel with 4 camera cards
- Camera selection and reconnect simulation
- Inspection assignment workflow
- Evidence upload preview
- Evidence verification workflow placeholder
- Alert queue and officer action flow
- Analytics / performance view
- Responsive desktop and mobile layout

## Monitoring loop

**SEE → CAPTURE → VERIFY → DETECT → EXPLAIN → ACT**

## Run locally

```bash
npm install
npm run dev
```

## Important prototype note

The current CCTV feeds and project metrics are **demo/simulated data**. The UI is structured for production integration, but real CCTV requires a secure RTSP/NVR streaming gateway and server-side credentials. Real project data can be connected through Supabase in the next stage.

Never place CCTV passwords, API keys, or other secrets in browser code.
