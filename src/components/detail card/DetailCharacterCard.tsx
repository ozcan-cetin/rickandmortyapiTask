import React from 'react'
import style from "./DetailCharacterCard.module.scss"
import { useNavigate } from 'react-router-dom';
import { CharacterItem } from '../../types/types';

const DetailCharacterCard = ({item}:{item:CharacterItem}) => {
    const navigate = useNavigate();

    const { id: characterId, name, status, image, species } = item;
    const locationId = item.location.url.split('https://rickandmortyapi.com/api/location/')[1]
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
  </div>
  )
}

export default DetailCharacterCard