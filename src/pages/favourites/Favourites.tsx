import style from "./Favourites.module.scss";
import {useSelector } from "react-redux";
import CharacterCard from "../../components/character card/CharacterCard";
import { CharacterItem } from "../../types/types";

const Favourites = () => {
  const { favourites } = useSelector((state: any) => state.favourites);

  return (
    <div className={`${style.FavouritesContainer}`}>
      {favourites?.map((item: CharacterItem) => {
        return (
          <CharacterCard item={item} key={item.id}/>
        );
      })}
    </div>
  );
};

export default Favourites;
