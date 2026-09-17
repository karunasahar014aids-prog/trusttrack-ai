export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error:'POST required' });
  const body = req.body || {};
  if (!body.projectId || !body.action) return res.status(400).json({ error:'projectId and action are required' });
  res.status(201).json({ ok:true, action:{ id:'ACT-'+Date.now(), projectId:body.projectId, action:body.action, createdAt:new Date().toISOString() } });
}
