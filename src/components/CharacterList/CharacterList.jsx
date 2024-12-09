import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FavoritesContext } from '../../context/FavoritesContext';
import styles from './CharacterList.module.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((response) => {
        const results = response.data.results;
        const promises = results.map((char) => axios.get(char.url));
        Promise.all(promises).then((details) => {
          setCharacters(details.map((detail) => detail.data));
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <div className={styles.container}>
      <h1>Lista de pokemones</h1>
      <div className={styles.cards}>
        {characters.map((char) => (
          <div key={char.id} className={styles.card}>
            <img src={char.sprites.front_default} alt={char.name} />
            <h2>{char.name}</h2>
            <p>Experiencia Base: {char.base_experience}</p>
            <button
              className={styles.favoriteButton}
              onClick={() =>
                isFavorite(char.id)
                  ? removeFavorite(char.id)
                  : addFavorite(char)
              }
            >
              {isFavorite(char.id) ? '💔 Remover' : '❤️ Favorito'}
            </button>
            <Link to={`/character/${char.id}`} className={styles.detailsButton}>
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
