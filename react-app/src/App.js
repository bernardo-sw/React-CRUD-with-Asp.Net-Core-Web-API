import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
