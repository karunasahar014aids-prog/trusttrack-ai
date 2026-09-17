import React from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldCheck, MapPin, Camera, AlertTriangle, CheckCircle2, Clock3, ArrowRight, Upload, Navigation, X } from 'lucide-react';
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
 const [showEvidence,setShowEvidence]=React.useState(false);
 const [photo,setPhoto]=React.useState(null);
 const [gps,setGps]=React.useState('Not captured');
 const [observation,setObservation]=React.useState('');
 const [saved,setSaved]=React.useState(false);
 const [search,setSearch]=React.useState('');
 const [timestamp]=React.useState(()=>new Date().toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}));
 const filtered=projects.filter(p=>(p.name+' '+p.id+' '+p.district).toLowerCase().includes(search.toLowerCase()));

 const captureGps=()=>{
   if(!navigator.geolocation){setGps('GPS unavailable in this browser');return;}
   setGps('Capturing location...');
   navigator.geolocation.getCurrentPosition(pos=>setGps(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),()=>setGps('Location permission denied'));
 };
 const handlePhoto=e=>{const file=e.target.files?.[0]; if(file){setPhoto(URL.createObjectURL(file));setSaved(false)}};
 const saveEvidence=()=>{setSaved(true);};
 return <div className="app">
  <header><div className="brand"><div className="logo"><ShieldCheck size={25}/></div><div><b>TrustTrack AI</b><span>Smart Project Monitoring</span></div></div><div className="headerRight"><span className="live"><i/> LIVE MONITORING</span><div className="avatar">OF</div></div></header>
  <main>
   <section className="hero"><div><p className="eyebrow">DEPARTMENT MONITORING PORTAL</p><h1>{showEvidence?'Verified Field Evidence':'Project Command Dashboard'}</h1><p className="sub">{showEvidence?'Capture photo evidence with GPS, timestamp and inspector observations for project verification.':'See project progress, verify field evidence, and act on exceptions before they become major delays.'}</p></div><button className="primary" onClick={()=>setShowEvidence(!showEvidence)}>{showEvidence?<X size={17}/>:<MapPin size={17}/>} {showEvidence?'Back to Dashboard':'Field Evidence'}</button></section>
   {!showEvidence ? <>
   <section className="stats"><div><span>Total Projects</span><strong>24</strong><small>Across monitored districts</small></div><div><span>Normal</span><strong>18</strong><small>75% of projects</small></div><div><span>Needs Review</span><strong>4</strong><small>Requires officer review</small></div><div className="dangerStat"><span>Attention Required</span><strong>2</strong><small>Immediate investigation</small></div></section>
   <section className="grid"><div className="panel projects"><div className="panelHead"><div><h2>Projects</h2><p>Latest project monitoring status</p></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects..."/></div>
     <div className="table"><div className="row th"><span>PROJECT</span><span>PROGRESS</span><span>LAST EVIDENCE</span><span>STATUS</span></div>
      {filtered.map(p=><button className={'row '+(selected.id===p.id?'selected':'')} key={p.id} onClick={()=>setSelected(p)}><span><b>{p.name}</b><small>{p.id} · {p.district}</small></span><span><div className="progress"><i style={{width:p.progress+'%'}}/></div><b>{p.progress}%</b></span><span><b>{p.last}</b><small><Clock3 size={13}/> Evidence gap: {p.gap}</small></span><span><Badge status={p.status}/></span></button>)}
     </div></div>
    <aside className="panel detail"><div className="detailTop"><div><p className="eyebrow">SELECTED PROJECT</p><h2>{selected.name}</h2><p>{selected.id} · {selected.district}</p></div><Badge status={selected.status}/></div>
      <div className="compare"><div><span>REPORTED PROGRESS</span><strong>{selected.progress}%</strong></div><ArrowRight/><div><span>AI VERIFICATION</span><strong>{selected.status==='attention'?'Inconsistent':'Aligned'}</strong></div></div>
      <div className="evidence"><div className="evidenceImg"><Camera size={27}/><span>Latest field evidence</span><small>{selected.last} · GPS verified</small></div></div>
      <div className="explain"><div className="explainTitle"><AlertTriangle size={18}/><b>Why this needs attention</b></div><p>{selected.issue}</p><div className="meta"><span>AI confidence <b>{selected.status==='attention'?'91%':'88%'}</b></span><span>Evidence gap <b>{selected.gap}</b></span></div></div>
      <div className="actions"><button className="secondary" onClick={()=>setShowEvidence(true)}>View Evidence</button><button className="primary">Schedule Inspection</button></div>
    </aside></section>
   <div className="flow"><span>SEE</span><i>→</i><span>CAPTURE</span><i>→</i><span>VERIFY</span><i>→</i><span>DETECT</span><i>→</i><span>EXPLAIN</span><i>→</i><span>ACT</span></div></> :
   <section className="evidencePage"><div className="panel captureCard"><div className="captureHead"><div><p className="eyebrow">FIELD INSPECTOR</p><h2>Capture Verified Evidence</h2><p>Record what is happening at the project site.</p></div><span className="badge green"><CheckCircle2 size={14}/> Evidence Ready</span></div>
    <label>Project</label><select value={selected.id} onChange={e=>setSelected(projects.find(p=>p.id===e.target.value))}>{projects.map(p=><option key={p.id} value={p.id}>{p.id} — {p.name}</option>)}</select>
    <label>Photo Evidence</label><label className="uploadBox">{photo?<img src={photo} alt="Evidence preview"/>:<><Camera size={28}/><b>Take photo or upload image</b><small>Use your mobile camera for on-site evidence</small></>}<input type="file" accept="image/*" capture="environment" onChange={handlePhoto}/></label>
    <div className="captureGrid"><div><label>GPS Location</label><button className="locationBox" onClick={captureGps}><Navigation size={17}/><span>{gps}</span></button></div><div><label>Timestamp</label><div className="infoBox"><Clock3 size={17}/>{timestamp}</div></div></div>
    <label>Inspector Observation</label><textarea value={observation} onChange={e=>setObservation(e.target.value)} placeholder="Describe the current site condition, visible progress, materials, workforce, or issues..." rows="5"/>
    {saved&&<div className="successBox"><CheckCircle2 size={18}/><div><b>Evidence saved successfully</b><small>Ready for AI verification and project status update.</small></div></div>}
    <div className="actions"><button className="secondary" onClick={()=>{setPhoto(null);setObservation('');setGps('Not captured');setSaved(false)}}>Clear</button><button className="primary" onClick={saveEvidence}><Upload size={16}/> Save Evidence</button></div>
   </div><div className="panel checklist"><h2>Evidence Checklist</h2><p>Every submission should contain:</p><div><CheckCircle2/> Project ID</div><div><CheckCircle2/> Photo / visual evidence</div><div><CheckCircle2/> GPS coordinates</div><div><CheckCircle2/> Automatic timestamp</div><div><CheckCircle2/> Inspector observation</div><hr/><div className="nextStep"><AlertTriangle size={18}/><span><b>Next: AI Exception Detection</b><small>Compare reported progress with fresh field evidence and flag inconsistencies.</small></span></div></div></section>}
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
