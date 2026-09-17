export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error:'POST required' });
  const body = req.body || {};
  const progress = Number(body.reportedProgress || 0);
  const gapDays = Number(body.gapDays || 0);
  const observation = String(body.observation || '').toLowerCase();
  let score = 0; const reasons = [];
  if (gapDays >= 14) { score += 55; reasons.push('Latest field evidence is 14+ days old'); }
  else if (gapDays >= 7) { score += 25; reasons.push('Evidence gap is 7+ days'); }
  if (progress >= 70 && gapDays >= 7) { score += 25; reasons.push('High reported progress with an evidence gap'); }
  if (/delay|issue|missing|not|slow|inactive|no work/.test(observation)) { score += 25; reasons.push('Inspector observation contains a potential issue'); }
  const status = score >= 60 ? 'attention' : score >= 25 ? 'review' : 'normal';
  res.status(200).json({ status, score, reasons, recommendation: status==='attention' ? 'Human verification recommended' : status==='review' ? 'Officer review recommended' : 'No immediate exception detected' });
}
