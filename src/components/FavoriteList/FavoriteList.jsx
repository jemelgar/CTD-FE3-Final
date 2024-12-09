import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import styles from './FavoriteList.module.css';

const FavoriteList = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return <p className={styles.noFavorites}>Aún no tienes pokes favoritos!</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Tus favoritos</h2>
      <div className={styles.cards}>
        {favorites.map((fav) => (
          <div key={fav.id} className={styles.card}>
            <img src={fav.sprites.front_default} alt={fav.name} />
            <h2>{fav.name}</h2>
            <p>Experiencia Base: {fav.base_experience}</p>
            <button
              className={styles.favoriteButton}
              onClick={() => removeFavorite(fav.id)}
            >
              💔 Remover de favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;
