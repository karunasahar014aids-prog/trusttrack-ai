const projects = [
  { id:'TT-001', name:'Community Skill Development Centre', district:'Madurai', progress:72, status:'attention', last:'17 Sep 2026', gap:'15 days', issue:'Reported progress is not clearly supported by latest field evidence.', confidence:91 },
  { id:'TT-002', name:'Accessible Learning Facility', district:'Coimbatore', progress:58, status:'review', last:'16 Sep 2026', gap:'7 days', issue:'Evidence needs routine review.', confidence:88 },
  { id:'TT-003', name:'Rehabilitation Support Centre', district:'Trichy', progress:84, status:'normal', last:'17 Sep 2026', gap:'2 days', issue:'Evidence aligns with reported progress.', confidence:94 },
  { id:'TT-004', name:'Inclusive Community Hall', district:'Salem', progress:41, status:'normal', last:'15 Sep 2026', gap:'4 days', issue:'Evidence aligns with reported progress.', confidence:92 }
];
export default function handler(req, res) { res.status(200).json({ projects, stats:{ total:24, normal:18, review:4, attention:2 } }); }
