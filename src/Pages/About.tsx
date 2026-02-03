import './About.css';
import myPhoto from '../assets/me.png'; 

function About() {
  return (
    <div className="page-container">
      {/* MAIN TITLE */}
      <div className="title-wrapper">
        <h1 className="section-title">Developer_Profile</h1>
      </div>
      
      {/* STATUS WITH COLOR ACCENTS */}
      <p className="system-status-text">
        <span style={{ color: '#00ff00' }}>●</span> STATUS: <span style={{ color: '#00ff00' }}>AUTHORIZED</span> // 
        ENCRYPTION: <span style={{ color: '#ff4444' }}>AES_256_ACTIVE</span>
      </p><br></br>
      
      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="photo-frame">
          <img src={myPhoto} alt="Lead Developer" />
        </div>

        <div className="info-content">
          <h2 className="dev-name">Sophie Kaplan</h2> 
          <p className="dev-role">Full-Stack Web Architect & UI Designer</p>
          
          <div className="about-text">
            <strong>SYSTEM_CORE_MISSION:</strong><br/>
            Cryptonite Terminal is an advanced, high-performance ecosystem engineered to provide 
            retail traders with institutional-grade market surveillance. Our mission is to bridge 
            the gap between raw blockchain data and actionable financial intelligence.<br></br>
            <strong>KEY_ADVANTAGES:</strong><br/>
            - <strong>Real-Time Synchronization:</strong> Global state management via Redux Toolkit ensures 
              instant data consistency across all terminal nodes. <br/>
            - <strong>AI-Driven Insights:</strong> Direct link to GPT-3.5 Turbo for automated fundamental and technical analysis, also enabling users to download a real-time report file with AI-generated recommendations.<br/>
            - <strong>Customizable Monitoring:</strong> Pro-level alert protocols with audio-visual 
              triggers for critical market movements.
          </div>

          {/* ALL 9 TAGS */}
          <div className="tags-container">
              <span className="tech-tag">React_v18</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Redux_Toolkit</span>
              <span className="tech-tag">React_Router</span>
              <span className="tech-tag">Axios_API</span>
              <span className="tech-tag">Chart.js</span>
              <span className="tech-tag">OpenAI_GPT-3.5</span>
              <span className="tech-tag">HTML5_Canvas</span>
              <span className="tech-tag">Vite_Engine</span>
          </div>
        </div>
      </div>
<br></br>
      <div className="cyber-divider" style={{ margin: '60px 0' }}></div>

      {/* TECHNICAL TITLE */}
      <div className="title-wrapper" style={{ marginBottom: '30px' }}>
        <h2 className="section-title" style={{ fontSize: '1.2rem' }}>Technical_Specifications</h2>
      </div>
<br></br><br></br>
      {/* MANIFESTO PANEL */}
      <div className="architecture-panel">
        <div className="arch-section">
          <h3>Visual_Protocol</h3>
          <div className="feature-note">
            <strong>Typography:</strong> <b>Orbitron</b> for headers (Sci-Fi aesthetic), <b>Inter</b> for data legibility, <b>Courier New</b> for system logic.
          </div>
          <div className="feature-note">
            <strong>Color Palette:</strong>
            <div className="palette-container">
                <div className="color-swatch" style={{ background: '#00f2ff', boxShadow: '0 0 10px #00f2ff' }}>#00F2</div>
                <div className="color-swatch" style={{ background: '#ffd700', boxShadow: '0 0 10px #ffd700' }}>#FFD7</div>
                <div className="color-swatch" style={{ background: '#ff4444', boxShadow: '0 0 10px #ff4444' }}>#FF44</div>
                <div className="color-swatch" style={{ background: '#00ff00', boxShadow: '0 0 10px #00ff00' }}>#00FF</div>
            </div>
          </div>
          <div className="feature-note">
            <strong>Parallax:</strong> Implemented via <b>fixed background</b> logic and <b>clip-path</b> masking for depth.
          </div>
        </div>

        <div className="arch-section">
          <h3>Neural_Logic</h3>
          <div className="feature-note">
            <strong>AI Identity:</strong> Developer portrait synthesized via <b>DALL-E 3</b> with custom data-reflection prompts.
          </div>
          <div className="feature-note">
            <strong>Neural Node:</strong> Integrated <b>GPT-3.5-Turbo</b>. The system performs prompt-engineering using live market metrics.
          </div>
          <div className="feature-note">
            <strong>Trading Tools:</strong> Professional <b>Price Thresholds</b> with audio-visual alerts and <b>Data Export</b> protocols.
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;