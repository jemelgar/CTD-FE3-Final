import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FavoritesContext } from '../../context/FavoritesContext';
import styles from './Character.module.css';

const Character = () => {
  const { id } = useParams();
  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoritesContext);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const isFavorite = () => favorites.some((fav) => fav.id === character?.id);

  if (!character) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={character.sprites.front_default}
          alt={character.name}
          className={styles.image}
        />
        <h1 className={styles.name}>{character.name}</h1>
        <button
          className={`${styles.favoriteButton} ${
            isFavorite() ? styles.favoriteActive : ''
          }`}
          onClick={() =>
            isFavorite() ? removeFavorite(character.id) : addFavorite(character)
          }
        >
          {isFavorite() ? '💔 Remover de favoritos' : '❤️ Agregar a favoritos'}
        </button>
      </div>

      <div className={styles.details}>
        <h2>Detalles</h2>
        <p>
          <strong>Peso:</strong> {character.weight} kg
        </p>
        <p>
          <strong>Altura:</strong> {character.height} m
        </p>

        <div>
          <strong>Tipos:</strong>
          <ul className={styles.types}>
            {character.types.map((typeInfo) => (
              <li key={typeInfo.type.name} className={styles.type}>
                {typeInfo.type.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Habilidades:</strong>
          <ul className={styles.abilities}>
            {character.abilities.map((abilityInfo) => (
              <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Base Stats:</strong>
          <ul className={styles.stats}>
            {character.stats.map((statInfo) => (
              <li key={statInfo.stat.name}>
                <strong>{statInfo.stat.name}:</strong> {statInfo.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Character;
