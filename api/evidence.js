export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error:'POST required' });
  const body = req.body || {};
  if (!body.projectId || !body.observation) return res.status(400).json({ error:'projectId and observation are required' });
  res.status(201).json({ ok:true, evidence:{ id:'EV-'+Date.now(), projectId:body.projectId, gps:body.gps || null, timestamp:body.timestamp || new Date().toISOString(), observation:body.observation } });
}
