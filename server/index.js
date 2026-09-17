import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const projects = [
  { id:'TT-001', name:'Community Skill Development Centre', district:'Madurai', progress:72, status:'attention', last:'17 Sep 2026', gap:'15 days', issue:'Reported progress is not clearly supported by latest field evidence.', confidence:91 },
  { id:'TT-002', name:'Accessible Learning Facility', district:'Coimbatore', progress:58, status:'review', last:'16 Sep 2026', gap:'7 days', issue:'Evidence needs routine review.', confidence:88 },
  { id:'TT-003', name:'Rehabilitation Support Centre', district:'Trichy', progress:84, status:'normal', last:'17 Sep 2026', gap:'2 days', issue:'Evidence aligns with reported progress.', confidence:94 },
  { id:'TT-004', name:'Inclusive Community Hall', district:'Salem', progress:41, status:'normal', last:'15 Sep 2026', gap:'4 days', issue:'Evidence aligns with reported progress.', confidence:92 }
];

const evidence = [];

function detectException({ reportedProgress = 0, evidenceDaysOld = 0, observation = '' }) {
  let score = 0;
  const reasons = [];
  if (evidenceDaysOld >= 14) { score += 55; reasons.push(`Evidence is ${evidenceDaysOld} days old`); }
  else if (evidenceDaysOld >= 7) { score += 25; reasons.push(`Evidence gap is ${evidenceDaysOld} days`); }
  if (reportedProgress >= 70 && evidenceDaysOld >= 7) { score += 25; reasons.push('High reported progress needs recent field support'); }
  if (/delay|issue|missing|not|slow|inactive|no work/i.test(observation)) { score += 25; reasons.push('Inspector observation contains a potential issue signal'); }
  const status = score >= 60 ? 'attention' : score >= 25 ? 'review' : 'normal';
  return { status, score: Math.min(score, 100), reasons, recommendation: status === 'attention' ? 'Schedule inspection or request clarification.' : status === 'review' ? 'Review the latest evidence.' : 'No exception detected from available evidence.' };
}

app.get('/api/health', (_req, res) => res.json({ ok:true, service:'TrustTrack AI API' }));
app.get('/api/projects', (_req, res) => res.json(projects));
app.get('/api/evidence', (_req, res) => res.json(evidence));

app.post('/api/evidence', (req, res) => {
  const item = {
    id: `EV-${Date.now()}`,
    projectId: req.body.projectId,
    inspector: req.body.inspector || 'Field Officer',
    observation: req.body.observation || '',
    gps: req.body.gps || null,
    timestamp: req.body.timestamp || new Date().toISOString(),
    imageName: req.body.imageName || null
  };
  evidence.unshift(item);
  res.status(201).json(item);
});

app.post('/api/ai/detect', (req, res) => res.json(detectException(req.body)));

app.post('/api/inspections/random', (_req, res) => {
  const target = projects[Math.floor(Math.random() * projects.length)];
  res.json({ inspectionId:`IN-${Date.now()}`, project:target, assignedTo:'Field Officer', reason:'Random verification inspection' });
});

app.post('/api/actions', (req, res) => res.json({ ok:true, action:req.body.action, projectId:req.body.projectId, createdAt:new Date().toISOString() }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`TrustTrack API running on http://localhost:${port}`));
