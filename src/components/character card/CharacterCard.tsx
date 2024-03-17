import React from 'react'
import style from "./Character.module.scss"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { setFavourites } from '../../store/features/favouriteSlice';
import { CharacterItem } from '../../types/types';

const CharacterCard = ({item, charactersData}:{item: CharacterItem, charactersData?:CharacterItem[]}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: characterId, name, status, image, species, location } = item;
    const locationId = item.location.url.split('https://rickandmortyapi.com/api/location/')[1]

    const {favourites}  = useSelector((state: any) => state.favourites);

    const handleAddToFavourites = (characterId: number  ) => {
        const selectedItem = (favourites && favourites.length > 0) && favourites.some(
          (item: CharacterItem) => item.id == characterId
        );
        if (selectedItem) {
          dispatch(
            setFavourites(
              favourites?.filter((item: CharacterItem) => item.id !== characterId)
            )
          );
        } else {
          dispatch(
            setFavourites([
              ...favourites,
              charactersData?.find((item: CharacterItem) => item.id === characterId),
            ])
          );
        }
      };
  return (
    <div className={`${style.characterItem}`} key={characterId}>
    <div>
      <img
        src={image}
        alt="characterImage"
        onClick={() =>
          navigate(`/location/${locationId}/characters/${characterId}`)
        }
      />
    </div>
    <div>
      <p
        className={`${style.characterName}`}
        onClick={() =>
          navigate(`/location/${locationId}/characters/${characterId}`)
        }
      >
        {name}
      </p>
      <p className={`${style.characterStatus}`}>
        {status}-{species}
      </p>
    </div>
    <div>
      {favourites?.some((item: CharacterItem) => item.id === characterId) ? (
        <FaHeart
          onClick={() => {
            handleAddToFavourites(characterId);
          }}
          className={`${style.favouriteIcon}`}
          style={{ color: "red" }}
        />
      ) : (
        <FaRegHeart
          onClick={() => {
            handleAddToFavourites(characterId);
          }}
          className={`${style.favouriteIcon}`}
        />
      )}
    </div>
  </div>
  )
}

export default CharacterCard