function Footer() {
  return (
    <footer style={{
        width: '100%',
        padding: '30px 0',
        background: '#000',
        textAlign: 'center',
        borderTop: '1px solid #111', 
        marginTop: '60px'
    }}>
      <p style={{ 
          fontSize: '10px', 
          color: '#444', 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          fontFamily: 'Orbitron, sans-serif'
      }}>
        © 2026 CRYPTONITE TERMINAL. ALL RIGHTS RESERVED. 
        <span style={{ marginLeft: '15px', color: '#555' }}>
            SYSTEM_STATUS: <span style={{ color: '#00ff00' }}>ONLINE</span>
        </span>
      </p>
    </footer>
  );
}

export default Footer;