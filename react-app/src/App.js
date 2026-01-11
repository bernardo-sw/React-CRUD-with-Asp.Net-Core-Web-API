import logo from './logo.svg';
import net_core_logo from './NET_Core_Logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container-logos">
          <img src={logo} className="App-logo" alt="React Logo" />
          <img src={net_core_logo} className="Net-Core-logo" alt=".NET Core Logo" />
        </div>
        <h1 className='Uppercase'>Bernardo Albuquerque</h1>
        <p>
          Full Stack Developer | Software Engineer | Tech Enthusiast
        </p>
        <a
          className="App-link"
          href="https://github.com/bernardo-sw"
          target="_blank"
          rel="noopener noreferrer"
        >
          The developer's GitHub Profile
        </a>
      </header>
    </div>
  );
}

export default App;
