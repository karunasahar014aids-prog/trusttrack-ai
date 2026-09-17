import React from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldCheck, MapPin, Camera, AlertTriangle, CheckCircle2, Clock3, ArrowRight } from 'lucide-react';
import './style.css';

const projects = [
  { id:'TT-001', name:'Community Skill Development Centre', district:'Madurai', progress:72, status:'attention', last:'17 Sep 2026', gap:'15 days', issue:'Reported progress is not clearly supported by latest field evidence.' },
  { id:'TT-002', name:'Accessible Learning Facility', district:'Coimbatore', progress:58, status:'review', last:'16 Sep 2026', gap:'7 days', issue:'Evidence needs routine review.' },
  { id:'TT-003', name:'Rehabilitation Support Centre', district:'Trichy', progress:84, status:'normal', last:'17 Sep 2026', gap:'2 days', issue:'Evidence aligns with reported progress.' },
  { id:'TT-004', name:'Inclusive Community Hall', district:'Salem', progress:41, status:'normal', last:'15 Sep 2026', gap:'4 days', issue:'Evidence aligns with reported progress.' }
];

function Badge({status}){ const map={attention:['Attention Required','red'],review:['Review','amber'],normal:['Normal','green']}; const [label,c]=map[status]; return <span className={'badge '+c}>{status==='normal'?<CheckCircle2 size={14}/>:<AlertTriangle size={14}/>} {label}</span> }

function App(){
 const [selected,setSelected]=React.useState(projects[0]);
 return <div className="app">
  <header><div className="brand"><div className="logo"><ShieldCheck size={25}/></div><div><b>TrustTrack AI</b><span>Smart Project Monitoring</span></div></div><div className="headerRight"><span className="live"><i/> LIVE MONITORING</span><div className="avatar">OF</div></div></header>
  <main>
   <section className="hero"><div><p className="eyebrow">DEPARTMENT MONITORING PORTAL</p><h1>Project Command Dashboard</h1><p className="sub">See project progress, verify field evidence, and act on exceptions before they become major delays.</p></div><button className="primary"><MapPin size={17}/> Field Evidence</button></section>
   <section className="stats"><div><span>Total Projects</span><strong>24</strong><small>Across monitored districts</small></div><div><span>Normal</span><strong>18</strong><small>75% of projects</small></div><div><span>Needs Review</span><strong>4</strong><small>Requires officer review</small></div><div className="dangerStat"><span>Attention Required</span><strong>2</strong><small>Immediate investigation</small></div></section>
   <section className="grid">
    <div className="panel projects"><div className="panelHead"><div><h2>Projects</h2><p>Latest project monitoring status</p></div><input placeholder="Search projects..."/></div>
     <div className="table"><div className="row th"><span>PROJECT</span><span>PROGRESS</span><span>LAST EVIDENCE</span><span>STATUS</span></div>
      {projects.map(p=><button className={'row '+(selected.id===p.id?'selected':'')} key={p.id} onClick={()=>setSelected(p)}><span><b>{p.name}</b><small>{p.id} · {p.district}</small></span><span><div className="progress"><i style={{width:p.progress+'%'}}/></div><b>{p.progress}%</b></span><span><b>{p.last}</b><small><Clock3 size={13}/> Evidence gap: {p.gap}</small></span><span><Badge status={p.status}/></span></button>)}
     </div>
    </div>
    <aside className="panel detail"><div className="detailTop"><div><p className="eyebrow">SELECTED PROJECT</p><h2>{selected.name}</h2><p>{selected.id} · {selected.district}</p></div><Badge status={selected.status}/></div>
      <div className="compare"><div><span>REPORTED PROGRESS</span><strong>{selected.progress}%</strong></div><ArrowRight/><div><span>AI VERIFICATION</span><strong>{selected.status==='attention'?'Inconsistent':'Aligned'}</strong></div></div>
      <div className="evidence"><div className="evidenceImg"><Camera size={27}/><span>Latest field evidence</span><small>{selected.last} · GPS verified</small></div></div>
      <div className="explain"><div className="explainTitle"><AlertTriangle size={18}/><b>Why this needs attention</b></div><p>{selected.issue}</p><div className="meta"><span>AI confidence <b>{selected.status==='attention'?'91%':'88%'}</b></span><span>Evidence gap <b>{selected.gap}</b></span></div></div>
      <div className="actions"><button className="secondary">View Evidence</button><button className="primary">Schedule Inspection</button></div>
    </aside>
   </section>
   <div className="flow"><span>SEE</span><i>→</i><span>CAPTURE</span><i>→</i><span>VERIFY</span><i>→</i><span>DETECT</span><i>→</i><span>EXPLAIN</span><i>→</i><span>ACT</span></div>
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
