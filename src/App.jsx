import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CharacterList from './components/CharacterList/CharacterList';
import Character from './components/Character/Character';
import FavoriteList from './components/FavoriteList/FavoriteList';
import Contact from './pages/Contact/Contact';
import './styles/navbar.css';

function App() {
  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-brand">Poke App</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="navbar-link">
              Favoritos
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
