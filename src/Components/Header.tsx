import CryptoMatrix from './CryptoMatrix';
import './Header.css';

function Header() {
  return (
    <header className="hero-section">
      {/* Container for parallax effect */}
      <div className="parallax-wrapper">
        <CryptoMatrix />
      </div>
      
      {/* Content that will move up faster than the background */}
      <div className="header-content">
        <h1>Cryptonite</h1>
      </div>
    </header>
  );
}

export default Header;