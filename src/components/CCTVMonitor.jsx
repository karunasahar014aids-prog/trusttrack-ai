import React from 'react';
import Hls from 'hls.js';
import { Camera, Circle, Maximize2, RefreshCw, Settings, Signal, Video, X } from 'lucide-react';

const cameras = [
  { id:'CAM-001', name:'Community Skill Development Centre', district:'Madurai', status:'Online', url:'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id:'CAM-002', name:'Accessible Learning Facility', district:'Coimbatore', status:'Online', url:'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id:'CAM-003', name:'Rehabilitation Support Centre', district:'Trichy', status:'Online', url:'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id:'CAM-004', name:'Inclusive Community Hall', district:'Salem', status:'Offline', url:'' }
];

function LiveVideo({ url, label }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const video = ref.current;
    if (!video || !url) return;
    let hls;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(url);
      hls.attachMedia(video);
    } else {
      video.src = url;
    }
    return () => { if (hls) hls.destroy(); };
  }, [url]);
  if (!url) return <div className="cctvOffline"><Video size={28}/><b>Camera Offline</b><span>No live stream available</span></div>;
  return <video ref={ref} className="cctvVideo" autoPlay muted playsInline controls aria-label={label}/>;
}

export default function CCTVMonitor({ onClose }) {
  const [selected, setSelected] = React.useState(cameras[0]);
  const [streamUrl, setStreamUrl] = React.useState(cameras[0].url);
  const [refreshing, setRefreshing] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);

  const selectCamera = (camera) => { setSelected(camera); setStreamUrl(camera.url); };
  const refresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 700); };

  return <main className="cctvPage">
    <section className="cctvHeader">
      <div>
        <p className="eyebrow">CCTV SURVEILLANCE</p>
        <h1>Live Camera Monitoring</h1>
        <p className="sub">Authorized officials can view connected project camera feeds and check camera availability in real time.</p>
      </div>
      <div className="cctvHeaderActions">
        <button className="secondary" onClick={refresh}><RefreshCw size={16} className={refreshing?'spin':''}/> Refresh</button>
        <button className="secondary" onClick={onClose}><X size={16}/> Close</button>
      </div>
    </section>

    <section className="cctvStats">
      <div><Signal size={17}/><span>Online Cameras</span><strong>{cameras.filter(c=>c.status==='Online').length}</strong></div>
      <div><Camera size={17}/><span>Total Cameras</span><strong>{cameras.length}</strong></div>
      <div><Circle size={12}/><span>Monitoring</span><strong>LIVE</strong></div>
    </section>

    <section className="cctvLayout">
      <div className={'cctvPlayer panel '+(fullscreen?'cctvFullscreen':'')}>
        <div className="cctvPlayerTop">
          <div><span className="livePill"><i/> LIVE</span><b>{selected.id} · {selected.name}</b><small>{selected.district}</small></div>
          <button className="iconButton" onClick={()=>setFullscreen(!fullscreen)} title="Fullscreen"><Maximize2 size={17}/></button>
        </div>
        <div className="videoStage">
          <LiveVideo url={streamUrl} label={selected.name}/>
          <div className="videoOverlay"><span><i/> LIVE MONITORING</span><span>{new Date().toLocaleTimeString()}</span></div>
        </div>
        <div className="streamSettings">
          <Settings size={15}/>
          <input value={streamUrl} onChange={e=>setStreamUrl(e.target.value)} placeholder="Paste HLS .m3u8 stream URL"/>
          <button className="primary" onClick={()=>setStreamUrl(streamUrl.trim())}>Connect</button>
        </div>
        <p className="streamNote">Prototype supports HLS streams. For production CCTV, connect the camera's RTSP feed through a secure RTSP-to-HLS/WebRTC gateway.</p>
      </div>

      <aside className="panel cameraList">
        <div className="panelHead"><div><h2>Project Cameras</h2><p>Select a camera to monitor</p></div></div>
        {cameras.map(camera=><button key={camera.id} className={'cameraItem '+(selected.id===camera.id?'active':'')} onClick={()=>selectCamera(camera)}>
          <div className="cameraIcon"><Camera size={17}/></div>
          <div><b>{camera.name}</b><small>{camera.id} · {camera.district}</small></div>
          <span className={camera.status==='Online'?'cameraOnline':'cameraOffline'}><i/>{camera.status}</span>
        </button>)}
      </aside>
    </section>

    <section className="cctvBottom">
      <div className="panel"><div className="miniTitle"><Video size={16}/><b>Monitoring workflow</b></div><p>Camera feed → availability check → official review → anomaly/inspection trigger → field verification.</p></div>
      <div className="panel"><div className="miniTitle"><Signal size={16}/><b>Camera health</b></div><p>Online status is shown per registered camera. Offline cameras can be flagged for follow-up.</p></div>
    </section>
  </main>;
}
